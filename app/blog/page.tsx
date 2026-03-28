// app/blog/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePosts } from '@/hooks/usePosts'
import { Spinner } from '@/components/ui/Spinner'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useSimpleAuth } from '@/hooks/useSimpleAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// Temporarily remove lazy loading to debug
// import { LazyLoad, LazyPostCard, LazySearchBar } from '@/components/ui/LazyLoad'
import { PostCard } from '@/components/blog/PostCard'
import { SearchBar } from '@/components/blog/SearchBar'

export default function BlogPage() {
  const { posts, loading, loadingMore, hasMore, error, fetchPosts, searchPosts, fetchMorePosts } = usePosts()
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const { isAuthenticated } = useSimpleAuth()
  const { triggerRef } = useInfiniteScroll({
    hasNextPage: hasMore,
    isFetchingNextPage: loadingMore,
    fetchNextPage: fetchMorePosts,
  })
  
  // Debug logging
  console.log('BlogPage state:', { posts, loading, loadingMore, hasMore, error, isAuthenticated })
  
  useEffect(() => {
    console.log('Fetching initial posts...')
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
    console.log('Showing initial loading spinner...')
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }
  
  if (error) {
    console.log('Showing error:', error)
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Posts
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover insights, stories, and perspectives from our community
            </p>
          </div>
          
          {isAuthenticated && (
            <Link href="/blog/create">
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <PlusIcon className="h-5 w-5" />
                Create Post
              </button>
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Posts Grid */}
        {loading && posts.length === 0 ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No posts found. Try adjusting your search or check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Load More Trigger */}
        {!loading && hasMore && (
          <div ref={triggerRef} className="flex justify-center py-8">
            {loadingMore && <Spinner />}
          </div>
        )}

        {/* No More Posts */}
        {!loading && !hasMore && posts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-300">
              You've reached the end of the posts!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}