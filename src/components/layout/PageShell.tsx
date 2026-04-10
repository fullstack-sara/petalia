import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
]

const FOOTER_LINKS = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms', href: '#' },
]

interface PageShellProps {
  children: React.ReactNode
}

export function PageShell({ children }: PageShellProps) {
  const { pathname } = useLocation()
  const links = NAV_LINKS.map((l) => ({ ...l, active: l.href === pathname }))

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar links={links} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer links={FOOTER_LINKS} />
    </div>
  )
}
