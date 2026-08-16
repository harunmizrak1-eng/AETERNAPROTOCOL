import type { Metadata } from "next"

import { WhatsappCta } from "@/components/whatsapp-cta"
import { officialSite, verifyUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Ürün Doğrulama",
  description:
    "ZPHC kutusundaki scratch (kazı-kazan) kod ve seri numarası ile ürün " +
    "orijinalliğini doğrulayın.",
}

const steps = [
  {
    title: "Kutudaki kazı-kazan alanını bulun",
    body: "Her orijinal ZPHC kutusunda gümüş kaplamalı bir doğrulama alanı bulunur. Alan daha önce kazınmışsa ürünü kabul etmeyin.",
  },
  {
    title: "Kaplamayı dikkatlice kazıyın",
    body: "Kaplamanın altındaki benzersiz kodu ortaya çıkarın. Kodu keskin bir cisimle kazımayın; madeni para kenarı yeterlidir.",
  },
  {
    title: "Kodu üreticinin doğrulama servisine girin",
    body: "Kod yalnızca bir kez sorgulanabilir. İlk sorguda 'orijinal' yanıtı alınmalıdır.",
  },
  {
    title: "Sonucu değerlendirin",
    body: "Kod geçersizse veya daha önce sorgulanmış görünüyorsa ürünü kullanmayın ve bizimle iletişime geçin.",
  },
]

export default function DogrulamaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zphc-navy">Ürün Doğrulama</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        ZPHC ürünleri kutu üzerinde benzersiz bir kazı-kazan (scratch) kod ile
        gelir. Bu kod, ürünün üretici tarafından çıkarılmış orijinal bir parti
        olduğunu doğrulamanızı sağlar.
      </p>

      <ol className="mt-8 space-y-5">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zphc-blue text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="text-sm font-bold text-ink">{s.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-10 rounded-lg border border-line p-5">
        <h2 className="text-base font-bold text-zphc-navy">
          Doğrulama servisi
        </h2>
        {verifyUrl ? (
          <>
            <p className="mt-2 text-sm text-ink-soft">
              Kodunuzu üreticinin resmi doğrulama sayfasında sorgulayın.
            </p>
            <a
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center rounded bg-zphc-blue px-6 py-3 text-sm font-semibold text-white hover:bg-zphc-blue-light"
            >
              Resmi doğrulama sayfasına git
            </a>
          </>
        ) : (
          // Tahmini bir doğrulama adresi yayımlamak, kullanıcıyı sahte bir
          // sorgulama sayfasına yönlendirme riski taşır. Resmi adres
          // doğrulanana kadar sorgular bizim üzerimizden ilerler.
          <>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Üreticinin çevrimiçi sorgulama adresi{" "}
              <a
                href={officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-zphc-blue hover:underline"
              >
                zphcstore.com
              </a>{" "}
              üzerinde yayımlanmadığı için burada bir bağlantı verilmemiştir.
              Kodunuzu bize iletin, üretici nezdinde sizin adınıza
              sorgulayalım.
            </p>
            <WhatsappCta
              product="kutumdaki scratch kod doğrulaması"
              label="Kodumu doğrulat"
              className="mt-4"
            />
          </>
        )}
      </section>

      <p className="mt-8 rounded border border-line bg-surface-alt p-4 text-xs leading-relaxed text-ink-soft">
        Doğrulama sonucu şüpheliyse ürünü kullanmayın. Sahte olduğundan
        şüphelendiğiniz bir ürünü nereden temin ettiğinizi de bize bildirin;
        üreticiye bildirim yapılabilmesi için parti numarası ve kutu
        fotoğrafları gereklidir.
      </p>
    </div>
  )
}
