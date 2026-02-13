import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import { COMPANY_INFO } from '@/lib/constants'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Hafiz Sajid',
      role: 'Founder & Chief Veterinarian',
      image: '/n1.jpeg',
      description: '15+ years experience in poultry healthcare',
      qualification: 'DVM, MSc Poultry Science'
    },
    {
      name: 'Dr. Ahmed Khan',
      role: 'Senior Poultry Specialist',
      image: '/n2.jpeg',
      description: 'Expert in poultry disease prevention',
      qualification: 'PhD Poultry Pathology'
    },
    {
      name: 'Muhammad Ali',
      role: 'Quality Control Manager',
      image: '/n3.jpeg',
      description: 'Ensuring premium quality products',
      qualification: 'MSc Food Technology'
    }
  ]

  const milestones = [
    { year: '2010', title: 'Company Founded', description: 'Started with a small clinic in Lahore', icon: '🏢' },
    { year: '2013', title: 'First Product Launch', description: 'Introduced Poultry Shield supplement', icon: '🚀' },
    { year: '2016', title: 'Expansion', description: 'Opened 3 new branches across Punjab', icon: '📈' },
    { year: '2020', title: 'Digital Transformation', description: 'Launched online ordering system', icon: '💻' },
    { year: '2024', title: 'Serving Nationwide', description: 'Now serving farmers across Pakistan', icon: '🇵🇰' }
  ]

  const values = [
    {
      icon: '❤️',
      title: 'Compassion',
      description: 'We care deeply about the health and wellbeing of every bird'
    },
    {
      icon: '⭐',
      title: 'Quality',
      description: 'We never compromise on the quality of our products'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'We believe in honest and transparent business practices'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'We continuously improve our products based on latest research'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'We promote sustainable poultry farming practices'
    },
    {
      icon: '🎓',
      title: 'Education',
      description: 'We educate farmers on best practices in poultry healthcare'
    }
  ]

  const stats = [
    { number: '15+', label: 'Years of Excellence', icon: '📅' },
    { number: '50+', label: 'Premium Products', icon: '💊' },
    { number: '10k+', label: 'Happy Farmers', icon: '👨‍🌾' },
    { number: '24/7', label: 'Customer Support', icon: '📞' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient"></div>
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
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
        
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-3d animate-float">
            About Us
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Your Trusted Partner in Poultry Healthcare Since 2010
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

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
                <div className="relative bg-white p-4 md:p-6 lg:p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                  <div className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-600 mt-1 md:mt-2">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image with 3D effect */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl opacity-50 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
              <div className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src="/n4.jpeg"
                    alt="Our Story - Hafiz Sajid Poultry Medicines"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold">15+ Years</h3>
                  <p className="text-sm md:text-base">of Excellence in Poultry Healthcare</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Our Journey
                </span>
              </h2>
              
              <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base lg:text-lg">
                <p className="leading-relaxed">
                  Founded by <span className="font-bold text-purple-600">Hafiz Sajid</span>, a passionate veterinarian with over 15 years of experience in poultry healthcare, our mission is to provide farmers with the highest quality medicines and supplements for their flocks.
                </p>
                <p className="leading-relaxed">
                  We understand the challenges of poultry farming and have dedicated ourselves to developing products that address the specific needs of birds at every stage of life. Our commitment to quality and innovation has made us a trusted name in the industry.
                </p>
                <p className="leading-relaxed">
                  Today, we serve thousands of farmers across Pakistan, helping them maintain healthy flocks and achieve better productivity through our premium products and expert guidance.
                </p>
              </div>

              <div className="pt-4 md:pt-6">
                <Link href="/contact">
                  <Button size="lg" variant="primary">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-16">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Milestones
            </span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600"></div>

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                  {/* Timeline dot for mobile */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full border-4 border-purple-600 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full animate-pulse"></div>
                  </div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                      <div className="flex items-center gap-3 mb-2 md:mb-3">
                        <span className="text-2xl md:text-3xl">{milestone.icon}</span>
                        <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs md:text-sm font-bold">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-gray-800">{milestone.title}</h3>
                      <p className="text-sm md:text-base text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h2>
          <p className="text-center text-gray-600 text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-3xl mx-auto">
            Dedicated professionals committed to your flock's health
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
                <div className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-all duration-500">
                  <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                      <h3 className="text-xl md:text-2xl font-bold">{member.name}</h3>
                      <p className="text-xs md:text-sm opacity-90">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-xs md:text-sm text-gray-500 mb-2">{member.qualification}</p>
                    <p className="text-sm md:text-base text-gray-600 mb-4">{member.description}</p>
                    <div className="flex gap-2 md:gap-3">
                      <button className="p-2 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-500">
                        <span className="text-sm md:text-base">📧</span>
                      </button>
                      <button className="p-2 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-500">
                        <span className="text-sm md:text-base">📱</span>
                      </button>
                      <button className="p-2 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-500">
                        <span className="text-sm md:text-base">🔗</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-16">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-sm md:text-base text-white/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ready to Experience the Best in Poultry Healthcare?
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
            Join thousands of satisfied farmers who trust us for their poultry health needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="primary" fullWidth>
                Browse Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" fullWidth>
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}