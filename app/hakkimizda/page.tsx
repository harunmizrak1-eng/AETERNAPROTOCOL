import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { products } from "@/lib/products"
import { peptides } from "@/lib/peptides"

const description =
  "ZPHC (Zhengzhou Pharmaceutical) peptid ve insan büyüme hormonu hattının resmi Türkiye distribütörü. Ne satıyoruz, ne satmıyoruz ve orijinalliği nasıl doğrulayabilirsiniz."

export const metadata: Metadata = {
  title: "Hakkımızda",
  description,
  alternates: { canonical: "/hakkimizda" },
  openGraph: {
    title: "Hakkımızda · ZPHC Türkiye",
    description,
    url: "/hakkimizda",
  },
}

export default function HakkimizdaPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold text-gold">Hakkımızda</p>
            <h1 className="mt-8 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              ZPHC Türkiye
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground/85">
              Zhengzhou Pharmaceutical Co. Ltd (ZPHC) markasının peptid ve
              insan büyüme hormonu hattı için Türkiye&apos;deki resmi
              distribütörüyüz. Ürünler soğuk zincire uygun şekilde doğrudan
              depomuzdan çıkar; aradan başka bir satıcı geçmez.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto flex max-w-2xl flex-col gap-12">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Ne satıyoruz
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Katalogumuzda {products.length} ürün var ve tamamı ZPHC&apos;nin
                peptid ve insan büyüme hormonu hattından geliyor. Her ürün,{" "}
                {peptides.length} bileşiklik kütüphanemizdeki bilimsel kaydına
                bağlı: etki mekanizması, kanıt seviyesi ve varsa literatür
                referansları orada duruyor.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Ne satmıyoruz
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                ZPHC dünya genelinde anabolik steroid de üretiyor. Biz o hattı
                Türkiye&apos;de satmıyoruz ve katalogumuzda yer vermiyoruz.
                Kapsamımız yalnızca peptid ve büyüme hormonu ürünleridir.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Orijinalliği bize güvenerek değil, üreticiye sorarak
                doğrulayın
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                ZPHC her kutuya, gümüş kaplamanın altına benzersiz bir kod
                basıyor. Bu kodu üreticinin kendi sistemine
                (validation.zphc.com) girerek ürünün orijinal olup olmadığını
                kendiniz görebilirsiniz. Sonucu biz üretmiyoruz; sorgu
                üreticinin sunucusunda yapılıyor. Bir satıcının
                &quot;orijinaldir&quot; demesiyle üreticinin doğrulaması aynı
                şey değildir.
              </p>
              <Link
                href="/dogrulama"
                className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
              >
                Adım adım nasıl doğrulanır →
              </Link>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Neden fiyat listesi yayımlamıyoruz
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Fiyat ve stok; ürüne, miktara ve tedarik koşullarına göre
                değişiyor. Güncelliğini yitirmiş bir liste yayımlamak yerine
                fiyatı doğrudan soruyorsunuz, biz de o anki gerçek durumu
                iletiyoruz.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Ticari ilişkimizi saklamıyoruz
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Kütüphanede sınıflandırdığımız bileşiklerin bir kısmını aynı
                zamanda satıyoruz. Bu bir çıkar çatışmasıdır ve gizlemek yerine
                açıkça belirtiyoruz. Kanıt sınıflandırması bundan etkilenmez:
                preklinik bir bileşik, ne kadar satarsa satsın preklinik
                kalır. Üreticinin kendi etkinlik iddialarını da her zaman ayrı
                bir bölümde, doğrulanmamış olduklarını belirterek gösteriyoruz.
              </p>
              <Link
                href="/metodoloji"
                className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
              >
                Kanıtı nasıl değerlendiriyoruz →
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-6 py-16 text-center md:px-10">
          <p className="mx-auto max-w-lg text-pretty text-lg font-medium leading-relaxed text-foreground">
            Ürün, fiyat veya stok sorularınız için doğrudan yazın.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsappCta />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
