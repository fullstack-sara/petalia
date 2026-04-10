import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/Icon'

interface AccountSidebarItem {
  label: string
  icon: string
  href: string
  active?: boolean
}

const ACCOUNT_NAV: AccountSidebarItem[] = [
  { label: 'My Orders', icon: 'receipt_long', href: '/account' },
  { label: 'Profile', icon: 'person', href: '/account/profile' },
  { label: 'Addresses', icon: 'location_on', href: '/account/addresses' },
]

export function AccountSidebar() {
  return (
    <aside className="bg-surface-container-low rounded-xl p-3 md:p-4">
      {/* Mobile: horizontal scroll row | Desktop: vertical stack */}
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
        {ACCOUNT_NAV.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-label font-medium transition-colors whitespace-nowrap flex-shrink-0 md:flex-shrink',
              item.active
                ? 'bg-primary-container text-primary'
                : 'text-on-background hover:bg-surface-container'
            )}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
