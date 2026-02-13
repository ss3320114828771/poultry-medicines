'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  email?: string
  password?: string
}

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes - in real app, this would be an actual API call
      if (formData.email === 'admin@hafizsajid.com' && formData.password === 'admin123') {
        // Store auth token (in real app, this would come from backend)
        localStorage.setItem('adminAuth', 'true')
        router.push('/admin/dashboard')
      } else {
        setErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({
        email: 'An error occurred. Please try again.',
        password: 'An error occurred. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 animate-gradient opacity-20"></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-48 h-48 md:w-64 md:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-56 h-56 md:w-80 md:h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Login Form Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link 
            href="/" 
            className="absolute top-6 left-6 md:top-8 md:left-8 text-white/80 hover:text-white flex items-center gap-2 transition-colors duration-300 group"
          >
            <span className="text-xl transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span className="text-sm md:text-base">Back to Home</span>
          </Link>

          <div className="group relative">
            {/* Animated Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl md:rounded-3xl opacity-75 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
            
            {/* Main Login Card */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
              {/* Logo */}
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-block p-3 md:p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 mb-3 md:mb-4">
                  <span className="text-3xl md:text-4xl">🐔</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  Admin Login
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  Welcome back! Please login to your account.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl">
                      📧
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 md:py-3 border-2 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-sm md:text-base`}
                      placeholder="admin@example.com"
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl">
                      🔒
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-2 md:py-3 border-2 ${
                        errors.password ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-sm md:text-base`}
                      placeholder="••••••••"
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                      disabled={isLoading}
                    />
                    <span className="ml-2 text-xs md:text-sm text-gray-700">Remember me</span>
                  </label>
                  <Link 
                    href="/admin/forgot-password" 
                    className="text-xs md:text-sm text-purple-600 hover:text-purple-800 transition-colors duration-300"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    'Login to Dashboard'
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100">
                <p className="text-xs md:text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <span className="text-purple-600">🔐</span>
                  Demo Credentials (For Testing):
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-500">Email:</div>
                  <div className="text-purple-600 font-semibold">admin@hafizsajid.com</div>
                  <div className="text-gray-500">Password:</div>
                  <div className="text-purple-600 font-semibold">admin123</div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <span>🔒</span>
                  Protected area - Authorized personnel only
                </p>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-xs md:text-sm text-white/80">
              Need help? Contact{' '}
              <Link href="/contact" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
                Support
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} Hafiz Sajid Poultry Medicines. All rights reserved.
        </p>
      </div>
    </div>
  )
}