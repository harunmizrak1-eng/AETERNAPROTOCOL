import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { siteUrl, siteName, siteDescription } from '@/lib/site'
import { WhatsappFloat } from '@/components/whatsapp-float'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ZPHC Türkiye · Resmi Peptid ve İnsan Büyüme Hormonu Distribütörü',
    template: '%s · ZPHC Türkiye',
  },
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName,
    title: 'ZPHC Türkiye · Resmi Peptid ve İnsan Büyüme Hormonu Distribütörü',
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZPHC Türkiye · Resmi Peptid ve İnsan Büyüme Hormonu Distribütörü',
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="bg-background">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: siteName,
              description: siteDescription,
              url: siteUrl,
              areaServed: 'TR',
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-sm focus:border focus:border-gold/60 focus:bg-background focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-eyebrow focus:text-gold"
        >
          İçeriğe geç
        </a>
        {children}
        <WhatsappFloat />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
