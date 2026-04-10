import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { OrderSummaryPanel } from '../components/shared/OrderSummaryPanel'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Button } from '../components/ui/Button'
import { useCart } from '../hooks/useCart'

interface FormState {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  deliveryDate: string
  deliveryTime: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  address?: string
  city?: string
  deliveryDate?: string
}

const TIME_OPTIONS = [
  { value: 'morning', label: 'Morning (9am – 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm – 5pm)' },
  { value: 'evening', label: 'Evening (5pm – 8pm)' },
]

export function CheckoutPage() {
  const { total } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', email: '', address: '', city: '', deliveryDate: '', deliveryTime: 'morning',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!form.firstName) newErrors.firstName = 'First name is required'
    if (!form.lastName) newErrors.lastName = 'Last name is required'
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.address) newErrors.address = 'Address is required'
    if (!form.city) newErrors.city = 'City is required'
    if (!form.deliveryDate) newErrors.deliveryDate = 'Delivery date is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) navigate('/')
  }

  const shipping = total > 100 ? 0 : 12
  const orderTotal = total + shipping

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="font-headline text-4xl font-semibold text-on-background mb-8">Checkout</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-4">
                <h2 className="font-label font-semibold text-on-background text-lg">Delivery Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
                  <Input label="Last Name" value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
                </div>
                <Input label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} />
                <Input label="Address" value={form.address} onChange={set('address')} error={errors.address} />
                <Input label="City" value={form.city} onChange={set('city')} error={errors.city} />
              </section>

              <section className="space-y-4">
                <h2 className="font-label font-semibold text-on-background text-lg">Scheduling</h2>
                <Input label="Delivery Date" type="date" value={form.deliveryDate} onChange={set('deliveryDate')} error={errors.deliveryDate} />
                <Select label="Delivery Time" options={TIME_OPTIONS} value={form.deliveryTime} onChange={set('deliveryTime')} />
              </section>

              <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
                Place Order
              </Button>
            </div>

            <div>
              <OrderSummaryPanel
                subtotal={total}
                shipping={shipping}
                total={orderTotal}
                ctaLabel="Place Order"
                onCheckout={() => {
                  if (validate()) navigate('/')
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </PageShell>
  )
}
