import { NextResponse, type NextRequest } from "next/server"

/* Site indirme araçlarını kapıda durduran katman.
 *
 * Bu tek başına bir güvenlik önlemi değil, kararlı birini durdurmaz:
 * kullanıcı ajanı iki tıkla değiştirilebilir. Amacı, hazır bir "siteyi
 * indir" programını açıp adresi yapıştıran düşük çabalı kopyalamayı
 * engellemek. Asıl engelleme Cloudflare tarafında yapılır (bkz.
 * legal/klonlama-onlemleri.md); burada yalnızca en yaygın araçlar var.
 *
 * Liste kasıtlı olarak dar tutuldu. Arama motoru robotlarının hiçbiri
 * burada değil ve olmamalı: tek bir yanlış giriş siteyi Google'dan
 * düşürür. curl engellenmiyor, çünkü kendi izleme ve doğrulama
 * araçlarımız da onu kullanıyor ve zaten sahte ajanla kolayca aşılır. */
const COPIER_AGENTS = [
  "httrack",
  "webcopier",
  "cyotek",
  "webcopy",
  "teleport",
  "offline explorer",
  "sitesucker",
  "webzip",
  "webreaper",
  "webstripper",
  "blackwidow",
  "grab-a-site",
  "web downloader",
  "wget",
  "getleft",
  "pagegrabber",
  "webwhacker",
  "extractorpro",
  /* "ninja" ve "superbot" gibi çok genel kalıplar listeden çıkarıldı:
   * meşru SEO denetim araçlarının adında geçebiliyor ve yanlışlıkla
   * engellenen bir denetçi siteyi "içerik yok" diye raporluyor. */
]

/* Bilinen kopya alan adları. Buradan gelen her istek reddedilir: kopya
 * site bizim sunucumuzdan görsel, açılış kartı veya sayfa çekemez.
 *
 * Denetim Referer başlığına bakar. Sosyal medya önizleme robotları
 * (WhatsApp, Facebook) Referer göndermez, o yüzden boş Referer asla
 * engellenmez — yalnızca açıkça kopya alan adından geldiğini söyleyen
 * istekler durdurulur. Bu, yanlışlıkla kendi paylaşım kartlarımızı
 * kırma riskini sıfırlar.
 *
 * Yeni bir kopya bulunduğunda alan adı bu listeye eklenir. */
const CLONE_HOSTS = ["zphchumaxtr.com"]

function fromClone(referer: string): boolean {
  if (!referer) return false
  try {
    const host = new URL(referer).hostname.toLowerCase().replace(/^www\./, "")
    return CLONE_HOSTS.some((clone) => host === clone || host.endsWith(`.${clone}`))
  } catch {
    return false
  }
}

export function proxy(request: NextRequest) {
  const agent = request.headers.get("user-agent")?.toLowerCase() ?? ""
  if (agent && COPIER_AGENTS.some((tool) => agent.includes(tool))) {
    return new NextResponse(
      "Bu site toplu indirme araçlarına kapalıdır. İçerik zphctr.com'a aittir.",
      { status: 403, headers: { "content-type": "text/plain; charset=utf-8" } },
    )
  }

  if (fromClone(request.headers.get("referer") ?? "")) {
    return new NextResponse("Bu içerik zphctr.com'a aittir.", {
      status: 403,
      headers: { "content-type": "text/plain; charset=utf-8" },
    })
  }

  return NextResponse.next()
}

export const config = {
  /* Ürün görselleri ve marka dosyaları kasıtlı olarak kapsamda: kopya
   * alan adından gelen istekleri durdurmanın tek yolu bu. Yalnızca
   * Next'in kendi paket dosyaları dışarıda, onları kopya siteye zaten
   * yaramıyor. */
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
