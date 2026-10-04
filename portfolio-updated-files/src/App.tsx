import { Providers } from './app/providers'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero/Hero'
import { About } from './components/sections/About/About'
import { Skills } from './components/sections/Skills/Skills'
import { Projects } from './components/sections/Projects/Projects'
import { Contact } from './components/sections/Contact/Contact'
import { useT } from './lib/i18n/useT'

function AppContent() {
  const t = useT()

  return (
    <>
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2"
      >
        {t('a11y.skip')}
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  )
}
