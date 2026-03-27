// app/layout.tsx
'use client'

import { Inter, Outfit } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from './components/layout/Navbar'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { metadata } from './metadata'
import './globals.css'

const satoshi = Outfit({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-satoshi',
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={satoshi.className}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Providers>
          <ErrorBoundary>
            <Navbar />
            <Toaster />
            <main className="min-h-screen">{children}</main>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}