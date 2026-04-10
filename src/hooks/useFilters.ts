import { useState } from 'react'

const DEFAULT_PRICE_RANGE: [number, number] = [0, 500]

export function useFilters() {
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([])
  const [selectedFlowerTypes, setSelectedFlowerTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE)

  function toggleOccasion(label: string) {
    setSelectedOccasions((prev) =>
      prev.includes(label) ? prev.filter((o) => o !== label) : [...prev, label]
    )
  }

  function toggleFlowerType(type: string) {
    setSelectedFlowerTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  function reset() {
    setSelectedOccasions([])
    setSelectedFlowerTypes([])
    setPriceRange(DEFAULT_PRICE_RANGE)
  }

  return {
    selectedOccasions,
    selectedFlowerTypes,
    priceRange,
    toggleOccasion,
    toggleFlowerType,
    setPriceRange,
    reset,
  }
}
