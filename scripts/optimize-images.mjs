/* ZPHC ürün fotoğraflarını WebP'ye çevirir ve boyutlandırır.
 *
 * Kaynak dosyalar 300 KB'a varan JPEG'ler; katalog sayfası 73 tanesini birden
 * yüklüyor. Katalogdaki en büyük gösterim ~600px, 900px üst sınır retina için
 * yeterli. next.config'de image optimizasyonu kapalı olduğu için dosyalar
 * tarayıcıya olduğu gibi gidiyor, bu yüzden diskte küçültmek gerekiyor.
 *
 * Kullanım (proje kökünden):  node scripts/optimize-images.mjs
 */
import sharp from "sharp"
import { readdir, stat, unlink } from "fs/promises"
import path from "path"

const dir = "public/products"
const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f))

if (files.length === 0) {
  console.log("Dönüştürülecek JPEG/PNG yok; hepsi zaten WebP.")
  process.exit(0)
}

let before = 0
let after = 0

for (const f of files) {
  const src = path.join(dir, f)
  before += (await stat(src)).size
  const out = path.join(dir, path.basename(f, path.extname(f)) + ".webp")
  await sharp(src)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out)
  after += (await stat(out)).size
  await unlink(src)
}

console.log(
  `${files.length} görsel | ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`,
)
