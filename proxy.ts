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
  "superbot",
  "ninja",
]

export function proxy(request: NextRequest) {
  const agent = request.headers.get("user-agent")?.toLowerCase() ?? ""
  if (agent && COPIER_AGENTS.some((tool) => agent.includes(tool))) {
    return new NextResponse(
      "Bu site toplu indirme araçlarına kapalıdır. İçerik zphctr.com'a aittir.",
      { status: 403, headers: { "content-type": "text/plain; charset=utf-8" } },
    )
  }
  return NextResponse.next()
}

export const config = {
  /* Statik dosyalar ve görseller dışarıda: denetim yalnızca sayfa
   * isteklerinde çalışsın, her karo görselinde değil. */
  matcher: ["/((?!_next/static|_next/image|favicon.ico|products/|brand/).*)"],
}
