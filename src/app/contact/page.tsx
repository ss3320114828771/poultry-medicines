'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import { COMPANY_INFO } from '@/lib/constants'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  preferredContact: 'email' | 'phone' | 'both'
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const [selectedDepartment, setSelectedDepartment] = useState<string>('general')
  const [showLiveChat, setShowLiveChat] = useState<boolean>(false)

  // FAQ Data
  const faqs: FAQItem[] = [
    {
      question: "What are your business hours?",
      answer: "We are open Monday to Friday from 9:00 AM to 8:00 PM, and Saturday from 10:00 AM to 6:00 PM. We remain closed on Sundays.",
      category: "general"
    },
    {
      question: "How can I place an order?",
      answer: "You can place orders through our website, by phone at +92 300 1234567, or by visiting our store in Lahore.",
      category: "orders"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash on delivery, bank transfer, Easypaisa, JazzCash, and credit/debit cards.",
      category: "payment"
    },
    {
      question: "Do you offer delivery services?",
      answer: "Yes, we offer free delivery within Lahore and nominal charges for other cities across Pakistan.",
      category: "delivery"
    },
    {
      question: "Are your products certified?",
      answer: "All our products are certified by the Pakistan Veterinary Medical Association and meet international quality standards.",
      category: "products"
    },
    {
      question: "How can I get a refund?",
      answer: "We offer a 7-day return policy for unopened products. Please contact our support team for assistance.",
      category: "returns"
    }
  ]

  // Department options
  const departments = [
    { id: 'general', name: 'General Inquiry', icon: '📧' },
    { id: 'sales', name: 'Sales', icon: '💰' },
    { id: 'support', name: 'Technical Support', icon: '🔧' },
    { id: 'products', name: 'Product Information', icon: '💊' },
    { id: 'orders', name: 'Order Status', icon: '📦' },
    { id: 'complaints', name: 'Complaints', icon: '⚠️' }
  ]

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Success
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you within 24 hours.'
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email'
      })
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 5000)
      
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or call us directly.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  // Get filtered FAQs by department
  const filteredFaqs = selectedDepartment === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedDepartment)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[45vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 animate-gradient"></div>
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative text-center text-white px-4 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-3d animate-float">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            We're here to help! Reach out to our expert team for any inquiries
          </p>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-6 md:mt-8 rounded-full"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 md:w-8 md:h-12 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 -mt-16 md:-mt-20 relative z-20">
            {/* Visit Us Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
              <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                <div className="text-4xl md:text-5xl mb-3 md:mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  📍
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Visit Us</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3">{COMPANY_INFO.address}</p>
                <Link 
                  href="https://maps.google.com" 
                  target="_blank"
                  className="text-xs md:text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  Get Directions <span>→</span>
                </Link>
              </div>
            </div>

            {/* Call Us Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
              <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                <div className="text-4xl md:text-5xl mb-3 md:mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  📞
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Call Us</h3>
                <p className="text-sm md:text-base text-gray-600 mb-1">{COMPANY_INFO.phone}</p>
                <p className="text-xs text-gray-500 mb-3">Mon-Sat, 9am-8pm</p>
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  Call Now <span>→</span>
                </a>
              </div>
            </div>

            {/* Email Us Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
              <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                <div className="text-4xl md:text-5xl mb-3 md:mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  ✉️
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Email Us</h3>
                <p className="text-sm md:text-base text-gray-600 mb-1">{COMPANY_INFO.email}</p>
                <p className="text-xs text-gray-500 mb-3">24/7 Support</p>
                <a 
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-xs md:text-sm text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  Send Email <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="group relative order-2 lg:order-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl md:rounded-3xl opacity-50 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
              
              <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Send Us a Message
                </h2>

                {/* Department Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                    Select Department
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {departments.map((dept) => (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => setSelectedDepartment(dept.id)}
                        className={`p-2 md:p-3 rounded-xl border-2 transition-all duration-300 text-xs md:text-sm ${
                          selectedDepartment === dept.id
                            ? 'border-purple-600 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-purple-300 text-gray-600'
                        }`}
                      >
                        <span className="block text-lg md:text-xl mb-1">{dept.icon}</span>
                        <span className="hidden sm:inline">{dept.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Success/Error Messages */}
                {submitStatus.type && (
                  <div className={`mb-6 p-4 rounded-xl ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-100 text-green-700 border-2 border-green-200'
                      : 'bg-red-100 text-red-700 border-2 border-red-200'
                  }`}>
                    <p className="text-sm flex items-center gap-2">
                      {submitStatus.type === 'success' ? '✅' : '⚠️'}
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 md:py-3 border-2 ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-sm md:text-base`}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 md:py-3 border-2 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-sm md:text-base`}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 md:py-3 border-2 ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-sm md:text-base`}
                      placeholder="+92 300 1234567"
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 md:py-3 border-2 ${
                        errors.subject ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-sm md:text-base`}
                      placeholder="How can we help you?"
                      disabled={isSubmitting}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-1 md:mb-2 text-sm md:text-base">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2 md:py-3 border-2 ${
                        errors.message ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-sm md:text-base resize-none`}
                      placeholder="Write your message here..."
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span>⚠️</span> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                      Preferred Contact Method
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { value: 'email', label: 'Email', icon: '✉️' },
                        { value: 'phone', label: 'Phone', icon: '📞' },
                        { value: 'both', label: 'Both', icon: '🤝' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value={option.value}
                            checked={formData.preferredContact === option.value}
                            onChange={handleChange}
                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                            disabled={isSubmitting}
                          />
                          <span className="text-sm text-gray-700">
                            {option.icon} {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>

                {/* Response Time Note */}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  ⏱️ We typically respond within 24 hours on weekdays
                </p>
              </div>
            </div>

            {/* Right Column - Map & Info */}
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              {/* Map */}
              <div className="group relative h-[250px] md:h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl opacity-50 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-xl">
                  {/* Replace with actual map integration */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217759.9938435919!2d74.19444343137252!3d31.483146698840423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hafiz Sajid Poultry Medicines Location"
                    className="rounded-2xl"
                  />
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
                <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Business Hours
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b-2 border-gray-100">
                      <span className="font-semibold text-gray-700">Monday - Friday</span>
                      <span className="text-gray-600">{COMPANY_INFO.hours.monFri}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b-2 border-gray-100">
                      <span className="font-semibold text-gray-700">Saturday</span>
                      <span className="text-gray-600">{COMPANY_INFO.hours.sat}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-semibold text-gray-700">Sunday</span>
                      <span className="text-red-500 font-semibold">{COMPANY_INFO.hours.sun}</span>
                    </div>
                  </div>

                  {/* Holiday Notice */}
                  <div className="mt-4 p-3 bg-yellow-50 rounded-xl border-2 border-yellow-100">
                    <p className="text-xs text-yellow-800 flex items-center gap-2">
                      <span>📢</span>
                      We remain closed on public holidays. Please check our social media for updates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Chat Button */}
              <button
                onClick={() => setShowLiveChat(!showLiveChat)}
                className="w-full group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-700"></div>
                <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-4 rounded-xl text-white flex items-center justify-center gap-3 transform group-hover:scale-105 transition-all duration-500">
                  <span className="text-2xl animate-bounce">💬</span>
                  <div className="text-left">
                    <p className="font-bold">Live Chat Support</p>
                    <p className="text-xs opacity-90">Online 9am - 8pm</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-center text-gray-600 text-sm md:text-base mb-8">
            Find quick answers to common questions
          </p>

          {/* FAQ Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedDepartment('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                selectedDepartment === 'all'
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Questions
            </button>
            {['general', 'orders', 'payment', 'delivery', 'products', 'returns'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedDepartment(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
                  selectedDepartment === cat
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-xl p-4 md:p-6 hover:bg-gradient-to-r hover:from-green-50 hover:via-blue-50 hover:to-purple-50 transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-1">❓</span>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">{faq.answer}</p>
                    <span className="inline-block mt-2 text-xs text-gray-400 capitalize">
                      Category: {faq.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
            <Button size="lg" variant="primary">
              <span className="flex items-center gap-2">
                <span>📞</span>
                Call Us Now
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Connect With Us
          </h2>
          <p className="text-white/90 mb-8">
            Follow us on social media for updates, tips, and special offers
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: '📘', name: 'Facebook', color: 'hover:bg-blue-600' },
              { icon: '📸', name: 'Instagram', color: 'hover:bg-pink-600' },
              { icon: '🐦', name: 'Twitter', color: 'hover:bg-blue-400' },
              { icon: '💼', name: 'LinkedIn', color: 'hover:bg-blue-700' },
              { icon: '📱', name: 'WhatsApp', color: 'hover:bg-green-500' },
              { icon: '📺', name: 'YouTube', color: 'hover:bg-red-600' }
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                className="group relative"
              >
                <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-700"></div>
                <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-xl text-white hover:bg-white/20 transition-all duration-500 transform group-hover:scale-110">
                  <div className="text-2xl md:text-3xl mb-1">{social.icon}</div>
                  <p className="text-xs">{social.name}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}