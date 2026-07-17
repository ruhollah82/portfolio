interface ProjectCardProps {
  index: number
  title: string
  description: string
  tags: string[]
  featuredLabel: string
}

export function ProjectCard({
  index,
  title,
  description,
  tags,
  featuredLabel,
}: ProjectCardProps) {
  return (
    <article className="group border-border/40 hover:border-primary/60 relative flex h-full flex-col border-t pt-6 transition-colors">
      {/* Top row: Index + Featured label */}
      <div className="mb-8 flex items-baseline justify-between">
        <span className="text-muted-foreground/50 font-mono text-xs tracking-widest">
          0{index}
        </span>
        <span className="text-muted-foreground/60 font-mono text-[10px] tracking-[0.3em] uppercase">
          {featuredLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-foreground group-hover:text-primary mb-4 text-2xl leading-tight font-light tracking-tight transition-colors md:text-3xl">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground mb-8 flex-1 text-sm leading-relaxed">
        {description}
      </p>

      {/* Tags with hairline separator */}
      <div className="border-border/30 flex flex-wrap gap-2 border-t pt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-muted-foreground font-mono text-[10px] tracking-[0.22em] uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
