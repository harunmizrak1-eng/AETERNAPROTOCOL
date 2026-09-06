import { createHash } from "node:crypto"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { relative, resolve } from "node:path"

const root = process.cwd()
const includedRoots = ["app", "components", "lib"]
const files = []

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) await walk(path)
    else if (/\.(ts|tsx|css|md)$/.test(entry.name)) files.push(path)
  }
}

for (const directory of includedRoots) await walk(resolve(root, directory))
files.sort()
const records = []
for (const file of files) {
  const content = await readFile(file)
  records.push({ path: relative(root, file).replaceAll("\\", "/"), sha256: createHash("sha256").update(content).digest("hex") })
}

const manifest = {
  canonicalDomain: "https://zphctr.com",
  publisher: "ZPHC Türkiye",
  generatedAt: new Date().toISOString(),
  algorithm: "SHA-256",
  purpose: "Original-content provenance and clone complaint evidence",
  files: records,
}

await writeFile(resolve(root, "public", "zphctr-content-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`)
