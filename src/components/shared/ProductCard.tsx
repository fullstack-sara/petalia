import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'

interface ProductCardProps {
  id: string
  name: string
  subtitle: string
  price: number
  imageUrl: string
  imageAlt: string
  onAddToCart: (id: string) => void
  className?: string
}

export function ProductCard({
  id,
  name,
  subtitle,
  price,
  imageUrl,
  imageAlt,
  onAddToCart,
  className,
}: ProductCardProps) {
  return (
    <article className={cn('group relative', className)}>
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low aspect-[3/4]">
        <Link to={`/product/${id}`}>
          <img
            src={imageUrl}
            alt={imageAlt}
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAddToCart(id)}
            className="shadow-ambient"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-0.5">
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-label font-semibold text-on-background hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-on-background/60 font-body">{subtitle}</p>
        <p className="text-sm font-label font-semibold text-primary">${price.toFixed(2)}</p>
      </div>
    </article>
  )
}
