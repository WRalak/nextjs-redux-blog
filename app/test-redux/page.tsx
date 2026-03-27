// app/test-redux/page.tsx
'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { fetchPostsRequest } from '@/store/slices/postsSlice'

export default function TestReduxPage() {
  const dispatch = useDispatch<AppDispatch>()
  const posts = useSelector((state: RootState) => state.posts)
  const auth = useSelector((state: RootState) => state.auth)

  const handleFetchPosts = () => {
    dispatch(fetchPostsRequest({}))
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Redux Test Page
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Auth State</h2>
            <div className="space-y-2">
              <p><strong>Authenticated:</strong> {auth.isAuthenticated ? 'Yes' : 'No'}</p>
              <p><strong>Loading:</strong> {auth.isLoading ? 'Yes' : 'No'}</p>
              {auth.user && (
                <p><strong>User:</strong> {auth.user.firstName} {auth.user.lastName}</p>
              )}
              {auth.error && (
                <p className="text-red-500"><strong>Error:</strong> {auth.error}</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Posts State</h2>
            <div className="space-y-2">
              <p><strong>Posts Count:</strong> {posts.posts.length}</p>
              <p><strong>Loading:</strong> {posts.loading ? 'Yes' : 'No'}</p>
              <p><strong>Total:</strong> {posts.total}</p>
              {posts.error && (
                <p className="text-red-500"><strong>Error:</strong> {posts.error}</p>
              )}
            </div>
            
            <button
              onClick={handleFetchPosts}
              disabled={posts.loading}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {posts.loading ? 'Loading...' : 'Fetch Posts'}
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Posts List</h2>
          <div className="space-y-2">
            {posts.posts.slice(0, 5).map(post => (
              <div key={post.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{post.body.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
