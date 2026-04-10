import { cn } from '../../lib/utils'

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  variant?: 'primary' | 'default'
}

export function StatCard({ title, value, subtitle, variant = 'default' }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6 shadow-ambient',
        variant === 'primary'
          ? 'bg-primary-container text-primary'
          : 'bg-surface-container-low text-on-background'
      )}
    >
      <p className="text-sm font-label font-medium opacity-70">{title}</p>
      <p className="text-3xl font-headline font-semibold mt-1">{value}</p>
      {subtitle && <p className="text-xs font-label opacity-60 mt-1">{subtitle}</p>}
    </div>
  )
}
