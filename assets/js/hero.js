/* ============================================================
   assets/js/hero.js  —  the single orchestrated load sequence
   ============================================================ */
const Hero = {
  play() {
    if (!HAS_GSAP || REDUCED) { document.documentElement.classList.add('no-motion'); return; }
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.nav .fx', { opacity: 1, duration: .8, stagger: .06 })
      .to('.hero .status', { opacity: 1, duration: .7 }, '-=0.45')
      .fromTo('.hero h1 .ln > span', { yPercent: 106, y: 0 }, { yPercent: 0, y: 0, duration: 1.25, stagger: .09 }, '-=0.35')
      .to('.hero__sub .fx', { opacity: 1, duration: .9, stagger: .1 }, '-=0.8')
      .to('.scroll-cue', { opacity: 1, duration: .7 }, '-=0.55')
      .fromTo('.scroll-cue i', { scaleX: 0 }, { scaleX: 1, duration: .9 }, '<');
    this.parallax();
  },

  /* storefront preview reacts to the pointer — subtle, desktop only */
  parallax() {
    const shop = q('#shop'), win = q('#shopWin'), drawer = q('#shopDrawer');
    if (!shop || !HAS_HOVER || REDUCED) return;

    const rx = gsap.quickTo(win, 'rotationX', { duration: .9, ease: 'power3' });
    const ry = gsap.quickTo(win, 'rotationY', { duration: .9, ease: 'power3' });
    const dx = gsap.quickTo(drawer, 'x', { duration: 1.1, ease: 'power3' });
    const dy = gsap.quickTo(drawer, 'y', { duration: 1.1, ease: 'power3' });

    window.addEventListener('mousemove', e => {
      const px = (e.clientX / window.innerWidth) - .5;
      const py = (e.clientY / window.innerHeight) - .5;
      rx(-py * 7); ry(px * 9); dx(px * -22); dy(py * -14);
    }, { passive: true });

    gsap.to(win, { y: -10, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to(drawer, { y: '+=8', duration: 4.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });

    gsap.to(shop, {
      yPercent: -8, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }
};
