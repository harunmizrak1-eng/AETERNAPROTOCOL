import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { faqItems } from "@/lib/faq"

const description =
  "ZPHC Türkiye hakkında sık sorulan sorular: ürün çerçevesi, orijinallik doğrulaması, kanıt seviyesi sistemi, kaynak politikası ve tedarik koşulları."

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description,
  alternates: { canonical: "/sss" },
  openGraph: {
    title: "Sık Sorulan Sorular · ZPHC Türkiye",
    description,
    url: "/sss",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <main id="main-content" className="relative z-10 bg-background">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold text-gold">Sık Sorulan Sorular</p>
            <h1 className="mt-10 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Açık sorular, açık cevaplar.
            </h1>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-10">
          <div className="mx-auto max-w-2xl">
            <dl className="flex flex-col">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="border-t border-hairline py-8 last:border-b"
                >
                  <dt className="text-xl tracking-wide text-foreground">
                    {item.question}
                  </dt>
                  <dd className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
              Kanıt sistemimizin ayrıntısı için{" "}
              <Link
                href="/metodoloji"
                className="text-gold underline-offset-4 hover:underline"
              >
                metodoloji sayfamıza
              </Link>{" "}
              bakabilirsiniz.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
