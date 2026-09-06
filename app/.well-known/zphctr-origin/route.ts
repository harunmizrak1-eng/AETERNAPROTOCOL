import { siteName, siteUrl } from "@/lib/site"

export const dynamic = "force-static"

export function GET() {
  const body = [
    "ZPHCTR CONTENT ORIGIN RECORD",
    `Canonical site: ${siteUrl}`,
    `Publisher: ${siteName}`,
    "Official Instagram: https://www.instagram.com/zphc.tr/",
    "First publication record: Timestamped publication archive maintained by the publisher.",
    "Content reuse is not authorized without written permission.",
  ].join("\n")
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400, immutable" } })
}
