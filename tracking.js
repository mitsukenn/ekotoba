/* えことば コンバージョン計測
   外部リンクのクリックを行き先ごとに数える。
     Instagram   → ig_click
     公式LINE     → line_click
     Googleマップ → map_click
   ※GA4は外部リンクを押すと自動で `click` も記録する（＝成果の合計）。
     この3つはその内訳を分けるための目印なので、成果の二重計上にならないよう
     GA4のキーイベント指定は `click` のままにしておくこと。
   ※GA4タグ本体（gtag.js）は各HTMLの<head>に設置済み（G-8PB6TK25SY） */
(function () {
  'use strict';

  /* 行き先の判定ルール。上から順に見て、最初に当てはまったものを記録する */
  var RULES = [
    { event: 'ig_click',   hosts: ['instagram.com'] },
    { event: 'line_click', hosts: ['lin.ee', 'line.me'] },
    { event: 'map_click',  hosts: ['google.com/maps'] }
  ];

  document.addEventListener('click', function (e) {
    if (typeof gtag !== 'function') return;
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';

    for (var i = 0; i < RULES.length; i++) {
      for (var j = 0; j < RULES[i].hosts.length; j++) {
        if (href.indexOf(RULES[i].hosts[j]) !== -1) {
          gtag('event', RULES[i].event, { link_url: href });
          return;
        }
      }
    }
  }, true);
})();
