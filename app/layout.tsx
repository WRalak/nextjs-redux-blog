// app/layout.tsx
'use client'

import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Toaster } from 'react-hot-toast'
import { metadata } from './metadata'
import { useAnalytics } from '@/hooks/useAnalytics'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize analytics
    useAnalytics()
  }, [])

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <Toaster />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}