import { Suspense, lazy } from 'react'
import { useT } from '@/lib/i18n/useT'
import { useScene3D } from '@/hooks/useScene3D'
import { Icon } from '@/components/ui/Icon'
import { buttonVariants } from '@/components/ui/button'
import { MotionReveal } from '@/components/ui/MotionReveal'
import portrait from '../../../../public/images/portrait-original.jpg'

// three.js + react-three-fiber are only downloaded where the backdrop can run.
const Scene = lazy(() => import('@/components/three/Scene'))

export function Hero() {
  const t = useT()
  const showScene = useScene3D()

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden px-5 pt-28 pb-20 sm:px-8 lg:px-12"
    >
      {showScene && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr] lg:gap-20">
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
              <h1 className="text-foreground text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {t('hero.greeting')}
              </h1>
              <p className="eyebrow normal-case">{t('hero.role')}</p>
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

        <MotionReveal
          delay={0.1}
          className="mx-auto w-full max-w-xs md:max-w-sm"
        >
          <div className="border-border bg-card aspect-[4/5] overflow-hidden rounded-lg border">
            <img
              src={portrait}
              alt="Portrait of Ruhollah"
              decoding="async"
              fetchPriority="high"
              className="size-full object-cover object-[center_20%]"
            />
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
