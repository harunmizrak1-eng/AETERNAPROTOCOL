import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { products } from "@/lib/catalog"
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
              Zhengzhou Pharmaceutical (ZPHC) markasının peptid ve büyüme
              hormonu ürünlerini Türkiye&apos;ye biz getiriyoruz. Siparişler
              doğrudan bizim depomuzdan çıkıyor, arada başka bir satıcı yok.
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
                Katalogda {products.length} ürün var, hepsi ZPHC&apos;nin peptid
                ve büyüme hormonu ürünleri. Her ürünün sayfasından{" "}
                {peptides.length} bileşiklik kütüphanemize geçebilirsiniz;
                orada bileşiğin ne işe yaradığı, kanıt seviyesi ve varsa
                yayımlanmış çalışmalar yazıyor.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Ne satmıyoruz
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                ZPHC anabolik steroid de üretiyor. Biz o ürünleri satmıyoruz,
                katalogda da yer vermiyoruz. Sadece peptid ve büyüme hormonu
                satıyoruz.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Orijinalliği bize güvenerek değil, üreticiye sorarak
                doğrulayın
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Her kutuda gümüş bir bant var, kazıyınca altından o ürüne özel
                bir kod çıkıyor. Bu kodu validation.zphc.com adresine
                girdiğinizde cevabı doğrudan üreticiden alıyorsunuz. Sorgu
                bizim sitemizde değil, üreticinin sunucusunda yapılıyor. Bir
                satıcının &quot;orijinaldir&quot; demesiyle üreticinin
                onaylaması aynı şey değil.
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
                Fiyat ve stok sık değişiyor. Eski bir listeyi sitede tutup
                sonra &quot;o fiyat geçti&quot; demektense, sorduğunuzda o
                günkü gerçek fiyatı söylemeyi tercih ediyoruz.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Ticari ilişkimizi saklamıyoruz
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Kütüphanede değerlendirdiğimiz bileşiklerin bir kısmını aynı
                zamanda satıyoruz. Bunu saklamıyoruz. Ama kanıt seviyesi satışa
                göre değişmiyor: bir bileşiğin insan çalışması yoksa, ne kadar
                satarsa satsın bunu yazıyoruz. Üreticinin kendi iddialarını da
                ayrı bir başlıkta, doğrulanmadığını belirterek veriyoruz.
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
