// components/ui/ErrorBoundary.tsx
'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
    
    // Here you could also log to an error reporting service
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props
      
      if (Fallback) {
        return <Fallback error={this.state.error} reset={this.reset} />
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left mb-6">
                  <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    Error Details
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-800 dark:text-gray-200 overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              <button
                onClick={this.reset}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook for functional components to use error boundaries
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null)
  
  const reset = React.useCallback(() => {
    setError(null)
  }, [])
  
  const captureError = React.useCallback((error: Error) => {
    setError(error)
    console.error('Error captured by useErrorBoundary:', error)
  }, [])
  
  if (error) {
    throw error
  }
  
  return { captureError, reset }
}
