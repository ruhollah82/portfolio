interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
}

export function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-background/65 p-6 shadow-[0_20px_70px_-32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_color-mix(in_oklch,var(--primary)_9%),transparent_45%,_color-mix(in_oklch,var(--accent)_10%),transparent_78%)] opacity-80" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <span className="rounded-full border border-border/70 bg-background/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Featured build
          </span>
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_color-mix(in_oklch,var(--accent),transparent_15%)]" />
        </div>

        <h3 className="text-foreground mb-3 text-xl font-bold transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-xl leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 bg-background/80 px-3 py-1 font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/85"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
