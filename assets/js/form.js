/* ============================================================
   assets/js/form.js  —  front-end only: wire to your endpoint
   ============================================================ */
const Form = {
  init() {
    const form = q('#form'), msg = q('#formMsg');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = q('#f-name').value.trim();
      const email = q('#f-email').value.trim();
      const body = q('#f-msg').value.trim();

      if (!name || !email || !body) {
        this.say(msg, 'Add your name, email and a short message so I can reply.', true);
        (!name ? q('#f-name') : !email ? q('#f-email') : q('#f-msg')).focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        this.say(msg, 'That email address looks incomplete.', true);
        q('#f-email').focus();
        return;
      }
      // TODO: POST to your endpoint (Formspree, Basin, a serverless function…)
      this.say(msg, 'Message sent. You’ll hear back within two working days.', false);
      form.reset();
    });
  },
  say(el, text, isError) {
    el.textContent = text;
    el.style.color = isError ? 'var(--fg)' : 'var(--accent)';
    if (HAS_GSAP && !REDUCED) gsap.fromTo(el, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .4 });
    else el.style.opacity = 1;
  }
};
