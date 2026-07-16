import { useT } from '@/lib/i18n/useT'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const t = useT()

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

  return (
    <section
      id="projects"
      className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-24"
    >
      <h2 className="text-muted-foreground mb-12 font-mono text-xs tracking-widest uppercase">
        § {t('projects.title')}
      </h2>

      <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard
            key={p.titleKey}
            title={t(p.titleKey)}
            description={t(p.descKey)}
            tags={p.tags}
          />
        ))}
      </div>
    </section>
  )
}
