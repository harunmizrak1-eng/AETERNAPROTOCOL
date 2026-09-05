// Single source of truth for outbound contact channels. Keep every WhatsApp
// reference pointed here so it can be changed in one place and never drift
// out of sync across the site.
//
export const whatsappNumber = "905365799647"
export const whatsappDisplay = "+90 536 579 96 47"
export const instagramHandle = "@zphc.tr"
export const instagramUrl = "https://www.instagram.com/zphc.tr/"

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
