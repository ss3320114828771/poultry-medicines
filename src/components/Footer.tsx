import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 animate-gradient"></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Company Info */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl transform rotate-45 float-animation">
                <div className="w-full h-full bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center -rotate-45">
                  <span className="text-xl md:text-2xl font-bold text-white">🐔</span>
                </div>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Hafiz Sajid</h3>
            </div>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
              Premium poultry medicines and healthcare products for your flock's optimal health and productivity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"></span>
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {['About', 'Products', 'Contact', 'Cart'].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase()}`} 
                    className="text-sm md:text-base text-gray-200 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"></span>
            </h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-200">
              <li className="flex items-center space-x-3">
                <span className="text-yellow-400">📍</span>
                <span>123 Poultry Market, Lahore</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-yellow-400">📞</span>
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-yellow-400">✉️</span>
                <span>info@hafizsajid.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 relative inline-block">
              Business Hours
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"></span>
            </h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-200">
              <li className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="text-yellow-400">9:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-yellow-400">10:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-yellow-400">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20">
          <p className="text-center text-sm md:text-base text-gray-200">
            © {currentYear} Hafiz Sajid Poultry Medicines. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer