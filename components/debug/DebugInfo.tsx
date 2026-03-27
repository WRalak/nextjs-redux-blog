// components/debug/DebugInfo.tsx
'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export function DebugInfo() {
  const auth = useSelector((state: RootState) => state.auth)
  const posts = useSelector((state: RootState) => state.posts)
  const comments = useSelector((state: RootState) => state.comments)
  const ui = useSelector((state: RootState) => state.ui)

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Info</h3>
      
      <div className="space-y-2">
        <div>
          <strong>Auth:</strong> {auth.isAuthenticated ? 'Logged in' : 'Not logged in'}
          {auth.user && <div>User: {auth.user.firstName} {auth.user.lastName}</div>}
          {auth.error && <div className="text-red-400">Error: {auth.error}</div>}
        </div>
        
        <div>
          <strong>Posts:</strong> {posts.posts.length} items
          <div>Loading: {posts.loading ? 'Yes' : 'No'}</div>
          {posts.error && <div className="text-red-400">Error: {posts.error}</div>}
        </div>
        
        <div>
          <strong>Comments:</strong> {comments.comments.length} items
          <div>Loading: {comments.loading ? 'Yes' : 'No'}</div>
          {comments.error && <div className="text-red-400">Error: {comments.error}</div>}
        </div>
        
        <div>
          <strong>UI:</strong>
          <div>Theme: {ui.theme}</div>
          <div>Modal: {ui.modalOpen ? 'Open' : 'Closed'}</div>
          <div>Notifications: {ui.notifications.length}</div>
        </div>
      </div>
    </div>
  )
}
