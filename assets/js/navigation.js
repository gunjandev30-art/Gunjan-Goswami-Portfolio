/* ============================================================
   assets/js/navigation.js
   ============================================================ */
const Navigation = {
  open: false,
  init() {
    this.nav = q('#nav'); this.burger = q('#burger'); this.menu = q('#menu');
    this.items = qa('#menuList a');

    if (HAS_GSAP) {
      const setState = self => this.nav.classList.toggle('is-stuck', self.isActive);
      ScrollTrigger.create({ start: 70, end: 'max', onToggle: setState, onRefresh: setState });
    } else {
      window.addEventListener('scroll', () => this.nav.classList.toggle('is-stuck', window.scrollY > 70), { passive: true });
    }

    this.burger.addEventListener('click', () => this.open ? this.close() : this.show());
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && this.open) this.close(); });
  },
  show() {
    this.open = true;
    document.body.classList.add('menu-open');
    this.menu.classList.add('is-open');
    this.menu.setAttribute('aria-hidden', 'false');
    this.burger.setAttribute('aria-expanded', 'true');
    this.burger.setAttribute('aria-label', 'Close menu');
    SmoothScroll.stop();
    if (HAS_GSAP && !REDUCED) {
      gsap.fromTo(this.items, { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: .9, stagger: .06, ease: 'power4.out', delay: .18 });
      gsap.fromTo('#menuFoot', { opacity: 0 }, { opacity: 1, duration: .6, delay: .55 });
    }
    this.items[0] && this.items[0].focus({ preventScroll: true });
  },
  close() {
    if (!this.open) return;
    this.open = false;
    document.body.classList.remove('menu-open');
    this.menu.classList.remove('is-open');
    this.menu.setAttribute('aria-hidden', 'true');
    this.burger.setAttribute('aria-expanded', 'false');
    this.burger.setAttribute('aria-label', 'Open menu');
    SmoothScroll.start();
    this.burger.focus({ preventScroll: true });
  }
};
