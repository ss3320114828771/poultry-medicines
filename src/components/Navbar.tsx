'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
    { name: 'Cart', path: '/cart' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'top-0' : 'top-4'
    }`}>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 animate-gradient blur-xl opacity-50"></div>
      
      {/* Main Navbar */}
      <div className={`relative mx-4 rounded-2xl transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-2xl' 
          : 'bg-white/80 backdrop-blur-md'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl transform rotate-45 group-hover:rotate-90 transition-all duration-500 shadow-xl float-animation">
                <div className="w-full h-full bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center -rotate-45 group-hover:-rotate-90 transition-all duration-500">
                  <span className="text-lg md:text-xl lg:text-2xl font-bold text-white">🐔</span>
                </div>
              </div>
              <span className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Hafiz Sajid
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`relative group px-3 lg:px-4 py-2 overflow-hidden rounded-xl transition-all duration-300 ${
                      isActive ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white' : ''
                    }`}
                  >
                    {!isActive && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      </>
                    )}
                    <span className={`relative ${
                      isActive ? 'text-white' : 'text-gray-700 group-hover:text-white'
                    } transition-colors duration-500 font-semibold text-sm lg:text-base`}>
                      {item.name}
                    </span>
                  </Link>
                )
              })}
              
              {/* Admin Button */}
              <Link
                href="/admin/login"
                className="relative px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-xl text-white font-bold overflow-hidden group pulse-border text-sm lg:text-base"
              >
                <div className="absolute inset-0 bg-white/30 shimmer"></div>
                <span className="relative">Admin</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 overflow-hidden"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-white/30 shimmer"></div>
              <div className="relative flex flex-col items-center justify-center space-y-1.5">
                <span className={`block w-5 h-0.5 bg-white transform transition-all duration-500 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-500 ${
                  isOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-white transform transition-all duration-500 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 space-y-2 border-t border-gray-200">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block relative group overflow-hidden rounded-xl ${
                    isActive ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500' : ''
                  }`}
                >
                  <div className={`relative px-4 py-3 ${
                    !isActive && 'bg-gradient-to-r from-gray-50 to-white'
                  }`}>
                    <span className={`text-base font-semibold ${
                      isActive 
                        ? 'text-white' 
                        : 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              )
            })}
            
            {/* Mobile Admin Button */}
            <Link
              href="/admin/login"
              className="block relative overflow-hidden rounded-xl pulse-border"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shimmer"></div>
              <div className="relative px-4 py-3 text-center">
                <span className="text-base font-bold text-white">Admin Dashboard</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar