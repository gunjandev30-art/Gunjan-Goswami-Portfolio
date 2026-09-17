/* ============================================================
   assets/js/timeline.js  —  experience line + counters
   ============================================================ */
const Timeline = {
  init() {
    const tl = q('#tl');
    if (!tl || !HAS_GSAP || REDUCED) return;
    gsap.to('#tlFill', {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: tl, start: 'top 72%', end: 'bottom 85%', scrub: .5 }
    });
    qa('.tl__item', tl).forEach(item => {
      gsap.fromTo(item, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', once: true }
      });
      ScrollTrigger.create({
        trigger: item, start: 'top 60%', end: 'bottom 45%',
        onToggle: self => item.classList.toggle('is-live', self.isActive)
      });
    });
  }
};

const Counters = {
  init() {
    qa('[data-count]').forEach(el => {
      if (el.dataset.static) return;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      if (!HAS_GSAP || REDUCED) { el.textContent = target + suffix; return; }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; }
      });
    });
  }
};
