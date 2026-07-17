import { useT } from '@/lib/i18n/useT'
import { MotionReveal } from '@/components/ui/MotionReveal'

const highlights = [
  'React / TypeScript',
  '3D motion and storytelling',
  'Persian NLP and data-driven UX',
]

export function About() {
  const t = useT()

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <MotionReveal>
          <div className="rounded-[2rem] border border-border/70 bg-background/65 p-7 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-9">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-muted-foreground font-mono text-xs tracking-[0.35em] uppercase">
                § {t('about.title')}
              </span>
            </div>

            <p className="text-foreground max-w-2xl text-lg leading-relaxed md:text-2xl">
              {t('about.text')}
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-border/70 bg-[linear-gradient(135deg,_color-mix(in_oklch,var(--primary)_10%),transparent_55%,_color-mix(in_oklch,var(--accent)_16%),transparent_80%)] p-[1px]">
              <div className="rounded-[calc(2rem-1px)] bg-background/75 p-6 backdrop-blur-md">
                <p className="text-muted-foreground mb-4 font-mono text-[11px] uppercase tracking-[0.32em]">
                  Signature focus
                </p>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-background/65 p-6 backdrop-blur-md">
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <p className="text-muted-foreground font-mono text-[11px] uppercase tracking-[0.28em]">
                    Craft
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    Human-centered interfaces
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground font-mono text-[11px] uppercase tracking-[0.28em]">
                    Direction
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    Clear storytelling in motion
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground font-mono text-[11px] uppercase tracking-[0.28em]">
                    Impact
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    Experiences that feel alive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
