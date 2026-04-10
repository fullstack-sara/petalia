import { render, cleanup, within } from '@testing-library/react'
import fc from 'fast-check'
import { afterEach, test, expect } from 'vitest'
import { Input } from './Input'

afterEach(cleanup)

// Property 3: Input error message display
test('Input displays error message when error prop is provided', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 60 }).filter((s) => s.trim().length > 0),
      (errorMsg) => {
        const { container } = render(
          <Input label="Field" value="" onChange={() => {}} error={errorMsg} />
        )
        expect(within(container).getByText(errorMsg.trim())).toBeTruthy()
        cleanup()
      }
    ),
    { numRuns: 100 }
  )
})

// Property 16: Input accessibility
test('Input label htmlFor matches input id', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 30 }),
      (label) => {
        const { container } = render(
          <Input label={label} value="" onChange={() => {}} />
        )
        const labelEl = container.querySelector('label')
        const inputEl = container.querySelector('input')
        expect(labelEl?.htmlFor).toBeTruthy()
        expect(labelEl?.htmlFor).toBe(inputEl?.id)
        cleanup()
      }
    ),
    { numRuns: 100 }
  )
})

test('Input with error has aria-describedby pointing to error element', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 60 }).filter((s) => s.trim().length > 0),
      (errorMsg) => {
        const { container } = render(
          <Input label="Field" value="" onChange={() => {}} error={errorMsg} />
        )
        const inputEl = container.querySelector('input')
        const describedById = inputEl?.getAttribute('aria-describedby')
        expect(describedById).toBeTruthy()
        const errorEl = container.querySelector(`#${describedById}`)
        expect(errorEl?.textContent?.trim()).toBe(errorMsg.trim())
        cleanup()
      }
    ),
    { numRuns: 100 }
  )
})
