/* Arakaki Kensho ekotoba site v1.0 */
(function () {
  "use strict";

  /* ===== 4.2 作品データ ===== */
  /* caption は作品に書かれているえことばの文章。未提供は "" にする。 */
  var works = [
    { file: "images/ekotoba-01.jpg", caption: "生きづらさの分だけ　言葉がある" },
    { file: "images/ekotoba-02.jpg", caption: "疲れたら　休もうね" },
    { file: "images/ekotoba-03.jpg", caption: "表現は自由　表現は生き方" },
    { file: "images/ekotoba-04.jpg", caption: "失敗も成功も　明日を生きる糧にする" },
    { file: "images/ekotoba-05.jpg", caption: "生きてる分だけ　奇跡だよ" },
    { file: "images/ekotoba-06.jpg", caption: "感謝が愛を生み　尊敬が愛を深める" },
    { file: "images/ekotoba-07.jpg", caption: "感謝の心は　愛の中で育つ" },
    { file: "images/ekotoba-08.jpg", caption: "人の可能性は　心の奥に隠れてる" },
    { file: "images/ekotoba-09.jpg", caption: "挑戦する数は　人生を切り開く" },
    { file: "images/ekotoba-10.jpg", caption: "日々の挑戦が重なって　人生は豊かになる" },
    { file: "images/ekotoba-11.jpg", caption: "できない理由をあげるより　やりたい理由を一つ作ろう" },
    { file: "images/ekotoba-12.jpg", caption: "ぼくは思う　生きてるだけですごいって" },
    { file: "images/ekotoba-13.jpg", caption: "やるときゃ　やるっしょ" },
    { file: "images/ekotoba-14.jpg", caption: "継続は宝なり" },
    { file: "images/ekotoba-15.jpg", caption: "いっぱい記念日作ったら　毎日がハッピーだ！" },
    { file: "images/ekotoba-16.jpg", caption: "理由は何でもいい　自分を褒めることから始めよう" },
    { file: "images/ekotoba-17.jpg", caption: "生きてる間は勉強中" },
    { file: "images/ekotoba-18.jpg", caption: "おにぎりうまい！" },
    { file: "images/ekotoba-19.jpg", caption: "優しさは　思いやりから生まれる" },
    { file: "images/ekotoba-20.jpg", caption: "挑戦できるって　幸せですね" },
    { file: "images/ekotoba-21.jpg", caption: "自分の幸せは　自分で決めていい" },
    { file: "images/ekotoba-22.jpg", caption: "あるもの探しは　幸せとつながっているね" },
    { file: "images/ekotoba-23.jpg", caption: "あのさ　うんとさ　あなたが一番大切なのさ" },
    { file: "images/ekotoba-24.jpg", caption: "良い人生は　良い言葉で成り立つ" },
    { file: "images/ekotoba-25.jpg", caption: "幸せは　日常の中で光ってる" },
    { file: "images/ekotoba-26.jpg", caption: "どんなことがあったって　好きであり続けるのさ" },
    { file: "images/ekotoba-27.jpg", caption: "生きてることが　はなまる" },
    { file: "images/ekotoba-28.jpg", caption: "白黒だけで決めるより　他の色も探そうね" },
    { file: "images/ekotoba-29.jpg", caption: "愛はあなたを救う" },
    { file: "images/ekotoba-30.jpg", caption: "人の目気にしちゃ　人生終わっちゃうよ" },
    { file: "images/ekotoba-31.jpg", caption: "自分の人生愛してる？　うん　いっぱい" },
    { file: "images/ekotoba-32.jpg", caption: "真っ直ぐな線は美しい　曲がった線には味がある" },
    { file: "images/ekotoba-33.jpg", caption: "あなたは、一番の幸せ者だよ" },
    { file: "images/ekotoba-34.jpg", caption: "経験が言葉に変わると　生きることが楽になる" },
    { file: "images/ekotoba-35.jpg", caption: "生きてることが楽しいと思えるのは　幸せなことですね" },
    { file: "images/ekotoba-36.jpg", caption: "アートも人生も一緒　生きざまが問われてる" },
    { file: "images/ekotoba-37.jpg", caption: "生きるって苦しむこと？　より幸せになるためのエッセンス" },
    { file: "images/ekotoba-38.jpg", caption: "幸せには言葉がいる" },
    { file: "images/ekotoba-39.jpg", caption: "いつも心は自然体" },
    { file: "images/ekotoba-40.jpg", caption: "あなたの心が傷つく場所からは　逃げていい" },
    { file: "images/ekotoba-41.jpg", caption: "わかっているよ　ありのままのあなたが一番だってね" }
  ];

  /* ===== ギャラリー動的生成 ===== */
  /* #galleryGrid に data-limit があればその枚数だけ表示（トップ用）。無ければ全点（作品ページ用） */
  var grid = document.getElementById("galleryGrid");
  if (grid) {
    var limit = parseInt(grid.getAttribute("data-limit"), 10);
    var list = (limit && limit > 0) ? works.slice(0, limit) : works;
    list.forEach(function (w, i) {
      var fig = document.createElement("figure");
      fig.className = "work-card reveal";

      var frame = document.createElement("div");
      frame.className = "frame";

      var img = document.createElement("img");
      img.src = w.file;
      img.loading = "lazy";
      img.alt = w.caption ? "えことば作品「" + w.caption.replace(/　/g, " ") + "」" : "えことば作品 " + (i + 1);
      img.setAttribute("data-lightbox", w.file);
      img.setAttribute("data-caption", w.caption || "");

      frame.appendChild(img);
      fig.appendChild(frame);

      if (w.caption) {
        var cap = document.createElement("figcaption");
        cap.className = "work-caption";
        cap.textContent = w.caption;
        fig.appendChild(cap);
      }
      grid.appendChild(fig);
    });
  }

  /* ===== 背景の花あしらい（挿絵PNG）を各セクションの端に配置 ===== */
  /* data-decor="tr:01,bl:09" のように「位置:画像番号」で指定 */
  var validPos = { tl:1, tr:1, bl:1, br:1, lm:1, rm:1,
    l1:1, l2:1, l3:1, r1:1, r2:1, r3:1 };
  document.querySelectorAll("[data-decor]").forEach(function (sec) {
    var host = sec.querySelector(".inner") || sec;
    sec.getAttribute("data-decor").split(",").forEach(function (pair) {
      var parts = pair.trim().split(":");
      var pos = parts[0], num = parts[1];
      if (!validPos[pos] || !num) return;
      var span = document.createElement("span");
      span.className = "decor decor-" + pos;
      span.setAttribute("aria-hidden", "true");
      span.style.backgroundImage = "url('images/decorations/deco-" + num + ".png')";
      host.insertBefore(span, host.firstChild);
    });
  });

  /* ===== ヒーローのカルーセル（横スライド） ===== */
  var car = document.getElementById("heroCarousel");
  if (car) {
    var track = car.querySelector(".carousel-track");
    var slides = car.querySelectorAll(".c-slide");
    var dotsWrap = car.querySelector(".c-dots");
    var n = slides.length, idx = 0, timer = null, dots = [];
    var reduceC = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    for (var ci = 0; ci < n; ci++) {
      (function (i) {
        var b = document.createElement("button");
        b.className = "c-dot" + (i === 0 ? " active" : "");
        b.type = "button";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", (i + 1) + "枚目の作品");
        b.addEventListener("click", function () { go(i); restart(); });
        dotsWrap.appendChild(b);
        dots.push(b);
      })(ci);
    }
    function go(i) {
      idx = (i + n) % n;
      track.style.transform = "translateX(" + (-idx * 100) + "%)";
      dots.forEach(function (d, k) { d.classList.toggle("active", k === idx); });
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === idx); });
    }
    slides[0].classList.add("is-active");
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }
    function start() { if (reduceC) return; stop(); timer = setInterval(next, 10000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    car.querySelector(".c-next").addEventListener("click", function () { next(); restart(); });
    car.querySelector(".c-prev").addEventListener("click", function () { prev(); restart(); });

    // スワイプ操作
    var startX = null, moved = false;
    car.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; moved = false; stop(); }, { passive: true });
    car.addEventListener("touchmove", function () { moved = true; }, { passive: true });
    car.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (moved && Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
      startX = null;
      start();
    }, { passive: true });

    // ホバー・非表示中は自動送りを止める
    car.addEventListener("mouseenter", stop);
    car.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });

    start();
  }

  /* ===== ヘッダー：スクロールで背景 ===== */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ===== モバイルナビ ===== */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    var setMenu = function (open) {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    };
    toggle.addEventListener("click", function () {
      setMenu(menu.hidden);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* ===== スクロールフェード（IntersectionObserver） ===== */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ===== ライトボックス ===== */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var lbCap = document.getElementById("lightboxCaption");
  var lbClose = document.getElementById("lightboxClose");
  var lastFocused = null;

  function openLightbox(src, caption, alt) {
    lastFocused = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || caption || "作品の拡大表示";
    lbCap.textContent = caption || "";
    lbCap.style.display = caption ? "block" : "none";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-lightbox]");
    if (t) {
      e.preventDefault();
      openLightbox(t.getAttribute("data-lightbox"), t.getAttribute("data-caption"), t.alt);
    }
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });

  /* ===== フッター年号 ===== */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
