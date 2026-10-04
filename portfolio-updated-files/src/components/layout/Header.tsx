import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { useLocaleStore } from '@/stores/useLocaleStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { useUIStore } from '@/stores/useUIStore'
import { useT } from '@/lib/i18n/useT'

const navItems = ['about', 'skills', 'projects', 'contact'] as const

const iconButton =
  'text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-ring inline-flex size-11 cursor-pointer items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none md:size-10'

export function Header() {
  const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const setLocale = useLocaleStore((s) => s.setLocale)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const activeSection = useUIStore((s) => s.activeSection)
  const [menuOpen, setMenuOpen] = useState(false)

  // While the mobile menu is open: Escape closes it and the page behind it
  // does not scroll.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header className="bg-background/90 border-border fixed inset-x-0 top-0 z-50 border-b">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#hero"
            onClick={() => setMenuOpen(false)}
            className="text-foreground focus-visible:ring-ring rounded-md font-mono text-base font-semibold focus-visible:ring-2 focus-visible:outline-none"
          >
            R.
          </a>

          <nav
            aria-label={t('a11y.nav')}
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item
              return (
                <a
                  key={item}
                  href={`#${item}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`focus-visible:ring-ring rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(`nav.${item}`)}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLocale(locale === 'en' ? 'fa' : 'en')}
              className={iconButton}
              aria-label={t('a11y.language')}
            >
              <span className="font-mono text-xs font-medium">
                {locale === 'en' ? 'FA' : 'EN'}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={iconButton}
              aria-label={t('a11y.theme')}
            >
              <Icon
                name={theme === 'light' ? 'moon' : 'sun'}
                className="size-5"
              />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={`${iconButton} md:hidden`}
              aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Icon name={menuOpen ? 'x' : 'list'} className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label={t('a11y.nav')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-background fixed inset-0 z-40 flex flex-col justify-center gap-2 px-5 pt-16 sm:px-8 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className="text-foreground border-border hover:text-primary border-b py-4 text-2xl font-medium transition-colors"
              >
                {t(`nav.${item}`)}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
