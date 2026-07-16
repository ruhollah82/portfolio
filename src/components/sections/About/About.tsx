import { useT } from '@/lib/i18n/useT'

export function About() {
  const t = useT()

  return (
    <section
      id="about"
      className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-24"
    >
      <h2 className="text-muted-foreground mb-8 font-mono text-xs tracking-widest uppercase">
        § {t('about.title')}
      </h2>
      <p className="text-foreground max-w-2xl text-lg leading-relaxed md:text-xl">
        {t('about.text')}
      </p>
    </section>
  )
}
