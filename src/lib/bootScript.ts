import { LANGUAGE_KEY, languages } from "@/i18n/languages";
import { INTRO_KEY } from "@/lib/intro";

const scripts = JSON.stringify(
  Object.fromEntries(languages.map((l) => [l.code, l.script])),
);

/**
 * Runs in <head> before the page paints:
 * - On a browser reload, always land on the homepage, at the top (the
 *   browser's own scroll restoration is turned off for full page loads).
 * - Mark the intro as already seen this session so the loader never flashes.
 * - Apply the saved language early; the page stays hidden (max 3 s) until its
 *   text has loaded, so returning visitors never see English flash first.
 */
export const bootScript = `(function(){try{
var d=document.documentElement;
if("scrollRestoration" in history){history.scrollRestoration="manual";}
var nav=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];
if(nav&&nav.type==="reload"){
if(location.pathname!=="/"||location.search||location.hash){location.replace("/");return;}
window.scrollTo(0,0);
window.addEventListener("load",function(){window.scrollTo(0,0);});
}
if(sessionStorage.getItem("${INTRO_KEY}")==="1"){d.setAttribute("data-intro","seen");}
var l=localStorage.getItem("${LANGUAGE_KEY}"),s=${scripts};
if(l&&s[l]){d.lang=l;d.setAttribute("data-lang",l);d.setAttribute("data-script",s[l]);}
setTimeout(function(){d.setAttribute("data-i18n-ready","");},3000);
}catch(e){}})();`;
