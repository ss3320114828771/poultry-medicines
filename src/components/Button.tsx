'use client'

import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const baseStyles = "relative overflow-hidden rounded-xl font-bold transition-all duration-500 transform hover:scale-105 hover:rotate-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white shadow-lg hover:shadow-2xl",
    secondary: "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg hover:shadow-2xl",
    outline: "bg-transparent border-4 border-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-border text-gray-800 hover:text-white hover:bg-gradient-to-r"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }
  
  const width = fullWidth ? "w-full" : ""

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className} group`}
    >
      <div className="absolute inset-0 bg-white/30 shimmer"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}

export default Button