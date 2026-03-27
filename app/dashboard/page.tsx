// app/dashboard/page.tsx
'use client'

import { useSimpleAuth } from '@/hooks/useSimpleAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/Spinner'

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useSimpleAuth()
  const router = useRouter()
  
  // Debug authentication state
  useEffect(() => {
    console.log('Dashboard - Simple auth state:', { isAuthenticated, user, isLoading })
  }, [isAuthenticated, user, isLoading])
  
  // Only redirect if definitely not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log('Dashboard - Redirecting to login')
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return (
      <div className="container-custom py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view your dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You need to be authenticated to access this page.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Authentication Status
              </h3>
              <p className="text-3xl font-bold text-primary-600">
                {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Debug Info
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p><strong>User:</strong> {user ? user.firstName + ' ' + user.lastName : 'No user'}</p>
                <p><strong>Token:</strong> {user ? 'Present' : 'Missing'}</p>
                <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Go to Login
            </button>
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container-custom py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Hello {user?.firstName || 'Admin'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Welcome to your dashboard, {user?.firstName || 'User'}!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Posts
            </h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Comments
            </h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Users
            </h3>
            <p className="text-3xl font-bold text-primary-600">1</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <a 
              href="/blog" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View Blog
            </a>
            <a 
              href="/blog/create" 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create Post
            </a>
            <a 
              href="/profile" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View Profile
            </a>
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}