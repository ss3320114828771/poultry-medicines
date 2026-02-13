'use client'  // 👈 YEH LINE SAB SE IMPORTANT HAI - ISAY TOP PAR LAGAYEIN

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'  // 👈 '@' ko ' @' se replace kiya
import ProductCard from '@/components/ProductCard'  // 👈 '@' ko ' @' se replace kiya
import { PRODUCTS } from '@/lib/constants'  // 👈 '@' ko ' @' se replace kiya
import { Product } from '@/lib/types'

export default function HomePage() {
  const router = useRouter()
  const featuredProducts = PRODUCTS.slice(0, 4)

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product.id, product.name)
    alert(`${product.name} added to cart!`)
  }

  // Handle view details
  const handleViewDetails = (product: Product) => {
    console.log('View details:', product.id)
    router.push(`/products/${product.id}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 animate-gradient"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-pink-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <div className="space-y-4 md:space-y-8">
            
            {/* Animated Badge */}
            <div className="inline-block animate-bounce-slow">
              <div className="relative px-4 py-2 md:px-8 md:py-3 bg-white/10 backdrop-blur-md rounded-full border-2 border-white/20">
                <span className="text-sm md:text-base text-white font-semibold">
                  🐔 Premium Quality Poultry Medicines 🐔
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white text-3d leading-tight">
              Hafiz Sajid
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 md:mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Poultry Medicines
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-white/90 px-4 leading-relaxed">
              Your trusted partner in poultry healthcare. Providing premium quality medicines 
              and supplements for a healthy and productive flock.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" fullWidth>
                  <span className="flex items-center justify-center gap-2">
                    Explore Products
                    <span className="text-xl">→</span>
                  </span>
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" fullWidth>
                  <span className="flex items-center justify-center gap-2">
                    Contact Us
                    <span className="text-xl">📞</span>
                  </span>
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-20">
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '50+', label: 'Products' },
                { number: '10k+', label: 'Happy Farmers' },
                { number: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-500">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 md:w-10 md:h-16 border-2 border-white rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-purple-100 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-24 md:h-32 bg-gradient-to-t from-pink-100 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Discover our most popular poultry medicines and supplements
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {featuredProducts.map((product) => {
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
                <ProductCard 
                  key={product.id} 
                  {...productProps}
                  onAddToCart={() => handleAddToCart(product)}
                  onViewDetails={() => handleViewDetails(product)}
                />
              );
            })}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <Link href="/products">
              <Button size="lg" variant="primary">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
              Why Choose Us?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/90">
              We provide the best quality products and services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[
              {
                icon: '⭐',
                title: 'Premium Quality',
                description: 'All our products are tested and certified for quality'
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                description: 'Quick and reliable delivery to your doorstep'
              },
              {
                icon: '💊',
                title: 'Expert Advice',
                description: 'Get professional advice from our veterinary experts'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 text-center hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="relative">
                  <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-white/80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              What Our Farmers Say
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600">
              Trusted by thousands of poultry farmers across Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[
              {
                name: 'Muhammad Ali',
                location: 'Lahore',
                comment: 'Best quality medicines for my poultry farm. My flock has never been healthier!',
                rating: 5,
                image: '/n1.jpeg'
              },
              {
                name: 'Ahmed Khan',
                location: 'Faisalabad',
                comment: 'Excellent customer service and fast delivery. Highly recommended!',
                rating: 5,
                image: '/n2.jpeg'
              },
              {
                name: 'Sara Ahmed',
                location: 'Multan',
                comment: 'Their vitamin supplements have dramatically improved egg production.',
                rating: 5,
                image: '/n3.jpeg'
              }
            ].map((testimonial, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm md:text-base text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-700 mb-4">"{testimonial.comment}"</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg md:text-xl">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8">
            Get updates about new products and special offers
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 md:px-6 md:py-4 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors duration-300"
            />
            <Button type="submit" variant="primary" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}