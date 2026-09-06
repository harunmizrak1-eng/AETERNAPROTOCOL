import Image from "next/image"
import Link from "next/link"
import { instagramUrl, whatsappLink } from "@/lib/contact"
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
  const list = <ul className="mt-4 grid gap-3">
    {links.map((link) => <li key={link.href}><Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"><span className="h-px w-0 bg-sky-300 transition-all group-hover:w-3" />{link.label}</Link></li>)}
  </ul>
  return <>
    <nav aria-label={title} className="hidden sm:block">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sky-300">{title}</p>
      {list}
    </nav>
    <details className="group rounded-xl border border-white/10 bg-white/[0.03] sm:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-xs font-bold uppercase tracking-[0.16em] text-sky-200"><span>{title}</span><span aria-hidden="true" className="text-lg transition group-open:rotate-45">+</span></summary>
      <nav aria-label={`${title} bağlantıları`} className="border-t border-white/10 px-4 pb-4">{list}</nav>
    </details>
  </>
}

export function Footer() {
  const year = new Date().getFullYear()
  return <footer className="relative z-10 overflow-hidden bg-[#071727] text-white">
    <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#008bd0]/15 blur-3xl" />

    <section className="relative border-b border-white/10 px-5 py-8 sm:px-8 sm:py-10 md:px-10" aria-labelledby="footer-trust-title">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[1.75rem] border border-sky-300/20 bg-[linear-gradient(115deg,rgba(0,139,208,.18),rgba(255,255,255,.04))] lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.17em] text-sky-300"><ShieldIcon /> ZPHC Türkiye doğrulama sözü</div>
          <h2 id="footer-trust-title" className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">Kutuyu bizden alın. Kodu kendiniz doğrulayın.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">Kontrol sizde kalır: ambalajdaki güvenlik kodunu üreticinin doğrulama ekranında doğrudan sorgulayabilirsiniz.</p>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 p-5 sm:flex-row lg:border-l lg:border-t-0 lg:p-8">
          <Link href="/dogrulama" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#071727] transition hover:bg-sky-50">Kodu doğrula <ArrowIcon /></Link>
          <TrackedOutboundLink href={whatsappLink("Merhaba, ürün ve sipariş hakkında bilgi almak istiyorum.")} eventName="WhatsApp Click" properties={{ source: "footer" }} ariaLabel="Resmî WhatsApp hattını aç" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-bold text-white transition hover:border-[#25D366] hover:bg-[#25D366]">Sipariş desteği</TrackedOutboundLink>
        </div>
      </div>
    </section>

    <div className="relative mx-auto max-w-6xl px-6 py-9 md:px-10 md:py-16">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.35fr_.75fr_.75fr_.9fr] lg:gap-12">
        <div>
          <Image src="/brand/zphc-logo.png" alt={siteName} width={250} height={42} className="h-8 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-white">Türkiye stoğu, açık doğrulama ve doğrudan destek.</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/5 px-3 py-2 text-xs font-bold text-sky-200"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,.12)]" /> zphctr.com · Resmî Türkiye alan adı</div>
        </div>

        <FooterLinks title="Mağaza" links={STORE_LINKS} />
        <FooterLinks title="Destek" links={SUPPORT_LINKS} />

        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sky-300">Resmî kanallar</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <TrackedOutboundLink href={instagramUrl} eventName="Instagram Click" properties={{ source: "footer" }} ariaLabel="Instagram hesabımızı aç" className="flex min-h-11 items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white/75 transition hover:border-sky-300/30 hover:text-white"><span>Instagram</span><ArrowIcon /></TrackedOutboundLink>
            <TrackedOutboundLink href={whatsappLink()} eventName="WhatsApp Click" properties={{ source: "footer" }} ariaLabel="WhatsApp hattımızı aç" className="flex min-h-11 items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white/75 transition hover:border-[#25D366]/50 hover:text-white"><span>WhatsApp</span><ArrowIcon /></TrackedOutboundLink>
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Dil seçimi">{LANGUAGES.map((language) => <Link key={language.label} href={language.href} hrefLang={language.label.toLowerCase()} title={language.name} className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-2 text-[11px] font-bold transition ${language.label === "TR" ? "border-sky-300/50 bg-sky-300/10 text-sky-200" : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"}`}>{language.label}</Link>)}</div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 border-t border-white/10 pt-6 text-[0.68rem] leading-5 text-white/40 sm:mt-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <p className="max-w-3xl">Ürünler laboratuvar ve araştırma materyali olarak sunulur; insan kullanımı için tasarlanmamıştır. İçerik bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez.</p>
        <nav aria-label="Yasal bağlantılar" className="flex flex-wrap gap-x-4 gap-y-2"><Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link><Link href="/metodoloji" className="hover:text-white">Metodoloji</Link><Link href="/kosullar" className="hover:text-white">Koşullar</Link><Link href="/gizlilik" className="hover:text-white">KVKK</Link></nav>
      </div>
      <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-5 text-[0.68rem] font-semibold text-white/45 sm:flex-row sm:items-center sm:justify-between"><p>© {year} {siteName}</p><p>Zhengzhou Pharmaceutical · Türkiye distribütörü</p></div>
    </div>
  </footer>
}

function ShieldIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M10 1.5 3 4.6v5.1c0 4.4 3 8.4 7 9.3 4-.9 7-4.9 7-9.3V4.6L10 1.5Zm3.6 6.4-4.2 4.2a.75.75 0 0 1-1.06 0L6.4 10.15a.75.75 0 1 1 1.06-1.06l1.42 1.42 3.67-3.67a.75.75 0 1 1 1.06 1.06Z" clipRule="evenodd" /></svg> }
function ArrowIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4"><path d="M4 10h11M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg> }
