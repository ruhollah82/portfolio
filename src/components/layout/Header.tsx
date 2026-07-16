// import { useT } from '@/lib/i18n/useT'
import { useLocaleStore } from '@/stores/useLocaleStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { Moon, Sun, Languages } from 'lucide-react'

export function Header() {
  //   const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const setLocale = useLocaleStore((s) => s.setLocale)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between p-6 md:p-8">
      <a
        href="#hero"
        className="text-foreground hover:text-primary font-mono text-sm font-bold tracking-wider transition-colors"
      >
        R.
      </a>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setLocale(locale === 'en' ? 'fa' : 'en')}
          className="border-border hover:bg-accent hover:text-accent-foreground rounded-md border p-2 transition-colors"
          aria-label="Toggle Language"
        >
          <Languages className="h-4 w-4" />
        </button>
        <button
          onClick={toggleTheme}
          className="border-border hover:bg-accent hover:text-accent-foreground rounded-md border p-2 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  )
}
