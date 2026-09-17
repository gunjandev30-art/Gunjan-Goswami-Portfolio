/* ============================================================
   assets/js/smooth-scroll.js  —  Lenis + GSAP ticker + ScrollTrigger
   ============================================================ */
const SmoothScroll = {
  lenis: null,
  init() {
    if (REDUCED || typeof window.Lenis === 'undefined' || !HAS_GSAP) return;
    this.lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.7,
      gestureOrientation: 'vertical'
    });
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => this.lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    this.stop();                                   // locked until the preloader clears
  },
  stop()  { this.lenis ? this.lenis.stop()  : document.documentElement.style.removeProperty('overflow'); },
  start() { this.lenis && this.lenis.start(); },
  to(target, offset = 0) {
    if (this.lenis) this.lenis.scrollTo(target, { offset, duration: 1.25 });
    else target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  },
  anchors() {
    qa('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = document.getElementById(id.slice(1));
        if (!target) return;
        e.preventDefault();
        Navigation.close();
        this.to(target, id === '#top' ? 0 : -10);
        history.replaceState(null, '', id);
      });
    });
  }
};
