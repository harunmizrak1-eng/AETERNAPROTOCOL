"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function ProductGallery({ name, images, crop = false }: { name: string; images: string[]; crop?: boolean }) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!zoomed) return
    const close = (event: KeyboardEvent) => event.key === "Escape" && setZoomed(false)
    document.addEventListener("keydown", close)
    return () => document.removeEventListener("keydown", close)
  }, [zoomed])

  if (!images.length) return null
  const image = images[active]
  return <>
    <div className="relative overflow-hidden rounded-3xl border border-hairline bg-[radial-gradient(circle_at_50%_30%,#ffffff_0%,#eef6fa_72%)] p-5 sm:p-10">
      <span className="absolute left-5 top-5 z-10 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-xs font-bold text-gold shadow-sm backdrop-blur">Orijinal ZPHC</span>
      <button type="button" onClick={() => setZoomed(true)} className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white/90 text-foreground shadow-sm" aria-label="Ürün görselini büyüt"><span aria-hidden="true">⌕</span></button>
      <button type="button" onClick={() => setZoomed(true)} className="block w-full cursor-zoom-in"><Image src={image} alt={name} width={1000} height={1000} priority sizes="(max-width: 1023px) 90vw, 48vw" className={`mx-auto aspect-square w-full max-w-xl ${crop ? "object-cover" : "object-contain"}`} /></button>
      {images.length > 1 && <div className="mt-4 flex justify-center gap-2">{images.map((source, index) => <button key={source} type="button" onClick={() => setActive(index)} className={`h-16 w-16 rounded-xl border bg-white p-1 ${index === active ? "border-gold" : "border-hairline"}`} aria-label={`${index + 1}. görseli göster`}><Image src={source} alt="" width={64} height={64} className="h-full w-full object-contain" /></button>)}</div>}
      {images.length === 1 && <p className="mt-2 text-center text-xs text-muted-foreground">Büyütmek için görsele dokunun</p>}
    </div>
    {zoomed && <div role="dialog" aria-modal="true" aria-label={`${name} büyük görsel`} className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/85 p-4" onClick={() => setZoomed(false)}><button type="button" onClick={() => setZoomed(false)} className="absolute right-5 top-5 h-11 w-11 rounded-full bg-white text-2xl" aria-label="Büyük görseli kapat">×</button><Image src={image} alt={name} width={1400} height={1400} className="max-h-[90vh] w-auto max-w-[94vw] rounded-2xl bg-white object-contain" /></div>}
  </>
}
