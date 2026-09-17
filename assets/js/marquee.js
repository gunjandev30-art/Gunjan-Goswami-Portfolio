/* ============================================================
   assets/js/marquee.js
   ============================================================ */
const Marquee = {
  init() {
    const el = q('#marquee');
    if (!el || !HAS_GSAP || REDUCED) return;
    let rows = qa('.marquee__row', el);
    const unit = rows[0].offsetWidth;
    while (unit && unit * rows.length < window.innerWidth * 2 && rows.length < 8) {
      el.appendChild(rows[0].cloneNode(true));
      rows = qa('.marquee__row', el);
    }
    const loop = gsap.to(rows, { xPercent: -100, duration: 28, ease: 'none', repeat: -1 });
    el.addEventListener('mouseenter', () => gsap.to(loop, { timeScale: 2.4, duration: .6 }));
    el.addEventListener('mouseleave', () => gsap.to(loop, { timeScale: 1, duration: 1 }));
  }
};
