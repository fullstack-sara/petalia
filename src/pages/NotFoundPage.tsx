import { Link } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-6 py-32 text-center space-y-6">
        <p className="font-headline text-8xl text-primary/20 font-semibold">404</p>
        <h1 className="font-headline text-3xl font-semibold text-on-background">Page not found</h1>
        <p className="text-on-background/60 font-body">The page you're looking for doesn't exist.</p>
        <Link to="/">
          <Button variant="primary" size="lg">Back to Home</Button>
        </Link>
      </div>
    </PageShell>
  )
}
