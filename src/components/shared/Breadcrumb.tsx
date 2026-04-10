import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm font-label">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 && <Icon name="chevron_right" size={16} className="text-on-background/40" />}
            {item.href && index < items.length - 1 ? (
              <Link to={item.href} className="text-on-background/60 hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-on-background font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
