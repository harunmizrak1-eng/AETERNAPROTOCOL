/**
 * Instagram carousel üreticisi.
 *
 * Bir konu için 1080x1080 slayt seti üretir. Tasarım: üstte ZPHC mavisi
 * blok, altında beyaz içerik alanı, yazı tipi Manrope.
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
/* Sitedeki bileşik kütüphanesinin ta kendisi. Node 22 tip bildirimlerini
   çalıştırma anında sıyırdığı için .ts dosyası doğrudan içe aktarılabiliyor,
   ayrı bir derleme adımına gerek yok. */
import { peptides, tierLabel } from "../../lib/peptides.ts"

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

/* KURAL 1: Bileşik bilgisi buraya elle yazılmaz. lib/peptides.ts sitedeki
   kütüphanenin kaynağıdır ve slaytlar oradan beslenir. Elle yazılsaydı
   site bir şey, Instagram başka bir şey söylerdi; kütüphane güncellenince
   slaytlar sessizce yanlışa düşerdi.

   KURAL 2: Slayt başına en fazla iki kısa cümle. Karusel telefonda ve
   parmakla okunuyor, paragraf koyunca kimse okumuyor. Uzun anlatım
   gönderi açıklamasında (aciklamalar.md) durur.

   KURAL 3: Doz slayta girmez. Kütüphanede doz tabloları var ama Instagram
   bu kategoride doz paylaşan hesapları kapatıyor. */

const peptide = (slug) => {
  const p = peptides.find((x) => x.slug === slug)
  if (!p) throw new Error(`Kütüphanede yok: ${slug}`)
  return p
}

/* Zincir uzunlukları. "En kısa peptid GHK-Cu" diye elle yazmıştım ve
   yanlıştı: kütüphanede iki aminoasitlik CGP var. Bu yüzden uç değerler
   artık kütüphaneden hesaplanıyor. */
const chains = peptides
  .map((p) => ({ name: p.name, n: parseInt(p.molecular?.chain ?? "", 10) }))
  .filter((x) => Number.isFinite(x.n))
  .sort((a, b) => a.n - b.n)
const shortest = chains[0]
const longest = chains[chains.length - 1]

/* Kanıt kademesinin sade karşılığı. Kütüphane kademeyi etiketliyor ama
   "Mekanistik / Teorik" ifadesi tek başına kimseye bir şey anlatmıyor. */
const tierGloss = {
  proven: "İnsanlarda kontrollü çalışma yapılmış. Kütüphanedeki en üst kademe bu.",
  theoretical:
    "Nasıl çalıştığı biliniyor ama insanlarda geniş çaplı çalışma yapılmamış.",
  preclinical:
    "Henüz hücre ve hayvan aşamasında. İnsan verisi yok denecek kadar az.",
}

/**
 * Bir bileşik seti kurar.
 *
 * Kapak başlığı ve sade karşılıklar elle verilir, geri kalan her şey
 * kütüphaneden gelir. Kurgu şu: önce kütüphanenin kendi bilimsel cümlesi,
 * hemen ardından aynı şeyin günlük dildeki karşılığı. Terimi atarsak
 * gönderi sığlaşıyor, açıklamazsak kimse anlamıyor.
 *
 * Aminoasit dizilimi ve molekül ağırlığı slaytları KALDIRILDI. Doğru
 * bilgilerdi ama kimsenin sorduğu şey değildi. Yerlerine kütüphanenin
 * insanların gerçekten merak ettiği iki alanı geldi: beklenen seyir ve
 * iyi ürünün nasıl göründüğü.
 */
function compoundSet({ slug, product, kicker, title, sub, gloss = {} }) {
  const p = peptide(slug)

  const slides = [
    { type: "hook", kicker, title, sub },
    { type: "text", heading: "Nedir?", body: p.short },
  ]

  if (gloss.nedir) {
    slides.push({ type: "text", heading: "Sade haliyle", body: gloss.nedir })
  }

  slides.push({ type: "text", heading: "Nasıl çalışıyor?", body: p.mechanism })

  if (gloss.mekanizma) {
    slides.push({ type: "text", heading: "Sade haliyle", body: gloss.mekanizma })
  }

  slides.push({ type: "list", heading: "Ne bildiriliyor?", items: p.primaryOutcomes })

  /* Beklenen seyir. Gelen ilk soru neredeyse her zaman "ne zaman etkisini
     gösterir" oluyor. Dördü geçince slayt okunmaz hale geliyor, o yüzden
     ilk dört dönem alınıyor. */
  if (p.expectedTimeline?.length) {
    slides.push({
      type: "timeline",
      heading: "Ne zaman ne bekleniyor?",
      rows: p.expectedTimeline.slice(0, 4),
    })
  }

  slides.push({
    type: "evidence",
    heading: "Kanıt durumu",
    body: `${p.clinicalStatus}. ${tierGloss[p.tier]}`,
  })

  /* Kalite işaretleri. Sahte ürün endişesi bu pazarda birinci sırada ve
     bu slayt onu doğrudan karşılıyor. */
  if (p.qualityIndicators?.good?.length) {
    slides.push({
      type: "list",
      heading: "İyi ürün nasıl görünür?",
      items: p.qualityIndicators.good.slice(0, 4),
    })
  }

  slides.push({ type: "cta", heading: "ZPHC Türkiye", body: "Resmi distribütör" })

  return { product, slides }
}

export const sets = {
  bpc157: compoundSet({
    slug: "bpc-157",
    product: "products/bpc157-25mg-5x5mg-zphc.webp",
    kicker: "BPC-157",
    title: "Kemik altı haftada iyileşir. Tendon yırtığı neden aylarca geçmez?",
    sub: "Sebebi damarlarla ilgili.",
    gloss: {
      nedir:
        "Pentadekapeptid, on beş aminoasitlik zincir demek. Gastrik mukoza da midenin iç yüzeyi. Yani bu molekül midede zaten bulunuyor.",
      mekanizma:
        "Anjiyogenez, yaralı bölgede yeni kılcal damar oluşması demek. Tendonda damar az olduğu için iyileşme yavaştır, buradaki fikir o eksiği kapatmak.",
    },
  }),

  tb500: compoundSet({
    slug: "tb-500",
    product: "products/tb500-25mg-5x5mg-zphc.webp",
    kicker: "TB-500",
    title: "TB-500 neden hep BPC-157 ile birlikte anılıyor?",
    sub: "İkisi de onarım üzerine, ama ayrı yollardan.",
    gloss: {
      nedir:
        "Thymosin Beta-4 vücutta zaten bulunan bir protein. TB-500 onun küçük bir parçası, tamamı değil.",
      mekanizma:
        "Aktin, hücrenin içindeki iskelet gibi bir protein. Hücrenin şekil değiştirip yer değiştirmesini o sağlıyor. Yara yerine hücre taşınması bu yüzden ona bağlı.",
    },
  }),

  ghkcu: compoundSet({
    slug: "ghk-cu",
    product: "products/ghk-cu-60mg-with-bacteriostatic-water-zphc.webp",
    kicker: "GHK-Cu",
    title: "Üç aminoasit ve bir bakır iyonu",
    sub: "Kütüphanedeki en kısa bileşiklerden biri.",
    gloss: {
      nedir:
        "Tripeptid, üç aminoasitlik zincir demek. Bu zincir bir bakır iyonunu tutuyor; adındaki Cu zaten bakırın simgesi.",
      mekanizma:
        "Kolajen, cildin ve bağ dokusunun taşıyıcı proteini. Elastin ise dokunun gerilip eski haline dönmesini sağlıyor. İkisi birlikte cildin diriliğini belirliyor.",
    },
  }),

  retatrutide: compoundSet({
    slug: "retatrutide",
    product: "products/retatrutide-60mg-5x12mg-zphc.webp",
    kicker: "RETATRUTIDE",
    title: "Kütüphanedeki bileşiklerin çoğu araştırma aşamasında. Bu değil.",
    sub: "Faz 3 çalışmaları tamamlandı.",
    gloss: {
      nedir:
        "Agonist, bir reseptörü çalıştıran molekül demek. Retatrutide üç ayrı reseptörü aynı anda çalıştırdığı için üçlü agonist deniyor.",
      mekanizma:
        "GLP-1 ve GIP, yemekten sonra bağırsakta salgılanan hormonlar; beyne tokluk sinyali gönderiyorlar. Glukagon ise vücudun harcadığı enerjiyi artırıyor.",
    },
  }),

  peptidnedir: {
    product: "products/ghk-cu-60mg-with-bacteriostatic-water-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "TEMEL",
        title: "Peptid nedir?",
        sub: "Proteinden farkı sadece uzunluk.",
      },
      {
        type: "stat",
        big: String(shortest.n),
        unit: "aminoasit",
        body: `Kütüphanedeki en kısa peptid bu kadar. En uzunu ${longest.n} aminoasitle ${longest.name}.`,
      },
      {
        type: "text",
        heading: "Vücutta zaten var",
        body: "İnsülin de bir peptiddir. Vücut bunları kendisi üretir.",
      },
      {
        type: "text",
        heading: "Neden hap değil?",
        body: "Peptidlerin çoğu mide asidinde parçalanır. Ağızdan alındığında sağlam kalmaz.",
      },
      {
        type: "text",
        heading: "Neden toz halinde?",
        body: "Sıvı halde çabuk bozulurlar. Dondurularak kurutulmuş toz çok daha uzun dayanır.",
      },
      {
        type: "evidence",
        heading: "Hepsi aynı değil",
        body: "Bazısının faz 3 verisi var, bazısı sadece hayvan çalışmasında kaldı. İkisi bir tutulmamalı.",
      },
      { type: "cta", heading: "ZPHC Türkiye", body: "Resmi distribütör" },
    ],
  },

  bilesikler: {
    product: "products/glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "KÜTÜPHANE",
        title: "Hangi bileşiği merak ediyorsanız sayfası var",
        sub: "zphctr.com",
      },
      {
        type: "stat",
        big: String(peptides.length),
        unit: "bileşik",
        body: "Her birinin ne olduğu, nasıl çalıştığı ve kanıtın hangi aşamada olduğu ayrı ayrı yazılı.",
      },
      {
        type: "list",
        heading: "Kanıt üç kademede",
        items: [
          `${tierLabel.proven}: insanda kontrollü çalışma var`,
          `${tierLabel.theoretical}: mekanizma tanımlı, insan verisi zayıf`,
          `${tierLabel.preclinical}: hücre ve hayvan aşamasında`,
        ],
      },
      {
        type: "text",
        heading: "Kademe gizlenmiyor",
        body: "Sattığımız bileşiklerin bir kısmı en alt kademede. Sayfalarında öyle yazıyor.",
      },
      { type: "cta", heading: "zphctr.com", body: "Bileşik kütüphanesi" },
    ],
  },

  dogrulama: {
    product: "products/retatrutide-60mg-5x12mg-zphc.webp",
    slides: [
      {
        type: "hook",
        kicker: "ORİJİNALLİK",
        title: "Elinizdeki ZPHC gerçek mi?",
        sub: "Satıcıya sormadan anlaşılıyor.",
      },
      {
        type: "text",
        heading: "Kutuda gümüş bant",
        body: "Kazıdığınızda altından o ürüne ait bir kod çıkar.",
      },
      {
        type: "verify",
        heading: "Kod nereye yazılır?",
        body: "validation.zphc.com adresine. Sorgu bizde değil, ZPHC'nin kendi sisteminde yapılır.",
      },
      {
        type: "list",
        heading: "Üç sonuç çıkabilir",
        items: [
          "Tanındı, ilk kez soruluyor: gerçek",
          "Hiç tanınmadı: ürün ZPHC değil",
          "Daha önce sorulmuş: dikkat",
        ],
      },
      {
        type: "evidence",
        heading: "Bant zaten kazınmışsa?",
        body: "Kötüye işarettir, kodu sizden önce başkası görmüş demektir.",
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
  h2 { font-size:70px; line-height:1.08; letter-spacing:-.03em; font-weight:800; }
  /* Metin kısaldığı için punto büyüdü. Telefonda karusel kol mesafesinden
     okunuyor, 42 punto o mesafede küçük kalıyordu. */
  p  { font-size:50px; line-height:1.45; font-weight:500; color:${MUTED}; }
  .sub { font-size:34px; font-weight:600; color:rgba(255,255,255,.85); }
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
  li { display:flex; align-items:flex-start; gap:26px; padding:30px 0;
       border-top:2px solid rgba(13,27,42,.12); font-size:48px;
       line-height:1.2; font-weight:600; color:${INK}; }
  li:last-child { border-bottom:2px solid rgba(13,27,42,.12); }
  .dot { flex:none; width:18px; height:18px; border-radius:99px;
         background:${BLUE}; margin-top:16px; }

  /* Beklenen seyir satırı. Sonuç metinleri kütüphanede uzun olabiliyor
     (retatrutide), o yüzden gövdeden küçük punto. */
  li.tl { display:block; padding:24px 0; }
  .per { display:block; font-size:32px; font-weight:800; color:${BLUE};
         letter-spacing:.02em; }
  .res { display:block; margin-top:8px; font-size:36px; font-weight:500;
         line-height:1.3; color:${MUTED}; }
`

/* Metin artık kütüphaneden geliyor ve orada "<30 dakika" gibi değerler
   var. Kaçışlanmazsa tarayıcı bunu etiket başlangıcı sanıp slaydın geri
   kalanını yutuyor. */
const esc = (t) =>
  String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

function render(slide, i, total, productImg) {
  const foot = `<div class="foot"><span>zphctr.com</span><span class="num">${i + 1}/${total}</span></div>`
  const strip = `<div class="strip"><img class="logo" src="${LOGO}"></div>`

  if (slide.type === "hook") {
    return `<div class="slide">
      <div class="band">
        <img class="logo" src="${LOGO}">
        <div class="kicker" style="margin-top:34px">${esc(slide.kicker)}</div>
        <h1 style="margin-top:14px">${esc(slide.title)}</h1>
        ${slide.sub ? `<div class="sub" style="margin-top:18px">${esc(slide.sub)}</div>` : ""}
      </div>
      <div class="shelf"><div class="card"><img src="${productImg}"></div></div>
      ${foot}</div>`
  }

  if (slide.type === "cta") {
    return `<div class="slide band" style="justify-content:center">
      <img class="logo" src="${LOGO}" style="position:absolute;top:80px;left:80px">
      <h1>${esc(slide.heading)}</h1>
      <div class="sub" style="margin-top:20px;font-size:42px">${esc(slide.body)}</div>
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
        <div class="big">${esc(slide.big)}</div>
        <div class="unit" style="margin-top:8px">${esc(slide.unit)}</div>
        <p style="margin-top:34px">${esc(slide.body)}</p>
      </div>
      ${foot}</div>`
  }

  /* Beklenen seyir. Dönem solda kalın, sonuç altında; göz dönemleri
     tarayıp ilgilendiği satırda duruyor. */
  if (slide.type === "timeline") {
    /* Kütüphanedeki sonuç metinleri bileşikten bileşiğe çok farklı
       uzunlukta. Retatrutide'in satırları sabit puntoda slaydı taşırıp
       başlığın ve alt bilginin üstüne biniyordu; satır sayısı ve punto
       artık içeriğin uzunluğuna göre seçiliyor. */
    const len = slide.rows.reduce((n, r) => n + r.result.length, 0)
    const rows = len > 200 ? slide.rows.slice(0, 3) : slide.rows
    const dense = rows.reduce((n, r) => n + r.result.length, 0) > 150
    const res = dense ? 32 : 36
    const per = dense ? 28 : 32
    const pad = dense ? 18 : 24

    return `<div class="slide">${strip}
      <div class="body-area">
        <div class="rule"></div>
        <h2 style="margin-top:30px">${esc(slide.heading)}</h2>
        <ul style="margin-top:26px">
          ${rows
            .map(
              (r) =>
                `<li class="tl" style="padding:${pad}px 0">
                   <span class="per" style="font-size:${per}px">${esc(r.period)}</span>
                   <span class="res" style="font-size:${res}px">${esc(r.result)}</span>
                 </li>`,
            )
            .join("")}
        </ul>
      </div>
      ${foot}</div>`
  }

  if (slide.type === "list") {
    return `<div class="slide">${strip}
      <div class="body-area">
        <div class="rule"></div>
        <h2 style="margin-top:30px">${esc(slide.heading)}</h2>
        <ul style="margin-top:34px">
          ${slide.items
            .map((it) => `<li><span class="dot"></span><span>${esc(it)}</span></li>`)
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
      <h2 style="margin-top:30px;color:${accent === BLUE ? INK : accent}">${esc(slide.heading)}</h2>
      <p style="margin-top:34px">${esc(slide.body)}</p>
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
