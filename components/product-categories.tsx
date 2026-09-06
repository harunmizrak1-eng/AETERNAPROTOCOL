import Link from "next/link"
import Image from "next/image"
import { products, goalOrder } from "@/lib/catalog"

const COVER: Record<string, string> = {
  "Kilo Kaybı": "retatrutide-60mg-5x12mg-zphc",
  "Toparlanma & Doku Onarımı": "bpc157-25mg-5x5mg-zphc",
  "Büyüme Hormonu": "zptrop-hgh-100iu-aq-vial-zphc",
  "Cilt & Yaşlanma Karşıtı": "ghk-cu-60mg-with-bacteriostatic-water-zphc",
  "Uzun Yaşam": "nad-plus-2500mg-zphc",
  Diğer: "melanotan-2-30mg-aq-pen-zphc",
}

const FAMILY_LINKS = [
  { href: "/zphc-reta", label: "Reta" },
  { href: "/zphc-bpc-157", label: "BPC-157" },
  { href: "/zphc-ghk-cu", label: "GHK-Cu" },
  { href: "/zphc-zptrop", label: "ZPtrop" },
  { href: "/zphc-peptid-karisimlari", label: "Karışımlar" },
]

export function ProductCategories() {
  const groups = goalOrder.map((goal) => {
    const items = products.filter((product) => product.goals.includes(goal))
    const cover = items.find((product) => product.slug === COVER[goal]) ?? items.find((product) => product.image) ?? items[0]
    return { goal, count: items.length, image: cover?.image }
  }).filter((group) => group.count > 0)

  return <section className="border-b border-hairline bg-[#f4f8fb] px-5 py-12 sm:px-6 md:px-10 md:py-16" aria-labelledby="category-title">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-6 border-b border-[#b9dced] pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">Katalog dizini · 02</p><h2 id="category-title" className="mt-2 text-3xl font-bold tracking-[-0.025em] text-foreground sm:text-4xl">Ne aradığınızı seçin.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Uzun ürün listesinde kaybolmayın. Önce ürün grubunu daraltın.</p></div>
        <nav aria-label="Popüler ürün aileleri" className="flex max-w-full gap-0 overflow-x-auto border border-[#b9dced] bg-white">{FAMILY_LINKS.map((item) => <Link key={item.href} href={item.href} className="shrink-0 border-r border-[#b9dced] px-4 py-3 text-xs font-bold text-foreground transition last:border-r-0 hover:bg-gold hover:text-white">{item.label}</Link>)}</nav>
      </div>

      <ol className="mt-8 grid border-l border-t border-[#c9dbe5] sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ goal, count, image }, index) => <li key={goal} className="border-b border-r border-[#c9dbe5] bg-white"><Link href={`/urunler?kategori=${encodeURIComponent(goal)}`} className="group grid min-h-44 grid-cols-[1fr_8rem] overflow-hidden transition hover:bg-[#fafdff] sm:min-h-48"><div className="flex flex-col p-5"><span className="font-mono text-[0.65rem] text-gold">{String(index + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")}</span><h3 className="mt-4 text-lg font-bold leading-tight tracking-tight text-foreground sm:text-xl">{goal}</h3><p className="mt-2 text-xs font-semibold text-muted-foreground">{count} ürün</p><span className="mt-auto pt-4 text-sm font-bold text-gold">Rafı aç <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span></span></div>{image && <div className="flex items-center border-l border-[#e0eaf0] bg-[#f4f8fb] p-2"><Image src={image} alt="" width={220} height={220} className="aspect-square w-full object-contain transition duration-300 group-hover:scale-105" /></div>}</Link></li>)}
      </ol>
    </div>
  </section>
}
