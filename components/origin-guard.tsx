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

const script = `(function(){try{
var ok=${JSON.stringify(OFFICIAL_HOSTS)};
var h=location.hostname;
if(ok.indexOf(h)!==-1)return;
if(h.slice(-11)===".vercel.app")return;
function show(){
if(document.getElementById("zphctr-origin-notice"))return;
var d=document.createElement("div");
d.id="zphctr-origin-notice";
d.setAttribute("role","alert");
d.style.cssText="position:fixed;left:0;right:0;top:0;z-index:2147483647;background:#b42318;color:#fff;font:700 14px/1.5 system-ui,sans-serif;padding:12px 16px;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.25)";
d.innerHTML='Yetkisiz kopya uyarısı: bu sayfa resmî ${siteUrl.replace(/^https?:\/\//, "")} adresinde görüntülenmiyor. Resmî site: <a href="${siteUrl}" style="color:#fff;text-decoration:underline">${siteUrl.replace(/^https?:\/\//, "")}</a>';
document.body.appendChild(d);
document.body.style.paddingTop="48px";
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
