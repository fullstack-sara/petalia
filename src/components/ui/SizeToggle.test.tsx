import { render, cleanup, within } from '@testing-library/react'
import fc from 'fast-check'
import { afterEach, test, expect } from 'vitest'
import { SizeToggle } from './SizeToggle'

afterEach(cleanup)

// Property 5: SizeToggle renders all options
test('SizeToggle renders every option string as visible text', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.string({ minLength: 1, maxLength: 15 }).filter((s) => s.trim().length > 0),
        { minLength: 1, maxLength: 6 }
      ),
      (options) => {
        const { container } = render(
          <SizeToggle options={options} selected={options[0]} onChange={() => {}} />
        )
        options.forEach((opt) => expect(within(container).getAllByText(opt.trim()).length).toBeGreaterThan(0))
        cleanup()
      }
    ),
    { numRuns: 100 }
  )
})
