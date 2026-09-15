#!/usr/bin/env python3
"""fonts.css üretir: Inter + Source Serif 4 (latin + latin-ext) woff2
dosyalarını Google Fonts'tan indirip base64 olarak gömer.

    python3 build-fonts.py        # -> fonts.css

fonts.css depoya alınmaz (~470 KB, üretilmiş dosya). report.html render
edilmeden önce bir kez çalıştırılması yeterlidir.
"""
import base64, os, re, urllib.request

CSS_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700"
    "&family=Inter:wght@400;500;600;700&display=swap"
)
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"}
HERE = os.path.dirname(os.path.abspath(__file__))


def fetch(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read()


def main() -> None:
    css = fetch(CSS_URL).decode()
    blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*@font-face\s*\{(.*?)\}", css, re.S)
    seen, out = set(), []
    for subset, body in blocks:
        if subset not in {"latin", "latin-ext"}:
            continue
        family = re.search(r"font-family:\s*'([^']+)'", body).group(1)
        if (family, subset) in seen:  # Inter ve Source Serif 4 değişken fontlar:
            continue                  # her ağırlık aynı dosyayı gösterir
        seen.add((family, subset))
        url = re.search(r"url\((https://[^)]+)\)", body).group(1)
        rng = re.search(r"unicode-range:\s*([^;]+);", body).group(1).strip()
        data = base64.b64encode(fetch(url)).decode()
        out.append(
            f"@font-face{{font-family:'{family}';font-style:normal;font-weight:100 900;"
            f"font-display:block;src:url(data:font/woff2;base64,{data}) format('woff2');"
            f"unicode-range:{rng};}}"
        )
    path = os.path.join(HERE, "fonts.css")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(out))
    print(f"yazıldı: {path} ({os.path.getsize(path)} bayt, {len(out)} @font-face)")


if __name__ == "__main__":
    main()
