// app/test-routing/page.tsx
'use client'

export default function TestRoutingPage() {
  return (
    <div className="container-custom py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Routing Test Page
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          If you can see this page, routing is working correctly.
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Test Links
            </h3>
            <div className="space-y-2">
              <a href="/dashboard" className="text-blue-600 hover:text-blue-700">
                → Go to Dashboard
              </a>
              <a href="/profile" className="text-blue-600 hover:text-blue-700">
                → Go to Profile
              </a>
              <a href="/blog" className="text-blue-600 hover:text-blue-700">
                → Go to Blog
              </a>
              <a href="/login" className="text-blue-600 hover:text-blue-700">
                → Go to Login
              </a>
              <a href="/" className="text-blue-600 hover:text-blue-700">
                → Go to Home
              </a>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Debug Info
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</p>
              <p>Timestamp: {new Date().toLocaleString()}</p>
              <p>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
