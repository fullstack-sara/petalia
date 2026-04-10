import { PageShell } from '../components/layout/PageShell'
import { HeroSection } from '../components/sections/HeroSection'
import { ProductGrid } from '../components/shared/ProductGrid'
import { useCart } from '../hooks/useCart'
import { PRODUCTS, FEATURED_PRODUCTS } from '../data/products'

export function HomePage() {
  const { addItem } = useCart()

  return (
    <PageShell>
      <HeroSection />
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-semibold text-on-background">Featured Arrangements</h2>
          <p className="mt-2 text-on-background/60 font-body">Handpicked for the season</p>
        </div>
        <ProductGrid
          products={FEATURED_PRODUCTS}
          onAddToCart={(id) => {
            const product = PRODUCTS.find((p) => p.id === id)
            if (product) addItem(product)
          }}
        />
      </section>
    </PageShell>
  )
}
