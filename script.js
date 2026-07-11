/* Arakaki Kensho ekotoba site v1.0 */
(function () {
  "use strict";

  /* ===== 4.2 作品データ ===== */
  /* caption は作品に書かれているえことばの文章。未提供は "" にする。 */
  var works = [
    { file: "images/ekotoba-01.jpg", caption: "生きづらさの分だけ　言葉がある" },
    { file: "images/ekotoba-02.jpg", caption: "疲れたら　休もうね" },
    { file: "images/ekotoba-03.jpg", caption: "表現は自由　表現は生き方" },
    { file: "images/ekotoba-04.jpg", caption: "失敗も成功も　明日を生きる糧にする" }
    /* 作品が届き次第、ここに追記（work-05 以降） */
  ];

  /* ===== ギャラリー動的生成 ===== */
  var grid = document.getElementById("galleryGrid");
  if (grid) {
    works.forEach(function (w, i) {
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
    }
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }
    function start() { if (reduceC) return; stop(); timer = setInterval(next, 4500); }
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
