import Image from "next/image"
import Link from "next/link"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { TrackedOutboundLink } from "@/components/tracked-outbound-link"
import { instagramUrl } from "@/lib/contact"
import { products } from "@/lib/catalog"
import { formatProductPrice, getProductPrice } from "@/lib/product-prices"

const HERO_SLUGS = [
  "retatrutide-60mg-5x12mg-zphc",
  "bpc157-25mg-5x5mg-zphc",
  "ghk-cu-60mg-with-bacteriostatic-water-zphc",
]

export function Hero() {
  const featured = HERO_SLUGS.map((slug) => products.find((product) => product.slug === slug)).filter((product): product is NonNullable<typeof product> => Boolean(product?.image))
  return <section className="overflow-hidden border-b border-hairline bg-white">
    <div className="mx-auto grid max-w-7xl lg:grid-cols-[.92fr_1.08fr]">
      <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-16 lg:py-20">
        <div className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.19em] text-gold"><span className="h-px w-8 bg-gold" /> ZPHC Türkiye</div>
        <h1 className="mt-5 max-w-2xl text-balance text-4xl font-bold leading-[1.03] tracking-[-0.035em] text-foreground sm:text-6xl">Kutuyu görün.<br />Kodu doğrulayın.<br /><span className="text-gold">Sonra karar verin.</span></h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">Orijinal ZPHC ürünleri, Türkiye stoğu ve üreticinin kendi doğrulama sistemi. Fiyat, stok ve gönderim bilgisi açıkça ürün sayfasında.</p>
        <div className="mt-7 flex flex-wrap gap-2.5"><Link href="/urunler" className="inline-flex min-h-12 items-center justify-center bg-gold px-6 text-sm font-bold text-white transition hover:bg-[#0067a8]">Mağazaya gir →</Link><WhatsappCta label="WhatsApp’tan yazın" size="compact" source="home_hero" /><TrackedOutboundLink href={instagramUrl} eventName="Instagram Click" properties={{ source: "home_hero" }} ariaLabel="ZPHC Türkiye Instagram hesabını takip et" className="inline-flex min-h-12 items-center justify-center border border-[#d6249f]/30 px-5 text-sm font-bold text-[#b51a79] transition hover:border-[#d6249f] hover:bg-[#fff6fb]">Instagram’dan takip et</TrackedOutboundLink></div>
        <div className="mt-8 grid grid-cols-3 border-y border-hairline py-4 text-center"><div className="border-r border-hairline px-2"><strong className="block text-lg text-foreground">{products.length}</strong><span className="text-[0.65rem] text-muted-foreground">aktif ürün</span></div><div className="border-r border-hairline px-2"><strong className="block text-lg text-foreground">3 adım</strong><span className="text-[0.65rem] text-muted-foreground">kutu kontrolü</span></div><div className="px-2"><strong className="block text-lg text-foreground">1 gün</strong><span className="text-[0.65rem] text-muted-foreground">kargo çıkışı</span></div></div>
      </div>

      <div className="relative bg-[#eef7fc] px-5 py-9 sm:px-8 lg:px-10 lg:py-14">
        <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:linear-gradient(#b9dced_1px,transparent_1px),linear-gradient(90deg,#b9dced_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="relative border border-[#b9dced] bg-white shadow-[16px_16px_0_#cce7f4]">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3"><span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">Türkiye seçkisi · 01</span><Link href="/urunler" className="text-xs font-bold text-foreground">Tümünü gör</Link></div>
          <div className="grid grid-cols-3 divide-x divide-hairline">
            {featured.map((product, index) => { const price = getProductPrice(product.slug); return <Link key={product.slug} href={`/urunler/${product.slug}`} className="group flex min-w-0 flex-col bg-white p-2.5 transition hover:bg-[#f7fbfe] sm:p-4"><span className="font-mono text-[0.6rem] text-muted-foreground">0{index + 1}</span><Image src={product.image!} alt={product.name} width={420} height={420} sizes="(max-width: 1023px) 30vw, 17vw" className="mt-2 aspect-square w-full object-contain transition duration-300 group-hover:scale-[1.03]" /><h2 className="mt-3 line-clamp-2 min-h-9 text-xs font-bold leading-4 text-foreground sm:text-sm sm:leading-5">{product.name}</h2><p className="mt-2 text-xs font-extrabold text-gold sm:text-base">{price ? formatProductPrice(price) : "Fiyat için yazın"}</p></Link> })}
          </div>
          <Link href="/dogrulama" className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-t border-hairline bg-[#071727] px-4 py-4 text-white"><span className="flex h-8 w-8 items-center justify-center border border-sky-300/30 text-sky-300">✓</span><span><strong className="block text-sm">Üretici koduyla doğrulama</strong><small className="text-white/55">Kodu siz girin, sonucu siz görün.</small></span><span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  </section>
}
