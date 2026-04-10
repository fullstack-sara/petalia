import type { Product } from '../../types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onAddToCart: (id: string) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          subtitle={product.subtitle}
          price={product.price}
          imageUrl={product.imageUrl}
          imageAlt={product.imageAlt}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
