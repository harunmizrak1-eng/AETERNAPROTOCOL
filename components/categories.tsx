const CARDS = [
  {
    title: "Yağ Kaybı & Metabolizma",
    subtitle:
      "Metabolik direnç, iştah kontrolü ve yağ yakımı üzerine kişiye özel protokol. Diyet ve egzersizin yetersiz kaldığı noktada devreye girer.",
    peptides: [
      "Retatrutide",
      "Semaglutide",
      "Tirzepatide",
      "AOD-9604",
      "Fragment 176-191",
    ],
  },
  {
    title: "Doku Onarımı & İyileşme",
    subtitle:
      "Sakatlık sonrası tendon, eklem ve kas dokusunun desteklenmesi. Uzun süren iyileşme süreçlerinde kullanılan kanıta dayalı peptid protokolleri.",
    peptides: [
      "BPC-157",
      "TB-500",
      "BPC-157 + TB-500 Mix",
      "GHK-Cu",
      "Thymosin Alpha-1",
    ],
  },
  {
    title: "Anti-Aging & Cilt",
    subtitle:
      "Hücresel yenilenme, kolajen sentezi ve cilt kalitesi üzerine çalışan protokoller. Görünümü içeriden etkileyen yaklaşım.",
    peptides: ["GHK-Cu", "Epithalon", "Selank", "Semax", "PT-141"],
  },
  {
    title: "Performans & Enerji",
    subtitle:
      "Antrenman adaptasyonu, toparlanma süresi ve günlük enerji kapasitesi için hazırlanan protokoller. Sporcular ve aktif bireyler için.",
    peptides: ["CJC-1295", "Ipamorelin", "GHRP-2", "Hexarelin", "Tesamorelin"],
  },
  {
    title: "Longevity & Hücresel Sağlık",
    subtitle:
      "Sağlıklı yaşlanma ve hücre fonksiyonlarının desteklenmesi. Uzun vadeli biyolojik sürdürülebilirlik odaklı yaklaşım.",
    peptides: ["Epithalon", "Thymalin", "Humanin", "SS-31", "MOTS-c"],
  },
  {
    title: "Kognitif & Nörolojik",
    subtitle:
      "Odak, hafıza ve zihinsel netlik üzerine çalışan nöropeptid protokolleri. Yüksek performans gerektiren bireyler için.",
    peptides: ["Semax", "Selank", "Dihexa", "P-21", "Cerebrolysin"],
  },
]

export function Categories() {
  return (
    <section id="kategoriler" className="px-6 py-28 sm:py-36 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-px w-10 bg-gold/70"
          />
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-gold">
            Odak Alanları
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="group flex flex-col border border-hairline bg-surface p-8 transition-colors duration-500 hover:border-gold/60 sm:p-10"
            >
              <h3 className="font-serif text-2xl font-light tracking-wide text-foreground sm:text-[1.7rem]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                {card.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
                {card.peptides.map((p) => (
                  <span
                    key={p}
                    className="text-[0.75rem] uppercase tracking-[0.15em] text-muted-foreground/75 transition-colors duration-500 group-hover:text-foreground/90"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <a
                  href={`https://wa.me/905359184587?text=Merhaba%2C%20${encodeURIComponent(card.title)}%20konusunda%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-hairline px-7 py-3 text-[0.65rem] uppercase tracking-eyebrow text-foreground/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:border-gold/60 hover:bg-gold hover:text-primary-foreground"
                >
                  Protokol Talep Et
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
