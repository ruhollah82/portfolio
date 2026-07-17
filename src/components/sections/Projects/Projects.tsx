import { useT } from '@/lib/i18n/useT'
import { ProjectCard } from './ProjectCard'
import { MotionReveal } from '@/components/ui/MotionReveal'

const projects = [
  {
    titleKey: 'projects.voteria.title',
    descKey: 'projects.voteria.desc',
    tags: ['React', 'TypeScript', 'Zustand'],
    link: 'https://github.com/ruhollah82/voteria-frontend',
  },
  {
    titleKey: 'projects.lexicon.title',
    descKey: 'projects.lexicon.desc',
    tags: ['ParsBERT', 'PyTorch', 'NLP'],
    link: '',
  },
  {
    titleKey: 'projects.hooshtan.title',
    descKey: 'projects.hooshtan.desc',
    tags: ['Capacitor', 'MediaPipe', 'Android'],
    link: '',
  },
  {
    titleKey: 'projects.icpc.title',
    descKey: 'projects.icpc.desc',
    tags: ['Astro', 'React', 'Islands'],
    link: '',
  },
]

export function Projects() {
  const t = useT()

  return (
    <section
      id="projects"
      className="relative flex min-h-screen flex-col justify-center px-5 py-24 sm:px-12 sm:py-32 lg:px-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <MotionReveal>
          <div className="mb-12 flex items-center gap-4 sm:mb-16">
            <span className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase">
              § 03
            </span>
            <div className="bg-border/40 h-px flex-1" />
            <span className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase">
              {t('projects.title')}
            </span>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <p className="text-muted-foreground mb-12 max-w-2xl text-base leading-relaxed sm:mb-16 md:text-lg">
            {t('projects.subtitle')}
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">
          {projects.map((p, i) => (
            <MotionReveal key={p.titleKey} delay={0.1 + i * 0.06}>
              <ProjectCard
                index={i + 1}
                title={t(p.titleKey)}
                description={t(p.descKey)}
                tags={p.tags}
                featuredLabel={t('projects.featured')}
              />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
