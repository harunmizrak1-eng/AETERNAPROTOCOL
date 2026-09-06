/** Ek ürün fotoğrafları yalnızca kaynağı doğrulanmış fiziksel ambalaj
 * görsellerinden oluşur. Kaynak URL'leri public/brand/IMAGE_SOURCES.md
 * dosyasında kayıtlıdır. */
export const extraProductImages: Record<string, string[]> = {
  "reta-zphc-120-mg-5-vials-x-24-mg": [
    "/brand/zphc-reta-120-kit-official.jpg",
  ],
}

export function productImages(slug: string, primary?: string) {
  return [primary, ...(extraProductImages[slug] ?? [])].filter(
    (image): image is string => Boolean(image),
  )
}
