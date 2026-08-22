/**
 * Instagram carousel üreticisi.
 *
 * Bir ürün için 1080x1080 slayt seti üretir. Tasarım siteyle aynı kimliği
 * kullanır: beyaz zemin, ZPHC mavisi (#0072bc), Helvetica/Arial.
 *
 * KURAL: Slayt metinleri sitedeki kurallara tabidir. Doz, kullanım şekli,
 * süre veya "şunu alın" yönlendirmesi YOK. Etkinlik ifadeleri kanıt
 * düzeyini yansıtan fiillerle verilir ("araştırılıyor", "gösterildi").
 * Kanıt seviyesi slaydı bilerek var: eksik bırakılırsa gönderi, sitenin
 * dürüstlük çizgisiyle çelişir.
 *
 * Kullanım:
 *   node scripts/instagram/slides.mjs bpc157
 *   node scripts/instagram/slides.mjs            (tüm setler)
 *
 * Çıktı: scripts/instagram/out/<set>/01.png ...
 */
import { chromium } from "playwright"
import { readFileSync, mkdirSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, "../..")

const BLUE = "#0072bc"
const INK = "#0d1b2a"
const MUTED = "rgba(13,27,42,0.62)"

/** Görseli data URI'ye çevirir; tarayıcıya dosya yolu vermeye gerek kalmaz. */
function img(relPath) {
  const buf = readFileSync(resolve(ROOT, "public", relPath))
  const ext = relPath.endsWith(".png") ? "png" : "webp"
  return `data:image/${ext};base64,${buf.toString("base64")}`
}

const LOGO = img("brand/zphc-logo.png")

/* ---------------------------------------------------------------- setler */

export const sets = {
  bpc157: {
    product: "products/bpc157-25mg-5x5mg-zphc.webp",
    slides: [
      { type: "hook", kicker: "BPC-157", title: "Nedir, ne için araştırılıyor?" },
      {
        type: "text",
        heading: "Nereden geliyor",
        body: "Mide salgısında doğal olarak bulunan bir proteinden türetilmiş, 15 aminoasitlik bir peptid.",
      },
      {
        type: "text",
        heading: "Ne üzerine çalışılıyor",
        body: "Tendon, bağ ve kas dokusunun onarımı. Hayvan çalışmalarında damarlanma ve doku iyileşmesi üzerinde olumlu sonuçlar alındı.",
      },
      {
        type: "evidence",
        heading: "Kanıt seviyesi",
        body: "Mekanizması iyi tanımlı, ancak geniş ölçekli insan çalışması henüz yapılmadı. Bunu saklamıyoruz; sitede her bileşiğin kanıt kademesi açıkça yazılı.",
      },
      {
        type: "verify",
        heading: "Aldığınız ürün orijinal mi?",
        body: "Kutudaki gümüş bandı kazıyın, çıkan kodu validation.zphc.com adresine girin. Cevabı satıcıdan değil, doğrudan üreticiden alırsınız.",
      },
      { type: "cta", heading: "ZPHC Türkiye", body: "Resmi distribütör" },
    ],
  },

  dogrulama: {
    product: "products/tb500-25mg-5x5mg-zphc.webp",
    slides: [
      { type: "hook", kicker: "ORİJİNALLİK", title: "Elinizdeki ZPHC gerçek mi?" },
      {
        type: "text",
        heading: "Kutuda ne var",
        body: "Her ZPHC kutusunda gümüş bir bant bulunur. Kazıdığınızda altından o ürüne özel bir kod çıkar.",
      },
      {
        type: "verify",
        heading: "Kodu üreticiye sorun",
        body: "Kodu validation.zphc.com adresine girin. Sorgu bizim sitemizde değil, üreticinin sunucusunda yapılır.",
      },
      {
        type: "text",
        heading: "Sonuç ne diyor",
        body: "Kod tanınmıyorsa ürün ZPHC değildir. Tanınıyor ama daha önce sorgulanmış görünüyorsa dikkatli olun.",
      },
      {
        type: "evidence",
        heading: "Kodu kazımadan önce",
        body: "Bant zaten kazınmışsa kötü işarettir; kodu sizden önce biri görmüş demektir. Mühür kırıksa ürünü kullanmayın.",
      },
      { type: "cta", heading: "ZPHC Türkiye", body: "Resmi distribütör" },
    ],
  },
}

/* ------------------------------------------------------------- şablonlar */

const base = `
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1080px; height:1080px; font-family: Helvetica, Arial, sans-serif;
         background:#fff; color:${INK}; overflow:hidden; }
  .slide { width:1080px; height:1080px; padding:88px; display:flex;
           flex-direction:column; position:relative; }
  .logo { width:200px; height:auto; display:block; }
  .foot { position:absolute; left:88px; right:88px; bottom:72px;
          display:flex; justify-content:space-between; align-items:center;
          font-size:26px; color:${MUTED}; }
  .num { font-variant-numeric:tabular-nums; }
  .kicker { font-size:30px; font-weight:700; letter-spacing:.14em;
            color:${BLUE}; text-transform:uppercase; }
  h1 { font-size:96px; line-height:1.06; letter-spacing:-.02em; font-weight:700; }
  h2 { font-size:62px; line-height:1.12; letter-spacing:-.015em; font-weight:700; }
  p  { font-size:40px; line-height:1.45; color:${MUTED}; font-weight:400; }
  .rule { width:120px; height:8px; background:${BLUE}; border-radius:99px; }
  .band { background:${BLUE}; color:#fff; }
  .band h2, .band p { color:#fff; }
  .band p { color:rgba(255,255,255,.9); }
  .pill { display:inline-block; background:${BLUE}; color:#fff; font-size:30px;
          font-weight:700; padding:16px 34px; border-radius:99px; }
  .shot { flex:1; display:flex; align-items:center; justify-content:center; }
  .shot img { max-width:100%; max-height:100%; object-fit:contain; }
`

function render(slide, i, total, productImg) {
  const foot = `<div class="foot"><span>zphctr.com</span><span class="num">${i + 1}/${total}</span></div>`

  if (slide.type === "hook") {
    return `<div class="slide">
      <img class="logo" src="${LOGO}">
      <div style="margin-top:46px">
        <div class="kicker">${slide.kicker}</div>
        <h1 style="margin-top:16px">${slide.title}</h1>
        <div class="rule" style="margin-top:32px"></div>
      </div>
      <div class="shot" style="margin-top:24px;max-height:430px"><img src="${productImg}"></div>
      ${foot}</div>`
  }

  if (slide.type === "cta") {
    return `<div class="slide band" style="justify-content:center;align-items:flex-start">
      <h1 style="color:#fff">${slide.heading}</h1>
      <p style="margin-top:24px;font-size:46px">${slide.body}</p>
      <div style="margin-top:56px;background:#fff;color:${BLUE};font-size:34px;
                  font-weight:700;padding:20px 44px;border-radius:99px">zphctr.com</div>
      <p style="margin-top:40px;font-size:30px">Fiyat ve stok için WhatsApp&#39;tan yazın.</p>
      </div>`
  }

  const accent =
    slide.type === "verify" ? BLUE : slide.type === "evidence" ? "#b26a00" : BLUE

  return `<div class="slide">
    <img class="logo" src="${LOGO}">
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:60px">
      <div class="rule" style="background:${accent}"></div>
      <h2 style="margin-top:34px">${slide.heading}</h2>
      <p style="margin-top:30px">${slide.body}</p>
    </div>
    ${foot}</div>`
}

/* ----------------------------------------------------------------- çalış */

async function build(name) {
  const set = sets[name]
  if (!set) throw new Error(`Set yok: ${name}`)
  const productImg = img(set.product)
  const outDir = resolve(HERE, "out", name)
  mkdirSync(outDir, { recursive: true })

  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  })
  const page = await (
    await browser.newContext({ viewport: { width: 1080, height: 1080 } })
  ).newPage()

  for (let i = 0; i < set.slides.length; i++) {
    const html = `<html><head><style>${base}</style></head><body>${render(
      set.slides[i],
      i,
      set.slides.length,
      productImg,
    )}</body></html>`
    await page.setContent(html, { waitUntil: "load" })
    const file = `${outDir}/${String(i + 1).padStart(2, "0")}.png`
    await page.screenshot({ path: file })
    console.log("  ", file)
  }
  await browser.close()
}

const arg = process.argv[2]
const names = arg ? [arg] : Object.keys(sets)
for (const n of names) {
  console.log(`\n${n}:`)
  await build(n)
}
