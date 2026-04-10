import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/Icon'

interface SidebarItem {
  label: string
  icon: string
  href: string
  active?: boolean
}

interface SidebarSection {
  section: string
  items: SidebarItem[]
}

interface AdminSidebarProps {
  navItems: SidebarSection[]
}

export function AdminSidebar({ navItems }: AdminSidebarProps) {
  return (
    <aside className="w-72 min-h-screen bg-surface-container-low border-r border-outline-variant sticky top-16 self-start">
      <div className="p-4 space-y-6">
        {navItems.map((section) => (
          <div key={section.section}>
            <p className="px-3 mb-2 text-xs font-label font-semibold text-on-background/50 uppercase tracking-wider">
              {section.section}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-label font-medium transition-colors',
                      item.active
                        ? 'bg-primary-container text-primary'
                        : 'text-on-background hover:bg-surface-container'
                    )}
                  >
                    <Icon name={item.icon} size={20} filled={item.active} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
