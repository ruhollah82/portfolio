import { useT } from '@/lib/i18n/useT'
import { MotionReveal } from '@/components/ui/MotionReveal'

function Pillar({ label, value }: { label: string; value: string }) {
  return (
    <div className="group border-border/30 space-y-2 border-t pt-4">
      <p className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase">
        {label}
      </p>
      <p className="text-foreground text-lg leading-snug font-light tracking-tight">
        {value}
      </p>
    </div>
  )
}

export function About() {
  const t = useT()

  const highlights = [
    t('about.highlight.react'),
    t('about.highlight.motion'),
    t('about.highlight.nlp'),
  ]

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center px-6 py-32 sm:px-12 lg:px-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Editorial Header */}
        <MotionReveal>
          <div className="mb-20 flex items-center gap-4">
            <span className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase">
              § 01
            </span>
            <div className="bg-border/40 h-px flex-1" />
            <span className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase">
              {t('about.title')}
            </span>
          </div>
        </MotionReveal>

        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          {/* Main Statement */}
          <MotionReveal delay={0.1}>
            <div className="space-y-8">
              <h2 className="text-foreground max-w-2xl text-3xl leading-[1.3] font-light tracking-tight sm:text-3xl md:text-4xl">
                {t('about.text')}
              </h2>

              {/* Gold accent line */}
              <div className="bg-brand-gold/60 h-px w-16" />
            </div>
          </MotionReveal>

          {/* Side Content */}
          <MotionReveal delay={0.2}>
            <div className="space-y-12">
              {/* Signature Focus - Editorial List */}
              <div className="space-y-6">
                <p className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase">
                  {t('about.signatureFocus')}
                </p>
                <ul className="space-y-3">
                  {highlights.map((item, i) => (
                    <li
                      key={item}
                      className="border-border/30 flex items-baseline gap-4 border-t pt-3"
                    >
                      <span className="text-muted-foreground/40 text-[10px]">
                        0{i + 1}
                      </span>
                      <span className="text-foreground text-sm leading-relaxed font-light tracking-wide">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Three Pillars */}
              <div className="space-y-0">
                <Pillar label={t('about.craft')} value={t('about.craftDesc')} />
                <Pillar
                  label={t('about.direction')}
                  value={t('about.directionDesc')}
                />
                <Pillar
                  label={t('about.impact')}
                  value={t('about.impactDesc')}
                />
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
