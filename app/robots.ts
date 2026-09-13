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

/* Yukarıdaki listeyle karıştırılmaması gereken robotlar. İkisi de yapay
 * zekâ şirketlerine ait ama işleri farklı:
 *
 *  - Arama robotları (OAI-SearchBot, PerplexityBot, Claude-SearchBot),
 *    cevabın altında kaynak bağlantısı gösterip siteye ziyaretçi yollar.
 *  - Kullanıcı tetiklemeli getiriciler (ChatGPT-User, Claude-User,
 *    Perplexity-User), bir insan "şu adrese bak" dediğinde çalışır.
 *
 * Bunların engellenmesinin somut bir zararı görüldü: siteyi bir yapay
 * zekâ aracına inceleten biri, getirici robots.txt yüzünden sayfayı
 * alamadığı için "sitede ürün listelenmiyor, içerik JavaScript ile
 * yükleniyor, blog yok" gibi tamamen yanlış raporlar aldı. Oysa üçü de
 * sunucuda üretilen ham HTML'de duruyor.
 *
 * Bu yüzden açıkça izin veriliyor. Genel "*" kuralı zaten izin veriyor
 * ama bazı getiriciler kendi adlarına özel bir kural arıyor; adı geçmeyen
 * durumlarda temkinli davranıp çekilebiliyorlar. */
const assistantFetchers = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Bingbot",
  "Googlebot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...assistantFetchers.map((userAgent) => ({ userAgent, allow: "/" })),
      ...bulkCollectors.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
