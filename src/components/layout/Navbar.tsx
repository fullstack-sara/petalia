import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/Icon'
import type { NavLink } from '../../types'

interface NavbarProps {
  links: NavLink[]
}

export function Navbar({ links }: NavbarProps) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-headline text-xl italic text-primary">
          Petalia
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={cn(
                  'text-sm font-label font-medium transition-colors pb-0.5',
                  link.active
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-background hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            aria-label="Shopping cart"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          >
            <Icon name="shopping_bag" size={20} />
          </button>
          <button
            type="button"
            onClick={() => navigate('/account')}
            aria-label="User account"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          >
            <Icon name="person" size={20} />
          </button>
          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-outline-variant px-6 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'block text-sm font-label font-medium py-2 transition-colors',
                link.active ? 'text-primary' : 'text-on-background hover:text-primary'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
