import { useState } from 'react'
import { AccountShell } from '../components/layout/AccountShell'
import { OrderCard } from '../components/shared/OrderCard'
import { AddressCard } from '../components/shared/AddressCard'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import type { Order, Address } from '../types'

const ORDERS: Order[] = [
  { id: 'ORD-001', productName: 'Rose Blush Bouquet', imageUrl: 'https://images.unsplash.com/photo-1487530811015-780f2f5e3f6e?w=200&q=80', date: 'March 28, 2026', price: 89, status: 'Delivered' },
  { id: 'ORD-002', productName: 'Peony Cloud', imageUrl: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=200&q=80', date: 'April 1, 2026', price: 120, status: 'In Transit' },
]

const ADDRESSES: Address[] = [
  { id: '1', label: 'Home', name: 'Sarah Mitchell', lines: ['42 Blossom Lane', 'London, W1A 1AA'], isPrimary: true },
  { id: '2', label: 'Work', name: 'Sarah Mitchell', lines: ['10 Garden Square', 'London, EC1A 1BB'], isPrimary: false },
]

export function UserAccountPage() {
  const [name, setName] = useState('Sarah Mitchell')
  const [email, setEmail] = useState('sarah@example.com')

  return (
    <AccountShell>
      <div className="space-y-10">
        <div>
          <h1 className="font-headline text-3xl font-semibold text-on-background">My Account</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center">
              <span className="font-headline text-2xl text-primary">S</span>
            </div>
            <div>
              <p className="font-label font-semibold text-on-background">{name}</p>
              <p className="text-sm text-on-background/60 font-body">{ORDERS.length} orders</p>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="font-label font-semibold text-on-background text-lg">Recent Orders</h2>
          <div className="space-y-3">
            {ORDERS.map((order) => (
              <OrderCard
                key={order.id}
                orderId={order.id}
                productName={order.productName}
                imageUrl={order.imageUrl}
                date={order.date}
                price={order.price}
                status={order.status}
                actionLabel={order.status === 'Delivered' ? 'Reorder' : 'Track'}
                onAction={() => {}}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-label font-semibold text-on-background text-lg">Profile Settings</h2>
          <div className="max-w-md space-y-4">
            <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button variant="primary">Save Changes</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-label font-semibold text-on-background text-lg">Saved Addresses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADDRESSES.map((addr) => (
              <AddressCard
                key={addr.id}
                label={addr.label}
                name={addr.name}
                address={addr.lines}
                isPrimary={addr.isPrimary}
                onEdit={() => {}}
              />
            ))}
          </div>
        </section>
      </div>
    </AccountShell>
  )
}
