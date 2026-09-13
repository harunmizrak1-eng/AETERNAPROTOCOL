import { siteUrl } from "@/lib/site"

/* Sayfanın resmî alan adı dışında açıldığını fark edip uyarı gösteren kod.
 *
 * Eskiden bu bir React bileşeniydi ve yalnızca /_next/ altındaki JS paketi
 * yüklenirse çalışıyordu. Site kopyalayan araçlar çoğu zaman yalnızca HTML'i
 * alıyor, paket dosyaları kopyalanmadığı için 404 veriyor ve uyarı hiç
 * çalışmıyordu. Bu yüzden denetim satır içi bir script'e taşındı: HTML'i
 * kopyalayan kod parçasını da kopyalamış oluyor, silmek için sayfayı elle
 * düzenlemesi gerekiyor.
 *
 * Kasıtlı olarak yönlendirme yapmaz, yalnızca uyarı gösterir ve resmî
 * adrese bağlantı verir.
 *
 * Dosya:// ile açılan kayıtlı bir kopyada hostname boş gelir; o durum da
 * "resmî değil" sayılır, çünkü sayfanın kaydedilmiş hâli budur. */

const OFFICIAL_HOSTS = ["zphctr.com", "www.zphctr.com", "localhost", "127.0.0.1"]

/** Yönlendirmeden önce beklenen saniye. Ziyaretçi ne olduğunu okuyacak
 * kadar zaman bulsun ve isterse iptal edebilsin diye sessiz değil. */
const REDIRECT_SECONDS = 6

const officialHost = siteUrl.replace(/^https?:\/\//, "")

const script = `(function(){try{
var ok=${JSON.stringify(OFFICIAL_HOSTS)};
var h=location.hostname;
if(ok.indexOf(h)!==-1)return;
if(h.slice(-11)===".vercel.app")return;
var left=${REDIRECT_SECONDS},timer=null;
function show(){
if(document.getElementById("zphctr-origin-notice"))return;
var d=document.createElement("div");
d.id="zphctr-origin-notice";
d.setAttribute("role","alert");
d.style.cssText="position:fixed;left:0;right:0;top:0;z-index:2147483647;background:#b42318;color:#fff;font:700 14px/1.5 system-ui,sans-serif;padding:12px 16px;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.25)";
var msg=document.createElement("span");
var a=document.createElement("a");
a.href=${JSON.stringify(siteUrl)};
a.textContent=${JSON.stringify(officialHost)};
a.style.cssText="color:#fff;text-decoration:underline";
var stop=document.createElement("button");
stop.type="button";
stop.textContent="Bu sayfada kal";
stop.style.cssText="margin-left:12px;background:transparent;border:1px solid rgba(255,255,255,.7);color:#fff;font:600 12px/1 system-ui,sans-serif;padding:6px 10px;border-radius:6px;cursor:pointer";
stop.onclick=function(){if(timer)clearInterval(timer);timer=null;msg.textContent="Yetkisiz kopya uyarısı: bu sayfa resmî ";stop.remove();d.appendChild(document.createTextNode(" adresinde değil."));};
function paint(){msg.textContent="Yetkisiz kopya uyarısı: bu sayfa resmî değil. "+left+" saniye içinde resmî siteye yönlendirileceksiniz: ";}
paint();
d.appendChild(msg);d.appendChild(a);d.appendChild(stop);
document.body.appendChild(d);
document.body.style.paddingTop="48px";
timer=setInterval(function(){
left--;
if(left<=0){clearInterval(timer);location.replace(${JSON.stringify(siteUrl)});return;}
paint();
},1000);
}
if(document.body)show();else document.addEventListener("DOMContentLoaded",show);
}catch(e){}})();`

export function OriginGuard() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: script }}
    />
  )
}
