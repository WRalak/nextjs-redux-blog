// app/dashboard/test/page.tsx
'use client'

export default function DashboardTestPage() {
  return (
    <div className="container-custom py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Dashboard Test Page
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          If you can see this page, the dashboard route is working.
        </p>
      </div>
    </div>
  )
}
