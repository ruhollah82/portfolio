import { Icon as IconifyIcon, addCollection } from '@iconify/react'
import type { IconifyJSON } from '@iconify/types'
import phosphorIcons from '@iconify-json/ph/icons.json'

addCollection(phosphorIcons as IconifyJSON)

interface IconProps {
  name: string
  className?: string
}

function normalizeIconName(name: string) {
  return name.startsWith('phosphor:') ? `ph:${name.slice('phosphor:'.length)}` : name
}

export function Icon({ name, className = 'h-4 w-4' }: IconProps) {
  return <IconifyIcon icon={normalizeIconName(name)} className={className} />
}
