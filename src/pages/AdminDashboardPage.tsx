import { AdminShell } from '../components/layout/AdminShell'
import { StatCard } from '../components/ui/StatCard'
import { Badge } from '../components/ui/Badge'
import { PRODUCTS } from '../data/products'

const STATS = [
  { title: 'Total Revenue', value: '$12,480', subtitle: '+8% this month', variant: 'primary' as const },
  { title: 'Orders', value: '148', subtitle: '12 pending' },
  { title: 'Products', value: '24', subtitle: '3 low stock' },
  { title: 'Customers', value: '892', subtitle: '+23 this week' },
]

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: 'Sarah M.', product: 'Rose Blush Bouquet', total: 89, status: 'Delivered' as const },
  { id: 'ORD-002', customer: 'James K.', product: 'Peony Cloud', total: 120, status: 'In Transit' as const },
  { id: 'ORD-003', customer: 'Lena R.', product: 'Wildflower Meadow', total: 65, status: 'Pending' as const },
]

const statusVariant = {
  Delivered: 'secondary' as const,
  'In Transit': 'primary' as const,
  Pending: 'outline' as const,
}

export function AdminDashboardPage() {
  return (
    <AdminShell>
      <div className="space-y-10">
        <div>
          <h1 className="font-headline text-3xl font-semibold text-on-background">Dashboard</h1>
          <p className="mt-1 text-on-background/60 font-body">Welcome back</p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <section className="bg-surface-container-low rounded-xl p-6 shadow-ambient">
            <h2 className="font-label font-semibold text-on-background mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
            <table className="w-full text-sm font-label min-w-[400px]">
              <thead>
                <tr className="text-on-background/50 border-b border-outline-variant">
                  <th className="text-left pb-2">Order</th>
                  <th className="text-left pb-2">Customer</th>
                  <th className="text-left pb-2">Total</th>
                  <th className="text-left pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 text-on-background/70">{order.id}</td>
                    <td className="py-3 text-on-background">{order.customer}</td>
                    <td className="py-3 text-primary font-semibold">${order.total}</td>
                    <td className="py-3">
                      <Badge label={order.status} variant={statusVariant[order.status]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </section>

          <section className="bg-surface-container-low rounded-xl p-6 shadow-ambient">
            <h2 className="font-label font-semibold text-on-background mb-4">Products</h2>
            <div className="space-y-3">
              {PRODUCTS.slice(0, 4).map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <img src={product.imageUrl} alt={product.imageAlt} referrerPolicy="no-referrer-when-downgrade" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-label font-medium text-on-background truncate">{product.name}</p>
                    <p className="text-xs text-on-background/50">{product.category}</p>
                  </div>
                  <span className="text-sm font-label font-semibold text-primary">${product.price}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  )
}
