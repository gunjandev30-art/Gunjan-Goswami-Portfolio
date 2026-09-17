/* ============================================================
   assets/js/testimonials.js
   ============================================================ */
const Testimonials = {
  i: 0,
  init() {
    this.text = q('#qText'); this.meta = q('#qMeta'); this.count = q('#qCount');
    if (!this.text) return;
    this.render(0, true);
    q('#qNext').addEventListener('click', () => this.go(1));
    q('#qPrev').addEventListener('click', () => this.go(-1));
  },
  go(dir) {
    const next = (this.i + dir + SITE.testimonials.length) % SITE.testimonials.length;
    if (!HAS_GSAP || REDUCED) return this.render(next, true);
    gsap.to([this.text, this.meta], {
      y: -14 * dir, opacity: 0, duration: .35, ease: 'power2.in',
      onComplete: () => {
        this.render(next, true);
        gsap.fromTo([this.text, this.meta], { y: 16 * dir, opacity: 0 },
          { y: 0, opacity: 1, duration: .7, ease: 'power3.out', stagger: .06 });
      }
    });
  },
  render(index) {
    const t = SITE.testimonials[index];
    this.i = index;
    this.text.textContent = '“' + t.quote + '”';
    this.meta.innerHTML = '<b>' + t.name + '</b>' + t.role + ', ' + t.company;
    this.count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(SITE.testimonials.length).padStart(2, '0');
  }
};
