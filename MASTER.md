# MASTER.md
### Build specification — personal portfolio (single-page, bilingual, 3D)
### Audience: AI coding agents (Claude Code, Cursor, etc.) and future-you

---

## 0. How to use this file

This is the single source of truth for the project. Any agent picking up this repo should:

1. Read this file fully before writing code.
2. Follow the **Build Phases** in order (§16) — don't jump to the 3D scene before the layout skeleton exists.
3. Treat **§3 Non-Negotiable Constraints** as hard rules, not suggestions.
4. When something in the brief is ambiguous, make the smallest reasonable decision, note it in a `// DECISION:` comment, and move on — don't stall the build waiting for a human.
5. Keep this file updated. If a phase changes the plan (a library gets swapped, a section gets cut), edit MASTER.md in the same commit.

---

## 1. Elevator pitch

A single-page, bilingual (Persian/English) developer portfolio. The centerpiece is a WebGL hero where a particle field assembles into the owner's name — and re-forms in the other script when the language is switched. Below it, four quiet, content-dense sections (About, Skills, Projects, Contact) unfold as the page scrolls with inertia-smoothed, physically-eased motion. Everything else about the design stays disciplined so that one moment gets to be loud.

---

## 2. Design direction

> Full design-thinking process below. Don't skip to the token table without reading the reasoning — it's what keeps this from looking like every other "glassmorphism + gradient blob" AI portfolio.

### 2.1 Ground the concept
The subject is a CS student who works daily in **two scripts and two reading directions** (Persian/RTL and English/LTR), and whose real project work spans **Persian NLP** (ParsBERT, sentiment lexicons) and **modern React/3D engineering**. That duality — heritage script meets contemporary tooling — is the one true, specific thing about this brief. It should drive the signature element, not a generic "big number + gradient" hero.

**Avoid by default** (these are the current AI-portfolio clichés — only use if you deliberately choose one, not by default): warm cream + terracotta serif; near-black + single acid-green accent; broadsheet hairline-rule layouts. None of these come from *this* brief.

### 2.2 Chosen direction — "Manuscript × Terminal"
A palette pulled from Persian manuscript illumination (deep lapis, ink, gold leaf) rendered with the restraint and grid discipline of a code editor. Heritage supplies the color and the signature motion; software engineering supplies the layout logic, spacing rhythm, and mono utility type. Neither side is decorative — both are load-bearing.

**Color tokens** (approximate `oklch`, refine visually in tweakcn — see §8):

| Token | oklch (approx.) | Role |
|---|---|---|
| `--ink` | `oklch(0.17 0.03 264)` | Primary dark background |
| `--paper` | `oklch(0.96 0.008 90)` | Light-mode background / dark-mode card surface |
| `--lapis` | `oklch(0.47 0.15 259)` | Primary brand color, links, primary buttons |
| `--gold` | `oklch(0.80 0.12 88)` | Accent — hero particle glow, hover states, focus rings |
| `--crimson` | `oklch(0.58 0.18 26)` | Rare emphasis only — one CTA, availability badge. Never decoration. |
| `--slate` | `oklch(0.62 0.02 264)` | Secondary text, borders, muted labels |

Do not add more brand colors. Six is the budget.

**Typography** — two roles, both earning their place:
- **Vazirmatn Variable** for *all* body and heading copy, in both languages. It's one of the few variable fonts with genuinely matched Latin + Persian/Arabic glyph sets, so switching language never causes a jarring font swap mid-layout. Use its weight axis (400 body / 600 subheads / 700 hero) instead of piling on separate font files.
- **A monospace face** (`JetBrains Mono` or `Space Mono`) for anything that reads as *system output*: section eyebrows, the nav index, tech-stack tags on project cards, the language/theme toggles, timestamps. This is the "terminal" half of the pairing — used sparingly, in caps or small size, never for body copy.

**Layout concept:** single vertical scroll, no card-grid dashboard feel. Generous vertical rhythm (each section gets room to breathe — think editorial spread, not SaaS landing page density). Section labels in mono (`§ ABOUT`, `§ WORK`) act as a quiet table-of-contents down the left/right gutter (flips side with direction), doubling as scroll-position nav dots.

**Signature element:** the particle hero (full spec in §6). This is the one place the design is allowed to be loud. Everything else — nav, cards, buttons — stays quiet and disciplined so the hero lands.

**Restraint checklist before shipping any screen:** if you added motion, ask whether the hero already earned the "wow" and this is just noise. Cut anything that doesn't serve legibility or the one signature moment.

### 2.3 Alternate direction (fallback, if the above isn't to taste)
"Terminal minimal": pure dark editor background (`--ink` only), single `--lapis` accent, mono type for *everything* including body copy, no gold/crimson. Faster to build, lower visual risk, still distinctive because of the particle hero + bilingual morph. Swap by deleting the gold/crimson tokens and changing the body font to the mono face — nothing else in this spec changes.

---

## 3. Non-negotiable constraints

- **Vite, not Next.js.** This is a static SPA with no server-rendering need — consistent with the earlier project decision to reserve Next.js for cases with genuine server-side requirements. Do not introduce SSR/RSC.
- **React 19 + TypeScript**, strict mode on (`"strict": true` in tsconfig). No implicit `any`.
- **Tailwind v4** (CSS-first config via `@theme`, no `tailwind.config.js` color extension needed).
- **shadcn/ui** components, themed via **tweakcn**-generated CSS variables — never hand-roll buttons/dialogs/etc. from scratch.
- **Zustand** for the three pieces of cross-cutting client state (locale, theme, active-section). Do **not** put continuous scroll position in Zustand (see §12 — this is the #1 perf mistake for this kind of site).
- **One page, one route.** No react-router. Anchor-based section navigation only.
- Respect **`prefers-reduced-motion`** everywhere motion is added, including the 3D scene.
- No dependency gets added without a one-line justification added to §4's table in the same commit.

---

## 4. Tech stack

| Concern | Package | Notes |
|---|---|---|
| Build tool | `vite` | React + TS template |
| UI library | `react`, `react-dom` (v19) | |
| Language | `typescript` | strict mode |
| Styling | `tailwindcss` v4, `@tailwindcss/vite` | CSS-first `@theme` config |
| Components | `shadcn/ui` (CLI-managed, copied into repo — not an npm dependency) | see §4.1 for the network fallback |
| Theming | tweakcn (web tool, not a package) | exports CSS vars you paste into `globals.css` |
| State | `zustand` (+ `persist` middleware) | locale, theme, active section only |
| Animation | `motion` (import from `motion/react`) | **not** `framer-motion` — the project renamed and moved to this package; `framer-motion` still works but is unmaintained |
| Smooth scroll | `lenis` (use the `lenis/react` subpath — `ReactLenis` component) | superseded `@studio-freight/lenis` / `react-lenis`, don't install those |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` | import only the specific `drei` helpers you use — its barrel export is large |
| Icons | `lucide-react` | import icons from their individual paths, not the barrel, to keep tree-shaking clean |
| Fonts | `@fontsource-variable/vazirmatn`, self-host the mono face or use `@fontsource/jetbrains-mono` | avoid Google Fonts CDN render-blocking request; self-host and `font-display: swap` |
| i18n | hand-rolled `en.json`/`fa.json` + a tiny `t()` hook backed by the locale store | a single static page doesn't need `react-i18next`'s weight; revisit only if content grows (blog, CMS) |
| Lint/format | `eslint`, `prettier` (with `prettier-plugin-tailwindcss` for class sorting) | |
| Bundle inspection | `rollup-plugin-visualizer` | run before declaring perf phase done |

### 4.1 shadcn CLI network fallback
The shadcn CLI has previously timed out in restricted-network environments. If `npx shadcn add <component>` hangs or fails, fall back to copying the component source directly from the shadcn GitHub repo into `src/components/ui/` and wiring dependencies (`class-variance-authority`, `@radix-ui/*`) manually. Don't burn more than one retry on the CLI before switching to the manual path.

---

## 5. Information architecture (single page, in scroll order)

| # | Section | Job |
|---|---|---|
| 1 | **Hero** | Particle name (3D), one-line role/title, scroll-down affordance, language + theme toggles |
| 2 | **About** | Short bio, what you build, current focus (CS study + frontend + Persian NLP) |
| 3 | **Skills** | Grouped stack (Frontend / 3D & Motion / Backend & Tooling / ML & NLP), mono-tag chips, no decorative progress bars (they encode false precision) |
| 4 | **Projects** | 3–5 real project cards (see §18 for real content to seed this) |
| 5 | **Contact** | Direct contact methods, resume download, copy-to-clipboard email |

Keep it to these five. Resist adding a "Testimonials" or "Blog" section unless there's real content for it — empty sections read as templated.

---

## 6. The signature element — particle name hero

### 6.1 Concept
A `<canvas>`-backed 3D scene where thousands of points assemble into the owner's name, rendered in Vazirmatn. On language toggle, the point cloud **morphs** from the Persian rendering to the Latin rendering (or back) instead of cross-fading — this is the one moment the bilingual identity becomes something you *see* rather than just a `dir="rtl"` attribute flip.

### 6.2 Technique (no font-to-geometry conversion needed)
1. Render the name to an **offscreen 2D canvas** using `ctx.font` set to the Vazirmatn variable font (both the Persian and Latin strings, each to its own offscreen canvas).
2. Read pixel data with `getImageData`; sample coordinates where alpha exceeds a threshold.
3. Convert sampled pixel coordinates into a `Float32Array` of 3D positions (with mild random z-jitter for depth), capped at **3,000–6,000 points** depending on device tier (see §6.4).
4. Feed both position arrays (Persian-shape, Latin-shape) into an R3F `<points>` object with a custom `ShaderMaterial` (additive blending, soft round sprite, gold-tinted color from `--gold`).
5. On language toggle, animate a single `uProgress` uniform (or lerp a shared `BufferAttribute`) from 0→1 over ~900ms with an eased curve — this drives the interpolation between the two position arrays entirely on the GPU, no per-point React state.

### 6.3 Scroll & idle behavior
- At rest: gentle ambient drift (slow rotation, subtle noise-based point jitter) — enough to read as "alive," not enough to distract from legibility.
- On scroll past the hero: fade/scale the point cloud out via a **motion value driven by Lenis progress** (see §7), not a React state re-render.
- Pointer parallax: camera offsets slightly toward pointer position, damped — small, not a full drag-to-rotate gimmick.

### 6.4 Performance & fallback
- Clamp `dpr` in the `<Canvas>`: `dpr={[1, Math.min(devicePixelRatio, 2)]}`.
- Use `frameloop="demand"` and call `invalidate()` only on scroll/pointer/morph events — don't render 3D at 60fps when nothing is changing.
- Detect low-end devices cheaply: `navigator.hardwareConcurrency <= 4` or a failed/low-tier WebGL context → drop to ~1,500 points, disable pointer parallax.
- **`prefers-reduced-motion: reduce`** → skip the canvas entirely; render a static SVG/CSS wordmark of the name instead. Never force motion on someone who's opted out.
- Dispose geometries/materials on unmount (React Three Fiber does most of this automatically, but double-check for the offscreen-canvas ImageData allocations).

---

## 7. Scroll system

"Smooth scrolling" here means **inertia-smoothed continuous scroll**, not a discrete slideshow-style snap between sections — snapping tends to feel less "soft," and fights screen readers / trackpad users. Use:

- **`lenis/react`**'s `<ReactLenis root>` wrapping the app, tuned lerp/duration for a soft but responsive feel (start around `lerp: 0.1, duration: 1.2` and tune by feel).
- **Lenis is the single authority on scroll position.** Don't also run native scroll-snap, GSAP ScrollTrigger, and R3F `ScrollControls` simultaneously — pick Lenis, and derive everything else (section-reveal animations, the hero's exit progress, nav-dot highlighting) from its `scroll` event.
- Optional config flag (`SNAP_SECTIONS = false` in one constants file) to switch to CSS `scroll-snap-type` per-section later if you change your mind — keep it toggleable, don't hard-code the choice into every component.
- Section-reveal animations: `motion`'s `useScroll` + `useTransform`, scoped to each section's own viewport entry (`target: sectionRef`), not the whole-page scroll — keeps calculations cheap and locally testable.

---

## 8. Theming via tweakcn

1. Scaffold shadcn normally (`components.json`, default zinc theme).
2. Go to tweakcn.com, dial in a theme starting from the token table in §2.2 (set primary = lapis, accent = gold, background = ink/paper pair, radius to taste — small radius reads more "engineered," large radius reads more "friendly"; pick one and stay consistent).
3. Export the generated `:root { --background: ...; --primary: ...; }` block (and its `.dark` counterpart) and paste directly into `src/styles/globals.css`.
4. Extend the export with the two extra tokens tweakcn doesn't know about — `--brand-gold` and `--brand-crimson` — as raw CSS variables in the same file.
5. In Tailwind v4, map everything via `@theme inline` referencing the CSS vars (no separate JS config needed):
   ```css
   @theme inline {
     --color-primary: var(--primary);
     --color-brand-gold: var(--brand-gold);
     --color-brand-crimson: var(--brand-crimson);
   }
   ```
6. Dark/light toggle: a plain class strategy (`document.documentElement.classList.toggle('dark')`), driven by the Zustand theme store with `persist` to localStorage, defaulting to `prefers-color-scheme` on first visit only.

---

## 9. Internationalization & RTL

- **Locale store** (`useLocaleStore`): `locale: 'fa' | 'en'`, persisted. `setLocale()` updates `document.documentElement.lang` and `document.documentElement.dir` (`rtl` for `fa`, `ltr` for `en`) as a side effect.
- **Content**: `src/lib/i18n/en.json` and `fa.json`, flat key → string maps. A `useT()` hook reads the active locale from the store and returns `dict[key] ?? key` (fallback to key name surfaces missing translations loudly during dev instead of silently showing English).
- **CSS logical properties everywhere** — this is the single most common source of RTL bugs. Use Tailwind's logical utilities (`ms-4`/`me-4`, `ps-6`/`pe-6`, `text-start`/`text-end`) instead of `ml-4`/`mr-4`/`text-left`. Grep the codebase for literal `-left`/`-right` utilities before calling any phase done.
- **Directional icons** (arrows, chevrons pointing "forward") need to flip in RTL. Use Tailwind's `rtl:`/`ltr:` variants (e.g. `rtl:-scale-x-100`) on the icon itself rather than reversing flex order, which can break other assumptions.
- **Numerals**: default to Latin digits even in the Persian locale (common for technical/dev content — years, stack tags, stats) for consistency. This is a deliberate choice, not an oversight; revisit only if full Persian-digit typography is wanted.
- Any dates/counts shown (e.g. "X years") should go through `Intl.NumberFormat`/`Intl.DateTimeFormat` with `'fa-IR'` or `'en-US'` as appropriate, not hand-formatted strings.

---

## 10. State management (Zustand)

Keep the stores small and purpose-built. Use **fine-grained selectors** everywhere (`useLocaleStore(s => s.locale)`), never destructure the whole store in a component that re-renders often — that's what causes scroll-linked jank.

```ts
// stores/useLocaleStore.ts
interface LocaleState {
  locale: 'fa' | 'en';
  setLocale: (l: 'fa' | 'en') => void;
}

// stores/useThemeStore.ts
interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// stores/useUIStore.ts
interface UIState {
  activeSection: 'hero' | 'about' | 'skills' | 'projects' | 'contact';
  setActiveSection: (s: UIState['activeSection']) => void;
  // NOTE: no continuous scroll progress here — see §12
}
```

Both `locale` and `theme` stores use Zustand's `persist` middleware to localStorage. `activeSection` does not persist — it's derived fresh each load from an `IntersectionObserver`.

---

## 11. Performance playbook

**The one rule that matters most for this project:** never put a continuously-changing value (raw scroll offset, per-frame pointer position) into React or Zustand state. That re-renders the whole subscribed tree every frame and will visibly tank FPS on exactly the animations this site is built around.

- Continuous values (scroll progress, pointer coordinates) → `motion`'s `useMotionValue`/`useScroll`, which update outside React's render cycle, or a plain `useRef` read inside the R3F `useFrame` loop.
- Discrete, low-frequency values (which section is active, current locale, theme) → Zustand, fine-grained selectors only.
- `React.memo` section components that don't depend on frequently-changing props.
- `useMemo` for derived arrays/objects recomputed on render (sampled particle positions, sorted/filtered project lists).
- `useCallback` for handlers passed into memoized children (nav links, toggles).
- Code-split the 3D scene: `React.lazy(() => import('./three/Scene'))` behind `<Suspense>` with a lightweight gradient/skeleton fallback, so first paint of text content doesn't wait on Three.js's bundle weight.
- Import `drei` helpers individually; import `lucide-react` icons from their specific paths, not the full barrel.
- Fonts: self-host Vazirmatn Variable (`@fontsource-variable/vazirmatn`), `font-display: swap`, subset if the final glyph range allows it. Preload the variable font file in `index.html`.
- Images (project screenshots): WebP/AVIF, explicit `width`/`height` to avoid layout shift, `loading="lazy"` below the fold.
- Run `rollup-plugin-visualizer` before considering the performance phase (§16, Phase 6) done — check for accidental full-library imports.
- Target budget: sub-300KB gzipped JS excluding the 3D chunk; Lighthouse mobile performance ≥ 90.

---

## 12. Accessibility

- Semantic landmarks even on a single page: `<nav>`, `<main>`, `<section aria-label="...">` per section, `<footer>`.
- Full keyboard navigation: section nav dots/labels are real focusable links (`<a href="#projects">`), visible focus rings (use `--gold` for focus-visible, it's also a system-generated tell rather than decoration).
- `prefers-reduced-motion: reduce` disables: the 3D canvas (static fallback, §6.4), Lenis smoothing (fall back to native scroll), and all `motion` scroll-reveal transforms (content just appears, no slide/fade).
- Color contrast: verify the tweakcn export against WCAG AA for body text on both `--ink` and `--paper` backgrounds — gold-on-ink in particular needs checking.
- Bilingual `alt` text on any images/screenshots, matching the active locale.
- Skip-to-content link as the first focusable element.

---

## 13. SEO & meta

- Single-page apps have inherently limited crawlability for a canvas-heavy hero — compensate with strong `<head>` fundamentals: title, meta description (both locales, swapped via `lang`), Open Graph + Twitter Card image (a static rendered screenshot of the hero works well as the OG image, not the live canvas).
- `Person` JSON-LD structured data (name, jobTitle, sameAs: GitHub/LinkedIn links).
- `<html lang>` and `dir` must match the active locale server-side-safe default (pick one as the initial static HTML value, e.g. `lang="en" dir="ltr"`, then correct on hydration from stored preference).
- A `<noscript>` fallback with the core text content (name, role, contact) for crawlers/JS-disabled visitors.

---

## 14. Folder structure

```
src/
  app/
    App.tsx
    providers.tsx          # theme class + Lenis root wrapper
  components/
    layout/
      Header.tsx           # locale + theme toggles, nav
      SectionNav.tsx        # mono section-index dots
      Footer.tsx
    sections/
      Hero/
        Hero.tsx
      About/
      Skills/
      Projects/
        ProjectCard.tsx
      Contact/
    three/
      Scene.tsx             # <Canvas>, lazy-loaded
      ParticleName.tsx      # canvas-sampling + shader points
      sampleTextPoints.ts    # pure helper, unit-testable
    ui/                     # shadcn-generated, don't hand-edit generated internals
  stores/
    useLocaleStore.ts
    useThemeStore.ts
    useUIStore.ts
  lib/
    i18n/
      en.json
      fa.json
      useT.ts
    utils.ts                # cn() helper etc.
  hooks/
    useReducedMotion.ts
    useActiveSection.ts       # IntersectionObserver -> useUIStore
  styles/
    globals.css              # tailwind import + tweakcn CSS vars + @theme inline
  assets/
    fonts/
    projects/                # screenshots
```

---

## 15. Component inventory (minimum set)

`Header`, `SectionNav`, `LocaleToggle`, `ThemeToggle`, `Hero`, `ParticleName` (3D), `About`, `SkillGroup`, `ProjectCard`, `ContactCard`, `Footer`, `ResumeButton`, `CopyEmailButton`.

---

## 16. Build phases

Work through these in order. Don't start a phase until the previous one's exit criteria are met.

**Phase 0 — Scaffold**
Vite + React + TS project, Tailwind v4 wired, ESLint/Prettier configured, shadcn initialized with a placeholder theme.
*Exit:* blank page renders, lint/typecheck pass.

**Phase 1 — Theming & i18n skeleton**
tweakcn theme pasted in, dark/light toggle working, locale store + `en.json`/`fa.json` + `dir`/`lang` switching working on an empty page.
*Exit:* toggling locale flips direction and swaps a test string; toggling theme flips CSS vars.

**Phase 2 — Static layout, all five sections**
Build every section with real (or seeded, see §18) content and no motion at all — plain, correct, responsive, RTL-correct HTML/CSS first.
*Exit:* the whole page reads correctly top to bottom in both locales at mobile/tablet/desktop widths, no horizontal scroll, logical-property audit passes (no leftover `-left`/`-right`).

**Phase 3 — Smooth scroll**
Wire `ReactLenis`, confirm native scroll still works as fallback, add section-nav highlighting via `useActiveSection`.
*Exit:* scroll feels smooth, nav dots track the visible section, keyboard/trackpad/wheel/touch all behave.

**Phase 4 — The 3D hero**
Build `sampleTextPoints`, the shader material, the language-morph transition, idle drift, pointer parallax, low-end/reduced-motion fallbacks.
*Exit:* hero looks right in both scripts, morphs on locale toggle, degrades gracefully with reduced motion and on a throttled CPU (test via DevTools CPU throttling).

**Phase 5 — Scroll-linked motion polish**
Section reveals via `motion`'s `useScroll`/`useTransform`, hero exit-fade tied to scroll, micro-interactions on cards/buttons.
*Exit:* nothing animates that doesn't serve legibility or the signature moment (re-run the §2.3 restraint checklist).

**Phase 6 — Performance pass**
Bundle analysis, code-splitting check, font loading audit, image formats, Lighthouse run.
*Exit:* budgets in §11 met.

**Phase 7 — Accessibility & SEO pass**
Full keyboard walkthrough, screen-reader spot check, contrast check, meta/OG/JSON-LD in place.
*Exit:* §12 and §13 checklists pass.

**Phase 8 — Deploy**
Static host of choice (Vercel/Netlify/Cloudflare Pages/GitHub Pages all work for a Vite SPA). Set up preview deploys per branch if collaborating.

---

## 17. Definition of done

- [ ] Lighthouse mobile performance ≥ 90, accessibility ≥ 95
- [ ] Works with keyboard only, start to finish
- [ ] `prefers-reduced-motion` fully respected (canvas, scroll, transforms)
- [ ] Locale toggle persists across reload; direction/lang/fonts all correct in both states
- [ ] No hardcoded `left`/`right` spacing or text-align remaining
- [ ] No continuous value (scroll/pointer) stored in React or Zustand state
- [ ] 3D scene disposes cleanly on unmount, no memory growth on repeated mount/unmount (check DevTools memory profile)
- [ ] Bundle budget met (§11); visualizer report reviewed
- [ ] Works and looks correct down to a 360px-wide viewport

---

## 18. Content to supply

Fill in real details here before/during Phase 2. Suggested project entries below are drawn from actual project work — verify current links/descriptions before publishing, trim or reorder freely.

**Identity**
- Name (Latin + Persian spelling): `[Your Name]` / `[نام شما]`
- Role/title line: e.g. "Frontend Developer · CS Student · Persian NLP"
- Short bio (2–3 sentences, both locales)
- Contact: `[email]`, `[GitHub]`, `[LinkedIn]`, optionally `[Telegram]` (common contact channel for Persian-speaking devs), resume PDF

**Suggested project cards** (adjust freely):
1. **Voteria** — Reddit-inspired community discussion platform. React 19, Vite, Tailwind v4, Zustand, shadcn/ui, Go backend. *Talking point: real-time-ish state management with Zustand, collaborative Git workflow.*
2. **Persian Sentiment Lexicon Builder** — ParsBERT/MLM-based sentiment lexicon generation from Digikala product reviews, with POS-aware template selection and percentile-based thresholds. *Talking point: applied NLP + the debugging depth (negation handling, tokenization fixes, caching strategy).*
3. **Hooshtan Fit (Body Regions)** — Android app via Capacitor + MediaPipe pose detection. *Talking point: cross-platform mobile, camera/permission handling, native-bridge debugging.*
4. **ICPC contest site (bcpc-frontend)** — Astro 7 + React islands, Tailwind v4, shadcn/ui. *Talking point: Islands architecture, evaluating framework tradeoffs.*

Pick 3–4 of these rather than all — a portfolio with four strong entries reads better than one with six padded ones.

---

## 19. Rules of engagement for the AI agent

- Don't add a dependency without a one-line reason logged in §4's table in the same commit.
- Don't introduce Next.js, react-router, or a second animation library "just to try it" — this spec is deliberately narrow.
- Run `tsc --noEmit` and `eslint` clean before marking any phase in §16 done.
- Commit per phase (or smaller), with a message that names the phase (`feat(phase-2): static section layout`).
- If a real architectural deviation seems necessary (not a small implementation detail), stop and flag it rather than silently diverging from this file.
- When in doubt between "impressive" and "legible," pick legible — the restraint is the point.
