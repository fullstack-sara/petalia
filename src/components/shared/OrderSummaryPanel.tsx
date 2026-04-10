import { Button } from '../ui/Button'

interface OrderExtra {
  label: string
  amount: number
}

interface OrderSummaryPanelProps {
  subtotal: number
  shipping: number
  extras?: OrderExtra[]
  total: number
  ctaLabel: string
  onCheckout: () => void
}

export function OrderSummaryPanel({
  subtotal,
  shipping,
  extras = [],
  total,
  ctaLabel,
  onCheckout,
}: OrderSummaryPanelProps) {
  return (
    <div className="bg-surface-container-low rounded-xl p-6 space-y-4 shadow-ambient">
      <h2 className="font-headline text-lg font-semibold text-on-background">Order Summary</h2>
      <div className="space-y-2 text-sm font-label">
        <div className="flex justify-between text-on-background/70">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-on-background/70">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        {extras.map((extra) => (
          <div key={extra.label} className="flex justify-between text-on-background/70">
            <span>{extra.label}</span>
            <span>${extra.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-outline-variant pt-4 flex justify-between font-label font-semibold text-on-background">
        <span>Total</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>
      <Button variant="primary" size="lg" onClick={onCheckout} className="w-full justify-center">
        {ctaLabel}
      </Button>
    </div>
  )
}
