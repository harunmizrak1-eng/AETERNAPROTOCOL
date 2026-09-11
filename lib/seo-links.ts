import type { Product } from "@/lib/catalog"

export type SeoFamilyLink = {
  href: string
  label: string
}

const peptideFamilyLinks: Record<string, SeoFamilyLink> = {
  retatrutide: { href: "/zphc-reta", label: "Tüm ZPHC Reta ürünleri" },
  "bpc-157": { href: "/zphc-bpc-157", label: "Tüm ZPHC BPC-157 ürünleri" },
  "ghk-cu": { href: "/zphc-ghk-cu", label: "Tüm ZPHC GHK-Cu ürünleri" },
  hgh: { href: "/zphc-zptrop", label: "ZPHC ZPtrop ürün grubu" },
}

const blendsLink: SeoFamilyLink = {
  href: "/zphc-peptid-karisimlari",
  label: "ZPHC hazır karışımları",
}

export function getProductFamilyLinks(
  product: Pick<Product, "slug" | "peptideSlug">,
): SeoFamilyLink[] {
  const links: SeoFamilyLink[] = []
  const peptideLink = product.peptideSlug
    ? peptideFamilyLinks[product.peptideSlug]
    : undefined

  if (peptideLink) links.push(peptideLink)
  if (product.slug.includes("-mix-")) links.push(blendsLink)

  return links.filter(
    (link, index, all) =>
      all.findIndex((candidate) => candidate.href === link.href) === index,
  )
}

export function getPeptideFamilyLink(
  peptideSlug: string,
): SeoFamilyLink | undefined {
  return peptideFamilyLinks[peptideSlug]
}
