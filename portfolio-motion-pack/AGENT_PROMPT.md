# Agent prompt: apply the motion pack in 3 phases

You are working in my portfolio repo (Vite + React 19 + TypeScript + Tailwind CSS 4 + `motion` + React Three Fiber + zustand, bilingual EN/FA with RTL, deployed to GitHub Pages). Edit only the root `src/` tree. Ignore the `portfolio-updated-files/` folder.

The folder `portfolio-motion-pack/` (next to this file) contains new/updated components: `InkReveal.tsx`, `Typewriter.tsx`, `SmoothScroll.tsx`, `MotionReveal.tsx`, and `INTEGRATION.md` (exact snippets). Read `INTEGRATION.md` first.

## Global rules
- Do the phases in order. After each phase: run `bun run build` and `bun run lint`, fix any errors, then stop and show me a short summary + `git diff --stat`. Do NOT start the next phase until I say "next".
- Make the smallest change that works. Do not reformat unrelated code, rename things, or touch the 3D scene, i18n JSON, theme/locale stores or deploy workflow.
- Keep existing behavior and look unless a step says otherwise. Keep `prefers-reduced-motion` respected everywhere.
- Persian (RTL) must keep working: no per-letter spans on Persian text, no letter-spacing on Persian, logical CSS (`ms-`, `start-`) instead of left/right.
- Before editing any file I did not mention explicitly (e.g. `Skills.tsx`, `Projects.tsx`, `Header.tsx`), open it and adapt the snippet to its real structure.
- If something in the pack does not type-check against my repo (aliases, `cn`, `useReducedMotion`, library versions), fix it in the pack file and tell me what you changed.

## Phase 1: Smooth scrolling (foundation)
1. Install `lenis` with the package manager the repo uses (bun lockfile → bun).
2. Copy `SmoothScroll.tsx` to `src/components/ui/`.
3. Edit `src/styles/globals.css` as described in section 3 of `INTEGRATION.md` (`html:not(.lenis)` for native smooth scroll + Lenis recommended rules).
4. Mount `<SmoothScroll />` in `src/App.tsx` inside `<Providers>`, before `<AppContent />`.
5. Verify: header/nav anchor links (`#projects`, `#contact`, etc.) still scroll to the right place without being hidden under the fixed header (offset 72px); `useActiveSection` / `SectionNav` still highlight correctly; with reduced motion enabled, Lenis is not created. Check `Header.tsx` for any `scrollIntoView`/`scrollTo` usage and adapt if present.

## Phase 2: Scroll reveals
1. Replace `src/components/ui/MotionReveal.tsx` with the pack version. Confirm every existing `<MotionReveal>` usage still compiles and looks identical (blur is off by default).
2. In `Skills.tsx` and `Projects.tsx`, wrap the card grids in `<RevealGroup>` and each card in `<RevealItem blur={6}>` (see section 6 of `INTEGRATION.md`). Keep the existing grid classes on the `RevealGroup` element. Preserve keys, links and accessibility.
3. Optionally add `blur={6}` to the `MotionReveal` around section headings only. Do not add blur to large images or long text blocks.
4. Verify: in RTL (Persian) the stagger wave runs right → left; on mobile single-column layouts items just reveal normally; reduced-motion shows content immediately with no hidden elements.

## Phase 3: Hero (the one memorable moment)
1. Copy `InkReveal.tsx` and `Typewriter.tsx` to `src/components/ui/`.
2. In `src/components/sections/Hero/Hero.tsx`, replace the portrait wrapper div + `<img>` with `<InkReveal src={portrait} alt=... className="border-border bg-card aspect-[4/5] rounded-lg border" />` (section 5 of `INTEGRATION.md`). Keep the existing `MotionReveal` wrapper around it.
3. Replace the `hero.role` paragraph with `<Typewriter text={t('hero.role')} className="eyebrow normal-case" />`. Use Typewriter nowhere else.
4. Verify: portrait is greyscale on desktop with a mouse and turns to colour under the cursor; one automatic stroke plays on load; on touch devices and with reduced motion it is the normal colour image; resizing the window keeps the canvas aligned; switching language shows the new role text instantly (no re-typing); the hero text does not shift layout while typing; screen readers get the full role text.
5. Finish with a final `bun run build`, and list any follow-ups you noticed but did not change.
