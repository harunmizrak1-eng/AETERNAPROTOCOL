"use client"

import { Reveal } from "@/components/reveal"
import { HeroSignature } from "@/components/hero-signature"
import Link from "next/link"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { lastContentReview } from "@/lib/site"

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,114,188,0.07),transparent_60%)]"
      />
      <HeroSignature />

      <Reveal className="relative z-10 flex flex-col items-center">
        <p className="font-serif text-sm tracking-wordmark text-foreground/60">
          ZPHC TÜRKİYE
        </p>

        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          ZPHC peptid ve büyüme hormonu ürünleri
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          Zhengzhou Pharmaceutical Türkiye distribütörü. Kutudaki kodla
          ürününüzün orijinal olduğunu üreticinin sitesinden doğrulayın.
        </p>

        <p className="mt-5 text-xs text-muted-foreground">
          İçerik son güncelleme: {lastContentReview}
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/urunler"
            className="rounded-md bg-gold px-8 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold/85"
          >
            Ürünleri incele
          </Link>

          <WhatsappCta label="Fiyat sor" variant="outline" />
        </div>
      </Reveal>
    </section>
  )
}
