export interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  description: string
  category: string
  rating: number
  reviews: number
  inStock?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface NavItem {
  name: string
  path: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: Date
}