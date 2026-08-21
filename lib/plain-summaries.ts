/** Bileşiklerin sade dille açıklaması.
 *
 * Kütüphanedeki `short` alanı bilimsel dille yazılmış ("gastrik mukozadan
 * izole pentadekapeptid, anjiyogenez..."). Kataloğa ilk kez bakan biri
 * bundan bir şey anlamıyor ve "hangisi bana lazım" sorusuna cevap
 * bulamıyor. Buradaki metinler aynı bilgiyi günlük Türkçeyle veriyor.
 *
 * KURAL: Bu metinler ne işe yaradığını ANLATIR, ne yapılacağını SÖYLEMEZ.
 * Doz, kullanım şekli, süre veya "şunu alın" tarzı yönlendirme yok.
 * Etkinlik iddiaları "araştırılıyor / çalışılıyor / gösterildi" gibi
 * kanıt düzeyini yansıtan fiillerle veriliyor; klinik kanıtı olanla
 * olmayan aynı kesinlikte anlatılmıyor. Kanıt kademesi zaten sayfada
 * ayrıca gösteriliyor, burası onunla çelişmemeli.
 *
 * Karşılığı olmayan bileşiklerde ürün sayfası kütüphanedeki `short`
 * alanına düşer; uydurma açıklama üretilmez.
 */
export const plainSummaries: Record<string, string> = {
  "bpc-157":
    "Mide salgısından elde edilen bir peptid. Tendon, bağ ve kas dokusunun onarımı üzerine araştırılıyor. Hayvan çalışmalarında olumlu sonuçlar alındı, geniş insan çalışması henüz yapılmadı.",

  "tb-500":
    "Vücutta doğal olarak bulunan timosin beta-4 proteininin sentetik hali. Doku onarımı ve iltihap üzerine çalışılıyor. BPC-157 ile aynı başlıkta anılır, insan verisi ikisinde de sınırlı.",

  retatrutide:
    "Kilo kaybı üzerine geliştirilen yeni nesil bir molekül. Vücuttaki üç ayrı reseptöre (GLP-1, GIP, glukagon) aynı anda etki ediyor. Faz 3 çalışmalarında bu sınıfın en yüksek kilo kaybı sonuçlarını verdi.",

  semaglutide:
    "Ozempic ve Wegovy'nin etken maddesi. İştahı baskılayarak ve mide boşalmasını yavaşlatarak kilo kaybı sağlıyor. Geniş klinik çalışmalarla desteklenen, dünyada onaylı bir molekül.",

  tirzepatide:
    "Mounjaro'nun etken maddesi. GLP-1 ve GIP reseptörlerine birlikte etki ediyor. Klinik çalışmalarda semaglutide göre daha yüksek kilo kaybı gösterdi.",

  cagrilintide:
    "Amilin hormonunu taklit eden bir molekül. Tokluk hissi üzerine çalışılıyor, genellikle semaglutide ile birlikte araştırılıyor. Henüz onaylı bir ilaç değil.",

  hgh: "İnsan büyüme hormonu. Vücudun kendi ürettiği hormonun laboratuvarda üretilmiş hali. Kas kütlesi, yağ oranı ve toparlanma üzerindeki etkileri uzun süredir çalışılıyor. Belirli tıbbi durumlar için onaylı, bunun dışındaki kullanımı tartışmalı.",

  ipamorelin:
    "Vücudun kendi büyüme hormonu salgısını artırmak üzere geliştirilmiş bir peptid. Doğrudan hormon vermek yerine salgıyı tetikliyor. İnsan verisi sınırlı.",

  "aod-9604":
    "Büyüme hormonunun yağ metabolizmasıyla ilgili parçası. Hormonun diğer etkileri olmadan yağ yakımını hedeflemek üzere geliştirildi. İnsan çalışmalarında sonuçlar beklenenin altında kaldı.",

  "ghk-cu":
    "Bakır taşıyan küçük bir peptid. Kolajen üretimi ve cilt yenilenmesi üzerine çalışılıyor. Kozmetik ürünlerde de yaygın olarak kullanılıyor.",

  "nad-nmn":
    "Hücrelerin enerji üretiminde rol oynayan bir molekül. Yaşlanma ve metabolizma araştırmalarında sık geçiyor. İnsan çalışmaları henüz erken aşamada.",

  epithalon:
    "Rusya kaynaklı araştırmalarda yaşlanma üzerine çalışılmış bir peptid. Mevcut veri büyük ölçüde eski Rus çalışmalarına dayanıyor, bağımsız doğrulama sınırlı.",

  "igf-1-lr3":
    "İnsülin benzeri büyüme faktörünün uzun etkili bir versiyonu. Kas dokusu ve hücre büyümesi üzerine çalışılıyor. Güçlü bir molekül, güvenlik verisi sınırlı.",

  "ghrp-2":
    "Büyüme hormonu salgısını uyaran bir peptid. Ipamorelin ile benzer başlıkta anılır, iştah üzerinde de etkisi olduğu bildiriliyor.",

  "ghrp-6":
    "Büyüme hormonu salgısını uyaran bir peptid. GHRP-2'ye kıyasla iştah artırıcı etkisi daha belirgin.",

  "mots-c":
    "Mitokondri kaynaklı bir peptid. Metabolizma ve egzersiz kapasitesi üzerine çalışılıyor. Araştırmalar erken aşamada.",

  glutathione:
    "Vücudun kendi ürettiği antioksidan. Karaciğer fonksiyonu ve cilt tonu üzerine çalışılıyor. Ağızdan alındığında emilimi düşük olduğu için enjeksiyon formu tercih ediliyor.",

  aicar:
    "Hücre içi enerji dengesini etkileyen bir molekül. Dayanıklılık ve metabolizma araştırmalarında geçiyor. Sporda yasaklı listede.",
}

/** Ürünün bağlı olduğu bileşik için sade açıklama; yoksa undefined. */
export function getPlainSummary(peptideSlug?: string) {
  return peptideSlug ? plainSummaries[peptideSlug] : undefined
}
