/* ============================================================
   assets/js/utils.js
   ============================================================ */
const q  = (s, c = document) => c.querySelector(s);
const qa = (s, c = document) => Array.from(c.querySelectorAll(s));
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_HOVER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const HAS_GSAP = typeof window.gsap !== 'undefined';

/** Wrap every word of an element in animatable spans. */
function splitWords(el) {
  if (el.dataset.split === 'done') return qa('.w-i', el);
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  words.forEach((w, i) => {
    const outer = document.createElement('span');
    outer.className = 'w';
    outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top';
    const inner = document.createElement('span');
    inner.className = 'w-i';
    inner.style.cssText = 'display:inline-block;will-change:transform';
    inner.textContent = w;
    outer.appendChild(inner);
    el.appendChild(outer);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
  el.dataset.split = 'done';
  return qa('.w-i', el);
}
