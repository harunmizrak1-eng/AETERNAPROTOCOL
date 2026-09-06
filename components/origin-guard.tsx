"use client"

import { useEffect, useState } from "react"

const OFFICIAL_HOSTS = new Set(["zphctr.com", "www.zphctr.com", "localhost", "127.0.0.1"])

export function OriginGuard() {
  const [copiedHost, setCopiedHost] = useState("")
  useEffect(() => {
    if (!OFFICIAL_HOSTS.has(window.location.hostname)) setCopiedHost(window.location.hostname)
  }, [])
  if (!copiedHost) return null
  return <div className="fixed inset-x-0 top-0 z-[9999] bg-[#b42318] px-4 py-3 text-center text-sm font-bold text-white shadow-xl" role="alert">
    Yetkisiz kopya uyarısı: Bu sayfa resmî zphctr.com alan adında görüntülenmiyor. Resmî siteye gitmek için <a href="https://zphctr.com" className="underline">zphctr.com</a> adresini kullanın.
  </div>
}
