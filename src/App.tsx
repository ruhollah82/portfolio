import { Providers } from './app/providers'
import { Header } from './components/layout/Header'
import { SectionNav } from './components/layout/SectionNav'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero/Hero'
import { About } from './components/sections/About/About'
import { Skills } from './components/sections/Skills/Skills'
import { Projects } from './components/sections/Projects/Projects'
import { Contact } from './components/sections/Contact/Contact'

function AppContent() {
  return (
    <>
      {/* Skip to content link for keyboard/screen reader users */}
      <a
        href="#about"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>

      <Header />
      <SectionNav />

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

function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  )
}

export default App
