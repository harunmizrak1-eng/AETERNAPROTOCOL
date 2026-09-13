import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

/* Toplu içerik toplayan robotlar. Bunlar sayfayı okuyup kendi veri
 * kümelerine alıyor ama karşılığında ziyaretçi göndermiyor.
 *
 * Ayrım bilinçli: yapay zekâ arama robotları (OAI-SearchBot,
 * PerplexityBot) bu listede yok, çünkü onlar cevabın altında kaynak
 * bağlantısı gösteriyor ve site trafiği getiriyor. Aşağıdakiler ise
 * eğitim veya toplu derleme amaçlı tarayıcılar. Google-Extended yalnızca
 * yapay zekâ kullanımını kapatır, arama sıralamasını etkilemez.
 *
 * robots.txt bir kilit değil, bir ricadır; kurallara uymayan kazıyıcı
 * yine de girer. Onları durduran katman Cloudflare tarafıdır. */
const bulkCollectors = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  "cohere-ai",
  "Timpibot",
  "Scrapy",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...bulkCollectors.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
