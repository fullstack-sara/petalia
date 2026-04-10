import { renderHook, act } from '@testing-library/react'
import fc from 'fast-check'
import { test, expect } from 'vitest'
import { useProductCustomization } from './useProductCustomization'

// Feature: petalia-react-design-system, Property 15: useProductCustomization setters update state
test('useProductCustomization setters update corresponding state fields', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 20 }),
      fc.string({ minLength: 1, maxLength: 20 }),
      fc.string({ minLength: 1, maxLength: 20 }),
      fc.string({ minLength: 1, maxLength: 100 }),
      (palette, size, presentation, note) => {
        const { result } = renderHook(() => useProductCustomization())

        act(() => {
          result.current.setSelectedPalette(palette)
          result.current.setSelectedSize(size)
          result.current.setSelectedPresentation(presentation)
          result.current.setNoteMessage(note)
        })

        expect(result.current.selectedPalette).toBe(palette)
        expect(result.current.selectedSize).toBe(size)
        expect(result.current.selectedPresentation).toBe(presentation)
        expect(result.current.noteMessage).toBe(note)
      }
    ),
    { numRuns: 100 }
  )
})
