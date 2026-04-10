import { QuantitySelector } from '../ui/QuantitySelector'
import { Icon } from '../ui/Icon'

interface CartItemDetail {
  label: string
  value: string
}

interface CartItemProps {
  id: string
  name: string
  subtitle: string
  price: number
  quantity: number
  imageUrl: string
  imageAlt: string
  details: CartItemDetail[]
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({
  id,
  name,
  subtitle,
  price,
  quantity,
  imageUrl,
  imageAlt,
  details,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 py-6 border-b border-outline-variant">
      <img
        src={imageUrl}
        alt={imageAlt}
        referrerPolicy="no-referrer-when-downgrade"
        className="w-24 h-28 object-cover rounded-lg bg-surface-container-low flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-label font-semibold text-on-background">{name}</h3>
            <p className="text-sm text-on-background/60 font-body mt-0.5">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(id)}
            aria-label={`Remove ${name} from cart`}
            className="text-on-background/40 hover:text-error transition-colors ml-2"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        {details.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {details.map((d) => (
              <span key={d.label} className="text-xs font-label text-on-background/50">
                {d.label}: <span className="text-on-background/70">{d.value}</span>
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector
            value={quantity}
            onIncrement={() => onQuantityChange(id, quantity + 1)}
            onDecrement={() => onQuantityChange(id, quantity - 1)}
          />
          <p className="font-label font-semibold text-primary">${(price * quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
