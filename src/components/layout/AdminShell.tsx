import { Navbar } from './Navbar'
import { AdminSidebar } from './AdminSidebar'

const ADMIN_NAV_ITEMS = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', icon: 'dashboard', href: '/admin', active: true },
    ],
  },
  {
    section: 'Catalog',
    items: [
      { label: 'Products', icon: 'local_florist', href: '/admin/products' },
      { label: 'Orders', icon: 'receipt_long', href: '/admin/orders' },
    ],
  },
  {
    section: 'Settings',
    items: [
      { label: 'Customization', icon: 'tune', href: '/admin/customization' },
    ],
  },
]

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar links={[]} />
      <div className="flex flex-1 pt-16">
        <AdminSidebar navItems={ADMIN_NAV_ITEMS} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
