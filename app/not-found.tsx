import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { products } from "@/lib/products"

/** 404 sayfası.
 *
 * Varsayılan Next.js sayfası boş bir "404 | This page could not be found"
 * ekranıydı: İngilizce, markasız ve çıkışsız. Katalog adresleri uzun ve
 * kolay bozuluyor (WhatsApp'ta kırpılan link, eski kategori adı, elle
 * yazılan adres), o yüzden buraya düşen ziyaretçi az değil. Sayfa artık
 * kataloğa, aramaya ve WhatsApp'a çıkış veriyor.
 */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-6 py-20 md:px-10">
          <div className="mx-auto max-w-xl text-center">
            <p className="font-mono text-sm text-muted-foreground">404</p>
            <h1 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              Aradığınız sayfayı bulamadık
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Adres yanlış yazılmış veya sayfa taşınmış olabilir. Katalogda{" "}
              {products.length} ürün var, oradan devam edebilirsiniz.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/urunler"
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold/90"
              >
                Ürün kataloğu
              </Link>
              <Link
                href="/"
                className="rounded-full border border-hairline px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold/60 hover:text-gold"
              >
                Ana sayfa
              </Link>
            </div>

            <div className="mt-12 border-t border-hairline pt-8">
              <p className="text-sm text-muted-foreground">
                Aradığınız ürünü bulamıyorsanız doğrudan sorun, bakalım.
              </p>
              <div className="mt-4 flex justify-center">
                <WhatsappCta />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
              {[
                { href: "/peptidler", label: "Bileşik kütüphanesi" },
                { href: "/dogrulama", label: "Orijinallik doğrulama" },
                { href: "/kargo", label: "Kargo ve teslimat" },
                { href: "/sss", label: "Sık sorulan sorular" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-gold underline-offset-4 hover:underline"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
