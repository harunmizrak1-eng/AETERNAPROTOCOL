import { whatsappLink } from "@/lib/contact"
import { TrackedOutboundLink } from "@/components/tracked-outbound-link"

/** WhatsApp iletişim düğmesi.
 *
 * Hazır mesaj, ziyaretçinin baktığı ürünün adını taşır ki gelen konuşma
 * bağlamıyla birlikte gelsin. Metin bir soru olarak kalır ("sor"), sipariş
 * talimatı olarak değil: bu sitede sipariş tamamlanmıyor, kopya bunun
 * aksini ima etmemeli.
 *
 * Mesaj bilerek "fiyat ve stok" diyor, genel "bilgi almak istiyorum"
 * demiyor. Düğmelerin üstünde zaten "Fiyat sorun" yazıyordu ama mesaj
 * genel gidiyordu; satıcı ne sorulduğunu anlamayıp geri soruyor, bu da
 * bir tur kaybettiriyordu. Artık ilk mesaj tek cevapla kapanabiliyor.
 */
export function WhatsappCta({
  product,
  label = "WhatsApp’tan yazın",
  variant = "primary",
  message: customMessage,
  source = "general_cta",
  size = "default",
}: {
  product?: string
  label?: string
  variant?: "primary" | "outline"
  /** Fiyat sorusu dışındaki durumlar için hazır mesajı tamamen değiştirir
   * (bozuk sipariş bildirimi, doğrulama sorunu gibi). */
  message?: string
  source?: string
  size?: "default" | "compact"
}) {
  const message =
    customMessage ??
    (product
      ? `Merhaba, ${product} için fiyat ve stok bilgisi alabilir miyim?`
      : "Merhaba, ürün fiyatlarınız ve stok durumu hakkında bilgi alabilir miyim?")

  const base = `inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200 ${
    size === "compact"
      ? "min-h-9 gap-1.5 px-3 py-2 text-xs"
      : "gap-2.5 px-6 py-3 text-sm"
  }`

  const styles =
    variant === "primary"
      ? "bg-whatsapp text-white hover:bg-whatsapp/85"
      : "border border-gold/60 text-gold hover:bg-gold hover:text-primary-foreground"

  return (
    <TrackedOutboundLink
      href={whatsappLink(message)}
      eventName="WhatsApp Click"
      properties={{ source, ...(product ? { product } : {}) }}
      className={`${base} ${styles}`}
    >
      <WhatsappGlyph />
      {label}
    </TrackedOutboundLink>
  )
}

/** Inline mark so the button carries no external image request. */
function WhatsappGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 fill-current"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  )
}
