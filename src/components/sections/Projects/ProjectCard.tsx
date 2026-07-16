interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
}

export function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <article className="group border-border bg-card hover:border-primary rounded-lg border p-6 transition-colors">
      <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-bold transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
