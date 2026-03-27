// app/test-styling/page.tsx
'use client'

export default function TestStylingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Tailwind CSS Test
        </h1>

        {/* Test basic colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-red-500 text-white p-4 rounded-lg">
            Red Background
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            Blue Background
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            Green Background
          </div>
        </div>

        {/* Test custom colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-primary-500 text-white p-4 rounded-lg">
            Primary Color
          </div>
          <div className="bg-primary-600 text-white p-4 rounded-lg">
            Primary 600
          </div>
          <div className="bg-primary-700 text-white p-4 rounded-lg">
            Primary 700
          </div>
        </div>

        {/* Test dark mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4 rounded-lg">
            <h2 className="text-gray-900 dark:text-white font-semibold mb-2">
              Light/Dark Mode Test
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              This text should adapt to dark mode
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-gray-900 dark:text-white font-semibold mb-2">
              Gray Background
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Another dark mode test
            </p>
          </div>
        </div>

        {/* Test buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="btn-primary">
            Primary Button
          </button>
          <button className="btn-secondary">
            Secondary Button
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Red Button
          </button>
        </div>

        {/* Test container */}
        <div className="container-custom bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Container Test
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This should be centered and have proper padding.
          </p>
        </div>

        {/* Test spacing */}
        <div className="space-y-4 mt-8">
          <div className="h-20 bg-purple-500 rounded"></div>
          <div className="h-20 bg-indigo-500 rounded"></div>
          <div className="h-20 bg-pink-500 rounded"></div>
        </div>
      </div>
    </div>
  )
}
