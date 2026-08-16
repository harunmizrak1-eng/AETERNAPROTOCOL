import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const CORMORANT_REGULAR =
  "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf"
const CORMORANT_ITALIC =
  "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jDOjw.ttf"

async function loadFont(url: string) {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return await res.arrayBuffer()
  } catch {
    return null
  }
}

export default async function OpengraphImage() {
  const [regular, italic] = await Promise.all([
    loadFont(CORMORANT_REGULAR),
    loadFont(CORMORANT_ITALIC),
  ])
  const hasCormorant = Boolean(regular)

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
          backgroundColor: "#0a0a0a",
        }}
      >
        <div
          style={{
            fontSize: 88,
            letterSpacing: 22,
            color: "#f0ede8",
            fontFamily: hasCormorant ? "Cormorant" : "serif",
            fontWeight: 400,
          }}
        >
          ZPHC TÜRKİYE
        </div>
        <div
          style={{
            marginTop: 28,
            height: 1,
            width: 140,
            backgroundColor: "rgba(196,168,130,0.6)",
          }}
        />
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "#c4a882",
            fontFamily: hasCormorant ? "Cormorant" : "serif",
            fontStyle: "italic",
          }}
        >
          Hassas Biyoloji. Özel Erişim.
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 15,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.45)",
          }}
        >
          Özel Longevity Enstitüsü
        </div>
      </div>
    ),
    {
      ...size,
      fonts: hasCormorant
        ? [
            { name: "Cormorant", data: regular!, style: "normal", weight: 400 },
            ...(italic
              ? [
                  {
                    name: "Cormorant",
                    data: italic,
                    style: "italic" as const,
                    weight: 400 as const,
                  },
                ]
              : []),
          ]
        : undefined,
    },
  )
}
