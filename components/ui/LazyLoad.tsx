'use client'

import { lazy, Suspense } from 'react'
import { Spinner } from './Spinner'

interface LazyLoadProps {
 
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function LazyLoad({ fallback = <Spinner size="lg" />, children }: LazyLoadProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

// Lazy loaded components
export const LazyPostCard = lazy(() => import('@/components/blog/PostCard').then(mod => ({ default: mod.PostCard })))
export const LazyCreatePost = lazy(() => import('@/components/blog/CreatePost').then(mod => ({ default: mod.CreatePost })))
export const LazyShareButton = lazy(() => import('@/components/blog/ShareButton').then(mod => ({ default: mod.ShareButton })))
export const LazyCommentItem = lazy(() => import('@/components/comments/CommentItem').then(mod => ({ default: mod.CommentItem })))
export const LazySearchBar = lazy(() => import('@/components/blog/SearchBar').then(mod => ({ default: mod.SearchBar })))
export const LazyPagination = lazy(() => import('@/components/blog/Pagination').then(mod => ({ default: mod.Pagination })))

// Lazy loaded pages
export const LazyDashboard = lazy(() => import('@/app/dashboard/page').then(mod => ({ default: mod.default })))
export const LazyProfile = lazy(() => import('@/app/profile/page').then(mod => ({ default: mod.default })))
export const LazyBlog = lazy(() => import('@/app/blog/page').then(mod => ({ default: mod.default })))
export const LazyCreatePostPage = lazy(() => import('@/app/blog/create/page').then(mod => ({ default: mod.default })))
