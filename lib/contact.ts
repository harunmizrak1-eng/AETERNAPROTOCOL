// Single source of truth for outbound contact channels. Keep every WhatsApp,
// Instagram and e-mail reference pointed here so they can be changed in one
// place and never drift out of sync across the site.

export const contactEmail = "info@aeternaprotocol.net"

export const instagramUrl =
  "https://www.instagram.com/aeterna.protocol?igsh=anVvbGp3bGV5MXQ1"

const whatsappNumber = "905359184587"

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
