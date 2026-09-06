import Image from "next/image"
import Link from "next/link"

const PROOFS = [
  { no: "01", title: "Kutu mühürü", text: "Ambalaj açılmadan önce güvenlik mühürlerini kontrol edin." },
  { no: "02", title: "Gümüş güvenlik bandı", text: "Kutunun üzerindeki çok katmanlı bandı ve baskı bütünlüğünü inceleyin." },
  { no: "03", title: "Üretici kodu", text: "Kodu yalnızca üreticinin doğrulama ekranında kendiniz sorgulayın." },
]

export function BrandProof() {
  return <section className="overflow-hidden bg-[#071727] px-5 py-12 text-white sm:px-6 md:px-10 md:py-16" aria-labelledby="proof-title">
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-16">
      <div>
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-sky-300">ZPHC TR · Kanıt zinciri</p>
        <h2 id="proof-title" className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-[-0.025em] sm:text-5xl">Güven söylenmez.<br />Kutuda gösterilir.</h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/65">Siparişten sonra kontrol sizde kalır. Ambalajı inceleyin, güvenlik kodunu üreticinin sisteminde sorgulayın, sonucu kendiniz görün.</p>
        <ol className="mt-8 border-y border-white/12">
          {PROOFS.map((proof) => <li key={proof.no} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-white/12 py-4 last:border-b-0"><span className="font-mono text-xs text-sky-300">{proof.no}</span><div><h3 className="text-sm font-bold text-white">{proof.title}</h3><p className="mt-1 text-sm leading-6 text-white/55">{proof.text}</p></div></li>)}
        </ol>
        <div className="mt-7 flex flex-wrap gap-3"><Link href="/dogrulama" className="inline-flex min-h-11 items-center bg-white px-5 text-sm font-bold text-[#071727] transition hover:bg-sky-50">Doğrulama rehberi →</Link><Link href="/orijin" className="inline-flex min-h-11 items-center border border-white/20 px-5 text-sm font-bold text-white transition hover:border-sky-300">Resmî kanallar</Link></div>
      </div>

      <div className="relative min-h-[390px] sm:min-h-[510px]">
        <div className="absolute left-0 top-0 w-[76%] border border-white/12 bg-white p-3 shadow-[0_30px_80px_rgba(0,0,0,.3)] sm:p-5"><Image src="/brand/zphc-bpc-box-official.jpg" alt="ZPHC BPC-157 kutusu ve güvenlik bandı" width={1000} height={1000} sizes="(max-width: 1023px) 70vw, 35vw" className="aspect-square w-full object-contain" /><p className="border-t border-slate-200 pt-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-500">Kutu · Mühür · Güvenlik bandı</p></div>
        <div className="absolute bottom-0 right-0 w-[63%] border-[6px] border-[#071727] bg-white p-2 shadow-[0_30px_80px_rgba(0,0,0,.35)] sm:p-4"><Image src="/brand/zphc-reta-120-kit-official.jpg" alt="Açık ZPHC Reta 120 mg kutusu ve beş flakon" width={768} height={768} sizes="(max-width: 1023px) 55vw, 28vw" className="aspect-square w-full object-contain" /><p className="border-t border-slate-200 pt-2 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-slate-500">Kutu içeriği açık görünüm</p></div>
        <div className="absolute right-0 top-5 border-l-2 border-sky-300 bg-[#0d2940] px-4 py-3 text-xs font-bold leading-5 text-white shadow-xl">Tek resmî adres<br /><span className="text-sky-300">zphctr.com</span></div>
      </div>
    </div>
  </section>
}
