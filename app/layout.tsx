import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { siteUrl, siteName, siteDescription } from '@/lib/site'
import { WhatsappFloat } from '@/components/whatsapp-float'
import { ProductCompareProvider } from '@/components/product-compare'
import { homeLanguageAlternates } from '@/lib/international-seo'
import { instagramUrl, whatsappLink } from '@/lib/contact'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ZPHC Türkiye · Resmi Peptid ve İnsan Büyüme Hormonu Distribütörü',
    template: '%s · ZPHC Türkiye',
  },
  description: siteDescription,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: '/',
    languages: homeLanguageAlternates(),
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
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteUrl}/#organization`,
                  name: siteName,
                  description: siteDescription,
                  url: siteUrl,
                  logo: `${siteUrl}/brand/zphc-logo.png`,
                  areaServed: 'TR',
                  sameAs: [instagramUrl, whatsappLink()],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'sales',
                    telephone: '+90-536-579-96-47',
                    availableLanguage: ['Turkish', 'English', 'Spanish', 'Arabic'],
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  name: siteName,
                  alternateName: 'ZPHC TR',
                  url: siteUrl,
                  inLanguage: 'tr-TR',
                  publisher: { '@id': `${siteUrl}/#organization` },
                },
              ],
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-sm focus:border focus:border-gold/60 focus:bg-background focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-eyebrow focus:text-gold"
        >
          İçeriğe geç
        </a>
        <ProductCompareProvider>
          {children}
          <WhatsappFloat />
        </ProductCompareProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
