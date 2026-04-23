<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=900&size=28&pause=1000&color=F7DF1E&center=true&vAlign=middle&width=600&lines=JS+GAME+STATION+🎮;Four+Games.+One+Collection.;Built+with+HTML+·+CSS+·+JavaScript" alt="Typing SVG"/>

<br/>



[![Live Demo](https://img.shields.io/badge/▶_PLAY_NOW-Live_Demo-f7df1e?style=for-the-badge&labelColor=07080d)](https://mahmoud112001.github.io/JS-Game-Station/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-100000?style=for-the-badge&logo=github&logoColor=white&labelColor=07080d)](https://github.com/mahmoud112001/JS-Game-Station)
[![ITI](https://img.shields.io/badge/ITI-ICC_·_MEARN_Track-00d4ff?style=for-the-badge&labelColor=07080d)](https://iti.gov.eg)

<br/>



![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Landing Page](#landing-page)
- [Games Collection](#games-collection)
  - [🪢 The Scaffold — Hangman v1](#-the-scaffold--hangman-v1)
  - [💀 Gallows Noir — Hangman v2](#-gallows-noir--hangman-v2)
  - [♟️ Grid Wars — Tic Tac Toe](#️-grid-wars--tic-tac-toe)
  - [🃏 Memory Matrix — Memory Card](#-memory-matrix--memory-card)
- [Architecture & Principles](#architecture--principles)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Changelog](#changelog)
- [What I Modified & Why I Refactored It](#-what-i-modified--why-i-refactored-it)
- [Credits](#credits)

---

## Overview

**JS Game Station** is a curated collection of browser-based games built as part of the **ITI ICC Full-Stack MEARN Track** program. What started as a single Hangman game grew into a full game station — each entry progressively more complex, applying better architecture, cleaner code, and richer UX.

> _"Each version is a checkpoint of growth — not just as a developer, but as a problem solver."_

| Metric | Value |
|---|---|
| 🎮 Games | 4 |
| 🔖 Versions | 6 |
| 📅 Period | Feb – Apr 2026 |
| 🧑‍💻 Developer | Mahmoud Awad Saad |
| 🏫 Institute | ITI — ICC Program · Alexandria |

---

## Landing Page

> **[🔗 mahmoud112001.github.io/JS-Game-Station](https://mahmoud112001.github.io/JS-Game-Station/)**

The landing page is the entry point to the entire collection. It uses a **Retro Arcade × Cyberpunk Terminal** design language with full interactivity.

### ✨ Landing Page Features

| Feature | Details |
|---|---|
| 🎨 **Animated Canvas Background** | HTML5 Canvas grid + glow blobs + 55 moving neon dots via `requestAnimationFrame` |
| ⌨️ **Infinite Typewriter** | Title types once, 4 taglines rotate forever (write → delete → loop) |
| 🖱️ **Custom Cursor** | Neon dot + lagging ring + 10-dot color trail |
| 📺 **CRT Scanlines** | Retro CRT scanline overlay across the full page |
| 📊 **Animated Stats** | Count-up animation — 4 Games · 6 Versions · 2026 |
| 🃏 **3D Card Tilt** | `perspective()` 3D rotate follows mouse position on each card |
| 🔍 **Live Animated Previews** | CSS-animated game preview per card — expands 160px → 220px on hover |
| 🏷️ **Corner Brackets** | Animated corner brackets that grow on hover |
| 🌟 **Scroll Reveal** | Staggered card reveal using `IntersectionObserver` |
| 📈 **Progress Bar** | Scroll-driven gradient progress bar at top of page |
| 🔗 **5 Social Links** | GitHub · LinkedIn · Facebook · Instagram · Email with tooltips |
| 👨‍🏫 **Instructors Section** | Full credits for all ITI course instructors |
| 📱 **Fully Responsive** | 4 cols → 2 → 1 on mobile |

### 🎨 Card Color System

| Card | Accent | Game |
|---|---|---|
| 🔵 Cyan `#00d4ff` | `data-color="blue"` | The Scaffold |
| 🟡 Yellow `#f7df1e` | `data-color="yellow"` | Gallows Noir |
| 🟢 Green `#39ff14` | `data-color="green"` | Grid Wars |
| 🟣 Purple `#9d00ff` | `data-color="purple"` | Memory Matrix |

---

## Games Collection

---

### 🪢 The Scaffold — Hangman v1

> *"Where it all began. Raw, minimal, and pure."*

[![Play](https://img.shields.io/badge/▶_Play-The_Scaffold-00d4ff?style=for-the-badge&labelColor=07080d)](https://mahmoud112001.github.io/JS-Game-Station/v1/)

The **original Hangman** — a single self-contained HTML file with a clean light theme and classic gameplay.

#### 🎮 Gameplay Features

- 🔤 Word guessing with on-screen keyboard
- 📂 4 word categories
- ❤️ 8 fixed lives with visual hangman progression
- 🏆 Win / Lose detection with result screen
- 🔁 Play Again without page reload

#### 🛠️ Tech Used

| Tech | Usage |
|---|---|
| `HTML5` | Semantic page structure |
| `CSS3` | Light pastel theme, flexbox layout, transitions |
| `JavaScript` | DOM manipulation, game logic, event handling |

#### 📐 Principles Applied

| Principle | How |
|---|---|
| **Separation of Concerns** | Logic, rendering, and data in separate functions |
| **DRY** | Shared `checkLetter()` reused across keyboard and click events |
| **Event Delegation** | Single listener on the keyboard container |

#### 📁 Structure

```
v1/
└── index.html   ← Self-contained (HTML + CSS + JS inline)
```

---

### 💀 Gallows Noir — Hangman v2

> *"Reborn in darkness. Harder, smarter, alive with animation."*

[![Play](https://img.shields.io/badge/▶_Play-Gallows_Noir-f7df1e?style=for-the-badge&labelColor=07080d)](https://mahmoud112001.github.io/JS-Game-Station/v2/)

A **complete redesign** of the original — dark animated cyberpunk theme, 3 difficulty levels, persistent leaderboard, and SVG hangman figure.

#### 🎮 Gameplay Features

- 🌑 Dark animated cyberpunk theme
- 📚 6 word categories
- 🎚️ 3 difficulty levels — Easy · Medium · Hard
- 🏅 Leaderboard with `localStorage` persistence
- ⌨️ Physical keyboard support
- 🖼️ Animated SVG hangman figure
- 🔄 Win / Lose modal with replay

#### 🛠️ Tech Used

| Tech | Usage |
|---|---|
| `HTML5` | Semantic structure |
| `CSS3` | Dark theme, CSS animations, custom properties, transitions |
| `JavaScript (ES6+)` | Modular game logic, `localStorage`, SVG manipulation |
| `SVG` | Animated hangman figure drawn programmatically |

#### 📐 Principles Applied

| Principle | How |
|---|---|
| **S** — Single Responsibility | Separate functions for game logic, UI rendering, leaderboard |
| **O** — Open / Closed | New word categories added via `CONFIG` object — zero logic rewrite |
| **DRY** | Centralised `renderHangman(lives)` function |
| **localStorage** | Leaderboard persists between sessions |

#### 📁 Structure

```
v2/
├── index.html
├── style.css
└── script.js
```

---

### ♟️ Grid Wars — Tic Tac Toe

> *"Three in a row wins it all. Challenge a friend or face an unbeatable AI."*

[![Play](https://img.shields.io/badge/▶_Play-Grid_Wars-39ff14?style=for-the-badge&labelColor=07080d)](https://mahmoud112001.github.io/JS-Game-Station/tic-tac-toe/)

The most technically advanced game in the collection — built with **TypeScript**, **SCSS**, and **Vite**, featuring a true **Minimax algorithm** AI that cannot be beaten on Hard mode.

#### 🎮 Gameplay Features

- 🆚 Player vs Player (PvP)
- 🤖 Player vs CPU across 3 difficulty levels
- 🧠 **Hard mode = Minimax algorithm** — truly unbeatable
- 🔢 Score persistence via `localStorage`
- ✨ Winning cells animated with neon glow
- 🎯 Fully responsive 3×3 board
- 🔄 Round reset without losing score

#### 🛠️ Tech Used

| Tech | Usage |
|---|---|
| `TypeScript` | Full type safety across all game modules |
| `SCSS` | Variables, mixins, nesting, compiled to CSS |
| `Vite` | Build tool, dev server, HMR |
| `HTML5` | Semantic board structure |

#### 🧠 Minimax Algorithm

The AI uses **Minimax** — a recursive decision tree that evaluates all possible future game states and picks the optimal move every time.

```
minimax(board, depth, isMaximizing)
  → evaluates every possible future game state
  → returns the optimal move score
  → CPU always plays perfectly on Hard
  → Hard mode = provably unbeatable
```

#### 📐 SOLID Principles Applied

| Principle | How |
|---|---|
| **S** — Single Responsibility | `GameLogic.ts` · `UIController.ts` · `AI.ts` fully separated |
| **O** — Open / Closed | New difficulty levels added via config — no AI code changed |
| **L** — Liskov Substitution | `EasyAI`, `MediumAI`, `HardAI` all implement `IAI` interface safely |
| **I** — Interface Segregation | `IBoard`, `IPlayer`, `IAI` — small and focused |
| **D** — Dependency Inversion | `GameController` depends on `IAI` abstraction, not any concrete class |

#### 📁 Structure

```
tic-tac-toe/
├── src/
│   ├── ts/          ← TypeScript source modules
│   └── styles/      ← SCSS source files
├── index.html
├── tsconfig.json
├── package.json
└── README.md
```

---

### 🃏 Memory Matrix — Memory Card

> *"Flip it. Match it. Remember everything."*

[![Play](https://img.shields.io/badge/▶_Play-Memory_Matrix-9d00ff?style=for-the-badge&labelColor=07080d)](https://mahmoud112001.github.io/JS-Game-Station/memory-game/)

A **premium memory card game** built with vanilla JS, SCSS, and the Web Audio API — featuring 4 difficulty levels, a live timer, star rating, and synthesised sound effects with zero audio files.

#### 🎮 Gameplay Features

- 🎚️ 4 difficulty levels — Easy (8) · Medium (12) · Hard (18) · Expert (24) pairs
- ⏱️ Live timer + move counter
- ⭐ 3-star rating system based on move efficiency
- 🔔 **Web Audio API** sound — match chime · mismatch buzz · victory fanfare (no files!)
- 🔕 Sound toggle button
- 💥 Card shake animation on mismatch
- ✅ Match glow animation on correct pair
- 🏆 Victory modal with time · moves · stars summary
- 🎲 **Fisher-Yates shuffle** — guaranteed fair randomisation
- 📱 Responsive grid — auto-adapts to all screen sizes

#### 🛠️ Tech Used

| Tech | Usage |
|---|---|
| `HTML5` | Semantic accessible structure (`role="grid"`, `aria-*`) |
| `SCSS` | Design tokens, variables, mixins, nesting — compiled to CSS |
| `JavaScript (ES6+)` | 6-module IIFE architecture |
| `Web Audio API` | Synthesised sound — zero audio file dependencies |
| `IntersectionObserver` | Stat counter animation |

#### 🏗️ SOLID Architecture — 6 Modules

```
CONFIG          → static game data (difficulties, emoji pool, selectors)
State           → single mutable source of truth (get / set / reset API)
AudioService    → Web Audio API synthesis only                     (SRP)
TimerService    → timer lifecycle only                             (SRP)
BoardService    → deck building, Fisher-Yates shuffle, rating calc (SRP)
GameController  → orchestration façade — DOM cache + event binding
```

#### 📐 SOLID Principles Applied

| Principle | How |
|---|---|
| **S** — Single Responsibility | Every module has exactly one reason to change |
| **O** — Open / Closed | New difficulty = edit `CONFIG` only — zero logic touched |
| **L** — Liskov Substitution | Any storage/audio service can be swapped without breaking the game |
| **I** — Interface Segregation | Audio, Timer, Board never mixed into one bloated service |
| **D** — Dependency Inversion | `GameController` calls service objects — never their internals |

#### 📁 Structure

```
memory-game/
├── index.html
├── css/
│   ├── style.css        ← Compiled CSS
│   └── style.min.css    ← Minified production CSS
├── scss/
│   ├── main.scss        ← Entry point
│   ├── _variables.scss  ← Design tokens
│   └── _mixin.scss      ← Reusable patterns
├── js/
│   └── script.js        ← 6-module SOLID architecture
└── README.md
```

---

## Architecture & Principles

### 📈 Evolution Across Versions

```
v1 Hangman      → Single HTML file · inline CSS/JS · basic DOM functions
v2 Hangman Noir → Separated HTML/CSS/JS · localStorage · modular functions
Tic Tac Toe     → TypeScript · SCSS · Vite · Minimax AI · full SOLID · interfaces
Memory Matrix   → SOLID modules · Web Audio API · SCSS tokens · accessibility
Landing v3      → Canvas API · IntersectionObserver · custom cursor · progress bar
```

### 🧩 Design Patterns Used

| Pattern | Used In | Description |
|---|---|---|
| **Singleton** | `State` (Memory) | Single mutable source of truth for game state |
| **Façade** | `GameController` (Memory) | Single entry point hiding service complexity |
| **Strategy** | AI difficulty (TTT) | `EasyAI / MediumAI / HardAI` — swappable algorithms |
| **Factory** | `BoardService.buildDeck()` | Creates shuffled card decks without exposing logic |
| **Observer** | `IntersectionObserver` (Landing) | Reactive scroll reveal + counter animations |
| **IIFE** | All JS modules | Encapsulated scope — zero global namespace pollution |

### ♿ Accessibility Highlights

- `role="grid"` and `role="gridcell"` on game boards
- `aria-label` on all interactive elements
- `aria-pressed` on toggle buttons (sound on/off)
- `aria-live` on status regions
- Keyboard navigation — `Enter` + `Space` for card flipping
- `prefers-reduced-motion` respected in all CSS animations

---

## Tech Stack

| Technology | Used In |
|---|---|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | All games + Landing |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | All games + Landing |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | v1 · v2 · Memory · Landing |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Tic Tac Toe |
| ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white) | Memory · TTT · Landing |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Tic Tac Toe |
| `Canvas API` | Landing Page background |
| `Web Audio API` | Memory Matrix sounds |
| `IntersectionObserver` | Landing reveal + counters |
| `localStorage` | v2 leaderboard · TTT scores |
| `Fisher-Yates Shuffle` | Memory Matrix deck |
| `Minimax Algorithm` | TTT Hard AI |

---

## File Structure

```
JS-Game-Station/
│
├── 📄 index.html              ← Root redirect → landing page
├── 📄 README.md               ← This file
│
├── 📁 landing/                ← JS Game Station Landing (v3)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── 📁 v1/                     ← The Scaffold — Hangman Classic
│   └── index.html
│
├── 📁 v2/                     ← Gallows Noir — Hangman Dark
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── 📁 tic-tac-toe/            ← Grid Wars — Tic Tac Toe
│   ├── index.html
│   ├── src/
│   │   ├── ts/
│   │   └── styles/
│   ├── tsconfig.json
│   └── package.json
│
└── 📁 memory-game/            ← Memory Matrix — Card Flip
    ├── index.html
    ├── css/
    ├── scss/
    ├── js/
    └── README.md
```

---

## Changelog

### v3.0 — Landing Page Overhaul + Memory Matrix (Apr 2026)
- ✅ Landing page fully rebuilt — Neo-Terminal Luxury aesthetic
- ✅ Canvas API — grid + blobs + 55 neon dots
- ✅ Scroll progress bar
- ✅ 10-dot color cursor trail
- ✅ Staggered scroll reveal via `IntersectionObserver`
- ✅ Memory Matrix card added as 4th game
- ✅ Stats updated: 4 GAMES · 6 VERSIONS
- ✅ Instructor credits section added to footer
- ✅ 5 social links with brand colors + tooltips
- ✅ `prefers-reduced-motion` media query support
- ✅ Full `aria-*` accessibility attributes

### v2.0 — Memory Matrix + Landing v2 (Mar–Apr 2026)
- ✅ Memory Matrix — new game with SOLID architecture
- ✅ Web Audio API synthesised sounds
- ✅ Fisher-Yates shuffle
- ✅ 4 difficulties · star rating · victory modal
- ✅ Landing page split to separate CSS + JS files

### v1.0 — Tic Tac Toe + Hangman Noir (Feb–Mar 2026)
- ✅ Grid Wars — TypeScript + Minimax AI + SCSS + Vite
- ✅ Hangman v2 — Gallows Noir with dark theme + leaderboard
- ✅ Landing page created

### v0.1 — The Scaffold (Feb 2026)
- ✅ Hangman v1 — original single-file game

---

## 🔧 What I Modified & Why I Refactored It

> This section documents the deliberate decisions made across versions — not just *what* changed, but *why* it changed. Every refactor here was driven by a specific problem encountered during development.

---

### 1. Landing Page — From Inline to Separated Files

| | Before | After |
|---|---|---|
| **Structure** | Single `index.html` with inline CSS + JS | `index.html` + `style.css` + `script.js` |
| **Why** | Started as a quick prototype | Grew too large to maintain in one file |

**The problem:** Inline CSS and JS make it nearly impossible to scan, debug, or extend code once the file exceeds a few hundred lines. Scrolling through 1,200 lines of mixed HTML, CSS, and JS to find a specific animation was painful.

**The decision:** Separate concerns into three files — structure, style, behaviour. Each file now has one job. Finding and editing anything takes seconds instead of minutes.

---

### 2. Landing Page — v1 → v2 → v3 Progressive Rebuild

**v1 → v2 refactor:**

The original landing page used CSS-only animations and a static background. As the project grew to include more games and more complexity, the visual identity needed to match.

- **Problem:** Static glow blobs looked flat. No interactivity beyond hover states. No cursor customisation. No scroll-driven behaviour.
- **Solution:** Replaced CSS-only background with `Canvas API` + `requestAnimationFrame`. Added custom cursor trail, scroll reveal via `IntersectionObserver`, and counter animations. Split into separate files.

**v2 → v3 refactor:**

After adding the Memory Matrix card as the 4th game, the 3-column grid broke the visual balance. The entire design system needed to scale.

- **Problem:** Grid was `repeat(3, 1fr)` — adding a 4th card made it uneven. Color system didn't include purple. Memory preview CSS was written in the wrong scope (inside a `@media` block), causing it to not render.
- **Solution:** Updated grid to `repeat(4, 1fr)` with breakpoints at 1200px and 720px. Added `--purple: #9d00ff` to the CSS variable system. Moved all memory preview CSS outside the media query. Added inline `style` attributes to the preview grid as a rendering fallback.

---

### 3. Hangman v1 → v2 — Architecture Upgrade

**Problem:** v1 was a single `index.html` with everything inline. Adding a difficulty system, leaderboard, or animated SVG meant touching hundreds of scattered lines. Testing any one feature meant manually tracing logic across the entire file.

**What changed:**
- Separated into `index.html` + `style.css` + `script.js`
- Word bank moved into a `CONFIG` object — new categories can be added without touching game logic (OCP)
- Hangman rendering centralised into a single `renderHangman(lives)` function — no more repeated DOM queries scattered across the codebase (DRY)
- `localStorage` integration added for leaderboard persistence

**Why it mattered:** v1's structure would have made v2's features impossible to add cleanly. The refactor wasn't about making v1 better — it was about making v2 buildable at all.

---

### 4. Tic Tac Toe — JavaScript → TypeScript Migration

**Problem:** The game logic involves complex state — whose turn it is, what the board looks like, what the AI thinks the board will look like in 5 moves. Without types, it was easy to pass the wrong shape of data into a function and get silent bugs that only appeared at runtime.

**What changed:**
- Migrated entirely to TypeScript
- Defined `IBoard`, `IPlayer`, `IAI` interfaces — every function now knows exactly what it receives and returns
- AI difficulty implemented as `EasyAI`, `MediumAI`, `HardAI` — all implementing `IAI` (Liskov Substitution, Interface Segregation)
- `GameController` depends on `IAI` interface, not on any concrete AI class (Dependency Inversion)

**Why it mattered:** The Minimax algorithm is recursive and evaluates hundreds of board states. TypeScript caught several class-shape mismatches at compile time that would have been nearly impossible to debug at runtime.

---

### 5. Memory Matrix — Why SOLID Modules Instead of One Script

**Problem:** The first version of the memory game had all logic in a single function scope. As features were added (timer, star rating, sound, difficulty switching, modal), the function grew past 400 lines. Changing the timer logic risked breaking the sound logic. Changing the difficulty switching risked breaking the board render.

**What changed:** Split into 6 focused IIFE modules — `CONFIG`, `State`, `AudioService`, `TimerService`, `BoardService`, `GameController`.

| Module | Why it's separate |
|---|---|
| `CONFIG` | Static data should never be mixed with logic. Changing difficulties means editing one object, nothing else. |
| `State` | A single source of truth prevents two functions from holding different versions of the same game state. |
| `AudioService` | Sound synthesis has nothing to do with card flipping. Separating it means the sound can be changed or removed without touching game logic. |
| `TimerService` | Timer lifecycle is independent. Replacing it (e.g., with a server-side timer) should require zero changes to the rest of the game. |
| `BoardService` | Deck building and shuffle logic are pure functions — no side effects, fully testable in isolation. |
| `GameController` | Owns the DOM and event binding. It calls services but never reaches into their internals. |

**Why it mattered:** After the refactor, adding a new difficulty took 4 lines inside `CONFIG`. Before the refactor, it would have required changes in at least 5 different places across the script.

---

### 6. Memory Matrix Preview Bug — Matched Cards Not Glowing

**Problem:** In the landing page preview for Memory Matrix, only one card in each matched pair had the `matched` CSS class. The green glow animation was applying to one card, making the pair look asymmetrical and broken.

**Root cause:** The HTML was written with only one card per pair marked as `matched` — a logic error copied from an earlier draft.

**Fix:** Both cards in each pair now carry the `matched` class. The CSS `memGlow` animation applies correctly to both.

---

### 7. CSS Architecture — From Flat Selectors to Design Token System

**Problem:** Early in the project, colours and spacing were hardcoded throughout the CSS. When the accent colour for a card needed to change, it required a find-and-replace across dozens of selectors.

**What changed:**
- Introduced CSS custom properties (`--cyan`, `--yellow`, `--green`, `--purple`) at the `:root` level
- Per-card accent handled via a single CSS variable `--c` set on the card element via `data-color` attribute
- All animation timing values unified into `--t-fast`, `--t-base`, `--t-spring`, `--t-smooth`

**Why it mattered:** Changing a card's entire colour scheme — border, glow, badge, name text, CTA, dot markers — now requires editing exactly one line.

---

### 8. Scroll Reveal — CSS `opacity:0` → `IntersectionObserver`

**Problem:** The original card reveal used CSS transitions triggered on page load with `animation-delay`. On slower connections or when the user scrolled directly to the cards section, the animation would fire while the cards were off-screen, resulting in no visible reveal effect at all.

**What changed:** Replaced with `IntersectionObserver` — cards only begin their reveal animation when they enter the viewport. Delay is calculated from the card's index position in the DOM (`idx % 4 * 0.08s`) to produce a natural stagger regardless of which row the user scrolls to first.

---

*Every decision in this section was made because something broke, felt wrong, or couldn't scale. The project didn't start with this architecture — it arrived at it through iteration.*

---

## Credits

### 👨‍💻 Developer

<div align="center">

| | |
|---|---|
| **Name** | Mahmoud Awad Saad |
| **Program** | ITI — ICC · Full-Stack MEARN Track · Alexandria |
| **GitHub** | [@mahmoud112001](https://github.com/mahmoud112001) |
| **LinkedIn** | [Mahmoud Awad](https://www.linkedin.com/in/mahmoud-awad-795b02203/) |
| **Email** | mahmoudawad112001@gmail.com |

</div>

### 👨‍🏫 Instructors

| Subject | Instructor |
|---|---|
| Basic JavaScript | Eng. Omar Mosleh |
| RWD + SCSS + Bootstrap | Eng. Omar Waled |
| Advanced JavaScript | Eng. Nadia Saleh |
| TypeScript | Eng. Yehia ElKosh |
| Git & GitHub | Eng. Noha Salah |

---

<div align="center">

*JS Game Station · ITI ICC Program · Full-Stack MEARN Track · Alexandria · 2026*

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit_Now-f7df1e?style=for-the-badge&labelColor=07080d)](https://mahmoud112001.github.io/JS-Game-Station/)
[![GitHub](https://img.shields.io/badge/GitHub-@mahmoud112001-100000?style=for-the-badge&logo=github&labelColor=07080d)](https://github.com/mahmoud112001)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&labelColor=07080d)](https://www.linkedin.com/in/mahmoud-awad-795b02203/)

</div>
