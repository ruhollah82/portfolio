import { useT } from '@/lib/i18n/useT'
import { Icon } from '@/components/ui/Icon'
import { MotionReveal } from '@/components/ui/MotionReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { IconName } from '@/lib/icons'

const EMAIL = 'ruhollah.naserii@gmail.com'

const socials: { name: string; href: string; icon: IconName }[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/ruhollah82',
    icon: 'github-logo',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ruhollah-naseri/',
    icon: 'linkedin-logo',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/its_ruhollah',
    icon: 'paper-plane-tilt',
  },
]

const rowClass =
  'group border-border hover:text-primary focus-visible:ring-ring flex items-center justify-between gap-4 border-t py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none'

export function Contact() {
  const t = useT()

  return (
    <section
      id="contact"
      className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader index="04" title={t('contact.title')} />

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <MotionReveal delay={0.05} className="flex-1">
            <p className="eyebrow mb-4">{t('contact.email')}</p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-foreground hover:text-primary focus-visible:ring-ring inline-block rounded-sm text-2xl font-semibold tracking-tight [overflow-wrap:anywhere] transition-colors focus-visible:ring-2 focus-visible:outline-none sm:text-3xl lg:text-4xl"
            >
              {EMAIL}
            </a>
            <p className="text-muted-foreground mt-6 max-w-md text-base leading-relaxed">
              {t('contact.text')}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.1} className="w-full lg:w-80">
            <ul className="border-border border-b">
              <li>
                <a
                  href="https://raw.githubusercontent.com/ruhollah82/ruhollah82/main/main.pdf"
                  download
                  className={rowClass}
                >
                  <span className="flex items-center gap-4 text-sm font-medium">
                    <Icon name="file-pdf" className="size-5" />
                    {t('contact.resume')}
                  </span>
                  <Icon
                    name="arrow-down"
                    className="text-muted-foreground size-4"
                  />
                </a>
              </li>
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClass}
                  >
                    <span className="flex items-center gap-4 text-sm font-medium">
                      <Icon name={social.icon} className="size-5" />
                      {social.name}
                    </span>
                    <Icon
                      name="arrow-up-right"
                      className="text-muted-foreground size-4 rtl:-scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
