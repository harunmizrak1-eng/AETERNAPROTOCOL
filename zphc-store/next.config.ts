import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Product imagery is vendored into public/urunler at build time, so no
  // remote image hosts are needed and the site has no third-party requests.
  images: {
    formats: ["image/webp"],
  },
}

export default nextConfig
