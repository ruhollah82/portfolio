import { useT } from '@/lib/i18n/useT'
import { MotionReveal } from '@/components/ui/MotionReveal'

interface Skill {
  name: string
  level: number
}

interface SkillGroup {
  key: string
  items: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    key: 'frontend',
    items: [
      { name: 'React 19', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Tailwind v4', level: 95 },
      { name: 'Zustand', level: 88 },
      { name: 'shadcn/ui', level: 90 },
    ],
  },
  {
    key: '3d',
    items: [
      { name: 'Three.js', level: 82 },
      { name: 'React Three Fiber', level: 80 },
      { name: 'Drei', level: 75 },
      { name: 'Motion', level: 78 },
    ],
  },
  {
    key: 'backend',
    items: [
      { name: 'Node.js', level: 75 },
      { name: 'Git', level: 90 },
      { name: 'Astro', level: 72 },
      { name: 'API Design', level: 80 },
    ],
  },
  {
    key: 'ml',
    items: [
      { name: 'ParsBERT', level: 78 },
      { name: 'PyTorch', level: 70 },
      { name: 'HuggingFace', level: 72 },
      { name: 'NLP', level: 80 },
    ],
  },
]

// تغییر ۱: دریافت تابع t برای ترجمه برچسب‌ها
function getLevelLabel(level: number, t: (key: string) => string): string {
  if (level >= 90) return t('skills.level.expert')
  if (level >= 75) return t('skills.level.advanced')
  if (level >= 60) return t('skills.level.proficient')
  return t('skills.level.learning')
}

function SkillColumn({
  group,
  index,
  t,
}: {
  group: SkillGroup
  index: number
  t: (key: string) => string
}) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="border-border/40 flex items-baseline gap-3 border-b pb-4">
        <span className="text-muted-foreground/50 text-[10px] tracking-widest">
          0{index + 1}
        </span>
        <h3 className="text-foreground text-sm font-medium tracking-[0.2em] uppercase">
          {t(`skills.${group.key}`)}
        </h3>
      </div>

      {/* Skills list */}
      <ul className="space-y-0">
        {group.items.map((skill) => (
          <li
            key={skill.name}
            className="group/item border-border/30 flex items-baseline justify-between gap-4 border-t py-3"
          >
            <span className="text-foreground/90 group-hover/item:text-foreground text-sm font-light tracking-wide transition-colors">
              {skill.name}
            </span>
            {/* تغییر ۲: ارسال تابع t به getLevelLabel */}
            <span className="text-muted-foreground/60 text-[10px] tracking-widest uppercase">
              {getLevelLabel(skill.level, t)}
            </span>
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
      className="relative flex min-h-screen flex-col justify-center px-6 py-32 sm:px-12 lg:px-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Editorial Header */}
        <MotionReveal>
          <div className="mb-20 flex items-center gap-4">
            <span className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase">
              § 02
            </span>
            <div className="bg-border/40 h-px flex-1" />
            <span className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase">
              {t('skills.title')}
            </span>
          </div>
        </MotionReveal>

        {/* Main Statement */}
        <MotionReveal delay={0.08}>
          <div className="mb-20 max-w-3xl">
            <h2 className="text-foreground text-3xl leading-[1.3] font-light tracking-tight sm:text-3xl md:text-4xl">
              {/* تغییر ۳: استفاده از کلیدهای ترجمه برای حفظ استایل <em> */}
              {t('skills.statement.prefix')}
              <em className="text-brand-gold font-normal not-italic">
                {t('skills.statement.highlight')}
              </em>
              {t('skills.statement.suffix')}
            </h2>
          </div>
        </MotionReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {skillGroups.map((group, i) => (
            <MotionReveal key={group.key} delay={0.12 + i * 0.06}>
              <SkillColumn group={group} index={i} t={t} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
