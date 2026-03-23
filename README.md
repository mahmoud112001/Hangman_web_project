# 🎮 JS Game Station — Landing Page

> **Developer:** Mahmoud Awad Saad
> **Program:** ITI — ICC Program | Full-Stack MEARN Track
> **Stack:** HTML5 · CSS3 · JavaScript
> **Live:** [mahmoud112001.github.io/Hangman_web_project](https://mahmoud112001.github.io/Hangman_web_project/)

---

## 📌 Description

A production-level game collection landing page with a **Retro Arcade × Cyberpunk Terminal** aesthetic. Players choose from three games — each card presents a live animated preview, tech stack, description, and release date. Rebuilt from scratch with a complete design overhaul from the original v1 landing page.

---

## 📁 File Structure

```
LandingPage/
├── index.html      ← Page structure
├── style.css       ← All styles (split from v1's inline CSS)
├── script.js       ← All scripts (split from v1's inline JS)
├── screenshots/    ← Landing page screenshots
└── README.md
```

> **v1** was a single self-contained `index.html` with inline CSS + JS.
> **v2** is properly split into 3 separate files.

---

## 🔗 Live Demos

| Game | Name | URL |
|---|---|---|
| **Hangman v01** | ⚙️ The Scaffold — Classic | [Play](https://mahmoud112001.github.io/Hangman_web_project/v1/) |
| **Hangman v02** | ⭐ Gallows Noir — Dark Edition | [Play](https://mahmoud112001.github.io/Hangman_web_project/v2/) |
| **Tic Tac Toe** | ♟️ Grid Wars | [Play](https://mahmoud112001.github.io/Hangman_web_project/tic-tac-toe/) |

---

## 🃏 Three Games

### ⚙️ The Scaffold *(Hangman v1 — Classic)*
> *"Where it all began. Raw, minimal, and pure."*
- Light pastel theme · 4 categories · Fixed 8 lives · Single HTML file

### ⭐ Gallows Noir *(Hangman v2 — Dark Edition)*
> *"Reborn in darkness. Harder, smarter, and alive with animation."*
- Dark animated theme · 6 categories + difficulty · Leaderboard · Physical keyboard

### ♟️ Grid Wars *(Tic Tac Toe)*
> *"Three in a row wins it all. Challenge a friend or take on an unbeatable AI."*
- PvP + vs CPU · 3 difficulties · Minimax AI · TypeScript + SCSS + Vite

---

## 🆕 v1 → v2 Full Comparison

### Design

| Aspect | v1 — JS Games | v2 — JS Game Station |
|---|---|---|
| **Theme** | Dark flat cards | ✅ Retro Arcade × Cyberpunk Terminal |
| **Font** | `Bebas Neue` + `DM Mono` | ✅ `Orbitron` + `Space Mono` + `DM Sans` |
| **Background** | Animated grid + static glow blobs | ✅ Canvas-rendered grid + animated glow blobs + moving neon dots |
| **Title effect** | CSS shimmer on static text | ✅ Letter-by-letter typing animation (infinite loop) |
| **Tagline** | Static text | ✅ 4 rotating taglines — type → delete → loop |
| **CRT effect** | ❌ None | ✅ Scanline overlay on page + per card |
| **Cursor** | Browser default | ✅ Custom neon dot + lagging ring + 8 trailing color dots |
| **Card style** | Simple dark card with hover lift | ✅ 3D tilt on mouse move + expanding glow border |
| **Card border** | Static corner brackets | ✅ Animated corner brackets that grow on hover |

### Card Features

| Feature | v1 | v2 |
|---|---|---|
| **Game icon** | ❌ No icon | ✅ Floating badge on top edge with pulse ring |
| **Preview area** | ❌ No preview | ✅ CSS-animated live preview per game |
| **Preview on hover** | ❌ N/A | ✅ Expands from 160px → 220px + animation scales up |
| **Description** | Short tagline only | ✅ Full description paragraph |
| **Tech stack** | ❌ Not shown | ✅ Tech pills per card (HTML · CSS · JS · TypeScript) |
| **Release date** | ❌ Not shown | ✅ Month + year per card |
| **CTA button** | Simple arrow link | ✅ `LAUNCH GAME ↗` with animated arrow |

### Animations

| Animation | v1 | v2 |
|---|---|---|
| Background grid | CSS `background-position` animation | ✅ Canvas `requestAnimationFrame` — precise control |
| Floating particles | 22 CSS particles | ✅ 18 colored neon particles with glow |
| Title | CSS shimmer | ✅ JS typewriter with infinite write/delete |
| Cards | `translateY` on hover | ✅ Full 3D perspective tilt + scale |
| Score counters | ❌ None | ✅ Count-up animation on scroll into view |
| Card reveal | None | ✅ Staggered scroll reveal per card |
| Hangman preview | ❌ None | ✅ CSS swaying figure animation |
| Noir bars | ❌ None | ✅ Pulsing difficulty bars + animated tags |
| TTT board | ❌ None | ✅ Animated winning cells with neon glow |

### Credentials & Social

| Feature | v1 | v2 |
|---|---|---|
| **Info shown** | Course · Instructor · Program · Author | ✅ Developer · Program · Stack · Year |
| **Tone** | Academic assignment | ✅ Personal portfolio |
| **Social links** | GitHub + LinkedIn only | ✅ GitHub · LinkedIn · Facebook · Instagram · Email |
| **Social hover** | Basic color change | ✅ Brand color per platform + tooltip label |
| **X (Twitter)** | ✅ Present | ✅ Removed |

### Code Structure

| Aspect | v1 | v2 |
|---|---|---|
| **Files** | 1 self-contained `index.html` | ✅ Separated: `index.html` + `style.css` + `script.js` |
| **Background** | CSS only | ✅ HTML5 Canvas API |
| **Cursor** | Browser default | ✅ Custom JS cursor with trail |
| **Animations** | CSS `@keyframes` only | ✅ CSS + `requestAnimationFrame` |
| **Scroll effects** | ❌ None | ✅ `IntersectionObserver` for counters + card reveal |

---

## ✨ v2 Features Summary

- Canvas animated background — grid + glow blobs + moving neon dots
- Infinite typewriter — title types once, taglines rotate forever
- Custom cursor — neon dot + lagging ring + 8-dot color trail
- CRT scanline overlay — subtle retro effect on page and cards
- Header stats — animated count-up (3 games · 5 versions · 2026)
- 3D card tilt — perspective rotate follows mouse position
- Live animated game previews inside each card
- Preview expands on hover (160px → 220px)
- Floating icon badge per card with pulse ring
- Tech stack pills per game
- Staggered scroll reveal on cards
- Corner bracket animations on hover
- Rotating glow border on card hover
- 5 social links with brand colors and tooltips
- Fully responsive — 3 cols → 2 → 1

---

## 🛠️ Tech Used

| Tech | Usage |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Variables, animations, grid, 3D transforms, responsive |
| JavaScript | Canvas, typewriter, cursor trail, IntersectionObserver, card tilt |
| HTML5 Canvas API | Animated background rendering |
| Google Fonts | `Orbitron` + `Space Mono` + `DM Sans` |

---

## 📸 Card Color System

| Card | Accent Color | Game |
|---|---|---|
| The Scaffold | 🔵 `#00d4ff` Cyan | Hangman v1 |
| Gallows Noir | 🟡 `#f7df1e` Yellow | Hangman v2 |
| Grid Wars | 🟢 `#39ff14` Neon Green | Tic Tac Toe |

---

*JS Game Station · ITI ICC Program · Full-Stack MEARN Track · 2026*
*Built by Mahmoud Awad Saad*