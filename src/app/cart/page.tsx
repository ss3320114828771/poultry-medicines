'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  description: string
  category: string
  inStock: boolean
  maxQuantity: number
}

interface CartSummary {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  itemCount: number
}

interface CouponCode {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Poultry Shield Pro",
      price: 1499,
      originalPrice: 1799,
      quantity: 2,
      image: "/n1.jpeg",
      description: "Advanced immune booster with prebiotics",
      category: "supplements",
      inStock: true,
      maxQuantity: 10
    },
    {
      id: 2,
      name: "Vitamin Complex Gold",
      price: 899,
      originalPrice: 1099,
      quantity: 1,
      image: "/n2.jpeg",
      description: "Essential vitamins A, D3, E, B-complex",
      category: "vitamins",
      inStock: true,
      maxQuantity: 15
    },
    {
      id: 3,
      name: "Anti-Stress Formula",
      price: 749,
      quantity: 3,
      image: "/n3.jpeg",
      description: "Reduces stress during vaccination",
      category: "supplements",
      inStock: true,
      maxQuantity: 8
    }
  ])

  const [couponCode, setCouponCode] = useState<string>('')
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null)
  const [couponError, setCouponError] = useState<string>('')
  const [couponSuccess, setCouponSuccess] = useState<string>('')
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard')
  const [notes, setNotes] = useState<string>('')

  // Available coupons for demo
  const availableCoupons: CouponCode[] = [
    { code: 'SAVE10', discount: 10, type: 'percentage' },
    { code: 'SAVE200', discount: 200, type: 'fixed' },
    { code: 'WELCOME15', discount: 15, type: 'percentage' }
  ]

  // Calculate cart summary
  const calculateSummary = (): CartSummary => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    
    // Calculate shipping
    const shipping = shippingMethod === 'express' ? 300 : 150
    
    // Calculate tax (17%)
    const tax = subtotal * 0.17
    
    // Calculate discount
    let discount = 0
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discount = (subtotal * appliedCoupon.discount) / 100
      } else {
        discount = appliedCoupon.discount
      }
    }
    
    const total = subtotal + shipping + tax - discount

    return {
      subtotal,
      shipping,
      tax,
      discount,
      total,
      itemCount
    }
  }

  const summary = calculateSummary()

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setIsUpdating(true)
    setCartItems(items =>
      items.map(item =>
        item.id === id 
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    )
    setTimeout(() => setIsUpdating(false), 500)
  }

  // Remove item from cart
  const removeItem = (id: number) => {
    setIsUpdating(true)
    setCartItems(items => items.filter(item => item.id !== id))
    setTimeout(() => setIsUpdating(false), 500)
  }

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setIsUpdating(true)
      setCartItems([])
      setAppliedCoupon(null)
      setCouponCode('')
      setTimeout(() => setIsUpdating(false), 500)
    }
  }

  // Apply coupon
  const applyCoupon = () => {
    setCouponError('')
    setCouponSuccess('')

    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }

    const coupon = availableCoupons.find(
      c => c.code.toLowerCase() === couponCode.toLowerCase().trim()
    )

    if (coupon) {
      setAppliedCoupon(coupon)
      setCouponSuccess(`Coupon ${coupon.code} applied successfully!`)
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponSuccess('Coupon removed')
    setTimeout(() => setCouponSuccess(''), 3000)
  }

  // Format price
  const formatPrice = (price: number): string => {
    return `Rs. ${price.toLocaleString('en-PK')}`
  }

  // Calculate discount percentage
  const getDiscountPercentage = (original: number, current: number): number => {
    return Math.round(((original - current) / original) * 100)
  }

  // Proceed to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      return
    }
    router.push('/checkout')
  }

  // Continue shopping
  const continueShopping = () => {
    router.push('/products')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 pt-24 md:pt-28">
        {/* Empty Cart Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            {/* Animated Empty Cart Icon */}
            <div className="relative inline-block mb-6 md:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative text-8xl md:text-9xl animate-bounce-slow">
                🛒
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Your Cart is Empty
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
              Looks like you haven't added any products yet. Explore our premium poultry medicines and supplements!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="primary">
                  <span className="flex items-center gap-2">
                    <span>🛍️</span>
                    Browse Products
                  </span>
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  <span className="flex items-center gap-2">
                    <span>🏠</span>
                    Back to Home
                  </span>
                </Button>
              </Link>
            </div>

            {/* Featured Categories */}
            <div className="mt-12 md:mt-16">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                Popular Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { name: 'Vitamins', icon: '💊', color: 'from-green-400 to-green-600' },
                  { name: 'Supplements', icon: '⚡', color: 'from-yellow-400 to-orange-600' },
                  { name: 'Vaccines', icon: '💉', color: 'from-blue-400 to-blue-600' },
                  { name: 'Antibiotics', icon: '🔬', color: 'from-purple-400 to-purple-600' }
                ].map((cat, index) => (
                  <Link 
                    key={index}
                    href={`/products?category=${cat.name.toLowerCase()}`}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500`}></div>
                    <div className="relative bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                      <div className="text-3xl md:text-4xl mb-2">{cat.icon}</div>
                      <h3 className="text-sm md:text-base font-semibold text-gray-800">{cat.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 py-8 md:py-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                Shopping Cart
              </h1>
              <p className="text-sm md:text-base text-white/90">
                {summary.itemCount} {summary.itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" size="md">
                <span className="flex items-center gap-2">
                  <span>←</span>
                  Continue Shopping
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const discount = item.originalPrice 
                ? getDiscountPercentage(item.originalPrice, item.price)
                : 0

              return (
                <div key={item.id} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
                  
                  <div className="relative bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 150px"
                          className="object-cover"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-semibold text-xs md:text-sm bg-red-500 px-2 py-1 rounded">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                              {item.name}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500 mb-1">{item.category}</p>
                            <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{item.description}</p>
                          </div>
                          
                          {/* Mobile Price */}
                          <div className="sm:hidden flex items-center justify-between">
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                              {item.originalPrice && (
                                <p className="text-xs text-gray-400 line-through">
                                  {formatPrice(item.originalPrice * item.quantity)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs md:text-sm text-gray-600">Qty:</span>
                            <div className="flex items-center border-2 border-gray-200 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || !item.inStock || isUpdating}
                                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-sm md:text-base"
                              >
                                -
                              </button>
                              <span className="w-10 md:w-12 text-center font-semibold text-sm md:text-base">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.maxQuantity || !item.inStock || isUpdating}
                                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-sm md:text-base"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs text-gray-400 ml-2">
                              Max: {item.maxQuantity}
                            </span>
                          </div>

                          {/* Desktop Price */}
                          <div className="hidden sm:block text-right">
                            <p className="text-xl font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                            {item.originalPrice && (
                              <div className="flex items-center gap-2 justify-end">
                                <p className="text-xs text-gray-400 line-through">
                                  {formatPrice(item.originalPrice * item.quantity)}
                                </p>
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                  {discount}% off
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={isUpdating}
                            className="text-xs md:text-sm text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors duration-300 disabled:opacity-50"
                          >
                            <span>🗑️</span>
                            Remove
                          </button>
                          <button
                            className="text-xs md:text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 transition-colors duration-300"
                          >
                            <span>❤️</span>
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stock Status */}
                    {item.quantity >= item.maxQuantity && (
                      <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                        <span>⚠️</span>
                        Max quantity reached
                      </p>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Cart Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4">
              <button
                onClick={clearCart}
                disabled={isUpdating || cartItems.length === 0}
                className="text-sm text-red-600 hover:text-red-800 flex items-center gap-2 transition-colors duration-300 disabled:opacity-50"
              >
                <span>🗑️</span>
                Clear Cart
              </button>
              
              <div className="text-sm text-gray-600">
                {isUpdating && (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-orange-600" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Updating cart...
                  </span>
                )}
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg mt-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                <span>📝</span>
                Order Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add special instructions for your order..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-300 text-sm"
                rows={3}
              />
            </div>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
                
                <div className="relative bg-white rounded-2xl p-4 md:p-6 shadow-lg">
                  <h2 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                    Order Summary
                  </h2>

                  {/* Summary Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({summary.itemCount} items)</span>
                      <span className="font-semibold">{formatPrice(summary.subtotal)}</span>
                    </div>
                    
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span className="flex items-center gap-1">
                          Discount ({appliedCoupon.code})
                          <button 
                            onClick={removeCoupon}
                            className="text-gray-400 hover:text-red-600 ml-2"
                          >
                            ✕
                          </button>
                        </span>
                        <span>-{formatPrice(summary.discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <div className="text-right">
                        <select
                          value={shippingMethod}
                          onChange={(e) => setShippingMethod(e.target.value as 'standard' | 'express')}
                          className="text-sm border-2 border-gray-200 rounded-lg px-2 py-1 focus:border-orange-500 focus:outline-none"
                        >
                          <option value="standard">Standard - Rs. 150</option>
                          <option value="express">Express - Rs. 300</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (17%)</span>
                      <span className="font-semibold">{formatPrice(summary.tax)}</span>
                    </div>

                    <div className="border-t-2 border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                          {formatPrice(summary.total)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Inclusive of all taxes
                      </p>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Apply Coupon</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          setCouponError('')
                          setCouponSuccess('')
                        }}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-300 text-sm uppercase"
                        maxLength={20}
                      />
                      <Button 
                        size="sm" 
                        variant="primary"
                        onClick={applyCoupon}
                      >
                        Apply
                      </Button>
                    </div>
                    
                    {/* Coupon Messages */}
                    {couponError && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <span>⚠️</span> {couponError}
                      </p>
                    )}
                    {couponSuccess && (
                      <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                        <span>✅</span> {couponSuccess}
                      </p>
                    )}

                    {/* Available Coupons */}
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Available coupons:</p>
                      <div className="flex flex-wrap gap-2">
                        {availableCoupons.map((coupon) => (
                          <button
                            key={coupon.code}
                            onClick={() => {
                              setCouponCode(coupon.code)
                              applyCoupon()
                            }}
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors duration-300"
                          >
                            {coupon.code}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      variant="primary" 
                      fullWidth
                      onClick={handleCheckout}
                      disabled={cartItems.length === 0 || isUpdating}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>🔒</span>
                        Proceed to Checkout
                      </span>
                    </Button>

                    <button
                      onClick={continueShopping}
                      className="w-full text-sm text-gray-600 hover:text-gray-800 py-2 transition-colors duration-300"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center mb-2">
                      We accept:
                    </p>
                    <div className="flex justify-center gap-3 text-xl">
                      <span className="opacity-60 hover:opacity-100 transition-opacity">💳</span>
                      <span className="opacity-60 hover:opacity-100 transition-opacity">🏦</span>
                      <span className="opacity-60 hover:opacity-100 transition-opacity">📱</span>
                      <span className="opacity-60 hover:opacity-100 transition-opacity">💵</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {cartItems.length > 0 && (
        <section className="bg-white py-12 md:py-16 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
              You May Also Like
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Link 
                  key={i}
                  href={`/products/${i}`}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-700"></div>
                  <div className="relative bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                    <div className="relative h-24 md:h-32 mb-3 rounded-lg overflow-hidden">
                      <Image
                        src={`/n${i}.jpeg`}
                        alt={`Product ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1">Product Name {i}</h3>
                    <p className="text-xs md:text-sm text-orange-600 font-bold">Rs. {999 + i * 100}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}