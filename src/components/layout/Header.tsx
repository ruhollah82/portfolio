import { useState } from 'react'
import { useLocaleStore } from '@/stores/useLocaleStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n/useT'
import { motion, AnimatePresence } from 'motion/react'

export function Header() {
  const locale = useLocaleStore((s) => s.locale)
  const setLocale = useLocaleStore((s) => s.setLocale)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const t = useT()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = ['about', 'skills', 'projects', 'contact']

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-transparent p-5 sm:p-6 md:p-8">
        <a
          href="#hero"
          className="text-foreground hover:text-primary text-sm font-bold tracking-wider transition-colors"
        >
          R.
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocale(locale === 'en' ? 'fa' : 'en')}
            className="border-border hover:bg-accent hover:text-accent-foreground rounded-md border p-2 backdrop-blur-xl transition-colors"
            aria-label="Toggle Language"
          >
            <Icon name="phosphor:translate" className="h-4 w-4" />
          </button>
          <button
            onClick={toggleTheme}
            className="border-border hover:bg-accent hover:text-accent-foreground rounded-md border p-2 backdrop-blur-xl transition-colors"
            aria-label="Toggle Theme"
          >
            <Icon
              name={theme === 'light' ? 'phosphor:moon' : 'phosphor:sun'}
              className="h-4 w-4"
            />
          </button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="border-border hover:bg-accent hover:text-accent-foreground rounded-md border p-2 backdrop-blur-xl transition-colors md:hidden"
            aria-label="Open Menu"
          >
            <Icon name="phosphor:list" className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-background/95 fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 backdrop-blur-xl md:hidden"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="border-border hover:bg-accent hover:text-accent-foreground absolute top-5 right-5 rounded-md border p-2 transition-colors"
              aria-label="Close Menu"
            >
              <Icon name="phosphor:x" className="h-5 w-5" />
            </button>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-primary text-3xl font-light tracking-tight uppercase transition-colors"
              >
                {t(`nav.${item}`)}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
