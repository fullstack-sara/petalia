import { cn } from '../../lib/utils'

interface ColorSwatchProps {
  color: string
  label: string
  selected: boolean
  onClick: () => void
}

export function ColorSwatch({ color, label, selected, onClick }: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        'w-8 h-8 rounded-full transition-all duration-200 ring-offset-2',
        selected ? 'ring-2 ring-primary scale-110' : 'hover:scale-105'
      )}
      style={{ backgroundColor: color }}
    />
  )
}
