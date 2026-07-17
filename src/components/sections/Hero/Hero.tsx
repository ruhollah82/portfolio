import { Suspense, lazy } from 'react'
import { useT } from '@/lib/i18n/useT'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { MotionReveal } from '@/components/ui/MotionReveal'

const Scene = lazy(() => import('@/components/three/Scene'))

export function Hero() {
  const t = useT()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8"
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

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6 text-center lg:text-left">
          <MotionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.30em] text-muted-foreground shadow-lg shadow-black/5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              {t('hero.kicker')}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="space-y-4">
              <h1 className="text-foreground text-4xl font-black leading-none sm:text-5xl lg:text-7xl">
                {t('hero.greeting')}
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-sm leading-7 sm:text-base lg:mx-0 lg:text-lg">
                {t('hero.description')}
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.14}>
            <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <a
                href="#projects"
                className={buttonVariants({ size: 'lg', className: 'rounded-full px-5' })}
              >
                {t('hero.cta.primary')}
                <ArrowRight className="h-4 w-4" />
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

          <MotionReveal delay={0.18}>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div className="rounded-full border border-border/70 bg-background/65 px-4 py-2 text-xs font-medium text-foreground/85 backdrop-blur-md">
                {t('hero.role')}
              </div>
              <div className="rounded-full border border-border/70 bg-background/65 px-4 py-2 text-xs font-medium text-foreground/85 backdrop-blur-md">
                {t('hero.cardLabel')}
              </div>
            </div>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-gold/30 blur-3xl" />
            <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-primary/25 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/65 p-3 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_color-mix(in_oklch,var(--primary)_12%),transparent_45%,_color-mix(in_oklch,var(--accent)_16%),transparent_80%)]" />

              <img
                src="/images/portrait.jpg"
                alt="Portrait of Ruhollah"
                className="relative h-[440px] w-full rounded-[1.35rem] object-cover object-top"
              />

              <div className="relative mt-3 flex items-center justify-between rounded-[1.1rem] border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {t('hero.card.small')}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {t('hero.card.title')}
                  </p>
                </div>
                <div className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold text-foreground">
                  {t('hero.card.detail')}
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>

      <div className="text-muted-foreground absolute bottom-12 z-10 flex animate-bounce flex-col items-center gap-2">
        <span className="font-mono text-[11px] tracking-[0.35em] uppercase">
          {t('hero.scroll')}
        </span>
        <ChevronDown className="h-4 w-4" />
      </div>
    </section>
  )
}
