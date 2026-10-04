import { useT } from '@/lib/i18n/useT'
import { ProjectCard } from './ProjectCard'
import { MotionReveal } from '@/components/ui/MotionReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

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
] as const

export function Projects() {
  const t = useT()

  return (
    <section
      id="projects"
      className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader index="03" title={t('projects.title')} />

        <MotionReveal delay={0.05}>
          <p className="text-muted-foreground mb-12 max-w-2xl text-base leading-relaxed sm:mb-16 sm:text-lg">
            {t('projects.subtitle')}
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <MotionReveal
              key={p.titleKey}
              delay={0.05 + i * 0.04}
              className="h-full"
            >
              <ProjectCard
                index={i + 1}
                title={t(p.titleKey)}
                description={t(p.descKey)}
                tags={p.tags}
                href={p.link || undefined}
                linkLabel={t('projects.viewCode')}
              />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
