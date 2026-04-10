export type ProductStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  imageUrl: string
  imageAlt: string
  category: string
  sku?: string
  status: ProductStatus
  featured?: boolean
}

export interface CartItem extends Product {
  quantity: number
  customization?: Record<string, unknown>
}

export interface NavLink {
  label: string
  href: string
  active?: boolean
}

export type OrderStatus = 'Delivered' | 'In Transit' | 'Pending'

export interface Order {
  id: string
  productName: string
  imageUrl: string
  date: string
  price: number
  status: OrderStatus
}

export interface Address {
  id: string
  label: string
  name: string
  lines: string[]
  isPrimary: boolean
}
