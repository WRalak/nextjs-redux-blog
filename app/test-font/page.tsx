// app/test-font/page.tsx
'use client'

export default function TestFontPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-8 font-satoshi">
          Font Test: Outfit (Satoshi Style)
        </h1>

        <div className="space-y-8">
          {/* Test different font weights */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Font Weights
            </h2>
            <div className="space-y-2">
              <p className="font-light text-gray-700 dark:text-gray-300">Light (300) - The quick brown fox jumps over the lazy dog</p>
              <p className="font-normal text-gray-700 dark:text-gray-300">Regular (400) - The quick brown fox jumps over the lazy dog</p>
              <p className="font-medium text-gray-700 dark:text-gray-300">Medium (500) - The quick brown fox jumps over the lazy dog</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">Semibold (600) - The quick brown fox jumps over the lazy dog</p>
              <p className="font-bold text-gray-700 dark:text-gray-300">Bold (700) - The quick brown fox jumps over the lazy dog</p>
              <p className="font-extrabold text-gray-700 dark:text-gray-300">Extra Bold (800) - The quick brown fox jumps over the lazy dog</p>
              <p className="font-black text-gray-700 dark:text-gray-300">Black (900) - The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>

          {/* Test different sizes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Font Sizes
            </h2>
            <div className="space-y-2">
              <p className="text-xs text-gray-700 dark:text-gray-300">Extra Small - The quick brown fox</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Small - The quick brown fox</p>
              <p className="text-base text-gray-700 dark:text-gray-300">Base - The quick brown fox</p>
              <p className="text-lg text-gray-700 dark:text-gray-300">Large - The quick brown fox</p>
              <p className="text-xl text-gray-700 dark:text-gray-300">Extra Large - The quick brown fox</p>
              <p className="text-2xl text-gray-700 dark:text-gray-300">2XL - The quick brown fox</p>
              <p className="text-3xl text-gray-700 dark:text-gray-300">3XL - The quick brown fox</p>
              <p className="text-4xl text-gray-700 dark:text-gray-300">4XL - The quick brown fox</p>
              <p className="text-5xl text-gray-700 dark:text-gray-300">5XL - The quick brown fox</p>
              <p className="text-6xl text-gray-700 dark:text-gray-300">6XL - The quick brown fox</p>
            </div>
          </div>

          {/* Test blog-specific styling */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Blog Typography
            </h2>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Post Title</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                This is how the blog post body text will look with the new font. It should be clean, readable, and modern.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                  Code snippet: const blog = "modern typography"
                </p>
              </div>
              <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400">
                "Typography is the craft of endowing written language with a durable visual form."
              </blockquote>
            </div>
          </div>

          {/* Test with Tailwind font-satoshi class */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Custom Font Class
            </h2>
            <p className="font-satoshi text-gray-700 dark:text-gray-300">
              This text uses the custom font-satoshi class from Tailwind config.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
