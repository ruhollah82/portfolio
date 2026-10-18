import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface TypewriterProps {
  text: string
  /** Wrapper tag. Use "p" to keep paragraph semantics. */
  as?: 'span' | 'p' | 'div'
  className?: string
  /** ms per character */
  speed?: number
  /** ms before the first character */
  startDelay?: number
}

function graphemes(s: string): string[] {
  if (typeof Intl.Segmenter === 'function') {
    return Array.from(
      new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(s),
      (part) => part.segment
    )
  }
  return Array.from(s)
}

/**
 * Printer-style reveal (mimo.xiaomi.com), safe for Persian:
 *  - the typed text is ONE text node that grows (slice), never one span per
 *    letter, so Arabic-script letters keep joining correctly;
 *  - the full text is rendered invisibly underneath, so the line never
 *    reflows and a screen reader gets the whole sentence at once;
 *  - types once. If the language is switched later, the new text shows
 *    instantly instead of re-typing.
 * Use it on ONE line (e.g. the hero role); it loses its charm when repeated.
 */
export function Typewriter({
  text,
  as: Tag = 'span',
  className,
  speed = 45,
  startDelay = 400,
}: TypewriterProps) {
  const reduced = useReducedMotion()
  // The text we started typing. If the language changes later (mid-typing or
  // after), the new text is shown instantly instead of re-typing.
  const [initialText] = useState(text)
  const instant = reduced || text !== initialText
  const chars = useMemo(() => graphemes(text), [text])
  const [count, setCount] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (instant || finished) return
    let i = 0
    let id = 0
    const step = () => {
      i += 1
      setCount(i)
      if (i < chars.length) {
        id = window.setTimeout(step, speed)
      } else {
        setFinished(true)
      }
    }
    id = window.setTimeout(step, startDelay)
    return () => window.clearTimeout(id)
  }, [chars, instant, finished, speed, startDelay])

  const visible = instant || finished ? chars.length : Math.min(count, chars.length)
  const typing = !(instant || finished)

  return (
    <Tag className={cn(Tag === 'span' ? 'inline-grid' : 'grid', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {text}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {chars.slice(0, visible).join('')}
        <motion.span
          className="ms-0.5 inline-block h-[1.05em] w-0.5 bg-current align-[-0.18em]"
          initial={{ opacity: 0 }}
          animate={typing ? { opacity: [1, 1, 0, 0] } : { opacity: 0 }}
          transition={
            typing
              ? { duration: 0.75, repeat: Infinity, times: [0, 0.5, 0.5, 1] }
              : { duration: 0.2 }
          }
        />
      </span>
    </Tag>
  )
}
