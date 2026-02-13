'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import Button from '@/components/Button'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS, CATEGORIES } from '@/lib/constants'
import { Product } from '@/lib/types'

interface FilterState {
  category: string
  priceRange: [number, number]
  rating: number | null
  inStock: boolean
  sortBy: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'
  searchQuery: string
}

interface PriceRange {
  min: number
  max: number
  label: string
}

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam || 'all',
    priceRange: [0, 5000],
    rating: null,
    inStock: false,
    sortBy: 'popular',
    searchQuery: ''
  })

  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showQuickView, setShowQuickView] = useState<boolean>(false)

  const priceRanges: PriceRange[] = [
    { min: 0, max: 1000, label: 'Under Rs. 1,000' },
    { min: 1000, max: 2000, label: 'Rs. 1,000 - Rs. 2,000' },
    { min: 2000, max: 3000, label: 'Rs. 2,000 - Rs. 3,000' },
    { min: 3000, max: 5000, label: 'Above Rs. 3,000' }
  ]

  const productsPerPage = viewMode === 'grid' ? 12 : 8

  // Extract unique price range from products
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = PRODUCTS.map(p => parseInt(p.price.replace(/[^0-9]/g, '')))
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    }
  }, [])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...PRODUCTS]

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    // Filter by price range
    filtered = filtered.filter(p => {
      const price = parseInt(p.price.replace(/[^0-9]/g, ''))
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Filter by rating
    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= filters.rating!)
    }

    // Filter by stock
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock)
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''))
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''))
          return priceA - priceB
        })
        break
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''))
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''))
          return priceB - priceA
        })
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default: // 'popular' - sort by reviews
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    return filtered
  }, [filters])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  // Update category from URL param
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }))
    }
  }, [categoryParam])

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Handle price range preset
  const handlePriceRangePreset = (min: number, max: number) => {
    setFilters(prev => ({ ...prev, priceRange: [min, max] }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, maxPrice],
      rating: null,
      inStock: false,
      sortBy: 'popular',
      searchQuery: ''
    })
  }

  // Handle quick view
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product)
    setShowQuickView(true)
  }

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product.id, product.name)
    alert(`${product.name} added to cart!`)
    // Implement cart functionality here
  }

  // Handle view details
  const handleViewDetails = (product: Product) => {
    console.log('View details:', product.id)
    router.push(`/products/${product.id}`)
  }

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.category !== 'all') count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) count++
    if (filters.rating) count++
    if (filters.inStock) count++
    if (filters.searchQuery) count++
    return count
  }, [filters, maxPrice])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-[25vh] md:h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 animate-gradient"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 text-3d animate-float">
            Our Products
          </h1>
          <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Premium quality poultry medicines & supplements for a healthy flock
          </p>
        </div>
      </section>

      {/* Search Bar - Mobile */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b-2 border-gray-200 py-3 px-4 md:hidden">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-300 text-sm"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="relative px-4 py-2 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl"
          >
            <span className="text-xl">⚙️</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-xs text-white rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-64 lg:w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-500 hover:text-red-500 transition-colors duration-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-300 text-sm"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categories
                </label>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleFilterChange('category', cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-300 ${
                        filters.category === cat.id
                          ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                      {cat.id !== 'all' && (
                        <span className="float-right text-xs opacity-75">
                          ({PRODUCTS.filter(p => p.category === cat.id).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => handlePriceRangePreset(range.min, range.max)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-300 ${
                        filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                          ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                {/* Custom Range Slider */}
                <div className="mt-4 px-2">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full accent-orange-600"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Rs. {filters.priceRange[0]}</span>
                    <span>Rs. {filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('rating', filters.rating === rating ? null : rating)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-300 ${
                        filters.rating === rating
                          ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                        <span className="ml-2">& Up</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock Only */}
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Mobile Filters Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Mobile Filters Content */}
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={filters.searchQuery}
                      onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Categories</label>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          handleFilterChange('category', cat.id)
                          setShowMobileFilters(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl mb-1 ${
                          filters.category === cat.id ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Apply Button */}
                  <Button
                    size="lg"
                    variant="primary"
                    fullWidth
                    onClick={() => setShowMobileFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-bold text-orange-600">{paginatedProducts.length}</span> of{' '}
                    <span className="font-bold">{filteredProducts.length}</span> products
                  </p>
                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 border-2 border-gray-200 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded transition-all duration-300 ${
                        viewMode === 'grid' ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <span className="text-lg">📱</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded transition-all duration-300 ${
                        viewMode === 'list' ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <span className="text-lg">📋</span>
                    </button>
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value as 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating')}
                    className="px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <div className="text-6xl mb-4">😕</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
                <Button variant="primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
                : 'space-y-4'
              }>
                {paginatedProducts.map((product) => {
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

                  return viewMode === 'grid' ? (
                    <ProductCard
                      key={product.id}
                      {...productProps}
                      onAddToCart={() => handleAddToCart(product)}
                      onViewDetails={() => handleViewDetails(product)}
                    />
                  ) : (
                    <div key={product.id} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-orange-600">{product.price}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">★</span>
                              <span className="text-sm">{product.rating}</span>
                              <span className="text-xs text-gray-400">({product.reviews})</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="primary" onClick={() => handleAddToCart(product)}>
                            Add to Cart
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(product)}>
                            Quick View
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-600 transition-colors duration-300"
                  >
                    ←
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl transition-all duration-300 ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white'
                              : 'bg-white border-2 border-gray-200 hover:border-orange-600'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    } else if (
                      page === currentPage - 3 ||
                      page === currentPage + 3
                    ) {
                      return <span key={page} className="text-gray-400">...</span>
                    }
                    return null
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-600 transition-colors duration-300"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowQuickView(false)} />
          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              ✕
            </button>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{selectedProduct.rating}</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">{selectedProduct.reviews} reviews</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                  
                  <div className="text-3xl font-bold text-orange-600 mb-4">
                    {selectedProduct.price}
                    {selectedProduct.originalPrice && (
                      <span className="text-base text-gray-400 line-through ml-2">
                        {selectedProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      selectedProduct.inStock 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="lg" variant="primary" fullWidth onClick={() => handleAddToCart(selectedProduct)}>
                      Add to Cart
                    </Button>
                    <Button size="lg" variant="outline">
                      ❤️
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}