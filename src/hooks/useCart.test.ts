import { renderHook, act } from '@testing-library/react'
import fc from 'fast-check'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { useCart } from './useCart'
import type { Product } from '../types'

const makeProduct = (id: string, price: number): Product => ({
  id,
  name: `Product ${id}`,
  subtitle: 'subtitle',
  price,
  imageUrl: 'https://example.com/img.jpg',
  imageAlt: 'alt',
  category: 'test',
  status: 'in-stock',
})

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

// Feature: petalia-react-design-system, Property 12: useCart state consistency
test('useCart state consistency — itemCount and total match items', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          id: fc.uuid(),
          price: fc.float({ min: 1, max: 500, noNaN: true }),
        }),
        { minLength: 1, maxLength: 6 }
      ),
      (products) => {
        const { result } = renderHook(() => useCart())

        act(() => {
          products.forEach((p) => result.current.addItem(makeProduct(p.id, p.price)))
        })

        const expectedCount = result.current.items.reduce((s, i) => s + i.quantity, 0)
        const expectedTotal = result.current.items.reduce((s, i) => s + i.price * i.quantity, 0)

        expect(result.current.itemCount).toBe(expectedCount)
        expect(result.current.total).toBeCloseTo(expectedTotal, 5)
      }
    ),
    { numRuns: 100 }
  )
})

// Feature: petalia-react-design-system, Property 13: useCart localStorage round-trip
test('useCart localStorage round-trip — cart survives re-mount', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          id: fc.uuid(),
          price: fc.float({ min: 1, max: 200, noNaN: true }),
        }),
        { minLength: 1, maxLength: 4 }
      ),
      (products) => {
        localStorage.clear()

        const { result: r1 } = renderHook(() => useCart())
        act(() => {
          products.forEach((p) => r1.current.addItem(makeProduct(p.id, p.price)))
        })

        const savedItems = r1.current.items
        const savedTotal = r1.current.total

        // Re-mount simulates page refresh
        const { result: r2 } = renderHook(() => useCart())

        expect(r2.current.items.length).toBe(savedItems.length)
        expect(r2.current.total).toBeCloseTo(savedTotal, 5)
      }
    ),
    { numRuns: 100 }
  )
})

describe('useCart edge cases', () => {
  test('addItem increments quantity for duplicate product', () => {
    const { result } = renderHook(() => useCart())
    const product = makeProduct('p1', 50)

    act(() => {
      result.current.addItem(product)
      result.current.addItem(product)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  test('removeItem with unknown id is a no-op', () => {
    const { result } = renderHook(() => useCart())
    act(() => { result.current.addItem(makeProduct('p1', 50)) })
    const before = result.current.items.length

    act(() => { result.current.removeItem('nonexistent') })

    expect(result.current.items.length).toBe(before)
  })

  test('updateQuantity clamps to minimum 1', () => {
    const { result } = renderHook(() => useCart())
    act(() => { result.current.addItem(makeProduct('p1', 50)) })

    act(() => { result.current.updateQuantity('p1', 0) })

    expect(result.current.items[0].quantity).toBe(1)
  })

  test('falls back to empty cart when localStorage is corrupted', () => {
    localStorage.setItem('petalia_cart', 'not-valid-json{{{')
    const { result } = renderHook(() => useCart())
    expect(result.current.items).toEqual([])
  })
})
