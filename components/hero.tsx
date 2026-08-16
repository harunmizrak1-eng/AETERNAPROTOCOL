"use client"

import { Reveal } from "@/components/reveal"
import { HeroSignature } from "@/components/hero-signature"
import Link from "next/link"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { lastContentReview } from "@/lib/site"

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,114,188,0.07),transparent_60%)]"
      />
      <HeroSignature />

      <Reveal className="relative z-10 flex flex-col items-center">
        <p className="font-serif text-sm tracking-wordmark text-foreground/60">
          ZPHC TÜRKİYE
        </p>

        <h1 className="mt-6 max-w-3xl text-balance font-serif text-4xl font-light leading-[1.15] tracking-wide text-foreground sm:text-6xl md:text-7xl">
          Zhengzhou Pharmaceutical, Türkiye yetkili distribütörü.
        </h1>

        <p className="mt-8 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          ZPHC peptid ve insan büyüme hormonu hattının tamamı. Her ürün, kutu
          üzerindeki doğrulama koduyla üreticinin sisteminden teyit edilebilir;
          her bileşik, literatür referanslarıyla birlikte kütüphanemizde
          kayıtlıdır.
        </p>

        <p className="mt-6 text-[0.65rem] uppercase tracking-eyebrow text-gold/90">
          73 Ürün · Orijinallik Doğrulaması · Son inceleme: {lastContentReview}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/urunler"
            className="rounded-sm bg-gold px-10 py-4 text-xs uppercase tracking-eyebrow font-medium text-primary-foreground transition-colors duration-300 hover:bg-gold/85"
          >
            Ürün Kataloğu
          </Link>

          <WhatsappCta label="Fiyat ve Stok Sor" variant="outline" />
        </div>
      </Reveal>
    </section>
  )
}
