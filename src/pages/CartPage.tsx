import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { CartItem } from '../components/shared/CartItem'
import { OrderSummaryPanel } from '../components/shared/OrderSummaryPanel'
import { Button } from '../components/ui/Button'
import { useCart } from '../hooks/useCart'

export function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const navigate = useNavigate()

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-headline text-4xl font-semibold text-on-background mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-on-background/60 font-body text-lg">Your cart is empty.</p>
            <Button variant="primary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  subtitle={item.subtitle}
                  price={item.price}
                  quantity={item.quantity}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  details={[{ label: 'Category', value: item.category }]}
                  onQuantityChange={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <div>
              <OrderSummaryPanel
                subtotal={total}
                shipping={total > 100 ? 0 : 12}
                total={total > 100 ? total : total + 12}
                ctaLabel="Proceed to Checkout"
                onCheckout={() => navigate('/checkout')}
              />
            </div>
          </div>
        )}
      </div>
    </PageShell>
  )
}
