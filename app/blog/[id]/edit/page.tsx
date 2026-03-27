'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { usePosts } from '@/hooks/usePosts'
import { useSimpleAuth } from '@/hooks/useSimpleAuth'
import { updatePostRequest } from '@/store/slices/postsSlice'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'

interface EditPostData {
  title: string
  body: string
  tags: string[]
}

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentPost, loading, fetchPostById } = usePosts()
  const { isAuthenticated, user } = useSimpleAuth()
  const [formData, setFormData] = useState<EditPostData>({
    title: '',
    body: '',
    tags: []
  })
  const [tagInput, setTagInput] = useState('')

  // Check if current user is the author
  const isAuthor = user && currentPost && user.id === currentPost.userId

  useEffect(() => {
    if (id) {
      fetchPostById(Number(id))
    }
  }, [id])

  useEffect(() => {
    if (currentPost) {
      setFormData({
        title: currentPost.title,
        body: currentPost.body,
        tags: currentPost.tags
      })
    }
  }, [currentPost])

  useEffect(() => {
    if (!isAuthenticated || (currentPost && !isAuthor)) {
      router.push('/blog')
    }
  }, [isAuthenticated, isAuthor, currentPost])

  if (loading || !currentPost) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthor) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            You don't have permission to edit this post
          </h1>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.body.trim()) {
      alert('Please fill in title and content')
      return
    }

    dispatch(updatePostRequest({ ...currentPost, ...formData }))
    router.push(`/blog/${id}`)
  }

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        })
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Edit Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Enter post title..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content
          </label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Write your post content..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-sm flex items-center gap-2"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-orange-500 hover:text-orange-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Add tags (press Enter to add)..."
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" variant="primary">
            Update Post
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/blog/${id}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
