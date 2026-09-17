/* ============================================================
   assets/js/cursor.js  —  custom cursor + magnetic buttons
   ============================================================ */
const Cursor = {
  init() {
    if (!HAS_HOVER || !HAS_GSAP || REDUCED) return;
    const dot = q('#cursorDot'), ring = q('#cursorRing'), label = q('#cursorLabel');
    const xd = gsap.quickTo(dot, 'x', { duration: .12, ease: 'power3' });
    const yd = gsap.quickTo(dot, 'y', { duration: .12, ease: 'power3' });
    const xr = gsap.quickTo(ring, 'x', { duration: .55, ease: 'power3' });
    const yr = gsap.quickTo(ring, 'y', { duration: .55, ease: 'power3' });
    let shown = false;

    window.addEventListener('mousemove', e => {
      if (!shown) { gsap.to([dot, ring], { opacity: 1, duration: .4 }); shown = true; }
      xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY);
    }, { passive: true });
    document.addEventListener('mouseleave', () => { gsap.to([dot, ring], { opacity: 0, duration: .3 }); shown = false; });

    const grow = text => {
      label.textContent = text;
      gsap.to(ring, { scale: 1, duration: .5, ease: 'power3.out' });
      gsap.to(label, { opacity: 1, duration: .3 });
      gsap.to(dot, { opacity: 0, duration: .2 });
    };
    const shrink = () => {
      gsap.to(ring, { scale: .18, duration: .5, ease: 'power3.out' });
      gsap.to(label, { opacity: 0, duration: .2 });
      gsap.to(dot, { opacity: 1, duration: .3 });
    };

    qa('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => grow(el.dataset.cursor));
      el.addEventListener('mouseleave', shrink);
    });
    qa('a:not([data-cursor]), button:not([data-cursor])').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(ring, { scale: .42, duration: .45, ease: 'power3.out' }));
      el.addEventListener('mouseleave', () => gsap.to(ring, { scale: .18, duration: .45, ease: 'power3.out' }));
    });
  }
};

const Magnetic = {
  init() {
    if (!HAS_HOVER || !HAS_GSAP || REDUCED) return;
    qa('[data-magnetic]').forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: .8, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: .8, ease: 'power3.out' });
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * .32);
        yTo((e.clientY - (r.top + r.height / 2)) * .45);
      });
      el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  }
};
