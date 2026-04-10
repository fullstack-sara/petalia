import { renderHook, act } from '@testing-library/react'
import fc from 'fast-check'
import { test, expect } from 'vitest'
import { useFilters } from './useFilters'

// Feature: petalia-react-design-system, Property 14: useFilters reset returns to initial state
test('useFilters reset returns to initial state for any sequence of operations', () => {
  fc.assert(
    fc.property(
      fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 0, maxLength: 5 }),
      fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 0, maxLength: 5 }),
      fc.tuple(
        fc.integer({ min: 0, max: 200 }),
        fc.integer({ min: 201, max: 500 })
      ),
      (occasions, flowerTypes, priceRange) => {
        const { result } = renderHook(() => useFilters())

        act(() => {
          occasions.forEach((o) => result.current.toggleOccasion(o))
          flowerTypes.forEach((f) => result.current.toggleFlowerType(f))
          result.current.setPriceRange(priceRange)
        })

        act(() => { result.current.reset() })

        expect(result.current.selectedOccasions).toEqual([])
        expect(result.current.selectedFlowerTypes).toEqual([])
        expect(result.current.priceRange).toEqual([0, 500])
      }
    ),
    { numRuns: 100 }
  )
})
