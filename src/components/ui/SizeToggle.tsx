import { cn } from '../../lib/utils'

interface SizeToggleProps {
  options: string[]
  selected: string
  onChange: (value: string) => void
}

export function SizeToggle({ options, selected, onChange }: SizeToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-outline-variant overflow-hidden">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            'px-4 py-2 text-sm font-label font-medium transition-colors',
            option === selected
              ? 'bg-surface-container text-primary shadow-sm'
              : 'bg-surface text-on-background hover:bg-surface-container-low'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
