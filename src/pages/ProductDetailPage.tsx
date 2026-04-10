import { useParams } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'
import { Breadcrumb } from '../components/shared/Breadcrumb'
import { RelatedProducts } from '../components/shared/RelatedProducts'
import { Button } from '../components/ui/Button'
import { ColorSwatch } from '../components/ui/ColorSwatch'
import { SizeToggle } from '../components/ui/SizeToggle'
import { Select } from '../components/ui/Select'
import { Textarea } from '../components/ui/Textarea'
import { useCart } from '../hooks/useCart'
import { useProductCustomization } from '../hooks/useProductCustomization'
import { PRODUCTS } from '../data/products'

const PALETTES = [
  { color: '#d4a3a3', label: 'Blush' },
  { color: '#556756', label: 'Sage' },
  { color: '#7c5454', label: 'Rose' },
  { color: '#c4c7c4', label: 'Silver' },
]

const SIZES = ['Small', 'Medium', 'Large']

const PRESENTATION_OPTIONS = [
  { value: 'bouquet', label: 'Bouquet' },
  { value: 'vase', label: 'Vase Arrangement' },
  { value: 'box', label: 'Flower Box' },
]

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const customization = useProductCustomization()

  const product = PRODUCTS.find((p) => p.id === id)
  const related = PRODUCTS.filter((p) => p.id !== id).slice(0, 4)

  if (!product) {
    return (
      <PageShell>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="font-headline text-3xl text-on-background">Product not found</h1>
          <p className="mt-2 text-on-background/60 font-body">This arrangement may no longer be available.</p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-2xl overflow-hidden bg-surface-container-low aspect-square shadow-ambient">
            <img src={product.imageUrl} alt={product.imageAlt} referrerPolicy="no-referrer-when-downgrade" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-headline text-4xl font-semibold text-on-background">{product.name}</h1>
              <p className="mt-1 text-on-background/60 font-body">{product.subtitle}</p>
              <p className="mt-3 text-2xl font-label font-semibold text-primary">${product.price.toFixed(2)}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-label font-medium text-on-background">Color Palette</p>
              <div className="flex gap-3">
                {PALETTES.map((p) => (
                  <ColorSwatch
                    key={p.label}
                    color={p.color}
                    label={p.label}
                    selected={customization.selectedPalette === p.label}
                    onClick={() => customization.setSelectedPalette(p.label)}
                  />
                ))}
              </div>
            </div>

            <SizeToggle
              options={SIZES}
              selected={customization.selectedSize || SIZES[1]}
              onChange={customization.setSelectedSize}
            />

            <Select
              label="Presentation"
              options={PRESENTATION_OPTIONS}
              value={customization.selectedPresentation || 'bouquet'}
              onChange={(e) => customization.setSelectedPresentation(e.target.value)}
            />

            <Textarea
              label="Personal Note"
              placeholder="Add a message for the recipient..."
              value={customization.noteMessage}
              onChange={(e) => customization.setNoteMessage(e.target.value)}
              rows={3}
            />

            <Button
              variant="primary"
              size="lg"
              onClick={() => addItem(product)}
              className="w-full justify-center"
            >
              Add to Cart — ${product.price.toFixed(2)}
            </Button>
          </div>
        </div>

        <RelatedProducts products={related} title="You May Also Like" onAddToCart={(relId) => {
          const p = PRODUCTS.find((x) => x.id === relId)
          if (p) addItem(p)
        }} />
      </div>
    </PageShell>
  )
}
