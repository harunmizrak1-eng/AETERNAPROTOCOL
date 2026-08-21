// Single source of truth for outbound contact channels. Keep every WhatsApp
// reference pointed here so it can be changed in one place and never drift
// out of sync across the site.
//
// E-posta ve Instagram bilerek kaldırıldı: ikisi de kapatılan ÆTERNA
// markasına aitti (info@aeternaprotocol.net, instagram.com/aeterna.protocol).
// Çalışmayan bir kutuya veya eski marka hesabına link vermek, doğru adres
// hiç göstermemekten daha kötü. ZPHC Türkiye adına yeni kanallar açıldığında
// buraya eklenip footer'a bağlanabilir. Şu an tüm iletişim WhatsApp üzerinden.

const whatsappNumber = "905359184587"

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
