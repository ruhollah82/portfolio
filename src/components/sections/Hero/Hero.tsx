import { Suspense, lazy } from 'react'
import { useT } from '@/lib/i18n/useT'
import { Icon } from '@/components/ui/Icon'
import { buttonVariants } from '@/components/ui/button'
import { MotionReveal } from '@/components/ui/MotionReveal'
import myImage from '../../../../public/images/portrait-original.jpg'

const Scene = lazy(() => import('@/components/three/Scene'))

export function Hero() {
  const t = useT()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <Suspense
        fallback={
          <div className="bg-background absolute inset-0 flex items-center justify-center">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        }
      >
        <Scene />
      </Suspense>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_color-mix(in_oklch,var(--primary)_24%),transparent_24%),radial-gradient(circle_at_bottom_right,_color-mix(in_oklch,var(--accent)_26%),transparent_22%)]" />

      {/* Changed from grid to flex-col on mobile, grid on desktop */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 sm:grid sm:grid-cols-[1.05fr_0.95fr] sm:items-center lg:gap-10">
        {/* Portrait Image - Now appears FIRST on mobile (top of page) */}
        <MotionReveal delay={0.08}>
          <div className="relative mx-auto w-full sm:max-w-md">
            {/* Glowing effects - adjusted for circular shape on mobile */}
            <div className="bg-brand-gold/30 absolute -end-4 -top-4 h-24 w-24 rounded-full blur-3xl sm:-end-8 sm:-top-8 sm:h-32 sm:w-32" />
            {/* Fixed typo: removed m:rounded-full */}
            <div className="bg-primary/25 absolute -start-4 -bottom-4 h-20 w-20 rounded-full blur-3xl sm:-start-6 sm:-bottom-6 sm:h-28 sm:w-28" />

            {/* 
              - Added aspect-square to guarantee a perfect circle on mobile
              - Removed p-2 and used border-2 directly so the image fills the entire circle
            */}
            <div className="border-border/70 bg-background/65 relative mx-auto aspect-square w-56 overflow-hidden rounded-full border-2 shadow-lg backdrop-blur-xl sm:aspect-auto sm:h-[440px] sm:w-full sm:rounded-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_color-mix(in_oklch,var(--primary)_12%),transparent_45%,_color-mix(in_oklch,var(--accent)_16%),transparent_80%)]" />
              <img
                src={myImage}
                alt="Portrait of Ruhollah"
                className="relative h-full w-full object-cover object-[center_20%]"
              />
            </div>
          </div>
        </MotionReveal>

        {/* Text Content - Appears below image on mobile */}
        <div className="space-y-6 text-center lg:text-start">
          <MotionReveal delay={0.12}>
            <div className="space-y-4">
              <h1 className="text-foreground text-3xl leading-none font-black sm:text-5xl lg:text-7xl">
                {t('hero.greeting')}
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-sm leading-6 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg">
                {t('hero.description')}
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.16}>
            <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <a
                href="#projects"
                className={buttonVariants({
                  size: 'lg',
                  className: 'rounded-full px-5',
                })}
              >
                {t('hero.cta.primary')}
                <Icon
                  name="phosphor:arrow-right"
                  className="h-4 w-4 rtl:-scale-x-100"
                />
              </a>
              <a
                href="#contact"
                className={buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className: 'rounded-full px-5',
                })}
              >
                {t('hero.cta.secondary')}
              </a>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div className="border-border/70 bg-background/65 text-foreground/85 rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-md">
                {t('hero.role')}
              </div>
              <div className="border-border/70 bg-background/65 text-foreground/85 rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-md">
                {t('hero.cardLabel')}
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>

      <div className="text-muted-foreground absolute bottom-8 z-10 flex animate-bounce flex-col items-center gap-2 sm:bottom-12">
        <span className="text-[11px] tracking-[0.35em] uppercase">
          {t('hero.scroll')}
        </span>
        <Icon name="phosphor:caret-double-down" className="h-4 w-4" />
      </div>
    </section>
  )
}
