import { useT } from '@/lib/i18n/useT'
import { ProjectCard } from './ProjectCard'
import { MotionReveal } from '@/components/ui/MotionReveal'

const projects = [
  {
    titleKey: 'projects.voteria.title',
    descKey: 'projects.voteria.desc',
    tags: ['React 19', 'Zustand', 'Go'],
  },
  {
    titleKey: 'projects.lexicon.title',
    descKey: 'projects.lexicon.desc',
    tags: ['ParsBERT', 'PyTorch', 'NLP'],
  },
  {
    titleKey: 'projects.hooshtan.title',
    descKey: 'projects.hooshtan.desc',
    tags: ['Capacitor', 'MediaPipe', 'Android'],
  },
  {
    titleKey: 'projects.icpc.title',
    descKey: 'projects.icpc.desc',
    tags: ['Astro', 'React', 'Islands'],
  },
]

export function Projects() {
  const t = useT()

  return (
    <section
      id="projects"
      className="relative flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <MotionReveal>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-muted-foreground font-mono text-xs tracking-[0.4em] uppercase">
                § {t('projects.title')}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                A selection of products and experiments that sit at the intersection of interface craft, tooling, and real-world problem solving.
              </p>
            </div>
          </div>
        </MotionReveal>

        <div className="grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <MotionReveal key={p.titleKey} delay={i * 0.08}>
              <ProjectCard
                title={t(p.titleKey)}
                description={t(p.descKey)}
                tags={p.tags}
              />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
