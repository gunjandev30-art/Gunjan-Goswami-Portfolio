/* ============================================================
   assets/js/animations.js  —  reusable scroll-reveal system
   Markup opts in with data-animation="lines | words | fade-up | stagger"
   ============================================================ */
const Reveal = {
  init() {
    if (!HAS_GSAP || REDUCED) { document.documentElement.classList.add('no-motion'); return; }

    qa('[data-animation]').forEach(el => {
      if (el.closest('.hero')) { gsap.set(el, { opacity: 1 }); return; }
      const type = el.dataset.animation;
      const st = { trigger: el, start: 'top 85%', once: true };
      gsap.set(el, { opacity: 1 });

      if (type === 'lines') {
        // y:0 is required — the CSS start state is a translateY(106%), which GSAP
        // parses into a pixel `y`. Animating yPercent alone leaves that offset behind
        // and the line never comes back into its mask.
        gsap.fromTo(qa('.ln > span', el), { yPercent: 106, y: 0 },
          { yPercent: 0, y: 0, duration: 1.15, stagger: .085, ease: 'power4.out', scrollTrigger: st });

      } else if (type === 'words') {
        gsap.fromTo(splitWords(el), { yPercent: 105, y: 0 },
          { yPercent: 0, y: 0, duration: 1, stagger: .018, ease: 'power3.out', scrollTrigger: st });

      } else if (type === 'stagger') {
        gsap.fromTo(el.children, { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: .85, stagger: .045, ease: 'power3.out', scrollTrigger: st });

      } else { // fade-up
        gsap.fromTo(el, { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: .9, ease: 'power3.out', scrollTrigger: st });
      }
    });
  }
};
