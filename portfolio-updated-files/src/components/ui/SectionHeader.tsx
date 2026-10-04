import { MotionReveal } from './MotionReveal'

interface SectionHeaderProps {
  index: string
  title: string
}

// Shared by every section so the page has one consistent rhythm.
// The title is the real <h2>; the number is decoration.
export function SectionHeader({ index, title }: SectionHeaderProps) {
  return (
    <MotionReveal>
      <div className="mb-12 flex items-center gap-4 sm:mb-16">
        <span className="eyebrow" aria-hidden>
          {index}
        </span>
        <h2 className="eyebrow">{title}</h2>
        <div className="bg-border h-px flex-1" />
      </div>
    </MotionReveal>
  )
}
