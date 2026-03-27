// components/ui/Card.tsx
'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export const Card = ({ children, className = '', hover = true }: CardProps) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden
        ${hover ? 'transition-transform duration-300 hover:scale-105 hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}