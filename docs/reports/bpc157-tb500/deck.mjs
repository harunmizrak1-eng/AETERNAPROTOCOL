import pptxgen from 'pptxgenjs';
import { readFileSync } from 'node:fs';

const DEEP='00314C', DARK='014673', BLUE='0072BC', INK='0D1B2A', MUTED='5A6B7D',
      LINE='D9E2EA', TINT='F1F7FB', W='FFFFFF',
      WARN='A8492A', WARNBG='FAEBE3', GO='16714F', GOBG='E2F2EB',
      AMB='8A5A00', AMBBG='FBF1DE';
const HEAD='Cambria', BODY='Calibri';
const M=0.65, CW=13.3-2*M;

const pres=new pptxgen();
pres.layout='LAYOUT_WIDE';
pres.author='ZPHC Türkiye'; pres.company='ZPHC Türkiye';
pres.title='BPC-157 ve TB-500 — Kanıt Durumu';

const logo='image/png;base64,'+readFileSync('/home/user/AETERNAPROTOCOL/public/brand/zphc-logo.png').toString('base64');
const soft=()=>({type:'outer',color:'0D1B2A',blur:10,offset:2,angle:90,opacity:0.10});

let n=0;
function slide(dark=false){
  const s=pres.addSlide(); n++;
  s.background={color: dark?DEEP:W};
  if(n>1){
    s.addText('ZPHC Türkiye · Bileşik Kütüphanesi',{x:M,y:7.02,w:5,h:0.25,isTextBox:true,margin:0,
      fontFace:BODY,fontSize:9,color:dark?'7FA3BC':MUTED,charSpacing:0.6});
    s.addText(String(n),{x:13.3-M-0.6,y:7.02,w:0.6,h:0.25,isTextBox:true,margin:0,align:'right',
      fontFace:BODY,fontSize:9,bold:true,color:dark?'BBD3E4':DARK});
  }
  return s;
}
function head(s,kicker,title,dark=false){
  s.addText(kicker.toUpperCase(),{x:M,y:0.52,w:CW,h:0.26,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:10,bold:true,charSpacing:1.6,color:dark?'7FB8DD':BLUE});
  s.addText(title,{x:M,y:0.84,w:CW,h:0.75,isTextBox:true,margin:0,
    fontFace:HEAD,fontSize:32,bold:true,color:dark?W:DEEP});
}
function card(s,x,y,w,h,fill=TINT){
  s.addShape(pres.ShapeType.roundRect,{x,y,w,h,rectRadius:0.06,fill:{color:fill},
    line:{color:fill===W?LINE:fill,width:0.75},shadow:soft()});
}
function pill(s,x,y,t,fg,bg,w=1.05){
  s.addShape(pres.ShapeType.roundRect,{x,y,w,h:0.26,rectRadius:0.12,fill:{color:bg},line:{color:bg,width:0}});
  s.addText(t,{x,y,w,h:0.26,isTextBox:true,margin:0,align:'center',valign:'middle',
    fontFace:BODY,fontSize:9,bold:true,color:fg,charSpacing:0.5});
}
function badge(s,x,y,t,bg=BLUE,fg=W,d=0.42){
  s.addShape(pres.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:bg},line:{color:bg,width:0}});
  s.addText(t,{x,y,w:d,h:d,isTextBox:true,margin:0,align:'center',valign:'middle',
    fontFace:BODY,fontSize:12,bold:true,color:fg});
}
const tbl=(s,rows,opts={})=>s.addTable(rows,{fontFace:BODY,fontSize:11,color:INK,border:{type:'solid',pt:0.5,color:LINE},
  valign:'middle',autoPage:false,...opts});

/* 1 — kapak */
{const s=slide(true);
 s.addImage({data:logo,x:M,y:0.6,w:1.74,h:0.29});
 s.addText('Doku Onarımı',{x:M,y:2.25,w:CW,h:0.3,isTextBox:true,margin:0,
   fontFace:BODY,fontSize:11,bold:true,charSpacing:1.8,color:'7FB8DD'});
 s.addText('BPC-157 ve TB-500',{x:M,y:2.62,w:CW,h:0.95,isTextBox:true,margin:0,
   fontFace:HEAD,fontSize:52,bold:true,color:W});
 s.addText('Kanıt bugün nerede duruyor',{x:M,y:3.58,w:CW,h:0.6,isTextBox:true,margin:0,
   fontFace:HEAD,fontSize:26,color:'9FC9E4'});
 s.addText([{text:'Bileşik Kütüphanesi',options:{bold:true,color:W}},
            {text:'   ·   PEP-2026-01   ·   15 Eylül 2026',options:{color:'7FA3BC'}}],
   {x:M,y:6.3,w:CW,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:12});
 s.addNotes('Sunum, kütüphanedeki BPC-157 ve TB-500 kayıtlarının arkasındaki kanıtı özetliyor. Veri kesim tarihi 15 Eylül 2026.');}

/* 2 — gündem */
{const s=slide(); head(s,'Gündem','Beş başlık');
 const items=[['01','İki molekülün kimliği','Kütüphane kayıtları, uygulama basamakları ve TB-500 ile timosin β4 ayrımı'],
  ['02','BPC-157 kanıt tabanı','Hayvan verisi, literatürün kaynağı, insan çalışmaları'],
  ['03','Timosin β4 insan verisi','Faz 2 ve Faz 3 sonuçları, ARISE-3'],
  ['04','Düzenleyici durum','FDA 2023–2026 ve WADA'],
  ['05','Kullanıcı toplulukları','Hangi şikâyetler için kullanılıyor, ne bildiriliyor']];
 let y=1.95;
 items.forEach(([num,t,d])=>{
   badge(s,M,y-0.02,num,TINT,DARK,0.44);
   s.addText(t,{x:M+0.72,y:y-0.06,w:4.3,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:15,bold:true,color:DEEP});
   s.addText(d,{x:M+5.1,y:y-0.06,w:CW-5.1,h:0.42,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:MUTED});
   y+=0.92;});}

/* 3 — kütüphane kayıtları */
{const s=slide(); head(s,'Bölüm 01','Kütüphane kayıtları');
 const cw=(CW-0.45)/2;
 const data=[
  {x:M,name:'BPC-157',tier:'MEKANİSTİK / TEORİK',tfg:AMB,tbg:AMBBG,seq:'GEPPPGKPADDAGLV',
   meta:'15 aminoasit · 1.419,53 Da · yarı ömür <30 dakika',
   def:'"Gastrik mukozadan izole pentadekapeptit. Anjiyogenez ve doku onarımını desteklediği düşünülüyor. Mekanizması güçlü, geniş insan çalışması yok."',
   st:'"Mekanizma güçlü, kontrollü insan çalışması yok."'},
  {x:M+cw+0.45,name:'TB-500',tier:'PREKLİNİK',tfg:WARN,tbg:WARNBG,seq:'Ac-LKKTETQ',
   meta:'7 aminoasit · ≈889 Da · Tβ4’ün 17–23 fragmanı',
   def:'"Thymosin Beta-4 fragmanı. Doku rejenerasyonunu desteklediği düşünülüyor. İnsan verisi neredeyse yok, kanıt büyük ölçüde hayvan çalışmalarına dayalı."',
   st:'"Preklinik aşama."'}];
 data.forEach(d=>{
   card(s,d.x,1.85,cw,4.35,W);
   s.addText(d.name,{x:d.x+0.35,y:2.05,w:2.2,h:0.4,isTextBox:true,margin:0,fontFace:HEAD,fontSize:22,bold:true,color:DEEP});
   pill(s,d.x+cw-2.05,2.14,d.tier,d.tfg,d.tbg,1.7);
   s.addShape(pres.ShapeType.roundRect,{x:d.x+0.35,y:2.62,w:cw-0.7,h:0.38,rectRadius:0.05,fill:{color:TINT},line:{color:TINT,width:0}});
   s.addText(d.seq,{x:d.x+0.35,y:2.62,w:cw-0.7,h:0.38,isTextBox:true,margin:0,align:'center',valign:'middle',
     fontFace:'Courier New',fontSize:12,bold:true,color:DARK});
   s.addText(d.meta,{x:d.x+0.35,y:3.12,w:cw-0.7,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:MUTED});
   s.addText('Kayıttaki tanım',{x:d.x+0.35,y:3.55,w:cw-0.7,h:0.24,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,bold:true,charSpacing:1,color:BLUE});
   s.addText(d.def,{x:d.x+0.35,y:3.80,w:cw-0.7,h:1.35,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:INK,italic:true});
   s.addText('Klinik durum',{x:d.x+0.35,y:5.28,w:cw-0.7,h:0.24,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,bold:true,charSpacing:1,color:BLUE});
   s.addText(d.st,{x:d.x+0.35,y:5.53,w:cw-0.7,h:0.5,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:INK,italic:true});});
 s.addText('Metinler sitedeki bileşik kayıtlarından alınmıştır.',{x:M,y:6.38,w:CW,h:0.25,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,color:MUTED});
 s.addNotes('BPC-157 kütüphanede teorik, TB-500 preklinik kademesinde. Kart metinleri lib/peptides.ts kayıtlarından birebir alındı.');}

/* 4 — uygulama basamakları */
{const s=slide(); head(s,'Bölüm 01','Kayıttaki uygulama basamakları');
 tbl(s,[
  [{text:'Bileşik',options:{bold:true,color:W,fill:{color:DEEP}}},{text:'Basamak',options:{bold:true,color:W,fill:{color:DEEP}}},
   {text:'Miktar',options:{bold:true,color:W,fill:{color:DEEP}}},{text:'Sıklık ve yol',options:{bold:true,color:W,fill:{color:DEEP}}}],
  ['BPC-157','İdame','250 mcg','Günde 1 kez, subkutan'],
  ['','Genel iyileşme','250–500 mcg','Günde 1–2 kez, subkutan / kas içi'],
  ['','Ciddi yaralanma','500–1000 mcg','Günde 2 kez, bölgeye yakın subkutan'],
  ['TB-500','İdame','2 mg','Haftada 1–2 kez, subkutan'],
  ['','Genel doku onarımı','2–3 mg','Haftada 2 kez, subkutan / kas içi'],
  ['','Ciddi yaralanma','4–5 mg','Haftada 3 kez, bölgeye yakın subkutan']],
  {x:M,y:1.95,w:CW,colW:[2.0,3.0,2.4,4.6],rowH:0.5});
 s.addText('Değerler kütüphane kayıtlarından olduğu gibi aktarılmıştır. Bu sunumda türetilmemiş, hesaplanmamış ve önerilmemiştir.',
   {x:M,y:5.95,w:CW,h:0.4,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:MUTED});
 s.addNotes('Doz basamakları kayıttan taşındı; sunum bunları öneri olarak sunmuyor.');}

/* 5 — kayıt düzeltmeleri */
{const s=slide(); head(s,'Bölüm 01','Kayıtlarda düzeltilecek iki değer');
 const cw=(CW-0.45)/2;
 [[M,'TB-500 moleküler ağırlığı','Kayıt: 43 aminoasit / 4.963,44 Da',
   'Bu değerler tam uzunluklu timosin β4’e ait. Piyasada TB-500 adıyla satılan materyal, doping kontrol laboratuvarında Ac-LKKTETQ (7 aminoasit, ≈889 Da) olarak tanımlandı.','Esposito ve ark. 2012'],
  [M+cw+0.45,'BPC-157 dizisi','Kayıt: GKPPPGKPADDAGLV',
   'Literatürdeki dizi GEPPPGKPADDAGLV. İkinci pozisyondaki aminoasit glutamik asit (E), lizin (K) değil.','Sikirić ve ark. 2011']]
 .forEach(([x,t,cur,exp,src])=>{
   card(s,x,1.95,cw,3.75,W);
   s.addText(t,{x:x+0.35,y:2.2,w:cw-0.7,h:0.35,isTextBox:true,margin:0,fontFace:HEAD,fontSize:18,bold:true,color:DEEP});
   s.addShape(pres.ShapeType.roundRect,{x:x+0.35,y:2.72,w:cw-0.7,h:0.42,rectRadius:0.05,fill:{color:WARNBG},line:{color:WARNBG,width:0}});
   s.addText(cur,{x:x+0.35,y:2.72,w:cw-0.7,h:0.42,isTextBox:true,margin:0,align:'center',valign:'middle',
     fontFace:BODY,fontSize:12,bold:true,color:WARN});
   s.addText(exp,{x:x+0.35,y:3.35,w:cw-0.7,h:1.6,isTextBox:true,margin:0,fontFace:BODY,fontSize:13,color:INK});
   s.addText(src,{x:x+0.35,y:5.15,w:cw-0.7,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,color:MUTED});});
 s.addNotes('Her iki düzeltme de lib/peptides.ts içinde yapılmalı. Kaynaklar: PMID 22962027 ve PMID 21548867.');}

/* 6 — TB-500 ≠ Tβ4 */
{const s=slide(); head(s,'Bölüm 01','TB-500 ile timosin β4 aynı molekül değil');
 const cw=(CW-0.45)/2;
 [[M,'Timosin β4','43','aminoasit','≈4.963 Da','Metiyonin içerir · doğal asetilasyon','İnsan Faz 2 ve Faz 3 verisi var',GO,GOBG],
  [M+cw+0.45,'TB-500','7','aminoasit','≈889 Da','Metiyonin içermez · sentetik asetilasyon','Kendi başına insan verisi yok',WARN,WARNBG]]
 .forEach(([x,t,big,unit,mw,note,ev,fg,bg])=>{
   card(s,x,1.9,cw,3.05,W);
   s.addText(t,{x:x+0.35,y:2.1,w:cw-0.7,h:0.35,isTextBox:true,margin:0,fontFace:HEAD,fontSize:20,bold:true,color:DEEP});
   s.addText(big,{x:x+0.35,y:2.5,w:2.0,h:1.0,isTextBox:true,margin:0,fontFace:HEAD,fontSize:60,bold:true,color:fg});
   s.addText(unit,{x:x+2.3,y:3.05,w:2.0,h:0.35,isTextBox:true,margin:0,fontFace:BODY,fontSize:14,color:MUTED});
   s.addText(mw,{x:x+2.3,y:2.68,w:2.4,h:0.35,isTextBox:true,margin:0,fontFace:BODY,fontSize:17,bold:true,color:DEEP});
   s.addText(note,{x:x+0.35,y:3.62,w:cw-0.7,h:0.32,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:INK});
   s.addShape(pres.ShapeType.roundRect,{x:x+0.35,y:4.05,w:cw-0.7,h:0.42,rectRadius:0.05,fill:{color:bg},line:{color:bg,width:0}});
   s.addText(ev,{x:x+0.35,y:4.05,w:cw-0.7,h:0.42,isTextBox:true,margin:0,align:'center',valign:'middle',
     fontFace:BODY,fontSize:12,bold:true,color:fg});});
 card(s,M,5.2,CW,1.2,TINT);
 s.addText([{text:'4.074 Da',options:{fontFace:HEAD,fontSize:26,bold:true,color:DEEP}},
   {text:'   kütle farkı — elementel bileşim de farklı. Timosin β4 üzerine yapılmış insan çalışmaları TB-500’ün etkinliğine kanıt sayılmaz.',
    options:{fontFace:BODY,fontSize:13,color:INK}}],
   {x:M+0.4,y:5.2,w:CW-0.8,h:1.2,isTextBox:true,margin:0,valign:'middle'});
 s.addNotes('Ürün sayfalarında ve forumlarda iki isim sıklıkla birbirinin yerine kullanılıyor. Kaynak: Esposito ve ark., Drug Test Anal 2012.');}

/* 7 — hayvan verisi */
{const s=slide(); head(s,'Bölüm 02','BPC-157: hayvan modellerinde bildirilenler');
 const items=[['Tendon','Kesilmiş Aşil tendonunda iyileşmenin hızlanması; fibroblast göçünde artış'],
  ['Kas','Miyotendinöz bileşkenin tam kesisi sonrası fonksiyonel toparlanma'],
  ['Bağırsak','Alkol ve NSAİİ lezyonlarında koruma; geçirgenliğin stabilizasyonu'],
  ['Damar','Tıkalı damarda kollateral yolakların devreye girmesi'],
  ['Sinir sistemi','İnme ve spinal kord basısı modellerinde davranışsal düzelme'],
  ['Cilt','Kesi yarası, derin yanık ve diyabetik ülser modellerinde iyileşme']];
 const cw=(CW-0.8)/3, ch=1.75;
 items.forEach((it,i)=>{
   const x=M+(i%3)*(cw+0.4), y=1.95+Math.floor(i/3)*(ch+0.4);
   card(s,x,y,cw,ch,W);
   s.addText(it[0],{x:x+0.3,y:y+0.24,w:cw-0.6,h:0.32,isTextBox:true,margin:0,fontFace:HEAD,fontSize:17,bold:true,color:DEEP});
   s.addText(it[1],{x:x+0.3,y:y+0.66,w:cw-0.6,h:0.9,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:INK});});
 s.addText('Etki, uygulama yolundan büyük ölçüde bağımsız bildirilmiş: karın içi, içme suyunda oral ve doğrudan bölgeye.',
   {x:M,y:6.15,w:CW,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:MUTED});}

/* 8 — literatürün kaynağı */
{const s=slide(); head(s,'Bölüm 02','Literatür tek merkezden geliyor');
 s.addChart(pres.ChartType.doughnut,
  [{name:'Yazar',labels:['Sikirić grubu','Diğer gruplar'],values:[175,53]}],
  {x:M-0.1,y:1.85,w:5.2,h:4.3,holeSize:62,chartColors:[DARK,'C9D8E4'],
   showLegend:true,legendPos:'b',legendFontSize:12,legendColor:INK,
   showValue:true,dataLabelColor:W,dataLabelFontSize:13,dataLabelFontBold:true,
   showTitle:false,dataBorder:{pt:2,color:W}});
 s.addText('%77',{x:M+5.5,y:2.0,w:3.0,h:1.3,isTextBox:true,margin:0,fontFace:HEAD,fontSize:72,bold:true,color:DEEP});
 s.addText('PubMed’de “BPC 157” sorgusunun döndürdüğü 228 kaydın 175’inde Predrag Sikirić yazarlar arasında.',
   {x:M+5.5,y:3.35,w:CW-5.5,h:0.7,isTextBox:true,margin:0,fontFace:BODY,fontSize:15,color:INK});
 card(s,M+5.5,4.25,CW-5.5,1.9,TINT);
 s.addText('Bağımsız replikasyon, bir bileşiği preklinikten kliniğe taşıyan filtredir: farklı laboratuvarların, farklı hayvan kolonileriyle ve farklı değerlendiricilerle aynı sonuca ulaşması. Bağımsız bir gruptan gelen 2019 tarihli derleme de çalışmaların çoğunun küçük kemirgen modellerinde yapıldığını belirtiyor.',
   {x:M+5.9,y:4.45,w:CW-6.3,h:1.5,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:INK});
 s.addNotes('Sayım Eylül 2026 itibarıyla. Bağımsız derleme: Gwyer, Wragg ve Wilson, Cell Tissue Res 2019.');}

/* 9 — insan verisi */
{const s=slide(); head(s,'Bölüm 02','BPC-157 insan çalışmaları');
 const hd=t=>({text:t,options:{bold:true,color:W,fill:{color:DEEP}}});
 tbl(s,[[hd('Çalışma'),hd('Faz / n'),hd('Durum'),hd('Not')],
  ['Pliva ülseratif kolit programı','Faz 2','Tamamlanmadı','Birincil raporlar büyük veri tabanlarında indekslenmemiş'],
  ['PCO-02  ·  NCT02637284','Faz 1 · 42','Bilinmeyen','Oral form; 2015’te başladı, sonuç yayımlanmadı'],
  ['Küçük klinik seriler','2–16 kişi','Yayımlanmış','Karşılaştırma grubu yok; toplam denek sayısı yaklaşık 30'],
  [{text:'Hamstring zorlanması  ·  NCT07437547',options:{bold:true}},{text:'Faz 2 · 120',options:{bold:true}},
   {text:'Yürüyor',options:{bold:true,color:AMB,fill:{color:AMBBG}}},
   {text:'Randomize, çift kör, plasebo kontrollü. Sonuç: Şubat 2027',options:{bold:true}}],
  ['Rotator manşet onarımı  ·  NCT07803250','Faz 1 · 30','Başlamadı','Planlanan başlangıç Ocak 2027']],
  {x:M,y:1.95,w:CW,colW:[3.7,1.5,1.7,5.1],rowH:0.52});
 card(s,M,5.35,CW,0.95,TINT);
 s.addText('Yayımlanmış, randomize, plasebo kontrollü bir insan çalışması bugün itibarıyla yok. NCT07437547 bu boşluğu kapatmaya aday ilk çalışma.',
   {x:M+0.4,y:5.35,w:CW-0.8,h:0.95,isTextBox:true,margin:0,valign:'middle',fontFace:BODY,fontSize:13,color:INK});}

/* 10 — timosin β4 insan çalışmaları */
{const s=slide(); head(s,'Bölüm 03','Timosin β4 insan çalışmaları');
 const hd=t=>({text:t,options:{bold:true,color:W,fill:{color:DEEP}}});
 tbl(s,[[hd('Çalışma'),hd('Faz'),hd('n'),hd('Sonuç')],
  ['Venöz staz ülseri  ·  NCT00832091','2','72','%0,03 dozda sinyal; üç ayda hastaların dörtte birinde tam kapanma'],
  ['Bası yarası  ·  NCT00382174','2','72','İyileşmede hızlanma bildirildi'],
  ['Kuru göz  ·  NCT01387347','2','72','Birincil sonlanım noktaları karşılanmadı'],
  ['ARISE-2  ·  NCT02974907','3','601','Tamamlandı, sonuçlar kayıtlı'],
  [{text:'ARISE-3  ·  NCT03937882',options:{bold:true}},{text:'3',options:{bold:true}},{text:'700',options:{bold:true}},
   {text:'Birincil sonlanım noktalarında plaseboya üstünlük yok',options:{bold:true,color:WARN}}],
  ['Sağlıklı gönüllü  ·  NCT04555824 / 50','1','84','İntravenöz rekombinant Tβ4 iyi tolere edildi']],
  {x:M,y:1.95,w:CW,colW:[4.2,0.9,0.9,6.0],rowH:0.5});
 s.addText('Tam uzunluklu timosin β4 iki geliştirme programına konu oldu: RegeneRx kronik yara ve göz yüzeyinde, Northland Biotech rekombinant formla kardiyolojide.',
   {x:M,y:5.45,w:CW,h:0.5,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:MUTED});}

/* 11 — ARISE-3 */
{const s=slide(); head(s,'Bölüm 03','ARISE-3: 700 hasta, iki kol, aynı sonuç');
 s.addChart(pres.ChartType.bar,
  [{name:'Timosin β4 %0,1',labels:['Korneal boyanma','Oküler rahatsızlık'],values:[0.41,0.40]},
   {name:'Plasebo',labels:['Korneal boyanma','Oküler rahatsızlık'],values:[0.46,0.40]}],
  {x:M-0.1,y:1.9,w:7.6,h:4.0,barDir:'col',barGrouping:'clustered',barGapWidthPct:70,
   chartColors:[BLUE,'B9C9D6'],showValue:true,dataLabelPosition:'outEnd',
   dataLabelColor:INK,dataLabelFontSize:12,dataLabelFontBold:true,dataLabelFormatCode:'0.00',
   showLegend:true,legendPos:'b',legendFontSize:12,legendColor:INK,showTitle:false,
   catAxisLabelColor:INK,catAxisLabelFontSize:12,valAxisLabelColor:MUTED,valAxisLabelFontSize:10,
   valAxisMinVal:0,valAxisMaxVal:0.6,valAxisMajorUnit:0.2,valGridLine:{color:LINE,size:0.75},catGridLine:{style:'none'},
   valAxisTitle:'15. günde düzelme (puan)',showValAxisTitle:true,valAxisTitleFontSize:11,valAxisTitleColor:MUTED});
 s.addText('Randomize, çift kör, dörtlü körleme, 14 gün tedavi. Birincil sonlanım noktalarında iki kol örtüşüyor.',
   {x:M+7.8,y:1.95,w:CW-7.8,h:0.8,isTextBox:true,margin:0,fontFace:BODY,fontSize:14,color:INK});
 card(s,M+7.8,2.95,CW-7.8,1.5,TINT);
 s.addText('Aynı programın daha küçük Faz 2 çalışması da birincil noktalarını kaçırmış, yalnızca ikincil noktalarda anlamlılık bildirmişti.',
   {x:M+8.15,y:3.15,w:CW-8.5,h:1.1,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:INK});
 s.addText('Çalışma büyüdükçe ve körleme sıkılaştıkça, küçük çalışmalarda görülen olumlu sinyaller kayboldu.',
   {x:M+7.8,y:4.85,w:CW-7.8,h:1.0,isTextBox:true,margin:0,fontFace:HEAD,fontSize:15,bold:true,color:DARK});
 s.addNotes('Kayıtlı birincil sonuçlar: inferior korneal boyanma −0,41 ve −0,46; oküler rahatsızlık −0,40 ve −0,40. Grafikte düzelmenin mutlak değeri gösteriliyor.');}

/* 12 — FDA zaman çizelgesi */
{const s=slide(); head(s,'Bölüm 04','FDA: 2023’ten bugüne');
 const steps=[['2023 yıl sonu','BPC-157, 503A listesinin Kategori 2’sine alınır. Eczanelerin bileşik hazırlamada kullanması durur.'],
  ['15 Nisan 2026','BPC-157 ve TB-500 dahil 12 peptit Kategori 2’den çıkarılır. Gerekçe teknik: adaylıklar geri çekilmiştir.'],
  ['23–24 Temmuz 2026','Danışma komitesi yedi peptitten altısını 503A listesine önerir. BPC-157 ve TB-500 için oylama 8’e 6, bir çekimser.'],
  ['Eylül 2026','FDA nihai kararını vermedi. Resmî düzenleme süreci 8–12 ay sürüyor; beklenti 2027.']];
 const cw=(CW-1.05)/4;
 steps.forEach(([d,t],i)=>{
   const x=M+i*(cw+0.35);
   card(s,x,2.35,cw,2.95,W);
   badge(s,x+0.3,2.6,String(i+1),BLUE,W,0.46);
   s.addText(d,{x:x+0.3,y:3.22,w:cw-0.6,h:0.55,isTextBox:true,margin:0,fontFace:HEAD,fontSize:15,bold:true,color:DEEP});
   s.addText(t,{x:x+0.3,y:3.85,w:cw-0.6,h:1.6,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,color:INK});});
 s.addText('Komite, FDA’nın kendi uzmanlarının yazılı olumsuz değerlendirmesinin aksine oy kullandı.',
   {x:M,y:5.85,w:CW,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:MUTED});}

/* 13 — Kategori 2 ne demek */
{const s=slide(); head(s,'Bölüm 04','Kategori 2’den çıkmak izin anlamına gelmiyor');
 s.addText('503A kapsamında bir maddenin bileşik hazırlamada kullanılabilmesi için üç şarttan birinin sağlanması gerekiyor.',
   {x:M,y:1.85,w:CW,h:0.4,isTextBox:true,margin:0,fontFace:BODY,fontSize:14,color:INK});
 const cw=(CW-0.8)/3;
 [['USP monografı','Maddenin resmî farmakope monografında tanımlı olması'],
  ['Onaylı ilaç bileşeni','FDA onaylı bir ilacın içeriğinde yer alması'],
  ['Kategori 1 listesi','FDA’nın bileşik hazırlamaya uygun bulduğu listede olması']]
 .forEach(([t,d],i)=>{
   const x=M+i*(cw+0.4);
   card(s,x,2.5,cw,2.1,W);
   s.addText(t,{x:x+0.32,y:2.75,w:cw-0.64,h:0.35,isTextBox:true,margin:0,fontFace:HEAD,fontSize:17,bold:true,color:DEEP});
   s.addText(d,{x:x+0.32,y:3.18,w:cw-0.64,h:0.8,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:INK});
   pill(s,x+0.32,4.1,'KARŞILANMIYOR',WARN,WARNBG,1.75);});
 card(s,M,4.95,CW,1.3,TINT);
 s.addText('Danışma komitesi oyu bağlayıcı değil; nihai yetki FDA’da. Türkiye’de TİTCK, AB’de EMA onayı da bulunmuyor.',
   {x:M+0.4,y:4.95,w:CW-0.8,h:1.3,isTextBox:true,margin:0,valign:'middle',fontFace:BODY,fontSize:14,color:INK});}

/* 14 — WADA */
{const s=slide(true); head(s,'Bölüm 04','Sporcular için tablo net',true);
 const cw=(CW-0.45)/2;
 [[M,'BPC-157'],[M+cw+0.45,'TB-500 / timosin β4']].forEach(([x,t])=>{
   s.addShape(pres.ShapeType.roundRect,{x,y:2.1,w:cw,h:1.5,rectRadius:0.06,fill:{color:'0A4467'},line:{color:'0A4467',width:0}});
   s.addText(t,{x:x+0.35,y:2.35,w:cw-0.7,h:0.4,isTextBox:true,margin:0,fontFace:HEAD,fontSize:20,bold:true,color:W});
   s.addText('S0 — onaylanmamış maddeler  ·  S2.3 — büyüme faktörleri',
     {x:x+0.35,y:2.85,w:cw-0.7,h:0.5,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:'9FC9E4'});});
 const facts=[['Her zaman yasaklı','Yarışma içi ve yarışma dışı, ayrım yok'],
  ['Belirlenmiş madde değil','Yaptırımlar daha ağır uygulanıyor'],
  ['Analitik tespit mümkün','BPC-157 akredite laboratuvarda kütle spektrometrisiyle saptanıyor; idrar metabolitleri birkaç gün kalıyor'],
  ['FDA kararından bağımsız','Bileşik hazırlama düzenlemesi WADA listesini değiştirmiyor']];
 let y=4.0;
 facts.forEach(([t,d])=>{
   badge(s,M,y,'·','0A4467','7FB8DD',0.34);
   s.addText(t,{x:M+0.6,y:y-0.05,w:3.3,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:14,bold:true,color:W});
   s.addText(d,{x:M+4.0,y:y-0.05,w:CW-4.0,h:0.42,isTextBox:true,margin:0,fontFace:BODY,fontSize:12.5,color:'BBD3E4'});
   y+=0.62;});}

/* 15 — ne için kullanılıyor */
{const s=slide(); head(s,'Bölüm 05','Toplulukta bildirilen kullanım alanları');
 const cw=(CW-0.8)/3;
 const cols=[['Kas-iskelet sistemi','en yaygın küme',
   [['Tenisçi ve golfçü dirseği','Yok'],['Aşil tendinopatisi','Yok'],['Rotator manşet, omuz ağrısı','Yok'],
    ['Patellar tendinopati, diz','Yok'],['Kas zorlanması, ameliyat sonrası','Yürüyor']]],
  ['Gastrointestinal','',
   [['Bağırsak geçirgenliği','Yok'],['İBS semptomları','Yok'],['NSAİİ kaynaklı hasar','Yok'],
    ['Ülseratif kolit, Crohn','Rapor yok']]],
  ['Diğer','',
   [['Kronik ağrı, eklem','Yok'],['Uyku, ruh hali','Yok'],['Cilt yaraları, skar','Yok']]]];
 cols.forEach(([t,sub,rows],i)=>{
   const x=M+i*(cw+0.4);
   card(s,x,1.9,cw,4.15,W);
   s.addText(t,{x:x+0.3,y:2.12,w:cw-0.6,h:0.32,isTextBox:true,margin:0,fontFace:HEAD,fontSize:17,bold:true,color:DEEP});
   if(sub) s.addText(sub,{x:x+0.3,y:2.44,w:cw-0.6,h:0.24,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,color:MUTED,charSpacing:0.8});
   let y=2.8;
   rows.forEach(([r,st])=>{
     s.addText(r,{x:x+0.3,y,w:cw-1.85,h:0.44,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:INK});
     const go=st==='Yürüyor';
     pill(s,x+cw-1.55,y+0.05,st.toUpperCase(),go?AMB:WARN,go?AMBBG:WARNBG,1.25);
     y+=0.6;});});
 s.addText('Sağ sütun, o alanda yayımlanmış insan verisinin durumunu gösteriyor. “Yok”, bileşiğin etkisiz olduğunu değil, insanda test edilmediğini ifade ediyor.',
   {x:M,y:6.2,w:CW,h:0.35,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:MUTED});}

/* 16 — toplulukta ne bildiriliyor */
{const s=slide(); head(s,'Bölüm 05','Gönderiler ne hakkında');
 const stats=[['%43','doz ve titrasyon'],['%24','sonuç bildirimi'],['%22','yan etki'],['%20','tedarikçi']];
 const cw=(CW-1.2)/4;
 stats.forEach(([v,l],i)=>{
   const x=M+i*(cw+0.4);
   card(s,x,1.9,cw,1.55,TINT);
   s.addText(v,{x:x+0.3,y:2.0,w:cw-0.6,h:0.8,isTextBox:true,margin:0,fontFace:HEAD,fontSize:40,bold:true,color:DEEP});
   s.addText(l,{x:x+0.3,y:2.82,w:cw-0.6,h:0.4,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,color:MUTED});});
 s.addText('18 alt forumdan 1.667 gönderinin etiketlenmesine dayanan kamuya açık analiz.',
   {x:M,y:3.6,w:CW,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:MUTED});
 const cw2=(CW-0.45)/2;
 card(s,M,4.1,cw2,2.05,W);
 s.addText('Bildirilen olumlu temalar',{x:M+0.35,y:4.32,w:cw2-0.7,h:0.3,isTextBox:true,margin:0,fontFace:HEAD,fontSize:16,bold:true,color:DEEP});
 s.addText([{text:'Ağrıda azalma',options:{bullet:true,breakLine:true}},
   {text:'Egzersiz toleransında artış',options:{bullet:true,breakLine:true}},
   {text:'Akut yaralanmalarda beklenenden hızlı toparlanma',options:{bullet:true}}],
   {x:M+0.35,y:4.72,w:cw2-0.7,h:1.2,isTextBox:true,margin:0,fontFace:BODY,fontSize:12.5,color:INK,paraSpaceAfter:5});
 card(s,M+cw2+0.45,4.1,cw2,2.05,W);
 s.addText('Bildirilen olumsuz deneyimler',{x:M+cw2+0.8,y:4.32,w:cw2-0.7,h:0.3,isTextBox:true,margin:0,fontFace:HEAD,fontSize:16,bold:true,color:DEEP});
 s.addText([{text:'Kaşıntı',options:{bullet:true,breakLine:true}},
   {text:'Belirgin anksiyete',options:{bullet:true,breakLine:true}},
   {text:'Haz alamama hâli',options:{bullet:true}}],
   {x:M+cw2+0.8,y:4.72,w:cw2-0.7,h:1.2,isTextBox:true,margin:0,fontFace:BODY,fontSize:12.5,color:INK,paraSpaceAfter:5});
 s.addNotes('Endişe ve sorun giderme dili taşıyan gönderiler, açıkça olumlu dil taşıyanları 1,6’ya 1 oranında geçiyor. Olumsuz bildirimler STAT News derlemesinden.');}

/* 17 — kapanış */
{const s=slide(true); head(s,'Özet','Kanıt bugün nerede duruyor',true);
 const cw=(CW-0.45)/2;
 [[M,'BPC-157','MEKANİSTİK / TEORİK',
   'Geniş ve tutarlı bir preklinik dosyası var; dosyanın dörtte üçü tek bir araştırma grubundan geliyor. Yayımlanmış insan RKÇ’si bulunmuyor.'],
  [M+cw+0.45,'TB-500','PREKLİNİK',
   'Kendi başına insan verisi yok. Ana molekülü timosin β4’ün dosyası fragmana aktarılamıyor ve en güçlü test edildiği yerde plaseboyu geçemedi.']]
 .forEach(([x,t,tier,d])=>{
   s.addShape(pres.ShapeType.roundRect,{x,y:2.05,w:cw,h:2.3,rectRadius:0.06,fill:{color:'0A4467'},line:{color:'0A4467',width:0}});
   s.addText(t,{x:x+0.35,y:2.3,w:cw-0.7,h:0.4,isTextBox:true,margin:0,fontFace:HEAD,fontSize:22,bold:true,color:W});
   s.addText(tier,{x:x+0.35,y:2.76,w:cw-0.7,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,bold:true,charSpacing:1.4,color:'7FB8DD'});
   s.addText(d,{x:x+0.35,y:3.15,w:cw-0.7,h:1.05,isTextBox:true,margin:0,fontFace:BODY,fontSize:13,color:'DCE9F2'});});
 s.addText('Kanıt eksikliği ile kanıtlanmış etkisizlik ayrı şeyler. BPC-157 için bugün geçerli ifade: insanlarda işe yarayıp yaramadığı bilinmiyor.',
   {x:M,y:4.72,w:CW,h:0.6,isTextBox:true,margin:0,fontFace:HEAD,fontSize:18,bold:true,color:W});
 s.addText('2026’daki düzenleyici gelişmeler bir erişim ve yetki tartışması; yeni etkinlik verisi üretmediler.',
   {x:M,y:5.35,w:CW,h:0.35,isTextBox:true,margin:0,fontFace:BODY,fontSize:13,color:'9FC9E4'});
 s.addShape(pres.ShapeType.roundRect,{x:M,y:5.95,w:CW,h:0.75,rectRadius:0.06,fill:{color:'0A4467'},line:{color:'0A4467',width:0}});
 s.addText([{text:'Şubat 2027  ',options:{bold:true,color:W,fontSize:14}},
   {text:'NCT07437547 — BPC-157’nin ilk randomize plasebo kontrollü Faz 2 sonucu. Sunum o tarihte güncellenecek.',
    options:{color:'BBD3E4',fontSize:13}}],
   {x:M+0.4,y:5.95,w:CW-0.8,h:0.75,isTextBox:true,margin:0,valign:'middle',fontFace:BODY});
 s.addNotes('Kaynaklar: PubMed (PMID ile), ClinicalTrials.gov (NCT ile), FDA belgeleri, STAT News Şubat 2026.');}

await pres.writeFile({fileName:'/tmp/claude-0/deck/BPC-157_TB-500_Sunum.pptx'});
console.log('slayt sayisi:', n);
