"use client"

import { useEffect, useState } from "react"
import { instagramUrl, whatsappLink } from "@/lib/contact"
import { TrackedOutboundLink } from "@/components/tracked-outbound-link"

export function WhatsappFloat() {
  const [open, setOpen] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting)
      if (entry.isIntersecting) setOpen(false)
    }, { threshold: 0.05 })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return <div className={`fixed bottom-20 right-3 z-40 flex flex-col items-end gap-2.5 transition-all duration-200 sm:bottom-6 sm:right-6 ${footerVisible ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"}`} aria-hidden={footerVisible} aria-label="Resmî iletişim kanalları">
    <div className={`${open ? "flex" : "hidden"} flex-col items-end gap-2.5 sm:flex`}>
      <TrackedOutboundLink href={instagramUrl} eventName="Instagram Click" properties={{ source: "floating_button" }} ariaLabel="ZPHC Türkiye Instagram hesabını aç" className="group flex items-center gap-2 rounded-full text-white sm:gap-0">
        <span className="rounded-full bg-slate-900 px-3 py-2 text-xs font-bold shadow-lg sm:hidden">Instagram</span><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_105%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285aeb_90%)] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform group-hover:scale-105 sm:h-14 sm:w-14"><InstagramIcon /></span>
      </TrackedOutboundLink>
      <TrackedOutboundLink href={whatsappLink("Merhaba, ürün fiyatları ve stok durumu hakkında bilgi alabilir miyim?")} eventName="WhatsApp Click" properties={{ source: "floating_button" }} ariaLabel="WhatsApp'tan yazın" className="group flex items-center gap-2 rounded-full text-white sm:gap-0">
        <span className="rounded-full bg-slate-900 px-3 py-2 text-xs font-bold shadow-lg sm:hidden">WhatsApp</span><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform group-hover:scale-105 sm:h-14 sm:w-14"><WhatsappIcon /></span>
      </TrackedOutboundLink>
    </div>
    <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "İletişim menüsünü kapat" : "İletişim menüsünü aç"} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white shadow-xl sm:hidden"><span className={`text-xl transition-transform ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span></button>
  </div>
}

function InstagramIcon() { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6" stroke="currentColor" strokeWidth="1.9"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg> }
function WhatsappIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z"/></svg> }
