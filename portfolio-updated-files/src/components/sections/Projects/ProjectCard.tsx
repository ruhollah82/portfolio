import { Icon } from '@/components/ui/Icon'

interface ProjectCardProps {
  index: number
  title: string
  description: string
  tags: readonly string[]
  href?: string
  linkLabel: string
}

export function ProjectCard({
  index,
  title,
  description,
  tags,
  href,
  linkLabel,
}: ProjectCardProps) {
  return (
    <article className="border-border bg-card hover:border-primary/50 relative flex h-full flex-col rounded-lg border p-6 transition-colors sm:p-8">
      <span className="text-muted-foreground mb-6 font-mono text-xs">
        0{index}
      </span>

      <h3 className="text-foreground mb-3 text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h3>

      <p className="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed sm:text-base">
        {description}
      </p>

      <ul className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="bg-muted text-foreground rounded px-2 py-1 font-mono text-xs"
          >
            {tag}
          </li>
        ))}
      </ul>

      {href && (
        // The pseudo-element stretches the link over the whole card.
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${linkLabel}: ${title}`}
          className="text-primary focus-visible:ring-ring inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-medium after:absolute after:inset-0 after:rounded-lg hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          {linkLabel}
          <Icon name="arrow-up-right" className="size-4 rtl:-scale-x-100" />
        </a>
      )}
    </article>
  )
}
