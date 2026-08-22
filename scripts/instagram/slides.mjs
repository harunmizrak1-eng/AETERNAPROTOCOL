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
import { readFileSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, "../..")

const BLUE = "#0072bc"
const INK = "#0d1b2a"
/* Gövde metni rengi. Eskiden %62 saydam siyahtı ve 1080'lik karede
   telefondan okurken göz yoruyordu; düz koyu bir maviye çevrildi. */
const MUTED = "#33475b"

/** Görseli data URI'ye çevirir; tarayıcıya dosya yolu vermeye gerek kalmaz. */
function img(relPath) {
  const buf = readFileSync(resolve(ROOT, "public", relPath))
  const ext = relPath.endsWith(".png") ? "png" : "webp"
  return `data:image/${ext};base64,${buf.toString("base64")}`
}

const LOGO = img("brand/zphc-logo.png")

/* Manrope, iki alt küme halinde gömülü. latinext kümesi ş, ğ, İ gibi
   Türkçe harfleri taşıyor; yalnız latin kümesi yüklenirse bu harfler
   yedek yazı tipinden gelir ve satır içinde karakter karışır. */
const font = (name) =>
  readFileSync(resolve(HERE, "fonts", name)).toString("base64")
const FONT_LATIN = font("manrope-latin.woff2")
const FONT_EXT = font("manrope-latinext.woff2")

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
        title: "Kemik altı haftada iyileşir. Tendon yırtığı neden aylarca geçmez?",
        sub: "Sebebi damarlarla ilgili.",
      },
      {
        type: "text",
        heading: "Sebep damar sayısı",
        body: "Kemiğin içi damarla doludur. Kanla gelen onarım hücreleri yaralı yere hemen ulaşır. Tendonda ve bağda ise damar çok azdır. Hücreler oraya zor gider, iyileşme de bu yüzden uzar.",
      },
      {
        type: "text",
        heading: "BPC-157 nedir?",
        body: "Midenin salgıladığı sıvıda doğal olarak bulunan bir proteinin küçük bir parçasıdır. 15 aminoasitten oluşur. İlk kez 1990'larda Zagreb Üniversitesi'ndeki bir ekip ayırıp inceledi.",
      },
      {
        type: "stat",
        big: "15",
        unit: "aminoasit",
        body: "Peptidlerin çoğu mide asidine dayanamaz, parçalanır. BPC-157 parçalanmaz. Zaten midede bulunan bir proteinden geldiği için oranın şartlarına dayanıklıdır.",
      },
      {
        type: "list",
        heading: "Hangi sakatlıklarda denendi?",
        items: [
          "Aşil tendonu kesikleri",
          "Diz iç yan bağı yırtıkları",
          "Ezilmiş ve yırtılmış kaslar",
          "Mide ve bağırsak yaraları",
        ],
      },
      {
        type: "text",
        heading: "Peki ne sonuç aldılar?",
        body: "Kesilen tendonun kaç günde onarıldığına, bağın kopmadan ne kadar yük taşıdığına ve ezilen kasın ne kadar düzeldiğine baktılar. Hiçbir şey verilmeyen gruplara göre daha iyi sonuçlar bildirdiler.",
      },
      {
        type: "text",
        heading: "Nasıl işe yarıyor olabilir?",
        body: "En çok kabul gören açıklama şu: BPC-157 yaralı bölgede yeni kılcal damarlar oluşmasını tetikliyor. Buna anjiyogenez deniyor. Damarı zaten az olan tendon için tam da eksik olan şey bu.",
      },
      {
        type: "text",
        heading: "Tek başına damar yetmiyor",
        body: "Tendonu onaran hücrelere fibroblast deniyor. Bunların yara yerine gidip oraya tutunması gerekiyor. Laboratuvar çalışmalarında BPC-157'nin bu iki işi de hızlandırdığı görüldü.",
      },
      {
        type: "text",
        heading: "BPC-157 mi, TB-500 mü?",
        body: "İkisi de iyileşme üzerine çalışılıyor ama işleyişleri farklı. BPC-157 damar yapımını öne çıkarıyor. TB-500 ise hücrelerin hareket etmesini kolaylaştırıyor. Yani birbirinin yerine geçen değil, ayrı iki bileşik.",
      },
      {
        type: "evidence",
        heading: "İnsanlarda denendi mi?",
        body: "Çalışmaların neredeyse hepsi fare ve sıçanlarda yapıldı. İnsanlar üzerinde geniş çaplı bir araştırma yok. BPC-157 bu yüzden ilaç sayılmıyor, araştırma ürünü olarak satılıyor.",
      },
      {
        type: "verify",
        heading: "Ürünün gerçek olduğu nasıl anlaşılır?",
        body: "Kutunun üstündeki gümüş bant kazınır, altından çıkan kod validation.zphc.com adresine yazılır. Cevabı biz değil, ürünü üreten firma verir.",
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
        heading: "Kutunun üstünde ne var?",
        body: "Her ZPHC kutusunda gümüş renkli bir bant vardır. Kazıdığınızda altından o ürüne ait bir kod çıkar. Kod harflerden, rakamlardan ve işaretlerden oluşur.",
      },
      {
        type: "verify",
        heading: "Kod nereye yazılıyor?",
        body: "Kod validation.zphc.com adresindeki kutuya yazılır ve Check düğmesine basılır. Bu sorgu bizim sitemizde değil, ZPHC'nin kendi sisteminde yapılır.",
      },
      {
        type: "list",
        heading: "Karşınıza üç sonuç çıkabilir",
        items: [
          "Tanındı, ilk kez soruluyor: gerçek",
          "Hiç tanınmadı: ürün ZPHC değil",
          "Daha önce sorulmuş: dikkat edin",
        ],
      },
      {
        type: "evidence",
        heading: "Bant zaten kazınmışsa?",
        body: "Bu kötüye işarettir, kodu sizden önce başkası görmüş demektir. Kutunun mührü kırıksa da ürün kullanılmamalı.",
      },
      { type: "cta", heading: "ZPHC Türkiye", body: "Resmi distribütör" },
    ],
  },
}

/* ------------------------------------------------------------- şablonlar */

/* Tasarım yönü B: her slaydın üstünde ZPHC mavisi bir blok, altında beyaz
   içerik alanı. Kapakta blok büyük ve başlığı taşıyor; iç slaytlarda ince
   bir şerit olup yalnızca logoyu taşıyor. Blok, karusel boyunca sabit
   kalan tek görsel unsur; akışta kimlik onunla kuruluyor.

   Yazı tipi Manrope. Sitenin Helvetica/Arial yığını ekranda iyi ama
   1080'lik karede gövde metni soluk ve yorucu duruyordu. Manrope'un
   harf gözleri daha açık, kalın kesimi daha güçlü. Dosyalar fonts/
   klasöründe gömülü, üretim internet bağlantısı istemiyor. */

const base = `
  @font-face { font-family:'Manrope'; font-weight:200 800; font-display:block;
    src:url(data:font/woff2;base64,${FONT_EXT}) format('woff2');
    unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF; }
  @font-face { font-family:'Manrope'; font-weight:200 800; font-display:block;
    src:url(data:font/woff2;base64,${FONT_LATIN}) format('woff2');
    unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD; }

  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1080px; height:1080px; background:#fff; color:${INK};
         font-family:'Manrope', Helvetica, Arial, sans-serif; overflow:hidden; }
  .slide { width:1080px; height:1080px; display:flex; flex-direction:column;
           position:relative; }

  /* mavi blok */
  .band { background:${BLUE}; color:#fff; padding:80px; display:flex;
          flex-direction:column; }
  .strip { background:${BLUE}; padding:70px 80px 58px; flex:none; }
  .logo { width:190px; height:auto; display:block; filter:brightness(0) invert(1); }

  /* içerik */
  .body-area { flex:1; min-height:0; display:flex; flex-direction:column;
               justify-content:center; padding:56px 80px 120px; }
  .kicker { font-size:28px; font-weight:800; letter-spacing:.16em;
            text-transform:uppercase; color:rgba(255,255,255,.82); }
  h1 { font-size:70px; line-height:1.1; letter-spacing:-.025em; font-weight:800; }
  h2 { font-size:62px; line-height:1.1; letter-spacing:-.025em; font-weight:800; }
  p  { font-size:42px; line-height:1.5; font-weight:500; color:${MUTED}; }
  .sub { font-size:32px; font-weight:600; color:rgba(255,255,255,.85); }
  .rule { width:110px; height:9px; border-radius:99px; background:${BLUE}; }

  .foot { position:absolute; left:80px; right:80px; bottom:60px; display:flex;
          justify-content:space-between; font-size:26px; font-weight:600;
          color:#8494a2; }
  .num { font-variant-numeric:tabular-nums; }

  /* Ürün kartı BEYAZ, altındaki alan gri. Tersi denendi ve olmadı:
     katalog fotoğraflarının kendi zemini beyaz olduğu için gri kartın
     ortasında keskin kenarlı bir beyaz dikdörtgen çıkıyordu. Kart beyaz
     olunca fotoğrafın zemini kartla birleşiyor, gri alan da kartı
     kasıtlı bir nesne gibi çerçeveliyor. */
  .shelf { flex:1; min-height:0; display:flex; background:#eef3f8;
           padding:56px 80px 116px; }
  .card { background:#fff; border-radius:24px; padding:30px; width:100%;
          height:100%; display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 24px rgba(13,27,42,.07); }
  .card img { width:100%; max-height:100%; object-fit:contain; }

  .big { font-size:260px; line-height:.86; font-weight:800;
         letter-spacing:-.045em; color:${BLUE}; }
  .unit { font-size:46px; font-weight:800; letter-spacing:-.02em; color:${INK}; }

  ul { list-style:none; }
  li { display:flex; align-items:flex-start; gap:26px; padding:28px 0;
       border-top:2px solid rgba(13,27,42,.12); font-size:42px;
       line-height:1.25; font-weight:600; color:${INK}; }
  li:last-child { border-bottom:2px solid rgba(13,27,42,.12); }
  .dot { flex:none; width:18px; height:18px; border-radius:99px;
         background:${BLUE}; margin-top:16px; }
`

function render(slide, i, total, productImg) {
  const foot = `<div class="foot"><span>zphctr.com</span><span class="num">${i + 1}/${total}</span></div>`
  const strip = `<div class="strip"><img class="logo" src="${LOGO}"></div>`

  if (slide.type === "hook") {
    return `<div class="slide">
      <div class="band">
        <img class="logo" src="${LOGO}">
        <div class="kicker" style="margin-top:34px">${slide.kicker}</div>
        <h1 style="margin-top:14px">${slide.title}</h1>
        ${slide.sub ? `<div class="sub" style="margin-top:18px">${slide.sub}</div>` : ""}
      </div>
      <div class="shelf"><div class="card"><img src="${productImg}"></div></div>
      ${foot}</div>`
  }

  if (slide.type === "cta") {
    return `<div class="slide band" style="justify-content:center">
      <img class="logo" src="${LOGO}" style="position:absolute;top:80px;left:80px">
      <h1>${slide.heading}</h1>
      <div class="sub" style="margin-top:20px;font-size:42px">${slide.body}</div>
      <div style="margin-top:52px;align-self:flex-start;background:#fff;color:${BLUE};
                  font-size:34px;font-weight:800;padding:20px 44px;border-radius:99px">zphctr.com</div>
      <div class="sub" style="margin-top:38px;font-size:30px">Fiyat ve stok için WhatsApp&#39;tan yazabilirsiniz.</div>
      </div>`
  }

  /* Sayı slaydı. Karusel boyunca hep aynı düzen aktığında insan kaydırmayı
     bırakıyor; ritmi kıran tek bir görsel duraklama işe yarıyor. */
  if (slide.type === "stat") {
    return `<div class="slide">${strip}
      <div class="body-area">
        <div class="big">${slide.big}</div>
        <div class="unit" style="margin-top:8px">${slide.unit}</div>
        <p style="margin-top:34px">${slide.body}</p>
      </div>
      ${foot}</div>`
  }

  if (slide.type === "list") {
    return `<div class="slide">${strip}
      <div class="body-area">
        <div class="rule"></div>
        <h2 style="margin-top:30px">${slide.heading}</h2>
        <ul style="margin-top:34px">
          ${slide.items
            .map((it) => `<li><span class="dot"></span><span>${it}</span></li>`)
            .join("")}
        </ul>
      </div>
      ${foot}</div>`
  }

  /* Renk, slaydın ne söylediğini önceden haber veriyor: kanıt seviyesi
     amber, geri kalanı marka mavisi. */
  const accent = slide.type === "evidence" ? "#b26a00" : BLUE

  return `<div class="slide">${strip}
    <div class="body-area">
      <div class="rule" style="background:${accent}"></div>
      <h2 style="margin-top:30px;color:${accent === BLUE ? INK : accent}">${slide.heading}</h2>
      <p style="margin-top:28px">${slide.body}</p>
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
    /* Gömülü yazı tipi çözülmeden ekran görüntüsü alınırsa slaytlar yedek
       Arial ile basılıyor. */
    await page.evaluate(() => document.fonts.ready)
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
