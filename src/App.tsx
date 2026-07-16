import { Providers } from './app/providers'
import { useT } from './lib/i18n/useT'
import { useLocaleStore } from './stores/useLocaleStore'
import { useThemeStore } from './stores/useThemeStore'

function AppContent() {
  const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const setLocale = useLocaleStore((s) => s.setLocale)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  return (
    <main className="bg-background text-foreground min-h-screen p-8 transition-colors">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-primary text-2xl font-bold">
            {t('test.greeting')}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setLocale(locale === 'en' ? 'fa' : 'en')}
              className="border-border hover:bg-accent hover:text-accent-foreground rounded-md border px-3 py-1 transition-colors"
            >
              {locale === 'en' ? 'فا' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="border-border hover:bg-accent hover:text-accent-foreground rounded-md border px-3 py-1 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        <section className="space-y-4">
          <p className="text-muted-foreground text-lg">{t('test.role')}</p>
          <p className="font-mono text-sm text-slate-500">
            Phase 1 Exit Criteria Check: Toggling the buttons above should flip
            the text direction, swap the language, and change the
            background/foreground colors.
          </p>
        </section>
      </div>
    </main>
  )
}

function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  )
}

export default App
