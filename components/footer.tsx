import Image from "next/image"
import Link from "next/link"
import { whatsappLink } from "@/lib/contact"
import { siteName } from "@/lib/site"
import { TrackedOutboundLink } from "@/components/tracked-outbound-link"

const STORE_LINKS = [
  { href: "/urunler", label: "Tüm ürünler" },
  { href: "/urunler?kategori=Kilo%20Kayb%C4%B1", label: "Kilo kaybı" },
  { href: "/urunler?kategori=Toparlanma%20%26%20Doku%20Onar%C4%B1m%C4%B1", label: "Toparlanma" },
  { href: "/peptidler", label: "Peptid kütüphanesi" },
]

const SUPPORT_LINKS = [
  { href: "/dogrulama", label: "Ürün doğrulama" },
  { href: "/kargo", label: "Kargo ve teslimat" },
  { href: "/iade", label: "İade ve değişim" },
  { href: "/sss", label: "Sıkça sorulanlar" },
]

const LANGUAGES = [
  { href: "/", label: "TR", name: "Türkçe" },
  { href: "/en", label: "EN", name: "English" },
  { href: "/es", label: "ES", name: "Español" },
  { href: "/ar", label: "AR", name: "العربية" },
]

function FooterLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return <nav aria-label={title}>
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-300">{title}</p>
    <ul className="mt-4 grid gap-2.5">
      {links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-white">{link.label}</Link></li>)}
    </ul>
  </nav>
}

export function Footer() {
  const year = new Date().getFullYear()

  return <footer className="bg-[#071727] text-white">
    <div className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <div className="flex items-center gap-4">
          <Image src="/brand/zphc-logo.png" alt={siteName} width={210} height={36} className="h-7 w-auto brightness-0 invert" />
          <span className="hidden h-6 w-px bg-white/20 sm:block" />
          <p className="hidden text-sm text-white/60 sm:block">Türkiye ürün kataloğu</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dogrulama" className="inline-flex min-h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-bold text-[#071727] transition hover:bg-sky-100">Kodu doğrula</Link>
          <TrackedOutboundLink href={whatsappLink("Merhaba, ürün ve sipariş hakkında bilgi almak istiyorum.")} eventName="WhatsApp Click" properties={{ source: "footer" }} ariaLabel="WhatsApp sipariş desteğini aç" className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#25D366]/60 px-4 text-sm font-bold text-white transition hover:bg-[#25D366]">WhatsApp’tan yazın</TrackedOutboundLink>
        </div>
      </div>
    </div>

    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.8fr_1fr] lg:gap-12">
        <div>
          <p className="max-w-xs text-sm leading-6 text-white/70">Ürün adı, stok ve fiyat bilgisi için doğrudan ekibimize yazın. Kutu üzerindeki kodu üreticinin doğrulama ekranında kontrol edin.</p>
          <div className="mt-5"><TrackedOutboundLink href={whatsappLink()} eventName="WhatsApp Click" properties={{ source: "footer" }} ariaLabel="WhatsApp hattımızı aç" className="inline-flex min-h-10 items-center rounded-md border border-[#25D366]/60 px-3 text-sm font-semibold text-white/75 transition hover:bg-[#25D366] hover:text-white">WhatsApp</TrackedOutboundLink></div>
        </div>

        <FooterLinks title="Mağaza" links={STORE_LINKS} />
        <FooterLinks title="Destek" links={SUPPORT_LINKS} />

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-300">Dil / Language</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {LANGUAGES.map((language) => <Link key={language.label} href={language.href} hrefLang={language.label.toLowerCase()} title={language.name} className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-[11px] font-bold transition ${language.label === "TR" ? "border-sky-300/60 bg-sky-300/10 text-sky-200" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"}`}>{language.label}</Link>)}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs leading-5 text-white/45 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-2xl">Ürünler laboratuvar ve araştırma materyali olarak sunulur; insan kullanımı için tasarlanmamıştır.</p>
        <nav aria-label="Yasal bağlantılar" className="flex flex-wrap gap-x-4 gap-y-2"><Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link><Link href="/metodoloji" className="hover:text-white">Metodoloji</Link><Link href="/kosullar" className="hover:text-white">Koşullar</Link><Link href="/gizlilik" className="hover:text-white">KVKK</Link></nav>
      </div>
      <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><p>© {year} {siteName}</p><p>zphctr.com</p></div>
    </div>
  </footer>
}
