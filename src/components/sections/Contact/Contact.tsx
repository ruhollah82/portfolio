import { useT } from '@/lib/i18n/useT'
import { Icon } from '@/components/ui/Icon'
import { MotionReveal } from '@/components/ui/MotionReveal'

export function Contact() {
  const t = useT()

  const socials = [
    {
      name: 'GitHub',
      href: 'https://github.com/ruhollah82',
      icon: 'phosphor:github-logo',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ruhollah-naseri/',
      icon: 'phosphor:linkedin-logo',
    },
    {
      name: 'Telegram',
      href: 'https://t.me/its_ruhollah',
      icon: 'phosphor:paper-plane-tilt',
    },
  ]

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col justify-center px-6 py-32 sm:px-12 lg:px-24"
    >
      {/* Subtle ambient glow (much softer than before for a premium feel) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="bg-primary/5 absolute top-1/4 -right-32 h-[500px] w-[500px] rounded-full blur-[120px]" />
        <div className="bg-accent/5 absolute bottom-1/4 -left-32 h-[400px] w-[400px] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Editorial Header */}
        <MotionReveal>
          <div className="mb-16 flex items-center gap-4">
            <span className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase">
              § 05 {t('contact.title')}
            </span>
            <div className="bg-border/40 h-px flex-1" />
          </div>
        </MotionReveal>

        {/* Fluid Layout (No rigid grids) */}
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between lg:gap-24">
          {/* Left: Primary CTA (Typography-focused) */}
          <MotionReveal delay={0.1} className="flex-1">
            <p className="text-muted-foreground/80 mb-4 text-xs tracking-[0.3em] uppercase">
              {t('contact.email')}
            </p>

            <a href="mailto:ruhollah.naserii@gmail.com" className="group block">
              <h2 className="text-foreground group-hover:text-primary text-4xl font-light tracking-tight transition-colors duration-500 sm:text-5xl md:text-6xl lg:text-7xl">
                ruhollah.naserii
                <br className="hidden sm:block" />
                @gmail.com
              </h2>

              <div className="text-muted-foreground group-hover:text-primary mt-8 flex items-center gap-3 text-sm font-medium transition-colors duration-500">
                <span>{t('hero.cta.secondary')}</span>
                <Icon
                  name="phosphor:arrow-right"
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2 rtl:-scale-x-100"
                />
              </div>
            </a>

            <p className="text-foreground/60 mt-10 max-w-md text-sm leading-relaxed font-light">
              {t('contact.text')}
            </p>
          </MotionReveal>

          {/* Right: Secondary Actions (Minimal List) */}
          <MotionReveal delay={0.2} className="w-full lg:w-80">
            {/* Resume Download */}
            <a
              href="/resume.pdf"
              download
              className="group border-border/40 hover:text-primary flex items-center justify-between border-t py-6 transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <Icon name="phosphor:file-pdf" className="h-5 w-5" />
                <div className="text-left">
                  <p className="text-sm font-medium">{t('contact.resume')}</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    PDF • 2.4 MB
                  </p>
                </div>
              </div>
              <Icon
                name="phosphor:arrow-down"
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-1"
              />
            </a>

            {/* Social Links Stack (Hairline separated) */}
            <div className="mt-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-border/40 hover:text-primary flex items-center justify-between border-t py-5 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <Icon name={social.icon} className="h-5 w-5" />
                    <span className="text-sm font-medium">{social.name}</span>
                  </div>
                  <Icon
                    name="phosphor:arrow-up-right"
                    className="h-4 w-4 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 rtl:-scale-x-100"
                  />
                </a>
              ))}
              {/* Closing line for visual balance */}
              <div className="bg-border/40 h-px w-full" />
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
