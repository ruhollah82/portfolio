import { useT } from '@/lib/i18n/useT'

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
      className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-24"
    >
      <h2 className="text-muted-foreground mb-12 font-mono text-xs tracking-widest uppercase">
        § {t('skills.title')}
      </h2>

      <div className="grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.key} className="space-y-4">
            <h3 className="text-primary font-mono text-sm font-bold tracking-wider uppercase">
              {t(`skills.${group.key}`)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="border-border bg-secondary text-secondary-foreground rounded-md border px-3 py-1 font-mono text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
