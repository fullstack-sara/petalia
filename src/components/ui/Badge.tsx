import { cn } from '../../lib/utils'

interface BadgeProps {
  label: string
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

const variantClasses = {
  primary: 'bg-primary-container text-primary',
  secondary: 'bg-secondary-container text-secondary',
  outline: 'border border-outline-variant text-on-background bg-transparent',
}

export function Badge({ label, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-label font-medium',
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
