/* ============================================================
   assets/js/projects.js  —  pinned horizontal reel (desktop)
   vertical case-study list (mobile)
   ============================================================ */
const Work = {
  /* Build the panels from SITE.projects before any ScrollTrigger is created. */
  render() {
    const track = q('#workTrack'), outro = q('.work__outro');
    if (!track || !Array.isArray(SITE.projects) || !SITE.projects.length) return;
    const ext = SITE.imageExt || 'svg';
    const total = String(SITE.projects.length).padStart(2, '0');
    const arrow = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5"/></svg>';
    const frag = document.createDocumentFragment();

    SITE.projects.forEach((p, i) => {
      const n = String(i + 1).padStart(2, '0');
      const meta = [p.industry, p.year].filter(Boolean);
      const el = document.createElement('article');
      el.className = 'panel';
      el.dataset.cursor = 'View site';
      el.innerHTML =
        '<div class="panel__media">' +
          '<div class="shot">' +
            '<picture>' +
              '<source media="(max-width: 767px)" srcset="assets/img/work/' + p.image + '-mobile.' + ext + '" width="1000" height="850">' +
              '<img src="assets/img/work/' + p.image + '-desktop.' + ext + '" alt="' + p.name + ' Shopify storefront" ' +
                   'width="1600" height="1240" loading="lazy" decoding="async">' +
            '</picture>' +
          '</div>' +
          '<span class="panel__num">' + n + ' / ' + total + '</span>' +
        '</div>' +
        '<div class="panel__content">' +
          (meta.length ? '<div class="panel__meta lbl"><span>' + meta.join('</span><span>') + '</span></div>' : '') +
          '<h3>' + p.name + '</h3>' +
          '<p>' + (p.summary || SITE.defaultSummary || '') + '</p>' +
          '<ul class="tech">' + (p.tech || []).map(t => '<li>' + t + '</li>').join('') + '</ul>' +
          '<a class="panel__link" href="' + p.url + '" target="_blank" rel="noopener">Visit live store' + arrow + '</a>' +
        '</div>';
      frag.appendChild(el);
    });

    outro ? track.insertBefore(frag, outro) : track.appendChild(frag);
  },

  init() {
    if (!HAS_GSAP || REDUCED) return;
    const pin = q('#workPin'), track = q('#workTrack');
    if (!pin || !track) return;
    const panels = qa('.panel', track);
    const mm = gsap.matchMedia();

    /* ---------- desktop / tablet: vertical scroll drives horizontal movement ---------- */
    mm.add('(min-width: 768px)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const drive = gsap.to(track, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: pin, start: 'top top', end: () => '+=' + distance(),
          pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true
        }
      });

      panels.forEach(panel => {
        const shot = q('.shot', panel);
        gsap.fromTo(shot,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: panel, containerAnimation: drive, start: 'left 82%', once: true } });

        gsap.fromTo(qa('.panel__content > *', panel), { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: .9, stagger: .07, ease: 'power3.out',
            scrollTrigger: { trigger: panel, containerAnimation: drive, start: 'left 72%', once: true } });

        gsap.fromTo(q('img, svg', shot), { xPercent: -5 }, {
          xPercent: 5, ease: 'none',
          scrollTrigger: { trigger: panel, containerAnimation: drive, start: 'left right', end: 'right left', scrub: true }
        });
      });

      gsap.fromTo('.work__outro > *', { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: .9, stagger: .08, ease: 'power3.out',
        scrollTrigger: { trigger: '.work__outro', containerAnimation: drive, start: 'left 80%', once: true }
      });

      return () => gsap.set(track, { clearProps: 'transform' });
    });

    /* ---------- mobile: no pinning, no horizontal scroll ---------- */
    mm.add('(max-width: 767px)', () => {
      panels.forEach(panel => {
        gsap.fromTo(q('.shot', panel),
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.12 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 80%', once: true } });
        gsap.fromTo(qa('.panel__content > *', panel), { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: .8, stagger: .06, ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 72%', once: true } });
      });
      gsap.fromTo('.work__outro > *', { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: .8, stagger: .06, ease: 'power3.out',
          scrollTrigger: { trigger: '.work__outro', start: 'top 82%', once: true } });
    });

    /* hover: lift the artwork, no CSS/GSAP transform conflict */
    if (HAS_HOVER) {
      panels.forEach(panel => {
        const shot = q('.shot', panel);
        panel.addEventListener('mouseenter', () => gsap.to(shot, { scale: 1.035, duration: .8, ease: 'power3.out' }));
        panel.addEventListener('mouseleave', () => gsap.to(shot, { scale: 1, duration: .8, ease: 'power3.out' }));
      });
    }
  }
};
