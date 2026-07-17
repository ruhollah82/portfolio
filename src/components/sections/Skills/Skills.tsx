import { useT } from '@/lib/i18n/useT'
import { MotionReveal } from '@/components/ui/MotionReveal'

const skillGroups = [
  {
    key: 'frontend',
    items: ['React 19', 'TypeScript', 'Vite', 'Tailwind v4', 'shadcn/ui'],
  },
  { key: '3d', items: ['Three.js', 'React Three Fiber', 'Drei', 'Motion'] },
  { key: 'backend', items: ['Go', 'Node.js', 'Git', 'Astro'] },
  { key: 'ml', items: ['ParsBERT', 'PyTorch', 'HuggingFace', 'NLP'] },
]

export function Skills() {
  const t = useT()

  return (
    <section
      id="skills"
      className="relative flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <MotionReveal>
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-muted-foreground font-mono text-xs tracking-[0.4em] uppercase">
              § {t('skills.title')}
            </h2>
            <div className="hidden rounded-full border border-border/70 bg-background/60 px-4 py-2 text-xs font-medium text-foreground/85 backdrop-blur-md sm:block">
              Stack • Systems • Experimentation
            </div>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <MotionReveal key={group.key} delay={i * 0.08}>
              <div className="group rounded-[1.6rem] border border-border/70 bg-background/65 p-5 shadow-[0_20px_70px_-32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-primary font-mono text-sm font-bold tracking-[0.3em] uppercase">
                    {t(`skills.${group.key}`)}
                  </h3>
                  <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/70 bg-background/80 px-3 py-1 font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
