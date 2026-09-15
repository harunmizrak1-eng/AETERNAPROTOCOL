import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const htmlPath = resolve(process.argv[2]);
const outPath  = resolve(process.argv[3]);

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  '--remote-debugging-port=9333', '--no-first-run', '--disable-dev-shm-usage',
  '--font-render-hinting=none', 'about:blank'
], { stdio: ['ignore','ignore','pipe'] });
chrome.stderr.on('data', () => {});

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch('http://127.0.0.1:9333/json/new?about:blank', { method: 'PUT' });
      if (r.ok) return await r.json();
    } catch {}
    await sleep(300);
  }
  throw new Error('chrome baglanamadi');
}

const t = await target();
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));

let id = 0; const pending = new Map(); const events = [];
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else if (m.method) events.push(m.method);
});
const send = (method, params = {}) => new Promise((res, rej) => {
  const i = ++id; pending.set(i, m => m.error ? rej(new Error(method + ': ' + m.error.message)) : res(m.result));
  ws.send(JSON.stringify({ id: i, method, params }));
});

await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: 'file://' + htmlPath });
for (let i = 0; i < 100 && !events.includes('Page.loadEventFired'); i++) await sleep(150);
await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true });
await sleep(900);

const FOOT = `<div style="width:100%;font-family:Inter,sans-serif;font-size:7pt;color:#5a6b7d;
  padding:0 18mm;display:flex;justify-content:space-between;align-items:center;
  border-top:.5px solid #d9e2ea;padding-top:2.5mm;-webkit-print-color-adjust:exact;">
  <span style="letter-spacing:.06em;">BPC-157 &amp; TB-500 — Kanıt Durumu Raporu · PEP-2026-01</span>
  <span style="font-weight:600;color:#014673;"><span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>`;
const HEAD = `<div style="width:100%;font-family:Inter,sans-serif;font-size:6.6pt;color:#8a99a8;
  padding:0 18mm 0;text-align:right;letter-spacing:.14em;text-transform:uppercase;
  -webkit-print-color-adjust:exact;">ZPHC Türkiye · Bileşik Kütüphanesi</div>`;

const { data } = await send('Page.printToPDF', {
  printBackground: true, preferCSSPageSize: true,
  displayHeaderFooter: true, headerTemplate: HEAD, footerTemplate: FOOT,
  marginTop: 0.55, marginBottom: 0.55, marginLeft: 0, marginRight: 0,
});
writeFileSync(outPath, Buffer.from(data, 'base64'));
ws.close(); chrome.kill('SIGKILL');
console.log('yazildi:', outPath);
