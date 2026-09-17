/* ============================================================
   assets/js/preloader.js
   ============================================================ */
const Preloader = {
  init(onDone) {
    const pre = q('#pre');
    if (!pre || !HAS_GSAP || REDUCED) {
      if (pre) pre.style.display = 'none';
      onDone();
      return;
    }
    const num = q('#preNum'), bar = q('#preBar');
    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => { pre.style.display = 'none'; onDone(); } });

    tl.to(counter, {
        v: 100, duration: 1.25, ease: 'power2.inOut',
        onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(2, '0'); }
      })
      .to(bar, { scaleX: 1, duration: 1.25, ease: 'power2.inOut' }, 0)
      .to(['.pre__row', '.pre__meta', '.pre__bar'], { y: -26, opacity: 0, duration: .5, ease: 'power2.in' }, '+=0.12')
      .to(pre, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.25');
  }
};
