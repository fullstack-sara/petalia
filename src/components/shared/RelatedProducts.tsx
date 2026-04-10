import type { Product } from '../../types'
import { ProductCard } from './ProductCard'

interface RelatedProductsProps {
  products: Product[]
  title: string
  onAddToCart: (id: string) => void
}

export function RelatedProducts({ products, title, onAddToCart }: RelatedProductsProps) {
  return (
    <section className="space-y-6">
      <h2 className="font-headline text-2xl font-semibold text-on-background">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
    </section>
  )
}
