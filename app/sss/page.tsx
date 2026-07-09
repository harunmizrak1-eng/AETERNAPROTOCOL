import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { faqItems } from "@/lib/faq"

const description =
  "ÆTERNA hakkında sık sorulan sorular: kanıt seviyesi sistemi, kaynak politikası, vaka analizleri, süreç ve gizlilik."

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description,
  alternates: { canonical: "/sss" },
  openGraph: {
    title: "Sık Sorulan Sorular · ÆTERNA",
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
      <main id="main-content" className="relative z-10 bg-background pt-32">
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
                Sık Sorulan Sorular
              </p>
            </div>
            <h1 className="mt-10 text-balance font-serif text-4xl font-light leading-tight tracking-wide text-foreground sm:text-5xl">
              Açık sorular, açık cevaplar.
            </h1>
          </div>
        </section>

        <section className="px-6 pb-28 sm:pb-36 md:px-10">
          <div className="mx-auto max-w-2xl">
            <dl className="flex flex-col">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="border-t border-hairline py-8 last:border-b"
                >
                  <dt className="font-serif text-xl font-light tracking-wide text-foreground">
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
