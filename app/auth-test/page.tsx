// app/auth-test/page.tsx
'use client'

import { useSimpleAuth } from '@/hooks/useSimpleAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthTestPage() {
  const { user, isAuthenticated, isLoading } = useSimpleAuth()
  const router = useRouter()
  
  useEffect(() => {
    console.log('AuthTest - Current auth state:', { 
      isAuthenticated, 
      isLoading, 
      user: user?.firstName || 'No user',
      token: localStorage.getItem('token') || 'No token',
      expiry: localStorage.getItem('auth_expiry') || 'No expiry'
    })
  }, [user, isAuthenticated, isLoading])

  return (
    <div className="container-custom py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Authentication Test Page
        </h1>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Authentication Status
            </h3>
            <div className="space-y-2">
              <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
              <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
              <p><strong>User:</strong> {user?.firstName || 'None'}</p>
              <p><strong>Username:</strong> {user?.username || 'None'}</p>
              <p><strong>Email:</strong> {user?.email || 'None'}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              LocalStorage Data
            </h3>
            <div className="space-y-2">
              <p><strong>Token:</strong> {localStorage.getItem('token') || 'None'}</p>
              <p><strong>User Data:</strong> {localStorage.getItem('user') || 'None'}</p>
              <p><strong>Expiry:</strong> {localStorage.getItem('auth_expiry') || 'None'}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Test Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => {
                  const auth = useSimpleAuth()
                  console.log('AuthTest: Testing login...')
                  auth.login('testuser', 'testpass')
                  setTimeout(() => {
                    console.log('AuthTest: Login test completed')
                  }, 1000)
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Test Login (testuser/testpass)
              </button>
              
              <button
                onClick={() => {
                  const auth = useSimpleAuth()
                  console.log('AuthTest: Testing logout...')
                  auth.logout()
                  setTimeout(() => {
                    console.log('AuthTest: Logout test completed')
                  }, 1000)
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Test Logout
              </button>
              
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
              
              <button
                onClick={() => router.push('/profile')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
