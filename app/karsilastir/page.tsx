import type { Metadata } from "next"
import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"
import { getProductForm, StockBadge } from "@/components/product-card"
import { WhatsappCta } from "@/components/whatsapp-cta"
import { categoryLabels, getProduct } from "@/lib/catalog"
import { formatProductPrice, getProductPrice } from "@/lib/product-prices"

export const metadata: Metadata = {
  title: "Ürün karşılaştırma",
  description: "ZPHC ürünlerini form, kutu içeriği, stok ve fiyat bakımından yan yana karşılaştırın.",
  robots: { index: false, follow: true },
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ urunler?: string }>
}) {
  const { urunler } = await searchParams
  const selected = (urunler ?? "")
    .split(",")
    .slice(0, 3)
    .map((slug) => getProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))

  const specLabels = Array.from(
    new Set(
      selected.flatMap((product) =>
        product.specs.filter((spec) => spec.kind === "spec").map((spec) => spec.label),
      ),
    ),
  ).slice(0, 6)

  return (
    <>
      <Nav />
      <main id="main-content" className="bg-background px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="py-10 sm:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Karşılaştırma</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Ürünler arasındaki farkı görün
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              Form, kutu içeriği, stok ve fiyat yan yana gösterilir. Bu tablo ürün özelliklerini karşılaştırır; kullanım önerisi değildir.
            </p>
          </div>

          {selected.length < 2 ? (
            <div className="rounded-2xl border border-hairline bg-surface p-8 text-center">
              <p className="font-semibold text-foreground">Karşılaştırmak için en az iki ürün seçin.</p>
              <Link href="/urunler" className="mt-4 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-white">
                Ürünlere dön
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-hairline">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="bg-surface">
                    <th className="w-40 border-b border-r border-hairline p-4 text-sm text-muted-foreground">Özellik</th>
                    {selected.map((product) => (
                      <th key={product.slug} className="border-b border-hairline p-4 align-top">
                        {product.image && (
                          <Image src={product.image} alt={product.name} width={180} height={180} className="mb-3 h-28 w-28 object-contain" />
                        )}
                        <Link href={`/urunler/${product.slug}`} className="text-base font-bold leading-snug text-foreground hover:text-gold">
                          {product.name}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  <CompareRow label="Fiyat" values={selected.map((product) => {
                    const price = getProductPrice(product.slug)
                    return price ? formatProductPrice(price) : "Fiyat için yazın"
                  })} strong />
                  <CompareRow label="Stok" nodes={selected.map((product) => <StockBadge key={product.slug} inStock={product.inStock} />)} />
                  <CompareRow label="Kategori" values={selected.map((product) => categoryLabels[product.category])} />
                  <CompareRow label="Form" values={selected.map(getProductForm)} />
                  <CompareRow label="SKU" values={selected.map((product) => product.sku ?? "—")} />
                  {specLabels.map((label) => (
                    <CompareRow
                      key={label}
                      label={label}
                      values={selected.map((product) => product.specs.find((spec) => spec.kind === "spec" && spec.label === label)?.value ?? "—")}
                    />
                  ))}
                  <tr>
                    <th className="border-r border-hairline bg-surface p-4 text-sm font-semibold text-foreground">Fiyat ve stok</th>
                    {selected.map((product) => (
                      <td key={product.slug} className="p-4">
                        <WhatsappCta product={product.name} label="WhatsApp’tan sor" size="compact" source="compare_page" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

function CompareRow({ label, values, nodes, strong = false }: { label: string; values?: string[]; nodes?: ReactNode[]; strong?: boolean }) {
  const cells = nodes ?? values ?? []
  return (
    <tr>
      <th className="border-r border-hairline bg-surface p-4 text-sm font-semibold text-foreground">{label}</th>
      {cells.map((value, index) => (
        <td key={`${label}-${index}`} className={`p-4 text-sm leading-relaxed ${strong ? "font-extrabold text-foreground" : "text-muted-foreground"}`}>
          {value}
        </td>
      ))}
    </tr>
  )
}
