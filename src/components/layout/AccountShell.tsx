import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { AccountSidebar } from './AccountSidebar'

const FOOTER_LINKS = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
]

interface AccountShellProps {
  children: React.ReactNode
}

export function AccountShell({ children }: AccountShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar links={[]} />
      <div className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-8">
            <div className="md:col-span-2">
              <AccountSidebar />
            </div>
            <main className="md:col-span-10">{children}</main>
          </div>
        </div>
      </div>
      <Footer links={FOOTER_LINKS} />
    </div>
  )
}
