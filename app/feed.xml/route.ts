import { articles } from "@/lib/articles"
import { siteDescription, siteName, siteUrl } from "@/lib/site"

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] ?? character)
}

export function GET() {
  const items = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((article) => `
      <item>
        <title>${escapeXml(article.title)}</title>
        <link>${siteUrl}/journal/${article.slug}</link>
        <guid isPermaLink="true">${siteUrl}/journal/${article.slug}</guid>
        <description>${escapeXml(article.excerpt)}</description>
        <pubDate>${new Date(`${article.date}T09:00:00+03:00`).toUTCString()}</pubDate>
      </item>`)
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteName)} Bilgi Merkezi</title>
        <link>${siteUrl}/journal</link>
        <description>${escapeXml(siteDescription)}</description>
        <language>tr-TR</language>${items}
      </channel>
    </rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
