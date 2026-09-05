import type { Product } from "@/lib/catalog"

export const seoLocales = ["en", "es", "ar"] as const
export type SeoLocale = (typeof seoLocales)[number]

export const seoTopicIds = [
  "retatrutide",
  "bpc157",
  "ghkcu",
  "zptrop",
  "blends",
  "tirzepatide",
] as const
export type SeoTopicId = (typeof seoTopicIds)[number]

export const turkishTopicPaths: Record<SeoTopicId, string> = {
  retatrutide: "/zphc-reta",
  bpc157: "/zphc-bpc-157",
  ghkcu: "/zphc-ghk-cu",
  zptrop: "/zphc-zptrop",
  blends: "/zphc-peptid-karisimlari",
  tirzepatide: "/zphc-tirze",
}

export const topicProducts: Record<SeoTopicId, string[]> = {
  retatrutide: [
    "retatrutide-20mg-5x4mg-zphc",
    "retatrutide-40mg-5x8mg-zphc",
    "retatrutide-60mg-5x12mg-zphc",
    "reta-zphc-120-mg-5-vials-x-24-mg",
    "retatrutide-30mg-aq-pen-zphc",
    "reta-60mg-dual-cartridge-sterile-water-zphc",
  ],
  bpc157: [
    "bpc157-25mg-5x5mg-zphc",
    "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc",
    "ultra-rehab-mix-50mg-5x10mg-zphc",
  ],
  ghkcu: [
    "ghk-cu-60mg-with-bacteriostatic-water-zphc",
    "ghk-cu-200mg-zphc",
    "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc",
  ],
  zptrop: ["zptrop-hgh-100iu-aq-vial-zphc"],
  blends: [
    "double-burn-mix-5mg-5x5mg-zphc",
    "glow-pro-mix-60mg-bpc157-tb500-ghkcu-zphc",
    "ultra-rehab-mix-50mg-5x10mg-zphc",
    "super-slim-mix-55mg-5x11mg-zphc",
    "wellness-mix-25mg-5x5mg-zphc",
    "mega-mass-mix-10mg-5x10mg-zphc",
  ],
  tirzepatide: [
    "tirzepatide-zphc-150-mg-5-vials-x-30-mg",
    "tirzepatide-30mg-aq-pen-zphc",
  ],
}

type LocaleUi = {
  languageName: string
  dir: "ltr" | "rtl"
  hubTitle: string
  hubDescription: string
  hubIntro: string
  eyebrow: string
  products: string
  allProducts: string
  catalogueTitle: string
  catalogueDescription: string
  searchHint: string
  currentSelection: string
  priceOnRequest: string
  viewProduct: string
  browseTopics: string
  verificationTitle: string
  verificationBody: string
  verify: string
  officialDomain: string
  researchOnly: string
}

export const localeUi: Record<SeoLocale, LocaleUi> = {
  en: {
    languageName: "English",
    dir: "ltr",
    hubTitle: "ZPHC Turkey Product Catalogue and Verification",
    hubDescription: "Explore the active ZPHC Turkey peptide and HGH catalogue by product family, format and total content. Manufacturer-code verification and current availability.",
    hubIntro: "A focused catalogue for comparing active ZPHC product families supplied from Turkey. Every box can be checked through the manufacturer's validation system.",
    eyebrow: "ZPHC Turkey catalogue",
    products: "Available products",
    allProducts: "View the full catalogue",
    catalogueTitle: "ZPHC Turkey — Full Product Catalogue",
    catalogueDescription: "Browse all active ZPHC Turkey products with package format, total content, current price and manufacturer verification.",
    searchHint: "Search products by name or ingredient",
    currentSelection: "Compare the active formats and total content listed for this product family.",
    priceOnRequest: "Ask for price",
    viewProduct: "View product",
    browseTopics: "Browse product families",
    verificationTitle: "Verify every ZPHC box",
    verificationBody: "Use the unique code printed on the package at validation.zphc.com. The result is returned by the manufacturer's system, not by this store.",
    verify: "Open manufacturer validation",
    officialDomain: "Official Turkey domain: zphctr.com",
    researchOnly: "Products are presented as laboratory and research materials and are not intended for human use.",
  },
  es: {
    languageName: "Español",
    dir: "ltr",
    hubTitle: "Catálogo ZPHC Turquía y verificación de autenticidad",
    hubDescription: "Consulta el catálogo activo de péptidos y HGH ZPHC Turquía por familia, formato y contenido total. Verificación del código del fabricante y disponibilidad actual.",
    hubIntro: "Un catálogo claro para comparar las familias de productos ZPHC disponibles desde Turquía. Cada caja puede verificarse en el sistema oficial del fabricante.",
    eyebrow: "Catálogo ZPHC Turquía",
    products: "Productos disponibles",
    allProducts: "Ver el catálogo completo",
    catalogueTitle: "ZPHC Turquía — Catálogo completo",
    catalogueDescription: "Explora todos los productos ZPHC activos en Turquía con formato, contenido total, precio actual y verificación del fabricante.",
    searchHint: "Buscar por producto o ingrediente",
    currentSelection: "Compara los formatos activos y el contenido total de esta familia de productos.",
    priceOnRequest: "Consultar precio",
    viewProduct: "Ver producto",
    browseTopics: "Explorar familias de productos",
    verificationTitle: "Verifica cada caja ZPHC",
    verificationBody: "Introduce el código único del envase en validation.zphc.com. El resultado procede del sistema del fabricante, no de esta tienda.",
    verify: "Abrir verificación del fabricante",
    officialDomain: "Dominio oficial para Turquía: zphctr.com",
    researchOnly: "Los productos se presentan como materiales de laboratorio e investigación y no están destinados al uso humano.",
  },
  ar: {
    languageName: "العربية",
    dir: "rtl",
    hubTitle: "كتالوج ZPHC تركيا والتحقق من الأصالة",
    hubDescription: "استعرض كتالوج ZPHC تركيا النشط للببتيدات وHGH حسب عائلة المنتج والشكل والمحتوى الإجمالي، مع التحقق من رمز الشركة المصنّعة والتوفر الحالي.",
    hubIntro: "كتالوج واضح لمقارنة عائلات منتجات ZPHC المتوفرة من تركيا. يمكن التحقق من كل عبوة عبر نظام التحقق الرسمي للشركة المصنّعة.",
    eyebrow: "كتالوج ZPHC تركيا",
    products: "المنتجات المتوفرة",
    allProducts: "عرض الكتالوج الكامل",
    catalogueTitle: "ZPHC تركيا — كتالوج المنتجات الكامل",
    catalogueDescription: "استعرض جميع منتجات ZPHC النشطة في تركيا مع شكل العبوة والمحتوى الإجمالي والسعر الحالي والتحقق من الشركة المصنّعة.",
    searchHint: "ابحث باسم المنتج أو المكوّن",
    currentSelection: "قارن بين الأشكال المتوفرة والمحتوى الإجمالي ضمن عائلة المنتج هذه.",
    priceOnRequest: "اسأل عن السعر",
    viewProduct: "عرض المنتج",
    browseTopics: "تصفح عائلات المنتجات",
    verificationTitle: "تحقق من كل عبوة ZPHC",
    verificationBody: "أدخل الرمز الفريد المطبوع على العبوة في validation.zphc.com. تصدر النتيجة من نظام الشركة المصنّعة وليس من هذا المتجر.",
    verify: "فتح نظام تحقق الشركة",
    officialDomain: "النطاق الرسمي في تركيا: zphctr.com",
    researchOnly: "تُعرض المنتجات كمواد مختبرية وبحثية وليست مخصصة للاستخدام البشري.",
  },
}

type TopicTranslation = {
  slug: string
  title: string
  description: string
  intro: string
}

export const topicTranslations: Record<SeoLocale, Record<SeoTopicId, TopicTranslation>> = {
  en: {
    retatrutide: { slug: "zphc-retatrutide", title: "ZPHC Retatrutide (Reta) Products in Turkey", description: "Compare active ZPHC Reta and retatrutide products in 20 mg, 30 mg pen, 40 mg, 60 mg and 120 mg formats, with Turkey availability and manufacturer-code verification.", intro: "ZPHC products listed as Reta differ by total content and presentation: vial sets, premixed pens and dual-cartridge formats. This page groups the active options in one place without treating them as interchangeable." },
    bpc157: { slug: "zphc-bpc-157", title: "ZPHC BPC-157 Products in Turkey", description: "Compare ZPHC BPC-157 25 mg and active ZPHC blends containing BPC-157, with current Turkey pricing and manufacturer-code verification.", intro: "The single-ingredient BPC-157 set and the Glow Pro and Ultra Rehab blends have different compositions and package formats. Compare the active catalogue before opening a product record." },
    ghkcu: { slug: "zphc-ghk-cu", title: "ZPHC GHK-Cu 60 mg and 200 mg in Turkey", description: "Compare active ZPHC GHK-Cu 60 mg and 200 mg products and the Glow Pro blend, with current Turkey pricing and authenticity verification.", intro: "The catalogue includes standalone GHK-Cu presentations with different total content as well as a multi-ingredient blend. Each product remains clearly separated by format and composition." },
    zptrop: { slug: "zphc-zptrop-hgh", title: "ZPHC ZPtrop HGH 100 IU in Turkey", description: "View the active ZPHC ZPtrop HGH 100 IU premixed vial listing for Turkey, current price and manufacturer-code verification.", intro: "This page reflects the currently active ZPtrop presentation in the Turkey catalogue. Discontinued formats are intentionally excluded to keep availability unambiguous." },
    blends: { slug: "zphc-peptide-blends", title: "ZPHC Peptide Blends in Turkey", description: "Compare active ZPHC peptide blends including Glow Pro, Ultra Rehab, Double Burn, Super Slim, Wellness and Mega Mass by composition and total content.", intro: "ZPHC blends combine different ingredients and are not interchangeable. This collection separates each formula, total content and package presentation before linking to the full product record." },
    tirzepatide: { slug: "zphc-tirzepatide", title: "ZPHC Tirzepatide (Tirze) Products in Turkey", description: "Compare active ZPHC Tirze and tirzepatide formats in the Turkey catalogue, including 30 mg premixed pen and 150 mg vial set.", intro: "The active Tirze catalogue contains different presentations and total quantities. This page keeps the pen and vial-set formats clearly separated." },
  },
  es: {
    retatrutide: { slug: "zphc-retatrutida", title: "Productos ZPHC Retatrutida (Reta) en Turquía", description: "Compara productos ZPHC Reta y retatrutida de 20 mg, pluma de 30 mg, 40 mg, 60 mg y 120 mg, con disponibilidad en Turquía y verificación del fabricante.", intro: "Los productos ZPHC Reta se diferencian por contenido total y presentación: viales, plumas premezcladas y cartuchos dobles. Aquí se muestran las opciones activas sin tratarlas como equivalentes." },
    bpc157: { slug: "zphc-bpc-157", title: "Productos ZPHC BPC-157 en Turquía", description: "Compara ZPHC BPC-157 25 mg y mezclas activas que contienen BPC-157, con precio actual en Turquía y verificación del fabricante.", intro: "El set BPC-157 de un solo ingrediente y las mezclas Glow Pro y Ultra Rehab tienen composiciones y formatos distintos. Compara el catálogo activo antes de abrir la ficha completa." },
    ghkcu: { slug: "zphc-ghk-cu", title: "ZPHC GHK-Cu 60 mg y 200 mg en Turquía", description: "Compara los productos activos ZPHC GHK-Cu de 60 mg y 200 mg y la mezcla Glow Pro, con precios en Turquía y verificación de autenticidad.", intro: "El catálogo incluye presentaciones independientes de GHK-Cu con diferente contenido total y una mezcla de varios ingredientes. Cada formato se presenta por separado." },
    zptrop: { slug: "zphc-zptrop-hgh", title: "ZPHC ZPtrop HGH 100 IU en Turquía", description: "Consulta el producto activo ZPHC ZPtrop HGH 100 IU en vial premezclado, su precio actual en Turquía y la verificación del fabricante.", intro: "Esta página refleja la presentación ZPtrop actualmente activa en el catálogo de Turquía. Los formatos retirados se excluyen para evitar confusiones." },
    blends: { slug: "mezclas-peptidicas-zphc", title: "Mezclas de péptidos ZPHC en Turquía", description: "Compara las mezclas activas ZPHC Glow Pro, Ultra Rehab, Double Burn, Super Slim, Wellness y Mega Mass por composición y contenido total.", intro: "Las mezclas ZPHC combinan ingredientes distintos y no son equivalentes. Esta colección separa cada fórmula, contenido total y presentación." },
    tirzepatide: { slug: "zphc-tirzepatida", title: "Productos ZPHC Tirzepatida (Tirze) en Turquía", description: "Compara los formatos activos ZPHC Tirze y tirzepatida en Turquía: pluma premezclada de 30 mg y set de viales de 150 mg.", intro: "El catálogo Tirze activo contiene presentaciones y cantidades totales diferentes. Aquí la pluma y el set de viales se muestran por separado." },
  },
  ar: {
    retatrutide: { slug: "zphc-retatrutide", title: "منتجات ZPHC Retatrutide (Reta) في تركيا", description: "قارن منتجات ZPHC Reta وRetatrutide المتوفرة بأشكال 20 و30 و40 و60 و120 ملغ مع التوفر في تركيا والتحقق من رمز الشركة.", intro: "تختلف منتجات Reta في المحتوى الإجمالي وطريقة العرض بين مجموعات القوارير والأقلام الجاهزة والخراطيش المزدوجة. تجمع هذه الصفحة الخيارات النشطة دون اعتبارها متطابقة." },
    bpc157: { slug: "zphc-bpc-157", title: "منتجات ZPHC BPC-157 في تركيا", description: "قارن ZPHC BPC-157 بتركيز 25 ملغ والخلطات النشطة التي تحتوي عليه، مع السعر الحالي في تركيا والتحقق من رمز الشركة.", intro: "تختلف مجموعة BPC-157 أحادية المكوّن عن خلطات Glow Pro وUltra Rehab في التركيب وشكل العبوة. تعرض الصفحة الكتالوج النشط بوضوح." },
    ghkcu: { slug: "zphc-ghk-cu", title: "ZPHC GHK-Cu بتركيز 60 و200 ملغ في تركيا", description: "قارن منتجات ZPHC GHK-Cu النشطة بتركيز 60 و200 ملغ وخلطة Glow Pro مع الأسعار في تركيا والتحقق من الأصالة.", intro: "يتضمن الكتالوج عبوات مستقلة من GHK-Cu بمحتوى إجمالي مختلف إضافة إلى خلطة متعددة المكونات، مع فصل واضح بين كل منتج." },
    zptrop: { slug: "zphc-zptrop-hgh", title: "ZPHC ZPtrop HGH 100 IU في تركيا", description: "اطلع على عبوة ZPHC ZPtrop HGH 100 IU النشطة في تركيا والسعر الحالي والتحقق من رمز الشركة المصنّعة.", intro: "تعكس هذه الصفحة عرض ZPtrop النشط حالياً في كتالوج تركيا، مع استبعاد الأشكال المتوقفة لتجنب الالتباس." },
    blends: { slug: "zphc-peptide-blends", title: "خلطات ببتيدات ZPHC في تركيا", description: "قارن خلطات ZPHC النشطة مثل Glow Pro وUltra Rehab وDouble Burn وSuper Slim وWellness وMega Mass حسب التركيب والمحتوى.", intro: "تحتوي خلطات ZPHC على مكونات مختلفة وليست متطابقة. تفصل هذه المجموعة بين كل تركيبة ومحتواها الإجمالي وشكل العبوة." },
    tirzepatide: { slug: "zphc-tirzepatide", title: "منتجات ZPHC Tirzepatide (Tirze) في تركيا", description: "قارن أشكال ZPHC Tirze وTirzepatide النشطة في تركيا، بما في ذلك قلم 30 ملغ ومجموعة قوارير 150 ملغ.", intro: "يتضمن كتالوج Tirze النشط أشكالاً وكميات إجمالية مختلفة، وتعرض الصفحة القلم ومجموعة القوارير بشكل منفصل." },
  },
}

export function isSeoLocale(value: string): value is SeoLocale {
  return seoLocales.includes(value as SeoLocale)
}

export function getLocalizedTopic(locale: SeoLocale, slug: string) {
  const topicId = seoTopicIds.find((id) => topicTranslations[locale][id].slug === slug)
  return topicId ? { id: topicId, ...topicTranslations[locale][topicId] } : undefined
}

export function localizedTopicPath(locale: SeoLocale, topicId: SeoTopicId) {
  return `/${locale}/${topicTranslations[locale][topicId].slug}`
}

export function topicLanguageAlternates(topicId: SeoTopicId) {
  return {
    "tr-TR": turkishTopicPaths[topicId],
    en: localizedTopicPath("en", topicId),
    es: localizedTopicPath("es", topicId),
    ar: localizedTopicPath("ar", topicId),
    "x-default": turkishTopicPaths[topicId],
  }
}

export function homeLanguageAlternates() {
  return { "tr-TR": "/", en: "/en", es: "/es", ar: "/ar", "x-default": "/" }
}

const productFormLabels: Record<SeoLocale, { accessory: string; pen: string; cartridge: string; vial: string }> = {
  en: { accessory: "Accessory", pen: "Premixed pen", cartridge: "Dual chamber / cartridge", vial: "Vial set" },
  es: { accessory: "Accesorio", pen: "Pluma premezclada", cartridge: "Doble cámara / cartucho", vial: "Set de viales" },
  ar: { accessory: "ملحق", pen: "قلم جاهز", cartridge: "حجرة مزدوجة / خرطوشة", vial: "مجموعة قوارير" },
}

export function localizedProductForm(locale: SeoLocale, product: Product) {
  const labels = productFormLabels[locale]
  if (product.category === "aksesuar") return labels.accessory
  if (/hazır karışım|aq pen/i.test(product.name)) return labels.pen
  if (/çift hazne|dual|kartuş/i.test(product.name)) return labels.cartridge
  return labels.vial
}
