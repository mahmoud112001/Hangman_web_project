'use strict';

/* ══════════════════════════════════════════════════════
   JS GAME STATION — script.js v3.0
   Modules: Progress · Canvas · Cursor · Typing
            Counters · Particles · Tilt · Reveal
══════════════════════════════════════════════════════ */

/* ── 1. SCROLL PROGRESS BAR ─────────────────────────── */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  const update = () => {
    const scrolled = document.documentElement.scrollTop;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── 2. CANVAS BACKGROUND ───────────────────────────── */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const GRID   = 56;
  const COLORS = ['#f7df1e', '#00d4ff', '#39ff14', '#ff006e', '#9d00ff'];

  const dots = Array.from({ length: 55 }, () => ({
    x:       Math.random() * window.innerWidth,
    y:       Math.random() * window.innerHeight,
    vx:      (Math.random() - 0.5) * 0.25,
    vy:      (Math.random() - 0.5) * 0.25,
    r:       Math.random() * 1.2 + 0.4,
    opacity: Math.random() * 0.35 + 0.08,
    color:   COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  let frame = 0;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    const t = frame * 0.008;

    /* — Animated grid — */
    const offset = (t * 2.5) % GRID;
    ctx.strokeStyle = 'rgba(247,223,30,0.018)';
    ctx.lineWidth   = 0.5;
    for (let x = -GRID + (offset % GRID); x < canvas.width + GRID; x += GRID) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = -GRID + (offset % GRID); y < canvas.height + GRID; y += GRID) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    /* — Ambient glow blobs — */
    const blobs = [
      { x: 0.18, y: 0.28, r: 340, ox: 0.30, oy: 0.22, color: 'rgba(247,223,30,0.038)' },
      { x: 0.82, y: 0.68, r: 300, ox: 0.25, oy: 0.28, color: 'rgba(0,212,255,0.035)'  },
      { x: 0.50, y: 0.85, r: 260, ox: 0.20, oy: 0.18, color: 'rgba(57,255,20,0.028)'  },
      { x: 0.70, y: 0.20, r: 220, ox: 0.22, oy: 0.26, color: 'rgba(157,0,255,0.025)'  },
    ];
    blobs.forEach(({ x, y, r, ox, oy, color }, i) => {
      const cx = canvas.width  * x + Math.sin(t * 0.3 + i) * canvas.width  * ox;
      const cy = canvas.height * y + Math.cos(t * 0.2 + i) * canvas.height * oy;
      const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    /* — Moving dots — */
    dots.forEach(dot => {
      dot.x += dot.vx; dot.y += dot.vy;
      if (dot.x < 0) dot.x = canvas.width;
      if (dot.x > canvas.width)  dot.x = 0;
      if (dot.y < 0) dot.y = canvas.height;
      if (dot.y > canvas.height) dot.y = 0;

      ctx.globalAlpha = dot.opacity;
      ctx.fillStyle   = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();

      /* glow halo */
      ctx.globalAlpha  = dot.opacity * 0.25;
      ctx.shadowBlur   = 10;
      ctx.shadowColor  = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r * 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  };

  draw();
}

/* ── 3. CUSTOM CURSOR ───────────────────────────────── */
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mX = 0, mY = 0, rX = 0, rY = 0;
  const TRAIL = 10;

  /* Trail history */
  const history = [];

  /* Create trail dots */
  const trail = Array.from({ length: TRAIL }, () => {
    const d = document.createElement('div');
    d.style.cssText = [
      'position:fixed', 'border-radius:50%', 'pointer-events:none',
      'z-index:9996', 'transform:translate(-50%,-50%)',
    ].join(';');
    document.body.appendChild(d);
    return { el: d, x: 0, y: 0 };
  });

  document.addEventListener('mousemove', e => {
    mX = e.clientX; mY = e.clientY;
    dot.style.left = mX + 'px'; dot.style.top = mY + 'px';
    history.unshift({ x: mX, y: mY });
    if (history.length > TRAIL * 4) history.pop();
  }, { passive: true });

  const COLORS = ['#00d4ff', '#f7df1e', '#39ff14', '#ff006e', '#9d00ff'];

  const tick = () => {
    rX += (mX - rX) * 0.12;
    rY += (mY - rY) * 0.12;
    ring.style.left = rX + 'px'; ring.style.top = rY + 'px';

    trail.forEach((t, i) => {
      const step = Math.min(Math.floor(i * 2.8), history.length - 1);
      const pos  = history[step] || history[history.length - 1] || { x: 0, y: 0 };
      t.x += (pos.x - t.x) * (0.2 - i * 0.012);
      t.y += (pos.y - t.y) * (0.2 - i * 0.012);

      const size    = Math.max(1.5, 5.5 - i * 0.4);
      const opacity = Math.max(0, 0.5 - i * 0.045);
      const color   = COLORS[i % COLORS.length];

      t.el.style.left        = t.x + 'px';
      t.el.style.top         = t.y + 'px';
      t.el.style.width       = size + 'px';
      t.el.style.height      = size + 'px';
      t.el.style.opacity     = opacity;
      t.el.style.background  = color;
      t.el.style.boxShadow   = `0 0 ${size * 2}px ${color}`;
    });

    requestAnimationFrame(tick);
  };
  tick();
}

/* ── 4. TYPING ANIMATION ────────────────────────────── */
const TITLE_TEXT = 'GAME STATION';
const TAGLINES   = [
  'SELECT YOUR GAME · ENTER TO START',
  'BUILT WITH HTML · CSS · JAVASCRIPT',
  'FOUR GAMES · ONE COLLECTION',
  'PLAY · BUILD · EXPLORE',
];

function typeLoop(el, text, onDone) {
  let i = 0;
  el.textContent = '';
  const t = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(t); setTimeout(onDone, 2000); }
  }, 48);
}

function deleteLoop(el, onDone) {
  const t = setInterval(() => {
    el.textContent = el.textContent.slice(0, -1);
    if (!el.textContent) { clearInterval(t); setTimeout(onDone, 300); }
  }, 28);
}

function initTyping() {
  const titleEl   = document.getElementById('typedTitle');
  const taglineEl = document.getElementById('taglineText');
  if (!titleEl || !taglineEl) return;

  let i = 0;
  titleEl.textContent = '';
  const ti = setInterval(() => {
    titleEl.textContent += TITLE_TEXT[i++];
    if (i >= TITLE_TEXT.length) { clearInterval(ti); setTimeout(() => loopTaglines(taglineEl), 600); }
  }, 60);
}

function loopTaglines(el) {
  let idx = 0;
  (function next() {
    typeLoop(el, TAGLINES[idx], () => deleteLoop(el, () => {
      idx = (idx + 1) % TAGLINES.length; next();
    }));
  })();
}

/* ── 5. COUNTER ANIMATION ───────────────────────────── */
function animateCount(el, target, duration = 1400) {
  const start = Date.now();
  const tick  = () => {
    const p  = Math.min((Date.now() - start) / duration, 1);
    const ep = 1 - Math.pow(1 - p, 4); /* easeOutQuart */
    el.textContent = Math.round(ep * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  const els = document.querySelectorAll('.stat-num[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target, parseInt(e.target.dataset.count));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

/* ── 6. FLOATING PARTICLES ──────────────────────────── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const PALETTE = [
    'rgba(247,223,30,0.55)', 'rgba(0,212,255,0.5)',
    'rgba(57,255,20,0.45)',  'rgba(255,0,110,0.4)',
    'rgba(157,0,255,0.35)',
  ];
  for (let i = 0; i < 22; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 3 + 1;
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    p.style.cssText = [
      `width:${size}px`, `height:${size}px`,
      `left:${Math.random() * 100}%`, `bottom:-10px`,
      `background:${color}`, `box-shadow:0 0 ${size * 4}px ${color}`,
      `animation-duration:${Math.random() * 14 + 8}s`,
      `animation-delay:${Math.random() * 18}s`,
    ].join(';');
    container.appendChild(p);
  }
}

/* ── 7. CARD 3D TILT ────────────────────────────────── */
function initCardTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const dx  = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const dy  = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      card.style.transform = `perspective(900px) rotateX(${dy * -7}deg) rotateY(${dx * 7}deg) scale(1.015)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── 8. SCROLL REVEAL ───────────────────────────────── */
function initReveal() {
  const cards = document.querySelectorAll('.reveal-card');
  const obs   = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        /* stagger delay based on element index in DOM */
        const idx = [...cards].indexOf(e.target);
        e.target.style.transitionDelay = `${(idx % 4) * 0.08}s`;
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  cards.forEach(c => obs.observe(c));
}

/* ── 9. KEYBOARD NAVIGATION ─────────────────────────── */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      /* restore cursor for keyboard users */
      document.body.style.cursor = 'auto';
    }
  });
  document.addEventListener('mousemove', () => {
    document.body.style.cursor = 'none';
  }, { once: true });
}

/* ── BOOT ───────────────────────────────────────────── */
function boot() {
  initProgressBar();
  initCanvas();
  initCursor();
  initTyping();
  initCounters();
  initParticles();
  initCardTilt();
  initReveal();
  initKeyboard();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}