import { useId } from 'react'
import { cn } from '../../lib/utils'

interface InputProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  className?: string
  id?: string
}

export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className,
  id: externalId,
}: InputProps) {
  const generatedId = useId()
  const id = externalId ?? generatedId
  const errorId = `${id}-error`

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-label font-medium text-on-background">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border bg-surface text-on-background font-body text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
          error
            ? 'border-error focus:ring-error/30 focus:border-error'
            : 'border-outline-variant hover:border-outline'
        )}
      />
      {error && (
        <p id={errorId} className="text-xs text-error font-label">
          {error}
        </p>
      )}
    </div>
  )
}
