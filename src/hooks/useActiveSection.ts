import { useEffect } from 'react'
import { useUIStore } from '@/stores/useUIStore'

const sections = ['hero', 'about', 'skills', 'projects', 'contact'] as const
type SectionId = (typeof sections)[number]

export function useActiveSection() {
  const setActiveSection = useUIStore((s) => s.setActiveSection)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id as SectionId)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [setActiveSection])
}
