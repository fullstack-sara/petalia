import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-surface-container-low overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container/40 via-background to-secondary-container/20" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-sm font-label font-semibold text-secondary tracking-widest uppercase">
            Ethereal Conservatory
          </p>
          <h1 className="font-headline text-5xl lg:text-6xl font-semibold text-on-background leading-tight">
            Flowers that tell <em className="text-primary not-italic">your story</em>
          </h1>
          <p className="text-lg font-body text-on-background/70 max-w-md">
            Handcrafted botanical arrangements, thoughtfully composed for every moment that matters.
          </p>
          <div className="flex gap-4">
            <Link to="/shop">
              <Button variant="primary" size="lg">Shop Now</Button>
            </Link>
            <Link to="/shop">
              <Button variant="ghost" size="lg">Explore Collection</Button>
            </Link>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="aspect-square rounded-full bg-primary-container/30 absolute -top-12 -right-12 w-96 h-96" />
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-ambient aspect-[4/5]">
            <img
              src="/images/woman.jpg"
              alt="Woman with flowers"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
