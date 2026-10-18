# Phase 4: Hero redesign (replaces the Phase 3 ink-on-portrait effect)

Context: Phases 1-3 are applied. The ink effect on the portrait photo looked bad, so the hero is being redesigned. Edit only root `src/`. Same rules as before: smallest change that works, build + lint after the phase, show a summary and `git diff --stat`, then stop.

New files from `phase4/` (copy as-is, then fix any type errors against the repo and tell me what you changed):
- `src/lib/illumination.ts`  new (lapis/gold star-tile SVG generator)
- `src/components/ui/InkReveal.tsx`  REPLACES the Phase 3 version. New API: `<InkReveal layer={(px)=>uri} tile={96} />`, no longer wraps an image
- `src/components/sections/Hero/Hero.tsx`  REPLACES the current Hero

Steps
1. Copy the three files. Confirm `Typewriter` already supports the `as` prop (it does after the last patch); `Icon`, `buttonVariants`, `MotionReveal`, `useT` and the portrait import path must still resolve.
2. The new Hero no longer imports `Scene` / `useScene3D`. Do NOT delete `components/three/*` or `useScene3D` yet. Report whether anything else still uses them, and whether the three.js chunk is gone from the build output.
3. Check that every i18n key used by Hero exists in both `en.json` and `fa.json`: hero.cardLabel, hero.greeting, hero.role, hero.description, hero.cta.primary, hero.cta.secondary.
4. Verify in code: `<InkReveal>` is the first child of the `relative` hero `<section>`; the portrait has no filter/canvas; dark/light switch re-tiles the artwork (uses the `.dark` class); with a touch device or reduced motion a static faded band is rendered instead of the canvas; RTL (Persian) layout mirrors correctly (arch portrait on the start side, arrow icon flips).
5. Run build + lint. List follow-ups only; do not fix unrelated things.
