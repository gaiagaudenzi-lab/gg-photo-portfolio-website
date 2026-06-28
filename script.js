/**
 * GG Photography – script.js
 * - Adaptive day/night theme
 * - Lightbox for story pages
 */

// ── ADAPTIVE THEME ────────────────────────────────────────
(function applyTheme() {
  const hour = new Date().getHours();
  // Night: 20:00 – 05:59
  if (hour >= 20 || hour < 6) {
    document.body.classList.add('night');
  } else {
    document.body.classList.remove('night');
  }
})();

// Recheck theme every minute (for long sessions)
setInterval(function () {
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 6) {
    document.body.classList.add('night');
  } else {
    document.body.classList.remove('night');
  }
}, 60000);

// ── LIGHTBOX ──────────────────────────────────────────────
(function initLightbox() {
  const lb       = document.getElementById('lightbox');
  if (!lb) return;            // not on a story page

  const lbImg    = lb.querySelector('img');
  const lbClose  = document.getElementById('lightbox-close');
  const lbPrev   = document.getElementById('lightbox-prev');
  const lbNext   = document.getElementById('lightbox-next');
  const figures  = Array.from(document.querySelectorAll('.photo-grid figure'));
  let current    = 0;

  function openAt(idx) {
    current = idx;
    const src = figures[idx].querySelector('img').getAttribute('src');
    lbImg.setAttribute('src', src);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { openAt((current - 1 + figures.length) % figures.length); }
  function next() { openAt((current + 1) % figures.length); }

  figures.forEach(function (fig, idx) {
    fig.style.cursor = 'pointer';
    fig.addEventListener('click', function () { openAt(idx); });
  });

  lbClose && lbClose.addEventListener('click', close);
  lbPrev  && lbPrev.addEventListener('click', prev);
  lbNext  && lbNext.addEventListener('click', next);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
})();
