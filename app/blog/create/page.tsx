'use client'

import { useSimpleAuth } from '@/hooks/useSimpleAuth'
import { CreatePost } from '@/components/blog/CreatePost'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CreatePostPage() {
  const { isAuthenticated, isLoading } = useSimpleAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to create a post
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <CreatePost />
    </div>
  )
}
