import { useT } from '@/lib/i18n/useT'
import { MotionReveal } from '@/components/ui/MotionReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Plain stack lists. Self-assigned percentage ratings ("React 95") were removed:
// they can't be verified and tend to read as padding rather than evidence.
const skillGroups = [
  {
    key: 'frontend',
    items: [
      'React 19',
      'TypeScript',
      'Next.js',
      'Tailwind v4',
      'Zustand',
      'shadcn/ui',
    ],
  },
  {
    key: '3d',
    items: ['Three.js', 'React Three Fiber', 'Drei', 'Motion'],
  },
  {
    key: 'backend',
    items: ['Node.js', 'Git', 'Astro', 'API Design'],
  },
  {
    key: 'ml',
    items: ['ParsBERT', 'PyTorch', 'HuggingFace', 'NLP'],
  },
] as const

function SkillColumn({
  groupKey,
  items,
  index,
}: {
  groupKey: string
  items: readonly string[]
  index: number
}) {
  const t = useT()

  return (
    <div>
      <div className="border-border mb-1 flex items-baseline gap-3 border-b pb-4">
        <span className="text-muted-foreground font-mono text-xs">
          0{index + 1}
        </span>
        <h3 className="text-foreground text-base font-semibold">
          {t(`skills.${groupKey}`)}
        </h3>
      </div>
      <ul>
        {items.map((name) => (
          <li
            key={name}
            className="border-border text-foreground border-b py-3 text-sm last:border-b-0"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Skills() {
  const t = useT()

  return (
    <section
      id="skills"
      className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader index="02" title={t('skills.title')} />

        <MotionReveal delay={0.05}>
          <p className="text-foreground mb-12 max-w-3xl text-lg leading-relaxed sm:mb-16 sm:text-xl">
            {t('skills.statement.prefix')}
            <span className="text-primary font-medium">
              {t('skills.statement.highlight')}
            </span>
            {t('skills.statement.suffix')}
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {skillGroups.map((group, i) => (
            <MotionReveal key={group.key} delay={0.05 + i * 0.04}>
              <SkillColumn groupKey={group.key} items={group.items} index={i} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
