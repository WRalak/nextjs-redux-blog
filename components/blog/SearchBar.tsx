// components/blog/SearchBar.tsx
'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { usePosts } from '@/hooks/usePosts'
import toast from 'react-hot-toast'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const { searchPosts, loading } = usePosts()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        handleSearch()
      } else {
        // Clear search when query is empty
        searchPosts('')
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query])

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setIsSearching(true)
    try {
      await searchPosts(query.trim())
    } catch (error) {
      toast.error('Search failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    searchPosts('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon 
              className={`h-5 w-5 ${loading ? 'text-primary-500' : 'text-gray-400'}`}
              aria-hidden="true" 
            />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts by title, content, or tags..."
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            disabled={loading}
          />
          {query && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="button"
                onClick={handleClear}
                className="p-1 mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {loading && 'Searching...'}
            {!loading && query && `Searching for "${query}"`}
            {!loading && !query && 'Type to search posts'}
          </p>
          {query && (
            <Button
              type="submit"
              size="sm"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
