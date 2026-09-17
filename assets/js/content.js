/* ============================================================
   assets/js/content.js  —  inject SITE data into the markup
   ============================================================ */
const Content = {
  init() {
    qa('[data-site]').forEach(el => {
      const key = el.dataset.site;
      const value = SITE[key] || '';
      el.textContent = value;
      if (el.tagName === 'A') {
        if (key === 'email') el.href = 'mailto:' + SITE.email;
        if (key === 'phone') el.href = 'tel:' + SITE.phone.replace(/[^+\d]/g, '');
      }
    });
    qa('[data-site-link]').forEach(el => {
      const url = SITE.links[el.dataset.siteLink];
      if (!url) { const row = el.closest('li'); if (row) row.remove(); return; }   // no link, no row
      el.href = url;
      if (el.closest('.cdetails')) el.textContent = url.replace(/^https?:\/\/(www\.)?/, '');
    });
    q('#year').textContent = new Date().getFullYear();
  }
};
