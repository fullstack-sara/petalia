import { render } from '@testing-library/react'
import fc from 'fast-check'
import { test, expect } from 'vitest'
import { ColorSwatch } from './ColorSwatch'

// Feature: petalia-react-design-system, Property 17: ColorSwatch has aria-label equal to label prop
test('ColorSwatch interactive element has aria-label matching label prop', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 30 }),
      (label) => {
        const { container } = render(
          <ColorSwatch color="#7c5454" label={label} selected={false} onClick={() => {}} />
        )
        const btn = container.querySelector('button')
        expect(btn?.getAttribute('aria-label')).toBe(label)
      }
    ),
    { numRuns: 100 }
  )
})
