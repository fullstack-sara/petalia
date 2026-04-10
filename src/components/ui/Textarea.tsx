import { useId } from 'react'
import { cn } from '../../lib/utils'

interface TextareaProps {
  label: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  className?: string
}

export function Textarea({ label, placeholder, value, onChange, rows = 4, className }: TextareaProps) {
  const id = useId()

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-label font-medium text-on-background">
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-background font-body text-sm transition-colors hover:border-outline focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
      />
    </div>
  )
}
