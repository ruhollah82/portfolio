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
      <Header />
      <SectionNav />

      <main>
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
