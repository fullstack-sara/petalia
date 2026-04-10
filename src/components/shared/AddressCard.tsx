import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface AddressCardProps {
  label: string
  name: string
  address: string[]
  isPrimary: boolean
  onEdit: () => void
}

export function AddressCard({ label, name, address, isPrimary, onEdit }: AddressCardProps) {
  return (
    <div className="p-5 bg-surface-container-low rounded-xl border border-outline-variant space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-label font-semibold text-on-background">{label}</span>
        {isPrimary && <Badge label="Primary" variant="secondary" />}
      </div>
      <div className="text-sm font-body text-on-background/70 space-y-0.5">
        <p className="font-medium text-on-background">{name}</p>
        {address.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={onEdit}>
        Edit
      </Button>
    </div>
  )
}
