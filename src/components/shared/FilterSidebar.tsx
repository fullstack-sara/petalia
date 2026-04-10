interface OccasionFilter {
  label: string
  checked: boolean
}

interface FilterSidebarProps {
  occasions: OccasionFilter[]
  flowerTypes: string[]
  selectedFlowerTypes: string[]
  priceRange: [number, number]
  onOccasionChange: (label: string, checked: boolean) => void
  onFlowerTypeChange: (type: string) => void
  onPriceRangeChange: (range: [number, number]) => void
}

export function FilterSidebar({
  occasions,
  flowerTypes,
  selectedFlowerTypes,
  priceRange,
  onOccasionChange,
  onFlowerTypeChange,
  onPriceRangeChange,
}: FilterSidebarProps) {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-label font-semibold text-on-background mb-3">Occasion</h3>
        <div className="space-y-2">
          {occasions.map((occ) => (
            <label key={occ.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={occ.checked}
                onChange={(e) => onOccasionChange(occ.label, e.target.checked)}
                className="rounded border-outline-variant text-primary focus:ring-primary/30"
              />
              <span className="text-sm font-label text-on-background">{occ.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-label font-semibold text-on-background mb-3">Flower Type</h3>
        <div className="space-y-2">
          {flowerTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFlowerTypes.includes(type)}
                onChange={() => onFlowerTypeChange(type)}
                className="rounded border-outline-variant text-primary focus:ring-primary/30"
              />
              <span className="text-sm font-label text-on-background">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-label font-semibold text-on-background mb-3">
          Price Range: ${priceRange[0]} – ${priceRange[1]}
        </h3>
        <input
          type="range"
          min={0}
          max={500}
          value={priceRange[1]}
          onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-primary"
        />
      </div>
    </aside>
  )
}
