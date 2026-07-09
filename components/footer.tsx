const EXPLORE_LINKS = [
  { href: "/#kategoriler", label: "Odak Alanları" },
  { href: "/peptidler", label: "Peptid Kütüphanesi" },
  { href: "/biyobelirtecler", label: "Biyobelirteç Sözlüğü" },
  { href: "/journal", label: "Journal" },
  { href: "/longevity-skoru", label: "Longevity Skoru" },
]

const CONSULT_LINKS = [
  { href: "/#danismanlik", label: "Danışmanlık" },
  {
    href: "https://www.instagram.com/aeterna.protocol?igsh=anVvbGp3bGV5MXQ1",
    label: "Instagram",
    external: true,
  },
]

const LEGAL_LINKS = [
  { href: "/metodoloji", label: "Metodoloji" },
  { href: "/sss", label: "Sık Sorulan Sorular" },
  { href: "/gizlilik", label: "Gizlilik & KVKK" },
]

function FooterColumn({
  heading,
  links,
}: {
  heading: string
  links: { href: string; label: string; external?: boolean }[]
}) {
  return (
    <div>
      <p className="text-[0.6rem] uppercase tracking-eyebrow text-foreground/80">
        {heading}
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-hairline px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-8">
          <div>
            <p className="font-serif text-lg tracking-wordmark text-foreground">
              ÆTERNA
            </p>
            <p className="mt-4 max-w-[16ch] text-[0.7rem] leading-relaxed text-muted-foreground">
              Hassas Biyoloji. Özel Erişim.
            </p>
          </div>

          <FooterColumn heading="Keşfet" links={EXPLORE_LINKS} />
          <FooterColumn heading="Danışmanlık" links={CONSULT_LINKS} />
          <FooterColumn heading="Yasal" links={LEGAL_LINKS} />
        </div>

        <div className="border-t border-hairline pt-8">
          <p className="mx-auto max-w-3xl text-center text-[0.7rem] leading-relaxed text-muted-foreground">
            Bu sitedeki içerik yalnızca bilgilendirme amaçlıdır ve tıbbi tavsiye
            yerine geçmez. Hiçbir ifade hastalık teşhis, tedavi veya önleme
            iddiası taşımaz. Herhangi bir protokole başlamadan önce bir hekime
            danışın. Paylaştığınız sağlık verileri gizli tutulur; işleme
            koşulları için Gizlilik &amp; KVKK metnini inceleyin.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-hairline pt-6 text-[0.6rem] uppercase tracking-eyebrow text-muted-foreground sm:flex-row">
          <p>© {year} ÆTERNA. Tüm hakları saklıdır.</p>
          <p>Özel Biyolojik Optimizasyon · Türkiye</p>
        </div>
      </div>
    </footer>
  )
}
