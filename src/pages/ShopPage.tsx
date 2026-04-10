import { useState } from 'react'
import { PageShell } from '../components/layout/PageShell'
import { ProductGrid } from '../components/shared/ProductGrid'
import { FilterSidebar } from '../components/shared/FilterSidebar'
import { useCart } from '../hooks/useCart'
import { useFilters } from '../hooks/useFilters'
import { PRODUCTS } from '../data/products'
import { Icon } from '../components/ui/Icon'

const OCCASIONS = ['Birthday', 'Anniversary', 'Wedding', 'Sympathy', 'Just Because'].map((label) => ({
  label,
  checked: false,
}))

const FLOWER_TYPES = ['Roses', 'Peonies', 'Tulips', 'Lavender', 'Wildflowers']

export function ShopPage() {
  const { addItem } = useCart()
  const filters = useFilters()
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = PRODUCTS.filter((p) => {
    const inPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    return inPrice
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return 0
  })

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-headline text-4xl font-semibold text-on-background">Shop All</h1>
            <p className="mt-1 text-on-background/60 font-body">
              {sorted.length} arrangement{sorted.length !== 1 ? 's' : ''}
            </p>
          </div>
          {/* Filter toggle — mobile only */}
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="md:hidden flex items-center gap-1.5 text-sm font-label font-medium text-on-background border border-outline-variant rounded-lg px-3 py-2"
          >
            <Icon name="tune" size={16} />
            Filters
          </button>
        </div>

        {/* Mobile filter panel */}
        {showFilters && (
          <div className="md:hidden mb-6 p-4 bg-surface-container-low rounded-xl">
            <FilterSidebar
              occasions={OCCASIONS}
              flowerTypes={FLOWER_TYPES}
              selectedFlowerTypes={filters.selectedFlowerTypes}
              priceRange={filters.priceRange}
              onOccasionChange={() => {}}
              onFlowerTypeChange={filters.toggleFlowerType}
              onPriceRangeChange={filters.setPriceRange}
            />
          </div>
        )}

        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <div className="hidden md:block w-56 flex-shrink-0">
            <FilterSidebar
              occasions={OCCASIONS}
              flowerTypes={FLOWER_TYPES}
              selectedFlowerTypes={filters.selectedFlowerTypes}
              priceRange={filters.priceRange}
              onOccasionChange={() => {}}
              onFlowerTypeChange={filters.toggleFlowerType}
              onPriceRangeChange={filters.setPriceRange}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-end mb-6">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm font-label border border-outline-variant rounded-lg px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
            <ProductGrid
              products={sorted}
              onAddToCart={(id) => {
                const product = PRODUCTS.find((p) => p.id === id)
                if (product) addItem(product)
              }}
            />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
