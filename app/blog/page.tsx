// app/blog/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePosts } from '@/hooks/usePosts'
import { PostCard } from '@/components/blog/PostCard'
import { Pagination } from '@/components/blog/Pagination'
import { Spinner } from '@/components/ui/Spinner'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function BlogPage() {
  const { posts, loading, error, totalPages, currentPage, fetchPosts, changePage, searchPosts } = usePosts()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  
  useEffect(() => {
    fetchPosts(1)
  }, [])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery !== searchQuery) {
        setDebouncedQuery(searchQuery)
        if (searchQuery) {
          searchPosts(searchQuery)
        } else {
          fetchPosts(1)
        }
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [searchQuery])
  
  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    )
  }
  
  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Blog Posts
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore our collection of articles and stories
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No posts found.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
            />
          )}
        </>
      )}
    </div>
  )
}