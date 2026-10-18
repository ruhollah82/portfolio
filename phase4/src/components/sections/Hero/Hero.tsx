import { useCallback, useSyncExternalStore } from 'react'
import { useT } from '@/lib/i18n/useT'
import { Icon } from '@/components/ui/Icon'
import { buttonVariants } from '@/components/ui/button'
import { MotionReveal } from '@/components/ui/MotionReveal'
import { InkReveal } from '@/components/ui/InkReveal'
import { Typewriter } from '@/components/ui/Typewriter'
import {
  DARK,
  LIGHT,
  ILLUMINATION_TILE,
  illuminationUri,
} from '@/lib/illumination'
import portrait from '../../../../public/images/portrait-original.jpg'

// Follow the site's `.dark` class so the artwork matches the theme.
function subscribeTheme(onChange: () => void) {
  const mo = new MutationObserver(onChange)
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => mo.disconnect()
}
const isDark = () => document.documentElement.classList.contains('dark')

export function Hero() {
  const t = useT()
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false)
  const layer = useCallback(
    (px: number) => illuminationUri(dark ? DARK : LIGHT, px),
    [dark]
  )

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden px-5 pt-28 pb-24 sm:px-8 lg:px-12"
    >
      {/* The one memorable moment: the cursor paints an illuminated pattern. */}
      <InkReveal layer={layer} tile={ILLUMINATION_TILE} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-end gap-12 md:grid-cols-[1.35fr_0.65fr] lg:gap-20">
        <div className="space-y-8">
          <MotionReveal>
            <p className="border-border bg-card inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium">
              <span
                className="bg-status-available size-2 rounded-full"
                aria-hidden
              />
              {t('hero.cardLabel')}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.05}>
            <div className="space-y-5">
              <h1 className="text-foreground text-5xl leading-[1.02] font-semibold tracking-tight sm:text-7xl lg:text-8xl">
                {t('hero.greeting')}
              </h1>
              <Typewriter
                as="p"
                text={t('hero.role')}
                className="eyebrow normal-case"
              />
              <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
                {t('hero.description')}
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className={buttonVariants({ size: 'lg' })}>
                {t('hero.cta.primary')}
                <Icon name="arrow-right" className="size-4 rtl:-scale-x-100" />
              </a>
              <a
                href="#contact"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                {t('hero.cta.secondary')}
              </a>
            </div>
          </MotionReveal>
        </div>

        {/* Arch frame: a niche in the manuscript, photo left untouched. */}
        <MotionReveal
          delay={0.1}
          className="mx-auto w-full max-w-[16rem] md:max-w-xs"
        >
          <div className="border-brand-gold/70 bg-background rounded-t-full border p-2">
            <img
              src={portrait}
              alt="Portrait of Ruhollah"
              decoding="async"
              fetchPriority="high"
              className="aspect-[4/5] w-full rounded-t-full object-cover object-[center_20%]"
            />
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
