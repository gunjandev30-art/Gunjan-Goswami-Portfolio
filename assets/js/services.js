/* ============================================================
   assets/js/services.js  —  expanding rows + typographic stack
   ============================================================ */
const Services = {
  init() {
    const rows = qa('.srv__row');
    if (!rows.length) return;

    if (!HAS_GSAP || REDUCED || !HAS_HOVER) {          // always readable without hover
      rows.forEach(r => { q('.srv__body', r).style.height = 'auto'; });
      return;
    }
    rows.forEach(row => {
      const body = q('.srv__body', row);
      const open  = () => gsap.to(body, { height: 'auto', duration: .6, ease: 'power3.out' });
      const close = () => gsap.to(body, { height: 0, duration: .5, ease: 'power3.inOut' });
      row.addEventListener('mouseenter', open);
      row.addEventListener('mouseleave', close);
      row.setAttribute('tabindex', '0');
      row.addEventListener('focus', open);
      row.addEventListener('blur', close);
    });

    gsap.fromTo(rows, { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: .8, stagger: .05, ease: 'power3.out',
        scrollTrigger: { trigger: '#srv', start: 'top 80%', once: true } });
  }
};

const Stack = {
  init() {
    const note = q('#stackNote'), buttons = qa('#stack button');
    if (!note || !buttons.length || !HAS_GSAP || !HAS_HOVER || REDUCED) return;
    const xTo = gsap.quickTo(note, 'x', { duration: .5, ease: 'power3' });
    const yTo = gsap.quickTo(note, 'y', { duration: .5, ease: 'power3' });

    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        note.textContent = btn.dataset.note;
        gsap.to(note, { opacity: 1, duration: .3 });
        gsap.to(btn, { y: -6, duration: .5, ease: 'power3.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(note, { opacity: 0, duration: .25 });
        gsap.to(btn, { y: 0, duration: .5, ease: 'power3.out' });
      });
      btn.addEventListener('mousemove', e => { xTo(e.clientX + 18); yTo(e.clientY + 18); });
    });
  }
};
