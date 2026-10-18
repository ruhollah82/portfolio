# Motion pack: integration

Written against your root `src/` (Vite + React 19 + Tailwind 4 + `motion`),
using your existing `@/` alias, `cn`, and `useReducedMotion`.

## 1. Install

```bash
bun add lenis        # or: npm i lenis
```

## 2. Copy files into `src/components/ui/`

- `InkReveal.tsx`   new
- `Typewriter.tsx`  new
- `SmoothScroll.tsx` new
- `MotionReveal.tsx` replaces yours. `MotionReveal` keeps the same props and
  look; it only gains optional `y` and `blur`. Adds `RevealGroup` / `RevealItem`.

## 3. `globals.css`

Lenis and native `scroll-behavior: smooth` fight each other. Replace your
reduced-motion block in `@layer base` with:

```css
/* Native smooth scrolling only when Lenis is not running. */
@media (prefers-reduced-motion: no-preference) {
  html:not(.lenis) {
    scroll-behavior: smooth;
  }
}
```

and add at the end of the file (these are Lenis' recommended rules):

```css
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-stopped {
  overflow: clip;
}
```

## 4. `App.tsx`

```tsx
import { SmoothScroll } from './components/ui/SmoothScroll'
// ...
<Providers>
  <SmoothScroll />
  <AppContent />
</Providers>
```

## 5. `Hero.tsx`

Portrait: replace the bordered div + `<img>` with

```tsx
import { InkReveal } from '@/components/ui/InkReveal'

<InkReveal
  src={portrait}
  alt="Portrait of Ruhollah"
  className="border-border bg-card aspect-[4/5] rounded-lg border"
/>
```

Role line (optional, use it on this one line only):

```tsx
import { Typewriter } from '@/components/ui/Typewriter'

<Typewriter text={t('hero.role')} className="eyebrow normal-case" />
```

## 6. Section grids (Skills, Projects)

```tsx
import { RevealGroup, RevealItem } from '@/components/ui/MotionReveal'

<RevealGroup className="grid gap-6 md:grid-cols-3">
  {items.map((item) => (
    <RevealItem key={item.id} blur={6}>
      <ProjectCard {...item} />
    </RevealItem>
  ))}
</RevealGroup>
```

On a single-column (mobile) layout every item has the same x position, so
they simply reveal together; no extra delay is added.

## Notes

- Where to spend the motion: the hero portrait is the one memorable moment.
  Keep the rest quiet: `MotionReveal` as-is, `blur` only on headings and card
  grids, Typewriter once.
- Lenis does not change `IntersectionObserver` behaviour, so
  `useActiveSection` and `SectionNav` keep working.
- If `Header.tsx` scrolls with `scrollIntoView({ behavior: 'smooth' })`,
  switch it to `lenis.scrollTo(...)` or just let plain `href="#id"` anchors
  handle it (SmoothScroll enables `anchors`).
- `InkReveal` and `Typewriter` both fall back to the plain image / full text
  for touch devices and `prefers-reduced-motion`.
- The repo also contains a `portfolio-updated-files/` copy. These files target
  the root `src/`; the imports are identical in both.
