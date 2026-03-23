"use strict";

/* ══════════════════════════════════════════════════
   SCRIPT.JS — JS Game Station
   Handles: typing animation, canvas bg, cursor,
            counter animation, particles, card tilt
══════════════════════════════════════════════════ */

/* ── 1. TYPING ANIMATION — infinite write/delete loop ── */
const TITLE_TEXT = "JS GAME STATION";
const TAGLINES = [
  "SELECT YOUR GAME · ENTER TO START",
  "BUILT WITH HTML · CSS · JAVASCRIPT",
  "THREE GAMES · ONE COLLECTION",
  "PLAY · COMPETE · EXPLORE",
];

function typeLoop(el, text, onDone) {
  let i = 0;
  el.textContent = "";
  const type = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(type);
      setTimeout(() => deleteLoop(el, onDone), 1800);
    }
  }, 50);
}

function deleteLoop(el, onDone) {
  const del = setInterval(() => {
    el.textContent = el.textContent.slice(0, -1);
    if (el.textContent.length === 0) {
      clearInterval(del);
      setTimeout(onDone, 300);
    }
  }, 30);
}

function initTyping() {
  const titleEl = document.getElementById("typedTitle");
  const taglineEl = document.getElementById("taglineText");
  if (!titleEl || !taglineEl) return;

  // Title types once and stays
  let t = 0;
  titleEl.textContent = "";
  const titleInterval = setInterval(() => {
    titleEl.textContent += TITLE_TEXT[t];
    t++;
    if (t >= TITLE_TEXT.length) {
      clearInterval(titleInterval);
      setTimeout(() => startTaglineLoop(taglineEl), 500);
    }
  }, 65);
}

function startTaglineLoop(el) {
  let idx = 0;
  function next() {
    typeLoop(el, TAGLINES[idx], () => {
      idx = (idx + 1) % TAGLINES.length;
      next();
    });
  }
  next();
}

/* ── 2. CANVAS ANIMATED BACKGROUND ─────────────── */
function initCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Grid lines
  const GRID = 52;

  // Moving dots
  const dots = Array.from({ length: 60 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.1,
    color: ["#f7df1e", "#00d4ff", "#39ff14", "#ff006e"][
      Math.floor(Math.random() * 4)
    ],
  }));

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Animated grid
    ctx.strokeStyle = "rgba(247,223,30,0.022)";
    ctx.lineWidth = 1;
    const t = Date.now() / 1000;
    const offset = (t * 2) % GRID;

    for (let x = -GRID + (offset % GRID); x < canvas.width + GRID; x += GRID) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = -GRID + (offset % GRID); y < canvas.height + GRID; y += GRID) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Glow blobs
    const cx1 = canvas.width * 0.2 + Math.sin(t * 0.3) * 40;
    const cy1 = canvas.height * 0.3 + Math.cos(t * 0.2) * 30;
    const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, 320);
    g1.addColorStop(0, "rgba(247,223,30,0.04)");
    g1.addColorStop(1, "transparent");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx2 = canvas.width * 0.8 + Math.sin(t * 0.25) * 50;
    const cy2 = canvas.height * 0.7 + Math.cos(t * 0.3) * 40;
    const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, 280);
    g2.addColorStop(0, "rgba(0,212,255,0.04)");
    g2.addColorStop(1, "transparent");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx3 = canvas.width * 0.5 + Math.sin(t * 0.18) * 60;
    const cy3 = canvas.height * 0.8 + Math.cos(t * 0.22) * 30;
    const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, 250);
    g3.addColorStop(0, "rgba(57,255,20,0.03)");
    g3.addColorStop(1, "transparent");
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Moving dots
    dots.forEach((dot) => {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.x < 0) dot.x = canvas.width;
      if (dot.x > canvas.width) dot.x = 0;
      if (dot.y < 0) dot.y = canvas.height;
      if (dot.y > canvas.height) dot.y = 0;

      ctx.globalAlpha = dot.opacity;
      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.globalAlpha = dot.opacity * 0.3;
      ctx.shadowBlur = 8;
      ctx.shadowColor = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(drawFrame);
  }

  drawFrame();
}

/* ── 3. CUSTOM CURSOR — pointer-trail dots ── */
function initCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;
  let isHover = false;
  const TRAIL_COUNT = 8;

  // Create trail dots
  const trail = Array.from({ length: TRAIL_COUNT }, (_, i) => {
    const d = document.createElement("div");
    d.style.cssText = `
      position:fixed; border-radius:50%; pointer-events:none; z-index:9996;
      transform:translate(-50%,-50%);
      transition:opacity 0.3s;
    `;
    document.body.appendChild(d);
    return { el: d, x: 0, y: 0, delay: (i + 1) * 0.08 };
  });

  // Trail history
  const history = [];

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
    history.unshift({ x: mouseX, y: mouseY });
    if (history.length > TRAIL_COUNT * 3) history.pop();
  });

  // Detect hover
  document.addEventListener("mouseover", (e) => {
    isHover = e.target.closest("a, button") !== null;
  });

  function animFrame() {
    // Ring follows with lag
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    // Scale ring on hover
    if (isHover) {
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "rgba(247,223,30,0.7)";
      dot.style.background = "#f7df1e";
      dot.style.boxShadow = "0 0 10px #f7df1e";
    } else {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "rgba(0,212,255,0.45)";
      dot.style.background = "#00d4ff";
      dot.style.boxShadow = "0 0 8px #00d4ff";
    }

    // Trail dots
    trail.forEach((t, i) => {
      const step = Math.floor(i * 2.5);
      const pos = history[step] ||
        history[history.length - 1] || { x: 0, y: 0 };
      const lerp = 0.18 - i * 0.015;
      t.x += (pos.x - t.x) * lerp;
      t.y += (pos.y - t.y) * lerp;

      const size = Math.max(2, 6 - i * 0.6);
      const opacity = Math.max(0, 0.55 - i * 0.065);
      const colors = ["#00d4ff", "#f7df1e", "#39ff14", "#ff006e"];
      const color = colors[i % colors.length];

      t.el.style.left = t.x + "px";
      t.el.style.top = t.y + "px";
      t.el.style.width = size + "px";
      t.el.style.height = size + "px";
      t.el.style.opacity = opacity;
      t.el.style.background = color;
      t.el.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    });

    requestAnimationFrame(animFrame);
  }
  animFrame();
}

/* ── 4. COUNTER ANIMATION ────────────────────────── */
function animateCounter(el, target, duration) {
  const start = Date.now();
  const step = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const els = document.querySelectorAll(".stat-num[data-count]");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          animateCounter(el, target, 1200);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  els.forEach((el) => observer.observe(el));
}

/* ── 5. FLOATING PARTICLES ───────────────────────── */
function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  const colors = [
    "rgba(247,223,30,0.5)",
    "rgba(0,212,255,0.45)",
    "rgba(57,255,20,0.4)",
    "rgba(255,0,110,0.35)",
  ];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 3 + 1.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `bottom:-10px`,
      `background:${color}`,
      `box-shadow:0 0 ${size * 3}px ${color}`,
      `animation-duration:${Math.random() * 12 + 8}s`,
      `animation-delay:${Math.random() * 16}s`,
      `border-radius:50%`,
    ].join(";");
    container.appendChild(p);
  }
}

/* ── 6. CARD 3D TILT ─────────────────────────────── */
function initCardTilt() {
  const cards = document.querySelectorAll("[data-tilt]");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -8;
      const tiltY = dx * 8;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ── 7. CARD REVEAL ON SCROLL ─────────────────────── */
function initScrollReveal() {
  const cards = document.querySelectorAll(".game-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ${i * 0.12}s ease, transform 0.6s ${i * 0.12}s ease`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  cards.forEach((card) => observer.observe(card));
}

/* ── 8. BOOT ─────────────────────────────────────── */
function boot() {
  initCanvas();
  initCursor();
  initTyping();
  initCounters();
  initParticles();
  initCardTilt();
  initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
