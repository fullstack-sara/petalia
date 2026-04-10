import { useState } from 'react'

interface ProductCustomizationState {
  selectedPalette: string
  selectedSize: string
  selectedPresentation: string
  selectedTouches: string[]
  noteMessage: string
  totalPrice: number
  setSelectedPalette: (v: string) => void
  setSelectedSize: (v: string) => void
  setSelectedPresentation: (v: string) => void
  toggleTouch: (touch: string) => void
  setNoteMessage: (v: string) => void
}

export function useProductCustomization(basePrice = 0): ProductCustomizationState {
  const [selectedPalette, setSelectedPalette] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedPresentation, setSelectedPresentation] = useState('')
  const [selectedTouches, setSelectedTouches] = useState<string[]>([])
  const [noteMessage, setNoteMessage] = useState('')

  function toggleTouch(touch: string) {
    setSelectedTouches((prev) =>
      prev.includes(touch) ? prev.filter((t) => t !== touch) : [...prev, touch]
    )
  }

  const totalPrice = basePrice

  return {
    selectedPalette,
    selectedSize,
    selectedPresentation,
    selectedTouches,
    noteMessage,
    totalPrice,
    setSelectedPalette,
    setSelectedSize,
    setSelectedPresentation,
    toggleTouch,
    setNoteMessage,
  }
}
