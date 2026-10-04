import { useT } from '@/lib/i18n/useT'
import { MotionReveal } from '@/components/ui/MotionReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

function Pillar({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border space-y-1 border-t py-4">
      <dt className="eyebrow">{label}</dt>
      <dd className="text-foreground text-base font-medium">{value}</dd>
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
      className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader index="01" title={t('about.title')} />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <MotionReveal delay={0.05}>
            <p className="text-foreground max-w-2xl text-lg leading-relaxed sm:text-xl">
              {t('about.text')}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="space-y-10">
              <div className="space-y-3">
                <p className="eyebrow">{t('about.signatureFocus')}</p>
                <ul>
                  {highlights.map((item, i) => (
                    <li
                      key={item}
                      className="border-border flex items-baseline gap-4 border-t py-3"
                    >
                      <span className="text-muted-foreground font-mono text-xs">
                        0{i + 1}
                      </span>
                      <span className="text-foreground text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <dl>
                <Pillar label={t('about.craft')} value={t('about.craftDesc')} />
                <Pillar
                  label={t('about.direction')}
                  value={t('about.directionDesc')}
                />
                <Pillar
                  label={t('about.impact')}
                  value={t('about.impactDesc')}
                />
              </dl>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
