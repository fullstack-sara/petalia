interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  links: FooterLink[]
}

export function Footer({ links }: FooterProps) {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-headline text-lg italic text-primary">Petalia</span>
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-label text-on-background/70 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-xs font-label text-on-background/50">
          © {new Date().getFullYear()} Petalia. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
