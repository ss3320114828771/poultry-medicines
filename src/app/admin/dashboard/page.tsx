'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/constants'
import { Product } from '@/lib/types'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  totalRevenue: number
  pendingOrders: number
  outOfStock: number
}

interface Order {
  id: string
  customer: string
  date: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: number
}

interface LowStockProduct {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  description: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  stock: number
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('overview')
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('week')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  const stats: DashboardStats = {
    totalProducts: 156,
    totalOrders: 1243,
    totalCustomers: 892,
    totalRevenue: 2458900,
    pendingOrders: 23,
    outOfStock: 12
  }

  const recentOrders: Order[] = [
    { id: 'ORD-001', customer: 'Muhammad Ali', date: '2024-01-15', amount: 4500, status: 'delivered', items: 3 },
    { id: 'ORD-002', customer: 'Ahmed Khan', date: '2024-01-15', amount: 2800, status: 'shipped', items: 2 },
    { id: 'ORD-003', customer: 'Sara Ahmed', date: '2024-01-14', amount: 6200, status: 'processing', items: 4 },
    { id: 'ORD-004', customer: 'Bilal Hassan', date: '2024-01-14', amount: 1900, status: 'pending', items: 1 },
    { id: 'ORD-005', customer: 'Farah Khan', date: '2024-01-13', amount: 8300, status: 'delivered', items: 5 },
  ]

  const lowStockProducts: LowStockProduct[] = PRODUCTS.filter(p => p.id <= 3).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.image,
    description: p.description,
    category: p.category,
    rating: p.rating,
    reviews: p.reviews,
    inStock: p.inStock || true,
    stock: Math.floor(Math.random() * 10) + 1
  }))

  const formatCurrency = (amount: number): string => {
    return `Rs. ${amount.toLocaleString('en-PK')}`
  }

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-600'
      case 'shipped': return 'bg-blue-100 text-blue-600'
      case 'processing': return 'bg-yellow-100 text-yellow-600'
      case 'pending': return 'bg-orange-100 text-orange-600'
      case 'cancelled': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  // Product Management Functions
  const handleEditProduct = (productId: number) => {
    console.log('Edit product:', productId)
    alert(`Editing product ID: ${productId}`)
  }

  const handleDeleteProduct = (productId: number) => {
    setShowDeleteConfirm(productId)
  }

  const confirmDelete = (productId: number) => {
    console.log('Delete product:', productId)
    alert(`Product ${productId} deleted successfully!`)
    setShowDeleteConfirm(null)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(null)
  }

  const handleAddNewProduct = () => {
    console.log('Add new product')
    alert('Navigate to add new product page')
  }

  const handleViewProduct = (productId: number) => {
    console.log('View product:', productId)
    router.push(`/products/${productId}`)
  }

  const handleQuickAddToCart = (product: Product) => {
    console.log('Quick add to cart from admin:', product.id)
    alert(`${product.name} added to test cart`)
  }

  // Order Management Functions
  const handleViewOrder = (orderId: string) => {
    console.log('View order:', orderId)
    alert(`Viewing order: ${orderId}`)
  }

  const handleUpdateOrder = (orderId: string) => {
    console.log('Update order:', orderId)
    alert(`Update order: ${orderId}`)
  }

  // Customer Management Functions
  const handleViewCustomer = (customerId: number) => {
    console.log('View customer:', customerId)
    alert(`Viewing customer details for Customer ${customerId}`)
  }

  // Restock Function
  const handleRestock = (productId: number) => {
    console.log('Restock product:', productId)
    alert(`Restock request sent for product ID: ${productId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Welcome back, Hafiz Sajid! Here's what's happening with your store.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as 'today' | 'week' | 'month' | 'year')}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-sm"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <Link href="/">
                <Button size="sm" variant="outline">
                  View Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'products', label: 'Products', icon: '📦' },
            { id: 'orders', label: 'Orders', icon: '🛒' },
            { id: 'customers', label: 'Customers', icon: '👥' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'products' | 'orders' | 'customers')}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Total Products */}
              <div className="group relative bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl md:text-3xl">📦</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      +12%
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{stats.totalProducts}</h3>
                  <p className="text-xs md:text-sm text-gray-600">Total Products</p>
                </div>
              </div>

              {/* Total Orders */}
              <div className="group relative bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl md:text-3xl">🛒</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      +8%
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{stats.totalOrders}</h3>
                  <p className="text-xs md:text-sm text-gray-600">Total Orders</p>
                </div>
              </div>

              {/* Total Customers */}
              <div className="group relative bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl md:text-3xl">👥</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      +15%
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{stats.totalCustomers}</h3>
                  <p className="text-xs md:text-sm text-gray-600">Total Customers</p>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="group relative bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl md:text-3xl">💰</span>
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      +23%
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</h3>
                  <p className="text-xs md:text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>

              {/* Pending Orders */}
              <div className="group relative bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl md:text-3xl">⏳</span>
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      urgent
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{stats.pendingOrders}</h3>
                  <p className="text-xs md:text-sm text-gray-600">Pending Orders</p>
                </div>
              </div>

              {/* Out of Stock */}
              <div className="group relative bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl md:text-3xl">⚠️</span>
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      alert
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{stats.outOfStock}</h3>
                  <p className="text-xs md:text-sm text-gray-600">Out of Stock</p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl p-4 md:p-6 shadow-lg">
                <h3 className="text-lg md:text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Sales Overview
                </h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[65, 45, 75, 55, 85, 70, 60].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg transition-all duration-500 group-hover:scale-105"
                        style={{ height: `${height}%` }}>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white text-xs text-center pt-1">
                          {height}%
                        </div>
                      </div>
                      <span className="text-xs text-gray-600">Day {i+1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                <h3 className="text-lg md:text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Top Products
                </h3>
                <div className="space-y-4">
                  {PRODUCTS.slice(0, 4).map((product, index) => (
                    <div key={product.id} className="flex items-center gap-3 group">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.price}</p>
                      </div>
                      <div className="text-sm font-bold text-purple-600">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders & Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Recent Orders
                  </h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{order.id}</p>
                        <p className="text-xs text-gray-600">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">{formatCurrency(order.amount)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Alert */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Low Stock Alert
                  </h3>
                  <span className="text-sm text-red-600 font-semibold">{stats.outOfStock} products</span>
                </div>
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-300">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-red-600">Stock: {product.stock}</p>
                        <button 
                          onClick={() => handleRestock(product.id)}
                          className="text-xs text-purple-600 hover:text-purple-800"
                        >
                          Restock
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Product Management
              </h2>
              <Button size="md" variant="primary" onClick={handleAddNewProduct}>
                <span className="flex items-center gap-2">
                  <span>+</span> Add New Product
                </span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {PRODUCTS.map((product) => {
                // Create product props without functions
                const productProps = {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.image,
                  description: product.description,
                  rating: product.rating,
                  reviews: product.reviews,
                  category: product.category,
                  inStock: product.inStock || true
                };

                return (
                  <div key={product.id} className="relative group">
                    <ProductCard 
                      {...productProps}
                      onAddToCart={() => handleQuickAddToCart(product)}
                      onViewDetails={() => handleViewProduct(product.id)}
                    />
                    
                    {/* Admin Action Buttons */}
                    <div className="absolute top-2 right-2 z-20 flex gap-2">
                      <button 
                        onClick={() => handleEditProduct(product.id)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                        title="Edit Product"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                        title="Delete Product"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Delete Confirmation Modal */}
                    {showDeleteConfirm === product.id && (
                      <div className="absolute inset-0 bg-black/90 rounded-2xl flex items-center justify-center z-30">
                        <div className="text-center p-4">
                          <p className="text-white text-sm mb-3">Delete this product?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => confirmDelete(product.id)}
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600"
                            >
                              Yes
                            </button>
                            <button
                              onClick={cancelDelete}
                              className="px-3 py-1 bg-gray-500 text-white text-xs rounded-full hover:bg-gray-600"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Order Management
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...recentOrders, ...recentOrders].map((order, index) => (
                    <tr key={`${order.id}-${index}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300">
                      <td className="py-3 px-4 font-semibold">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{order.items}</td>
                      <td className="py-3 px-4 font-bold">{formatCurrency(order.amount)}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleViewOrder(order.id)}
                          className="text-purple-600 hover:text-purple-800 mr-3 transition-colors duration-300"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleUpdateOrder(order.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Customer Management
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-4 border-2 border-gray-100 rounded-xl hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Customer {i}</h3>
                      <p className="text-sm text-gray-600">customer{i}@email.com</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Orders: {Math.floor(Math.random() * 20) + 1}</span>
                    <span className="text-gray-600">Spent: {formatCurrency(Math.floor(Math.random() * 50000) + 1000)}</span>
                  </div>
                  <button 
                    onClick={() => handleViewCustomer(i)}
                    className="mt-3 w-full py-2 text-sm text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}