import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import fc from 'fast-check'
import { test, expect } from 'vitest'
import { ProductCard } from './ProductCard'

const renderCard = (id: string, imageAlt: string) =>
  render(
    <MemoryRouter>
      <ProductCard
        id={id}
        name="Rose Bouquet"
        subtitle="Soft pinks"
        price={89}
        imageUrl="https://example.com/img.jpg"
        imageAlt={imageAlt}
        onAddToCart={() => {}}
      />
    </MemoryRouter>
  )

// Feature: petalia-react-design-system, Property 17: ProductCard image alt matches imageAlt prop
test('ProductCard image alt attribute matches imageAlt prop', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 60 }),
      (imageAlt) => {
        const { container } = renderCard('p1', imageAlt)
        const img = container.querySelector('img')
        expect(img?.getAttribute('alt')).toBe(imageAlt)
        expect(img?.getAttribute('alt')).not.toBe('')
      }
    ),
    { numRuns: 100 }
  )
})

// Feature: petalia-react-design-system, Property 11: ProductCard navigation on click
test('ProductCard name link points to /product/:id', () => {
  fc.assert(
    fc.property(
      fc.uuid(),
      (id) => {
        const { container } = renderCard(id, 'alt text')
        const links = container.querySelectorAll('a')
        const hrefs = Array.from(links).map((a) => a.getAttribute('href'))
        expect(hrefs.some((h) => h === `/product/${id}`)).toBe(true)
      }
    ),
    { numRuns: 100 }
  )
})
