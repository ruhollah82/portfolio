import { useT } from '@/lib/i18n/useT'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  FolderGit2,
  Mail,
} from 'lucide-react'
import { MotionReveal } from '@/components/ui/MotionReveal'
import { buttonVariants } from '@/components/ui/button'

export function Contact() {
  const t = useT()

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <MotionReveal>
          <div className="rounded-[2rem] border border-border/70 bg-[linear-gradient(135deg,_color-mix(in_oklch,var(--primary)_10%),transparent_50%,_color-mix(in_oklch,var(--accent)_14%),transparent_82%)] p-[1px] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.5)]">
            <div className="grid gap-8 rounded-[calc(2rem-1px)] bg-background/75 p-6 backdrop-blur-md lg:grid-cols-[1fr_auto] lg:items-end lg:p-8">
              <div>
                <h2 className="text-muted-foreground mb-4 font-mono text-xs tracking-[0.4em] uppercase">
                  § {t('contact.title')}
                </h2>

                <p className="text-foreground max-w-2xl text-lg leading-relaxed md:text-xl">
                  {t('contact.text')}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:hello@ruhollah.dev"
                  className={buttonVariants({
                    size: 'lg',
                    className: 'rounded-full px-5',
                  })}
                >
                  <Mail className="h-4 w-4" />
                  {t('contact.email')}
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                    className: 'rounded-full px-5',
                  })}
                >
                  <Download className="h-4 w-4" />
                  {t('contact.resume')}
                </a>
              </div>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/65 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FolderGit2 className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/65 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
