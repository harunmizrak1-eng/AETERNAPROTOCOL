import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 32,
      backgroundColor: "#0072bc",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      fontSize: 96,
      fontWeight: 800,
    }}>Z</div>,
    size,
  )
}
