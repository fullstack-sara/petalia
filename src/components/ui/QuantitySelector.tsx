interface QuantitySelectorProps {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
}

export function QuantitySelector({ value, onIncrement, onDecrement, min = 1 }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center border border-outline-variant rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="w-9 h-9 flex items-center justify-center text-on-background hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-base">remove</span>
      </button>
      <span className="w-10 text-center text-sm font-label font-medium text-on-background select-none">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="w-9 h-9 flex items-center justify-center text-on-background hover:bg-surface-container transition-colors"
      >
        <span className="material-symbols-outlined text-base">add</span>
      </button>
    </div>
  )
}
