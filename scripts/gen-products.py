"""zphcstore.com WooCommerce Store API çıktısından lib/products.ts üretir.

Teknik değerler (mg, IU, flakon sayısı, sıcaklık) kaynaktan olduğu gibi
taşınır; hiçbir doz değeri türetilmez veya tahmin edilmez.
"""
import json
import os
import re
import html
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

# Kaynak metin -> Türkçe karşılığı. Ayrı dosyada tutulur ki katalog yeniden
# çekildiğinde çeviriler kaybolmasın.
with open(os.path.join(HERE, "translations.json")) as _f:
    TRANSLATIONS = json.load(_f)

MISSING: set = set()

FILES = [
    "prod_523.json", "prod_15.json", "prod_561.json",
    "prod_557.json", "prod_558.json", "prod_522.json",
]

# Kaynak metindeki tekrar eden etiketlerin Türkçe karşılıkları.
LABELS = {
    "Storage": "Saklama",
    "Reconstitution": "Rekonstitüsyon",
    "Research applications": "Araştırma Alanları",
    "For research use only": "Yalnızca Araştırma Amaçlı",
    "Sample research dosing": "Örnek Araştırma Dozu",
    "Concentration": "Konsantrasyon",
    "Quality control": "Kalite Kontrolü",
    "Manufacturer": "Üretici",
    "Active Ingredient": "Etkin Madde",
    "Volume": "Hacim",
    "Form": "Form",
    "Purpose": "Kullanım Amacı",
    "Action": "Etki",
    "Administration Route": "Uygulama Yolu",
    "Recommended Dosage": "Önerilen Doz",
    "Side Effects": "Yan Etkiler",
    "Kit includes": "Kit İçeriği",
    "Handling": "Taşıma ve Muhafaza",
    "Peptide profile": "Peptid Profili",
    "Dosing guide": "Doz Rehberi",
    "Research-grade QC": "Araştırma Sınıfı Kalite Kontrolü",
    "Pharma-grade QC": "Farma Sınıfı Kalite Kontrolü",
    "High-purity formulation": "Yüksek Saflıkta Formülasyon",
    "Lyophilized purity": "Liyofilize Saflık",
    "Per vial formula": "Flakon Başına Formül",
    "Format": "Format",
    "Research focus": "Araştırma Odağı",
    "Once-weekly protocol": "Haftada Tek Doz Protokolü",
    "Total content": "Toplam İçerik",
    "Instant readiness": "Kullanıma Hazır",
    "Dual-chamber cartridge": "Çift Hazneli Kartuş",
    "Presentation": "Sunum",
    "Packaging": "Ambalaj",
    "Purity": "Saflık",
    "Batch": "Parti",
    "Shelf life": "Raf Ömrü",
    "Solvent": "Çözücü",
    "Diluent": "Çözücü",
}

# Etiketin hangi bölüme düşeceği. "spec" teknik/sunum verisidir ve Ürün
# Bilgisi tablosunda gösterilir. "claim" üreticinin etkinlik, kullanım
# amacı, doz ve yan etki beyanıdır; ayrı bir "Üretici Beyanı" bloğunda,
# kaynağı açıkça belirtilerek gösterilir — çünkü bu ifadeler sitenin kendi
# kanıt sınıflandırmasıyla çelişebiliyor (ör. BPC-157 "hızlı doku onarımı"
# diyor, kütüphanedeki kaydı "Teorik" seviyede).
# Listede olmayan etiket varsayılan olarak "claim" sayılır: bilinmeyen bir
# ifadeyi teknik veri gibi sunmaktansa beyan olarak işaretlemek güvenli
# taraftır.
SPEC_LABELS = {
    "Storage", "Reconstitution", "Concentration", "Kit includes", "Volume",
    "Form", "Active Ingredient", "Manufacturer", "Handling", "Quality control",
    "Research-grade QC", "Pharma-grade QC", "Lyophilized purity",
    "Per vial formula", "Format", "Total content",
    "High-purity formulation", "Instant readiness", "Standard reconstitution",
    "Compatibility", "Administration Route", "Peptide profile",
    "For research use only", "Notice", "Dual-chamber cartridge",
    "Presentation", "Packaging", "Purity", "Batch", "Shelf life",
    "Solvent", "Diluent",
}

# Kullanım hedefi. Kataloğu "peptid / HGH" ayrımının yanında amaca göre de
# gezilebilir yapar: ziyaretçi bileşik adını bilmeden "kilo kaybı" veya
# "toparlanma" diye arıyor.
#
# Hedef öncelikle bileşiğin kütüphanedeki kategorisinden türetilir
# (PEPTIDE_CATEGORY_GOAL). Kütüphanede karşılığı olmayan ürünler ve birden
# fazla amaca hizmet eden karışımlar için GOAL_OVERRIDES devreye girer.
GOALS = [
    "Kilo Kaybı",
    "Toparlanma & Doku Onarımı",
    "Büyüme Hormonu",
    "Cilt & Yaşlanma Karşıtı",
    "Uzun Yaşam",
    "Bilişsel",
    "Diğer",
]

PEPTIDE_CATEGORY_GOAL = {
    "Metabolik": "Kilo Kaybı",
    "Doku Onarımı": "Toparlanma & Doku Onarımı",
    "Büyüme / GH": "Büyüme Hormonu",
    "Estetik / Onarım": "Cilt & Yaşlanma Karşıtı",
    "Longevity": "Uzun Yaşam",
    "Kognitif": "Bilişsel",
    "Performans": "Toparlanma & Doku Onarımı",
}

# Ürün slug'ında geçen desen -> hedefler. Kütüphaneye bağlanmayan ürünler ve
# çok amaçlı karışımlar burada elle tanımlanır. Sıra önemli: ilk eşleşen
# desen kazanır.
GOAL_OVERRIDES = [
    (r"glow-pro-mix", ["Toparlanma & Doku Onarımı", "Cilt & Yaşlanma Karşıtı"]),
    (r"ultra-rehab-mix", ["Toparlanma & Doku Onarımı"]),
    (r"wellness-mix", ["Büyüme Hormonu", "Toparlanma & Doku Onarımı"]),
    (r"mega-mass-mix", ["Büyüme Hormonu"]),
    (r"double-burn-mix|super-slim-mix", ["Kilo Kaybı"]),
    (r"hgh-?frag|fragment", ["Kilo Kaybı"]),
    (r"melanotan", ["Diğer"]),
    (r"hcg|hp-hcg", ["Diğer"]),
    (r"ll-?37", ["Diğer"]),
    (r"multi-use-pen|^pen-", ["Diğer"]),
    (r"nad", ["Uzun Yaşam"]),
    (r"glutathione|glutatyon", ["Uzun Yaşam", "Cilt & Yaşlanma Karşıtı"]),
    (r"aicar", ["Kilo Kaybı"]),
]


# Ürün adındaki bileşikten kütüphanedeki ansiklopedi kaydına eşleme.
# Sıra önemli: daha uzun/özgül desenler önce denenir.
PEPTIDE_MAP = [
    (r"bpc[- ]?157", "bpc-157"),
    (r"tb[- ]?500", "tb-500"),
    (r"epithalon", "epithalon"),
    (r"ghk[- ]?cu", "ghk-cu"),
    (r"mots[- ]?c", "mots-c"),
    (r"aicar", "aicar"),
    (r"aod[- ]?9604", "aod-9604"),
    (r"ghrp[- ]?2", "ghrp-2"),
    (r"ghrp[- ]?6", "ghrp-6"),
    (r"ipamorelin", "ipamorelin"),
    (r"igf[- ]?1", "igf-1-lr3"),
    (r"cagrilintide", "cagrilintide"),
    (r"semaglutide", "semaglutide"),
    (r"tirze", "tirzepatide"),
    (r"\breta\b|retatrutide", "retatrutide"),
    (r"nad\+", "nad-nmn"),
    (r"glutathione", "glutathione"),
    (r"zptrop|spectros|\bhgh\b", "hgh"),
]


def strip_tags(s: str) -> str:
    """Blok elemanları satır sonuna çevirir, satır içi biçimlendirmeyi
    (strong/em/b/i/span) sessizce atar. Aksi halde kaynaktaki
    "<strong>Etiket:</strong> değer" kalıbı ikiye bölünür ve etiket
    değerinden kopar."""
    s = re.sub(r"<(li|/li|br\s*/?|/p|/ul|/h[1-6])\s*>", "\n", s or "", flags=re.I)
    s = re.sub(r"<[^>]+>", "", s)
    return html.unescape(s)


# Ürün adlarındaki İngilizce betimleyiciler. Bileşik ve marka adlarına
# (BPC-157, ZPHC, ZPtrop, Reta) dokunulmaz; yalnızca "5 vials × 5 mg" gibi
# ambalaj tarifleri Türkçeleştirilir. Sıra önemli: uzun kalıplar önce.
NAME_PHRASES = [
    ("Lyophilized Peptide + Bacteriostatic Water", "Liyofilize Peptid + Bakteriyostatik Su"),
    ("Lyophilized Powder + Bacteriostatic Water", "Liyofilize Toz + Bakteriyostatik Su"),
    ("Dual-Chamber Cartridge + Sterile Water", "Çift Hazneli Kartuş + Steril Su"),
    ("Two-Chamber Cartridges", "Çift Hazneli Kartuş"),
    ("Cartridges for Multi-Use Pen", "Çok Kullanımlık Kalem Kartuşu"),
    ("For 36 IU Cartridges", "36 IU Kartuşlar İçin"),
    ("Dual-Chamber Pen", "Çift Hazneli Kalem"),
    ("Dual Cartridge Pen", "Çift Kartuşlu Kalem"),
    ("Premixed Vial", "Hazır Karışım Flakon"),
    ("Premixed Pen", "Hazır Karışım Kalem"),
    ("Reusable Dosing Device", "Yeniden Kullanılabilir Dozlama Cihazı"),
    ("lyophilized vial", "liyofilize flakon"),
    ("lyophilized vials", "liyofilize flakon"),
    ("Bacteriostatic Water", "Bakteriyostatik Su"),
    ("Sterile Water", "Steril Su"),
    ("Premixed", "Hazır Karışım"),
    ("total", "toplam"),
    ("vials", "flakon"),
    ("vial", "flakon"),
    ("Kit", "Kit"),
]


def clean_name(s: str) -> str:
    n = html.unescape(s or "").replace("–", "-").strip()
    for src, dst in NAME_PHRASES:
        n = re.sub(re.escape(src), dst, n)
    # Kaynak ürün adlarında " — " ayırıcı olarak kullanılıyor
    # ("BPC-157 ZPHC — 25 mg"). Türkçede uzun tire bu şekilde yaygın değil ve
    # metne yapay bir hava veriyor; sade boşlukla değiştiriliyor.
    n = re.sub(r"\s*[—–]\s*", " ", n)
    return re.sub(r"\s{2,}", " ", n).strip()


def norm(text: str) -> str:
    """Sözlük araması için anahtarı normalize eder. Kaynak metin aynı cümleyi
    farklı Unicode tire (-, –, —), boşluk (NBSP, ince boşluk) ve çarpı (x, ×)
    varyantlarıyla tekrar ediyor; normalize etmezsek her varyant ayrı bir
    sözlük girdisi ister."""
    t = unicodedata.normalize("NFKC", text)
    t = re.sub(r"[‐-―−]", "-", t)
    t = re.sub(r"\s+", " ", t)
    return t.strip()


def tr(text: str) -> str:
    """Sözlükte karşılığı varsa Türkçesini döndürür. Yoksa kaynağı olduğu
    gibi bırakır ve eksik listesine yazar; böylece katalog büyüdüğünde
    çevrilmemiş metin sessizce siteye sızmaz, raporlanır."""
    key = norm(text)
    if not key:
        return text
    hit = TRANSLATIONS.get(key)
    if hit:
        return hit
    MISSING.add(key)
    return text


def parse_specs(short_desc: str):
    """short_description'ı {label, value, kind} üçlülerine ayırır. Etiketsiz
    satırlar serbest metin olarak ayrı döner."""
    specs, notes = [], []
    for raw in strip_tags(short_desc).split("\n"):
        line = raw.strip()
        if not line:
            continue
        m = re.match(r"^([A-Za-z][A-Za-z0-9 /+()-]{2,34}):\s*(.+)$", line)
        if m:
            label, value = m.group(1).strip(), m.group(2).strip()
            specs.append({
                "label": LABELS.get(label, tr(label)),
                "value": tr(value),
                "kind": "spec" if label in SPEC_LABELS else "claim",
            })
        else:
            notes.append(tr(line))
    return specs, notes


def category_of(product, name: str) -> str:
    slugs = {c["slug"] for c in product.get("categories", [])}
    if "accessories" in slugs:
        return "aksesuar"
    if "hgh-for-sale" in slugs or re.search(r"zptrop|spectros|\bhgh\b(?! fragment)", name, re.I):
        return "hgh"
    return "peptid"


def peptide_slug(name: str):
    low = name.lower()
    # "HGH Fragment" ayrı bir bileşik; HGH kaydına bağlanmamalı.
    if "fragment" in low:
        return None
    for pattern, slug in PEPTIDE_MAP:
        if re.search(pattern, low):
            return slug
    return None


def local_image(slug: str, images):
    """public/products altındaki yerel görselin yolunu döndürür. Dosya
    yoksa None döner ve sayfa görsel bloğunu hiç render etmez.

    Görseller WebP'ye çevrilip 900px'e küçültülüyor (scripts/optimize-images.mjs);
    kaynak uzantısı ne olursa olsun önce .webp aranır."""
    if not images:
        return None
    src_ext = os.path.splitext(images[0]["src"].split("?")[0])[1] or ".jpg"
    for ext in (".webp", src_ext):
        rel = f"/products/{slug}{ext}"
        if os.path.exists(os.path.join(REPO, "public", rel.lstrip("/"))):
            return rel
    return None


def goals_for(slug: str, pep_slug, peptide_categories) -> list:
    """Ürünün kullanım hedefleri. Önce elle tanımlı istisnalar, sonra
    kütüphanedeki bileşik kategorisi. Hiçbiri tutmazsa "Diğer"."""
    for pattern, goals in GOAL_OVERRIDES:
        if re.search(pattern, slug, re.I):
            return goals
    if pep_slug:
        cat = peptide_categories.get(pep_slug)
        hit = PEPTIDE_CATEGORY_GOAL.get(cat)
        if hit:
            return [hit]
    return ["Diğer"]


def read_peptide_categories() -> dict:
    """lib/peptides.ts'ten slug -> category eşlemesini okur. Kategoriyi orada
    tek kaynakta tutup burada tekrar tanımlamamak için."""
    src = open(os.path.join(REPO, "lib", "peptides.ts")).read()
    pairs = re.findall(
        r'slug: "([^"]+)",(?:.*?\n)*?    category: "([^"]+)"', src
    )
    return dict(pairs)


def ts(value) -> str:
    if value is None:
        return "undefined"
    return json.dumps(value, ensure_ascii=False)


def main():
    seen = {}
    for f in FILES:
        for p in json.load(open(f)):
            seen[p["id"]] = p

    peptide_categories = read_peptide_categories()

    out = []
    for p in sorted(seen.values(), key=lambda x: clean_name(x["name"])):
        name = clean_name(p["name"])
        specs, notes = parse_specs(p.get("short_description", ""))
        price = p["prices"]["price"]
        images = p.get("images") or []

        out.append({
            "slug": p["slug"],
            "name": name,
            "sku": p.get("sku") or None,
            "category": category_of(p, name),
            "peptideSlug": peptide_slug(name),
            # Görsel yerelleştirilir: uzak CDN'e hotlink hem kırılgan hem de
            # kaynağın referer kontrolüne takılıyor. Dosyalar
            # public/products/<slug>.<ext> altında tutulur.
            "image": local_image(p["slug"], images),
            "sourcePriceUsd": round(int(price) / 100, 2) if price else None,
            "goals": goals_for(p["slug"], peptide_slug(name), peptide_categories),
            # Üreticinin kendi stok durumu. Bizim depomuzu değil kaynağın
            # stoğunu gösterir; sayfada bu şekilde ifade edilir.
            "inStock": bool(p.get("is_in_stock", True)),
            "specs": specs,
            "notes": notes,
        })

    lines = [
        "// ZPHC Türkiye ürün kataloğu.",
        "//",
        "// Bu dosya zphcstore.com WooCommerce Store API'sinden üretilmiştir",
        "// (scripts/gen-products.py). Teknik değerler — mg, IU, flakon sayısı,",
        "// saklama sıcaklığı — kaynaktan olduğu gibi taşınır. Hiçbir doz değeri",
        "// elle türetilmez veya tahmin edilmez: ürün sayfasındaki yanlış bir doz",
        "// doğrudan güvenlik sorunudur. Veriyi güncellemek için üreteci yeniden",
        "// çalıştır, elle düzenleme yapma.",
        "//",
        "// Kaynak, ürünleri laboratuvar/araştırma materyali olarak sunar",
        "// (\"for research use only\"). Bu çerçeve sitede korunur.",
        "//",
        "// sourcePriceUsd kaynak sitedeki USD listesidir, referans içindir.",
        "// Sitede gösterilen fiyat alanı (price) bilinçli olarak boştur.",
        "",
        'export type ProductCategory = "peptid" | "hgh" | "aksesuar"',
        "",
        "export const categoryLabels: Record<ProductCategory, string> = {",
        '  peptid: "Peptidler",',
        '  hgh: "İnsan Büyüme Hormonu",',
        '  aksesuar: "Aksesuar",',
        "}",
        "",
        "export const categoryOrder: ProductCategory[] = [\"peptid\", \"hgh\", \"aksesuar\"]",
        "",
        "/** kind: \"spec\" teknik/sunum verisidir. \"claim\" üreticinin",
        " *  etkinlik, kullanım amacı, doz veya yan etki beyanıdır ve sayfada",
        " *  ayrı bir bölümde, kaynağı belirtilerek gösterilir. */",
        "/** Katalogdaki amaç filtresinin sırası. */",
        "export const goalOrder: string[] = " + json.dumps(GOALS, ensure_ascii=False),
        "",
        "export interface ProductSpec {",
        "  label: string",
        "  value: string",
        '  kind: "spec" | "claim"',
        "}",
        "",
        "export interface Product {",
        "  slug: string",
        "  name: string",
        "  sku?: string",
        "  category: ProductCategory",
        "  /** lib/peptides.ts içindeki ansiklopedi kaydı; doluysa ürün sayfası",
        "   * mekanizma, kanıt seviyesi ve PubMed referanslarını oradan çeker. */",
        "  peptideSlug?: string",
        "  image?: string",
        "  /** Kaynak sitedeki USD fiyatı. Referans; sayfada gösterilmez. */",
        "  sourcePriceUsd?: number",
        "  /** Sitede gösterilecek fiyat. Şimdilik boş. */",
        "  price?: string",
        "  /** Kullanım hedefleri; katalogda amaca göre filtreleme için. */",
        "  goals: string[]",
        "  /** Üreticinin stok durumu (kaynak katalogdan). */",
        "  inStock: boolean",
        "  specs: ProductSpec[]",
        "  notes: string[]",
        "}",
        "",
        "export const products: Product[] = [",
    ]

    for p in out:
        lines.append("  {")
        lines.append(f"    slug: {ts(p['slug'])},")
        lines.append(f"    name: {ts(p['name'])},")
        if p["sku"]:
            lines.append(f"    sku: {ts(p['sku'])},")
        lines.append(f"    category: {ts(p['category'])},")
        if p["peptideSlug"]:
            lines.append(f"    peptideSlug: {ts(p['peptideSlug'])},")
        if p["image"]:
            lines.append(f"    image: {ts(p['image'])},")
        if p["sourcePriceUsd"] is not None:
            lines.append(f"    sourcePriceUsd: {p['sourcePriceUsd']},")
        lines.append(f"    goals: {ts(p['goals'])},")
        lines.append(f"    inStock: {'true' if p['inStock'] else 'false'},")
        if p["specs"]:
            lines.append("    specs: [")
            for s in p["specs"]:
                lines.append(
                    f"      {{ label: {ts(s['label'])}, "
                    f"value: {ts(s['value'])}, kind: {ts(s['kind'])} }},"
                )
            lines.append("    ],")
        else:
            lines.append("    specs: [],")
        if p["notes"]:
            lines.append("    notes: [")
            for n in p["notes"]:
                lines.append(f"      {ts(n)},")
            lines.append("    ],")
        else:
            lines.append("    notes: [],")
        lines.append("  },")

    lines += [
        "]",
        "",
        "export function getProduct(slug: string): Product | undefined {",
        "  return products.find((p) => p.slug === slug)",
        "}",
        "",
        "export function productsByCategory(category: ProductCategory): Product[] {",
        "  return products.filter((p) => p.category === category)",
        "}",
        "",
    ]

    with open(os.path.join(REPO, "lib", "products.ts"), "w") as f:
        f.write("\n".join(lines))

    print(f"{len(out)} ürün yazıldı")
    from collections import Counter
    print(Counter(p["category"] for p in out))
    print("ansiklopediye bağlı:", sum(1 for p in out if p["peptideSlug"]))

    if MISSING:
        path = os.path.join(HERE, "missing-translations.json")
        with open(path, "w") as f:
            json.dump(sorted(MISSING), f, ensure_ascii=False, indent=2)
        print(f"ÇEVRİLMEMİŞ: {len(MISSING)} metin -> {path}")
    else:
        print("çevrilmemiş metin yok")


main()
