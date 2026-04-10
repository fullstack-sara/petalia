import { render, cleanup, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import fc from 'fast-check'
import { afterEach, test, expect } from 'vitest'
import { Navbar } from './Navbar'

afterEach(cleanup)

const nonBlankLabel = fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0)

const renderNavbar = (links: Array<{ label: string; href: string; active?: boolean }>) =>
  render(
    <MemoryRouter>
      <Navbar links={links} />
    </MemoryRouter>
  )

// Property 7: Navbar renders all provided links as navigable elements
test('Navbar renders every link label inside an a element', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          label: nonBlankLabel,
          href: fc.constant('/shop'),
        }),
        { minLength: 1, maxLength: 5 }
      ),
      (links) => {
        const { container } = renderNavbar(links)
        links.forEach((link) => {
          const els = within(container).getAllByText(link.label.trim())
          expect(els.length).toBeGreaterThan(0)
          expect(els[0].closest('a')).not.toBeNull()
          expect(els[0].tagName).not.toBe('DIV')
          expect(els[0].tagName).not.toBe('SPAN')
        })
        cleanup()
      }
    ),
    { numRuns: 100 }
  )
})

// Property 8: Navbar active link styling
test('Navbar applies active classes to links with active true', () => {
  fc.assert(
    fc.property(
      nonBlankLabel,
      (label) => {
        const { container } = renderNavbar([{ label, href: '/shop', active: true }])
        const el = within(container).getByText(label.trim())
        expect(el.className).toContain('text-primary')
        expect(el.className).toContain('border-b-2')
        expect(el.className).toContain('border-primary')
        cleanup()
      }
    ),
    { numRuns: 100 }
  )
})
