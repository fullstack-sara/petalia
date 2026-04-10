import { render } from '@testing-library/react'
import fc from 'fast-check'
import { test, expect } from 'vitest'
import { QuantitySelector } from './QuantitySelector'

// Feature: petalia-react-design-system, Property 4: QuantitySelector decrement disabled at minimum
test('QuantitySelector decrement button is disabled when value equals min', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 1, max: 10 }),
      (min) => {
        const { container } = render(
          <QuantitySelector
            value={min}
            onIncrement={() => {}}
            onDecrement={() => {}}
            min={min}
          />
        )
        const buttons = container.querySelectorAll('button')
        const decrementBtn = buttons[0]
        expect(decrementBtn).toHaveAttribute('disabled')
      }
    ),
    { numRuns: 100 }
  )
})

test('QuantitySelector decrement button is enabled when value > min', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 1, max: 9 }),
      (min) => {
        const { container } = render(
          <QuantitySelector
            value={min + 1}
            onIncrement={() => {}}
            onDecrement={() => {}}
            min={min}
          />
        )
        const buttons = container.querySelectorAll('button')
        const decrementBtn = buttons[0]
        expect(decrementBtn).not.toHaveAttribute('disabled')
      }
    ),
    { numRuns: 100 }
  )
})
