/* ============================================================
   assets/js/main.js  —  boot
   ============================================================ */
(function boot() {
  if (!HAS_GSAP) {                       // libraries blocked: ship a static, readable page
    document.documentElement.classList.remove('js');
    Content.init(); Work.render(); Testimonials.init(); Form.init(); Navigation.init();
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (REDUCED) document.documentElement.classList.add('no-motion');

  Content.init();
  SmoothScroll.init();
  Navigation.init();
  SmoothScroll.anchors();
  Cursor.init();
  Magnetic.init();
  Reveal.init();
  Marquee.init();
  Work.render();
  Work.init();
  Services.init();
  Stack.init();
  Timeline.init();
  Counters.init();
  Testimonials.init();
  Form.init();
  Progress.init();

  Preloader.init(() => {
    SmoothScroll.start();
    Hero.play();
    ScrollTrigger.refresh();
  });

  // keep measurements honest after fonts, late layout and viewport changes
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 200); });
})();
