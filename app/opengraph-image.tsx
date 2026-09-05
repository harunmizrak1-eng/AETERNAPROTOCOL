import { ImageResponse } from "next/og"
import { products } from "@/lib/catalog"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/* WhatsApp, Instagram veya arama sonuçlarında link paylaşıldığında görünen
 * kart görseli. Önceki hâli kapatılan ÆTERNA markasından kalmıştı: siyah
 * zemin, Cormorant italik ve "Özel Longevity Enstitüsü" alt başlığı — yani
 * paylaşılan her linkte yanlış marka görünüyordu. Sitenin kendi kimliğine
 * (beyaz zemin, ZPHC mavisi #0072bc, Helvetica) göre yeniden yazıldı.
 *
 * Webfont yüklenmiyor: sistem sans yığını hem sitenin tipografisiyle aynı
 * hem de görsel üretimini dış bir isteğe bağımlı olmaktan çıkarıyor. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#0072bc",
              letterSpacing: -2,
            }}
          >
            ZPHC
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#0d1b2a",
              letterSpacing: -2,
            }}
          >
            TÜRKİYE
          </div>
        </div>

        <div
          style={{
            marginTop: 26,
            fontSize: 34,
            fontWeight: 700,
            color: "#0d1b2a",
          }}
        >
          Resmi Distribütör
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 26,
            color: "rgba(13,27,42,0.65)",
            textAlign: "center",
          }}
        >
          {`Peptid ve insan büyüme hormonu · ${products.length} ürün`}
        </div>

        <div
          style={{
            marginTop: 46,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#0072bc",
            color: "#ffffff",
            fontSize: 24,
            fontWeight: 700,
            padding: "14px 34px",
            borderRadius: 99,
          }}
        >
          zphctr.com
        </div>
      </div>
    ),
    size,
  )
}
