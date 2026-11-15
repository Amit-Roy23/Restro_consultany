import { INTRO_KEY } from "@/lib/intro";

/**
 * Runs in <head> before the page paints:
 * - On a browser reload, always land on the homepage, at the top (the
 *   browser's own scroll restoration is turned off for full page loads).
 * - Mark the intro as already seen this session so the loader never flashes.
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
}catch(e){}})();`;
