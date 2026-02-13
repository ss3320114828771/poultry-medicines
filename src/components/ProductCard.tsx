'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from './Button'

interface ProductCardProps {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  description: string
  rating?: number
  reviews?: number
  category?: string
  inStock?: boolean
  onAddToCart?: () => void
  onViewDetails?: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  originalPrice,
  image, 
  description,
  rating = 4.5,
  reviews = 0,
  category = '',
  inStock = true,
  onAddToCart,
  onViewDetails
}) => {
  const router = useRouter()

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart()
    } else {
      console.log('Added to cart:', { id, name, price })
      alert(`${name} added to cart!`)
    }
  }

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails()
    } else {
      router.push(`/products/${id}`)
    }
  }

  return (
    <div className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:rotate-1 card-3d">
      
      {/* Gradient Border Animation */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg"></div>
      
      {/* Card Content */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden h-full">
        
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-500/20 z-10"></div>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
            priority={id <= 4}
          />
          
          {/* Out of Stock Badge */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold transform -rotate-12">
                Out of Stock
              </span>
            </div>
          )}
          
          {/* Rating Badge */}
          <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold">
            <span className="text-yellow-500">★</span> {rating} ({reviews})
          </div>
          
          {/* Category Badge */}
          {category && (
            <div className="absolute top-3 left-20 z-20 bg-purple-600/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {category}
            </div>
          )}
          
          {/* Price Tag */}
          <div className="absolute top-3 right-3 z-20">
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-1.5 md:px-4 md:py-2 rounded-full transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-white/30 shimmer rounded-full"></div>
              <span className="relative text-white font-bold text-sm md:text-base">{price}</span>
            </div>
            {originalPrice && (
              <div className="text-right mt-1">
                <span className="text-xs text-gray-500 line-through">{originalPrice}</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="relative p-4 md:p-6">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent line-clamp-1">
            {name}
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <Button 
              size="sm" 
              variant="primary" 
              fullWidth
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              fullWidth
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard