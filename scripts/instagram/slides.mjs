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
      /* Kurgu: önce merak uyandıran bir soru, sonra ne için araştırıldığı,
         sonra mekanizma. Kapak sorusu bilerek mekanizmayı hazırlıyor;
         tendonun yavaş iyileşme nedeni de, BPC-157 araştırmalarının
         odaklandığı yol da aynı yere, damarlanmaya çıkıyor. */
      {
        type: "hook",
        kicker: "BPC-157",
        title: "Kırık kemik altı haftada kaynıyor. Tendon iyileşmesi neden aylar alıyor?",
        sub: "BPC-157 araştırmaları tam olarak bu soruya bakıyor.",
      },
      {
        type: "text",
        heading: "Cevap kanlanmada",
        body: "Kemik yoğun bir damar ağıyla beslenir, onarım hücreleri bölgeye hızla ulaşır. Tendon ve bağ dokusunda ise damarlanma azdır. Gerekli hücreler ve besin bölgeye yeterince ulaşamadığı için iyileşme uzar.",
      },
      {
        type: "text",
        heading: "BPC-157 nedir",
        body: "Açılımı Body Protection Compound. Mide özsuyunda doğal olarak bulunan bir proteinin 15 aminoasitlik parçası. 1990'larda Zagreb Üniversitesi'nde tanımlandı.",
      },
      {
        type: "stat",
        big: "15",
        unit: "aminoasit",
        body: "Kısa bir zincir. Peptidlerin çoğu mide asidinde parçalanırken BPC-157 bu ortamda bozulmadan kalıyor. Literatürde “stabil gastrik pentadekapeptid” olarak geçmesinin nedeni bu.",
      },
      {
        type: "list",
        heading: "Hangi yaralanmalarda araştırıldı",
        items: [
          "Aşil tendonu kesisi",
          "Diz iç yan bağı (MCL) hasarı",
          "Kas ezilmesi ve yırtığı",
          "Mide ve bağırsak mukoza hasarı",
        ],
      },
      {
        type: "text",
        heading: "Ne ölçüldü",
        body: "Hayvan modellerinde kesilen tendonun onarım süresi, bağ dokusunun kopmadan taşıdığı yük ve ezilen kasın toparlanma derecesi ölçüldü. Kontrol gruplarıyla karşılaştırıldığında fark bildirildi.",
      },
      {
        type: "text",
        heading: "Mekanizma: yeni damar",
        body: "Öne çıkan açıklama anjiyogenez, yani yaralı bölgede yeni kılcal damar oluşumu. BPC-157'nin damar endotel büyüme faktörü (VEGF) reseptör yolağını harekete geçirdiği bildirildi. Damarlanması zaten az olan bir dokuda bu yol doğrudan sorunun kaynağına denk geliyor.",
      },
      {
        type: "text",
        heading: "İkinci basamak: hücre göçü",
        body: "Damar tek başına yetmez, tendon dokusunu yeniden üreten fibroblastların yara yerine ulaşması gerekir. Hücre kültürü çalışmalarında BPC-157'nin bu göçü ve hücrelerin yüzeye tutunmasını artırdığı gözlendi.",
      },
      {
        type: "text",
        heading: "BPC-157 ile TB-500 farkı",
        body: "İkisi de doku onarımı üzerine araştırılıyor ama farklı yollardan. BPC-157'de öne çıkan yol damarlanma. TB-500 ise timosin beta-4 proteininin bir parçası ve aktin proteinine bağlanarak hücre hareketini etkiliyor. Literatürde sık sık yan yana anılmalarının nedeni bu.",
      },
      {
        type: "evidence",
        heading: "İnsan verisi var mı",
        body: "Yayınların büyük çoğunluğu sıçan ve fare modelleri üzerinde yapıldı. İnsanda yapılmış geniş ölçekli çalışma yok. BPC-157 bu nedenle onaylı bir ilaç değil, araştırma materyali olarak sınıflandırılıyor.",
      },
      {
        type: "verify",
        heading: "Elinizdeki ürün orijinal mi",
        body: "Kutudaki gümüş bandı kazıyın, altından çıkan kodu validation.zphc.com adresine girin. Sonucu biz vermiyoruz, doğrudan üretici veriyor.",
      },
      { type: "cta", heading: "ZPHC Türkiye", body: "Resmi distribütör" },
    ],
  },

  dogrulama: {
    product: "products/tb500-25mg-5x5mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "ORİJİNALLİK",
        title: "Elinizdeki ZPHC gerçek mi?",
        sub: "Satıcıya sormadan kendiniz kontrol edebilirsiniz.",
      },
      {
        type: "text",
        heading: "Kutuda ne var",
        body: "Her ZPHC kutusunda gümüş bir bant bulunur. Kazıdığınızda altından o ürüne özel bir doğrulama kodu çıkar. Kod harf, rakam ve özel karakterlerden oluşur.",
      },
      {
        type: "verify",
        heading: "Kodu üreticiye sorun",
        body: "Kodu validation.zphc.com adresine yazıp Check düğmesine basın. Sorgu bizim sitemizde değil, ZPHC'nin kendi sunucusunda yapılır.",
      },
      {
        type: "list",
        heading: "Üç sonuç çıkabilir",
        items: [
          "Kod tanındı ve ilk sorgu: orijinal",
          "Kod tanınmadı: ZPHC üretimi değil",
          "Daha önce sorgulanmış: dikkatli olun",
        ],
      },
      {
        type: "evidence",
        heading: "Kazımadan önce bakın",
        body: "Bant zaten kazınmışsa bu kötü bir işarettir, kodu sizden önce biri görmüş demektir. Mühür kırık veya ambalaj zedelenmişse ürünü kullanmayın.",
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
  /* width:100% şart. Sadece max-width verilince görsel kendi piksel
     boyutunda kalıyor ve 1080'lik karede kaybolacak kadar küçük duruyordu. */
  .shot img { width:100%; max-height:100%; object-fit:contain; }
  .sub { font-size:34px; color:${MUTED}; font-weight:500; }
  .big { font-size:280px; line-height:.9; font-weight:700; letter-spacing:-.04em;
         color:${BLUE}; }
  .unit { font-size:44px; font-weight:700; color:${INK}; letter-spacing:-.01em; }
  ul { list-style:none; }
  li { display:flex; align-items:flex-start; gap:26px; padding:26px 0;
       border-top:2px solid rgba(13,27,42,.10); font-size:40px;
       line-height:1.3; font-weight:500; }
  li:last-child { border-bottom:2px solid rgba(13,27,42,.10); }
  .dot { flex:none; width:18px; height:18px; border-radius:99px;
         background:${BLUE}; margin-top:16px; }
`

function render(slide, i, total, productImg) {
  const foot = `<div class="foot"><span>zphctr.com</span><span class="num">${i + 1}/${total}</span></div>`

  if (slide.type === "hook") {
    return `<div class="slide">
      <img class="logo" src="${LOGO}">
      <div style="margin-top:40px">
        <div class="kicker">${slide.kicker}</div>
        <h1 style="margin-top:16px;font-size:70px">${slide.title}</h1>
        ${slide.sub ? `<p class="sub" style="margin-top:22px">${slide.sub}</p>` : ""}
      </div>
      <div class="shot" style="margin-top:8px;max-height:330px"><img src="${productImg}"></div>
      ${foot}</div>`
  }

  /* Sayı slaydı. Karusel boyunca hep aynı düzen aktığında insan kaydırmayı
     bırakıyor; ritmi kıran tek bir görsel duraklama işe yarıyor. */
  if (slide.type === "stat") {
    return `<div class="slide">
      <img class="logo" src="${LOGO}">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:60px">
        <div class="big">${slide.big}</div>
        <div class="unit" style="margin-top:10px">${slide.unit}</div>
        <p style="margin-top:36px">${slide.body}</p>
      </div>
      ${foot}</div>`
  }

  if (slide.type === "list") {
    return `<div class="slide">
      <img class="logo" src="${LOGO}">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:60px">
        <div class="rule"></div>
        <h2 style="margin-top:34px">${slide.heading}</h2>
        <ul style="margin-top:38px">
          ${slide.items
            .map((it) => `<li><span class="dot"></span><span>${it}</span></li>`)
            .join("")}
        </ul>
      </div>
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

  /* Renk, slaydın ne söylediğini önceden haber veriyor: kanıt seviyesi
     amber, geri kalanı marka mavisi. */
  const accent = slide.type === "evidence" ? "#b26a00" : BLUE

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

/**
 * Görselin çevresindeki beyaz boşluğu kırpar.
 *
 * Katalog görselleri 900x900 karede duruyor ama ürünün kendisi o karenin
 * ortasındaki küçük bir alanı kaplıyor (BPC-157'de 704x409). Kırpmadan
 * bastığımızda slaytta ürün minicik kalıyordu, çünkü kutuyu değil kutunun
 * içinde durduğu boşluğu ölçeklendiriyorduk.
 */
async function trim(page, dataUri) {
  return page.evaluate(async (src) => {
    const im = new Image()
    im.src = src
    await im.decode()
    const c = document.createElement("canvas")
    c.width = im.naturalWidth
    c.height = im.naturalHeight
    const ctx = c.getContext("2d")
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, c.width, c.height)
    ctx.drawImage(im, 0, 0)
    const d = ctx.getImageData(0, 0, c.width, c.height).data
    let x0 = c.width, y0 = c.height, x1 = 0, y1 = 0
    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        const o = (y * c.width + x) * 4
        if (d[o] < 245 || d[o + 1] < 245 || d[o + 2] < 245) {
          if (x < x0) x0 = x
          if (x > x1) x1 = x
          if (y < y0) y0 = y
          if (y > y1) y1 = y
        }
      }
    }
    if (x1 <= x0 || y1 <= y0) return src
    const pad = 8
    x0 = Math.max(0, x0 - pad)
    y0 = Math.max(0, y0 - pad)
    x1 = Math.min(c.width - 1, x1 + pad)
    y1 = Math.min(c.height - 1, y1 + pad)
    const w = x1 - x0 + 1
    const h = y1 - y0 + 1
    const out = document.createElement("canvas")
    out.width = w
    out.height = h
    const o2 = out.getContext("2d")
    o2.fillStyle = "#fff"
    o2.fillRect(0, 0, w, h)
    o2.drawImage(im, x0, y0, w, h, 0, 0, w, h)
    return out.toDataURL("image/png")
  }, dataUri)
}

async function build(name) {
  const set = sets[name]
  if (!set) throw new Error(`Set yok: ${name}`)
  const outDir = resolve(HERE, "out", name)
  mkdirSync(outDir, { recursive: true })

  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  })
  const page = await (
    await browser.newContext({ viewport: { width: 1080, height: 1080 } })
  ).newPage()

  await page.setContent("<html><body></body></html>")
  const productImg = await trim(page, img(set.product))

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
