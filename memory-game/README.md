# 🃏 Memory Matrix — Card Flip Game

> Premium memory card matching game built with HTML · SCSS · Vanilla JavaScript

**Author:** Mahmoud Awad Saad | **Program:** ITI — ICC | MEARN Track | **Year:** 2026

---

## 🔗 Links

| | |
|---|---|
| **GitHub** | [github.com/mahmoud112001](https://github.com/mahmoud112001) |
| **LinkedIn** | [linkedin.com/in/mahmoud-awad](https://www.linkedin.com/in/mahmoud-awad-795b02203/) |
| **Email** | mahmoudawad112001@gmail.com |

---

## 🎮 Features

- 4 difficulty levels: Easy (8) · Medium (12) · Hard (18) · Expert (24) pairs
- Move counter + live timer + star rating system
- Card shake animation on mismatch
- Match glow animation + sound chime
- Web Audio API sound effects (no files needed)
- Sound toggle button
- Victory modal with time · moves · stars
- Responsive grid (mobile → desktop)
- Glitch title effect + animated background

---

## 🚀 Run

```bash
# Option 1 — just open index.html in a browser (no server needed)

# Option 2 — with Sass watch
npm install
npm run dev
```

---

## 🏗️ Architecture (SOLID)

| Principle | Applied |
|---|---|
| **S** — Single Responsibility | Config · State · AudioService · TimerService · BoardService · GameController each do one thing |
| **O** — Open / Closed | Add a difficulty by editing CONFIG only, zero code changes elsewhere |
| **D** — Dependency Inversion | GameController calls service objects, never their internals |

---

## 📁 Structure

```
memory-game/
├── index.html
├── package.json
├── README.md
├── css/         ← compiled CSS
├── scss/        ← SCSS source
└── js/          ← game logic
```

---

*Memory Matrix · JS Game Station · ITI ICC · 2026*