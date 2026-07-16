import { useT } from '@/lib/i18n/useT'
import { useUIStore } from '@/stores/useUIStore'

const sections = ['about', 'skills', 'projects', 'contact'] as const

export function SectionNav() {
  const t = useT()
  const activeSection = useUIStore((s) => s.activeSection)

  return (
    <nav
      className="fixed start-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 md:flex"
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = activeSection === section
        return (
          <a
            key={section}
            href={`#${section}`}
            className="group flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
          >
            <span
              className={`block h-2 w-2 rounded-full border transition-all ${
                isActive
                  ? 'bg-primary border-primary scale-125'
                  : 'border-muted-foreground group-hover:border-primary bg-transparent'
              }`}
            />
            <span
              className={`transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-foreground'
              }`}
            >
              {t(`nav.${section}`)}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
