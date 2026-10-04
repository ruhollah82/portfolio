import { useEffect } from 'react'
import { useUIStore } from '@/stores/useUIStore'

const sections = ['hero', 'about', 'skills', 'projects', 'contact'] as const
type SectionId = (typeof sections)[number]

export function useActiveSection() {
  const setActiveSection = useUIStore((s) => s.setActiveSection)

  useEffect(() => {
    // A thin band across the middle of the viewport decides the active section.
    // (A ratio threshold never fires for sections taller than the screen.)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId)
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [setActiveSection])
}
