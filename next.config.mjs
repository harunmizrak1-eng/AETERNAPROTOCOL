const retiredProductSlugs = [
  'aod9604-25mg-5x5mg-zphc',
  'cagrilintide-25mg-zphc',
  'double-burn-mix-5mg-5x5mg-zphc',
  'ipamorelin-25mg-5x5mg-zphc',
  'melanotan-2-30mg-aq-pen-zphc',
  'multi-use-pen-36iu-cartridges-zphc',
  'tirze-zphc-75-mg-dual-cartridge-pen',
  'tirzepatide-zphc-150-mg-5-vials-x-30-mg',
  'tirzepatide-30mg-aq-pen-zphc',
  'tirzepatide-37p5mg-5x7p5mg-zphc',
  'aicar-250mg-total-5x50mg-zphc',
  'ghrp-2-25mg-5x5mg-zphc-2',
  'hp-hcg-5000iu-vial-zphc',
  'll-37-zphc-25mg-kit',
  'semaglutide-zphc-50-mg-5-vials-x-10-mg',
  'semaglutide-6mg-aq-pen-zphc',
  'zptrop-144iu-2x72iu-two-chamber-cartridges-zphc',
  'zphc-zptrop-72iu-dual-chamber-pen',
  'zptrop-hgh-36iu-aq-pen-zphc',
  'zptropin-hgh-320iu-zphc',
  'zptrop-hgh-200iu-2x100iu-zphc',
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      ...retiredProductSlugs.map((slug) => ({
        source: `/urunler/${slug}`,
        destination: '/urunler',
        permanent: true,
      })),
      { source: '/zphc-tirze', destination: '/urunler', permanent: true },
      { source: '/en/zphc-tirzepatide', destination: '/en/products', permanent: true },
      { source: '/es/zphc-tirzepatida', destination: '/es/products', permanent: true },
      { source: '/ar/zphc-tirzepatide', destination: '/ar/products', permanent: true },
    ]
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Origin', value: 'https://zphctr.com' },
      { key: 'Link', value: '<https://zphctr.com/orijin>; rel="author"' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
    ] }]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
