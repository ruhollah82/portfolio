import { useT } from '@/lib/i18n/useT'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  const t = useT()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6"
    >
      <div className="max-w-3xl space-y-6 text-center">
        <h1 className="text-foreground text-4xl font-bold md:text-6xl">
          {t('hero.greeting')}
        </h1>
        <p className="text-muted-foreground font-mono text-sm tracking-wider uppercase md:text-base">
          {t('hero.role')}
        </p>
      </div>

      <div className="text-muted-foreground absolute bottom-12 flex animate-bounce flex-col items-center gap-2">
        <span className="font-mono text-xs tracking-widest uppercase">
          {t('hero.scroll')}
        </span>
        <ChevronDown className="h-4 w-4" />
      </div>
    </section>
  )
}
