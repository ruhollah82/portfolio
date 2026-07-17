import { cn } from '@/lib/utils'

interface RadialProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  color?: string
}

export function RadialProgress({
  value,
  size = 48,
  strokeWidth = 4,
  className,
  color = 'hsl(var(--primary))',
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border/50"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="text-foreground absolute text-[10px] font-bold">
        {value}
      </span>
    </div>
  )
}
