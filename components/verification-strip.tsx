import Link from "next/link"
import {
  getBatchRecords,
  validationUrl,
  distributorCertificate,
} from "@/lib/verification"

/* Ürün sayfasındaki orijinallik bloğu.
 *
 * Sahte ürünle rekabetin sitedeki karşılığı rakibi suçlamak değil, alıcıya
 * doğrulamayı kendi eliyle yapabileceğini göstermek. Bu yüzden blok üç şeyi
 * yan yana koyar: kutudaki kod, üreticinin sorgulama adresi ve — elimizde
 * varsa — o ürünün parti/analiz kaydı.
 *
 * Parti kaydı yoksa o bölüm hiç render edilmez. Boş bir "COA mevcut" vaadi,
 * hiç vaat vermemekten kötüdür. */
export function VerificationStrip({ slug }: { slug: string }) {
  const batches = getBatchRecords(slug)

  return (
    <section
      aria-labelledby="orijinallik-basligi"
      className="mt-12 border border-hairline bg-muted/20 p-6 sm:p-8"
    >
      <h2
        id="orijinallik-basligi"
        className="text-xl font-bold tracking-tight text-foreground"
      >
        Orijinallik
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-foreground/85">
        Bu ürünün kutusunda, gümüş kaplamanın altında benzersiz bir doğrulama
        kodu bulunur. Kodu kazıyıp üreticinin kendi sistemine girerek ürünün
        ZPHC üretim hattından çıktığını kendiniz teyit edebilirsiniz. Sonucu biz
        üretmiyoruz; sorgulama üreticinin sunucusunda yapılır.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/dogrulama"
          className="text-sm font-semibold text-gold transition-opacity hover:opacity-70"
        >
          Nasıl doğrulanır →
        </Link>
        <a
          href={validationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          validation.zphc.com
        </a>
        {distributorCertificate && (
          <a
            href={distributorCertificate.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {distributorCertificate.label}
          </a>
        )}
      </div>

      {batches.length > 0 && (
        <div className="mt-8 border-t border-hairline pt-6">
          <h3 className="text-sm font-semibold text-foreground">
            Elimizdeki parti kayıtları
          </h3>
          <dl className="mt-4 divide-y divide-hairline border-t border-hairline">
            {batches.map((b) => (
              <div
                key={b.batch}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-8"
              >
                <dt className="font-mono text-sm text-foreground sm:w-40 sm:shrink-0">
                  {b.batch}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {[b.method, b.result, b.coaDate].filter(Boolean).join(" · ")}
                  {b.coaUrl && (
                    <>
                      {" "}
                      <a
                        href={b.coaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gold transition-opacity hover:opacity-70"
                      >
                        Analiz sertifikası →
                      </a>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  )
}
