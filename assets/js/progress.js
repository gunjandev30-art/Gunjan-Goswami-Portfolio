/* ============================================================
   assets/js/progress.js
   ============================================================ */
const Progress = {
  init() {
    const bar = q('#progressBar'), num = q('#progressNum');
    if (!bar || !HAS_GSAP) return;
    gsap.to(num, { opacity: 1, duration: .6, delay: 1.4 });
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: self => {
        gsap.set(bar, { scaleX: self.progress });
        num.textContent = String(Math.round(self.progress * 100)).padStart(2, '0') + '%';
      }
    });
  }
};
