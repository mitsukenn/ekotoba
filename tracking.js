/* えことば コンバージョン計測
   公式LINEへのリンククリック → line_click（GA4のキーイベント）
   Googleマップへのリンククリック → map_click（成果ではなく、内訳を分けるための目印）
   ※ GA4タグ本体（gtag.js）は各HTMLの<head>に設置済み（G-8PB6TK25SY） */
(function () {
  'use strict';
  document.addEventListener('click', function (e) {
    if (typeof gtag !== 'function') return;
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('lin.ee') !== -1 || href.indexOf('line.me') !== -1) {
      gtag('event', 'line_click', { link_url: href });
    }
    if (href.indexOf('google.com/maps') !== -1) {
      gtag('event', 'map_click', { link_url: href });
    }
  }, true);
})();
