import Image from "next/image"
import { instagramHandle, instagramUrl, whatsappLink } from "@/lib/contact"
import { siteName, siteTagline } from "@/lib/site"

const EXPLORE_LINKS = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/peptidler", label: "Kütüphane" },
  { href: "/journal", label: "Bilgi Merkezi" },
  { href: "/hakkimizda", label: "Hakkımızda" },
]

const CONSULT_LINKS = [
  { href: "/dogrulama", label: "Doğrulama" },
  { href: "/kargo", label: "Kargo & Teslimat" },
  { href: "/iade", label: "İade & Değişim" },
  { href: whatsappLink(), label: "WhatsApp", external: true },
  { href: instagramUrl, label: `Instagram ${instagramHandle}`, external: true },
]

const LEGAL_LINKS = [
  { href: "/metodoloji", label: "Metodoloji" },
  { href: "/orijin", label: "Resmî Kanallar & Kaynak" },
  { href: "/yorum", label: "Müşteri Yorumları" },
  { href: "/sss", label: "Sıkça sorulanlar" },
  { href: "/kosullar", label: "Kullanım Koşulları" },
  { href: "/gizlilik", label: "Gizlilik & KVKK" },
]

const LANGUAGE_LINKS = [
  { href: "/", label: "Türkçe" },
  { href: "/en", label: "English" },
  { href: "/es", label: "Español" },
  { href: "/ar", label: "العربية" },
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
      <p className="text-xs tracking-normal text-foreground/80 font-medium">
        {heading}
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => {
          const isEmail = link.label.includes("@")
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`text-sm text-muted-foreground transition-colors hover:text-foreground ${
                  isEmail
                    ? "break-all lowercase"
                    : "tracking-normal"
                }`}
              >
                {link.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-hairline px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-5 sm:gap-8">
          <div>
            <Image
              src="/brand/zphc-logo.png"
              alt={siteName}
              width={250}
              height={42}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-[22ch] text-xs font-semibold leading-relaxed text-foreground">
              {siteTagline}
            </p>
          </div>

          <FooterColumn heading="Keşfet" links={EXPLORE_LINKS} />
          <FooterColumn heading="İletişim" links={CONSULT_LINKS} />
          <FooterColumn heading="Yasal" links={LEGAL_LINKS} />
          <FooterColumn heading="Dil / Language" links={LANGUAGE_LINKS} />
        </div>

        <div className="border-t border-hairline pt-8">
          <p className="mx-auto max-w-3xl text-center text-[0.7rem] leading-relaxed text-muted-foreground">
            Bu sitedeki ürünler laboratuvar ve araştırma materyali olarak
            sunulur; insan kullanımı için tasarlanmamıştır. İçerik yalnızca
            bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. Hiçbir
            ifade hastalık teşhis, tedavi veya önleme iddiası taşımaz. Sağlık
            kararlarınız için hekiminize danışın. Paylaştığınız veriler gizli
            tutulur; işleme koşulları için Gizlilik &amp; KVKK metnini
            inceleyin.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-hairline pt-6 text-xs tracking-normal text-muted-foreground sm:flex-row font-medium">
          <p>© {year} {siteName}. Tüm hakları saklıdır.</p>
          <p>Zhengzhou Pharmaceutical · Resmi Distribütör</p>
        </div>
      </div>
    </footer>
  )
}
