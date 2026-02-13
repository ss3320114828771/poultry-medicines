import { Category, NavItem, Product } from '../types'

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Contact', path: '/contact' },
  { name: 'Cart', path: '/cart' },
]

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Products', icon: '📦' },
  { id: 'vitamins', name: 'Vitamins', icon: '💊' },
  { id: 'antibiotics', name: 'Antibiotics', icon: '🔬' },
  { id: 'vaccines', name: 'Vaccines', icon: '💉' },
  { id: 'supplements', name: 'Supplements', icon: '⚡' }
]

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Poultry Shield Pro",
    price: "Rs. 1,499",
    originalPrice: "Rs. 1,799",
    image: "/n1.jpeg",
    description: "Advanced immune booster with prebiotics for healthy flock development",
    category: 'supplements',
    rating: 4.8,
    reviews: 128,
    inStock: true
  },
  {
    id: 2,
    name: "Vitamin Complex Gold",
    price: "Rs. 899",
    originalPrice: "Rs. 1,099",
    image: "/n2.jpeg",
    description: "Essential vitamins A, D3, E, B-complex for optimal growth",
    category: 'vitamins',
    rating: 4.6,
    reviews: 95,
    inStock: true
  },
  {
    id: 3,
    name: "Anti-Stress Formula",
    price: "Rs. 749",
    image: "/n3.jpeg",
    description: "Reduces stress during vaccination and transportation",
    category: 'supplements',
    rating: 4.7,
    reviews: 156,
    inStock: true
  },
  {
    id: 4,
    name: "Growth Accelerator",
    price: "Rs. 1,299",
    originalPrice: "Rs. 1,499",
    image: "/n4.jpeg",
    description: "Natural growth promoters for better weight gain",
    category: 'supplements',
    rating: 4.9,
    reviews: 203,
    inStock: true
  },
  {
    id: 5,
    name: "Antibiotic Plus",
    price: "Rs. 1,899",
    image: "/n5.jpeg",
    description: "Broad-spectrum antibiotic for bacterial infections",
    category: 'antibiotics',
    rating: 4.5,
    reviews: 67,
    inStock: true
  },
  {
    id: 6,
    name: "Newcastle Vaccine",
    price: "Rs. 599",
    image: "/n1.jpeg",
    description: "Protects against Newcastle disease",
    category: 'vaccines',
    rating: 4.8,
    reviews: 89,
    inStock: true
  }
]

export const COMPANY_INFO = {
  name: 'Hafiz Sajid Poultry Medicines',
  address: '123 Poultry Market, Lahore, Pakistan',
  phone: '+92 300 1234567',
  email: 'info@hafizsajid.com',
  hours: {
    monFri: '9:00 AM - 8:00 PM',
    sat: '10:00 AM - 6:00 PM',
    sun: 'Closed'
  }
}