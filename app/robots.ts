import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

/* Toplu içerik toplayan robotların tamamı kapalı.
 *
 * Ayrım yapılmıyor: ne eğitim amaçlı kazıyıcılar, ne yapay zekâ arama
 * robotları, ne de kullanıcı tetiklemeli getiriciler. Hepsi sayfayı okuyup
 * kendi tarafında kullanıyor ve içeriğin kopyalanmasına zemin hazırlıyor.
 *
 * robots.txt bir kilit değil, ricadır; kurallara uymayan kazıyıcı yine de
 * girer. Onları gerçekten durduran katman Cloudflare tarafıdır, ayarları
 * legal/klonlama-onlemleri.md dosyasında. */
const blockedCollectors = [
  // Eğitim ve toplu derleme
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
  "FacebookBot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "AI2Bot",
  "Kangaroo Bot",
  "PanguBot",
  "Webzio-Extended",
  "img2dataset",
  "peer39_crawler",
  // Yapay zekâ arama robotları
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "YouBot",
  "Applebot-Extended",
  // Kullanıcı tetiklemeli getiriciler
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
  "DuckAssistBot",
  // SEO ve içerik izleme tarayıcıları
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "BLEXBot",
  "SeekportBot",
  "serpstatbot",
]

/* Arama motorlarının kendisi kapatılmıyor. Googlebot ve Bingbot'u
 * engellemek siteyi aramadan tamamen düşürür; kopya siteyle sıralamada
 * yarışmanın tek yolu bunların girmesi. Burada amaç içeriği toplayanı
 * durdurmak, müşteriyi getireni değil. */
const searchEngines = ["Googlebot", "Googlebot-Image", "Bingbot", "Applebot", "YandexBot", "DuckDuckBot"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...searchEngines.map((userAgent) => ({ userAgent, allow: "/" })),
      ...blockedCollectors.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
