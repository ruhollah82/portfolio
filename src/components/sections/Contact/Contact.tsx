import { useT } from '@/lib/i18n/useT'
import {
  Mail,
  FolderGit2 as Github,
  FolderGit2 as Linkedin,
  Download,
} from 'lucide-react'

export function Contact() {
  const t = useT()

  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-24"
    >
      <h2 className="text-muted-foreground mb-8 font-mono text-xs tracking-widest uppercase">
        § {t('contact.title')}
      </h2>

      <p className="text-foreground mb-12 max-w-xl text-lg">
        {t('contact.text')}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="mailto:hello@ruhollah.dev"
          className="bg-primary text-primary-foreground inline-flex items-center gap-3 rounded-md px-6 py-3 font-medium transition-opacity hover:opacity-90"
        >
          <Mail className="h-4 w-4" />
          {t('contact.email')}
        </a>
        <a
          href="/resume.pdf"
          download
          className="border-border text-foreground hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-3 rounded-md border px-6 py-3 font-medium transition-colors"
        >
          <Download className="h-4 w-4" />
          {t('contact.resume')}
        </a>
      </div>

      <div className="mt-12 flex gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}
