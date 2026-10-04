import { Icon as IconifyIcon } from '@iconify/react/offline'
import { icons, type IconName } from '@/lib/icons'

interface IconProps {
  name: IconName
  className?: string
}

// Decorative by default: icons next to text carry no meaning of their own.
// Icon-only buttons must provide an aria-label on the button itself.
export function Icon({ name, className = 'size-4' }: IconProps) {
  return <IconifyIcon icon={icons[name]} className={className} aria-hidden />
}
