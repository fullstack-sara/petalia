import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import type { OrderStatus } from '../../types'

interface OrderCardProps {
  orderId: string
  productName: string
  imageUrl: string
  date: string
  price: number
  status: OrderStatus
  onAction: () => void
  actionLabel: string
}

const statusVariant: Record<OrderStatus, 'primary' | 'secondary' | 'outline'> = {
  Delivered: 'secondary',
  'In Transit': 'primary',
  Pending: 'outline',
}

export function OrderCard({
  orderId,
  productName,
  imageUrl,
  date,
  price,
  status,
  onAction,
  actionLabel,
}: OrderCardProps) {
  return (
    <div className="flex gap-4 p-4 bg-surface-container-low rounded-xl shadow-ambient">
      <img
        src={imageUrl}
        alt={productName}
        referrerPolicy="no-referrer-when-downgrade"
        className="w-20 h-20 object-cover rounded-lg bg-surface-container flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-label font-semibold text-on-background">{productName}</p>
            <p className="text-xs font-label text-on-background/50 mt-0.5">Order #{orderId}</p>
          </div>
          <Badge label={status} variant={statusVariant[status]} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-label text-on-background/50">{date}</p>
            <p className="text-sm font-label font-semibold text-primary mt-0.5">${price.toFixed(2)}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
