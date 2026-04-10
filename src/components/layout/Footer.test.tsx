import { render, cleanup, within } from '@testing-library/react'
import fc from 'fast-check'
import { afterEach, test, expect } from 'vitest'
import { Footer } from './Footer'

afterEach(cleanup)

// Property 9: Footer renders all provided links
test('Footer renders every link label inside an a element', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          label: fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0),
          href: fc.webUrl(),
        }),
        { minLength: 1, maxLength: 6 }
      ),
      (links) => {
        const { container } = render(<Footer links={links} />)
        links.forEach((link) => {
          const el = within(container).getByText(link.label.trim())
          expect(el.closest('a')).not.toBeNull()
        })
        cleanup()
      }
    ),
    { numRuns: 100 }
  )
})
