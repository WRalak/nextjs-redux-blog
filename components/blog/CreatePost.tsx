'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPostRequest, createPostSuccess, createPostFailure } from '@/store/slices/postsSlice'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useSimpleAuth } from '@/hooks/useSimpleAuth'
import { RootState } from '@/store'

interface CreatePostData {
  title: string
  body: string
  tags: string[]
  userId: number
}

export function CreatePost() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSimpleAuth()
  const { loading, error } = useSelector((state: RootState) => state.posts)
  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    body: '',
    tags: [],
    userId: 1 // Default fallback
  })
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Update userId when user becomes available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, userId: user.id }))
    }
  }, [user])

  // Handle successful post creation
  useEffect(() => {
    console.log('CreatePost useEffect:', { loading, error, shouldRedirect })
    // Only redirect if we were submitting and now we're done with no error
    if (shouldRedirect && !loading && !error) {
      console.log('Redirecting to blog...')
      setShouldRedirect(false)
      setIsSubmitting(false)
      router.push('/blog')
    }
    
    // Reset submitting state on error
    if (shouldRedirect && !loading && error) {
      setShouldRedirect(false)
      setIsSubmitting(false)
    }
  }, [loading, error, shouldRedirect, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('🔍 Form validation check:', {
      title: formData.title.trim(),
      body: formData.body.trim(),
      titleValid: !!formData.title.trim(),
      bodyValid: !!formData.body.trim()
    })
    
    if (!formData.title.trim() || !formData.body.trim()) {
      alert('Please fill in title and content')
      return
    }

    console.log('📤 Submitting form with data:', formData)
    setIsSubmitting(true)
    setShouldRedirect(true)
    dispatch(createPostRequest(formData))
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
        Create New Post
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
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? 'Publishing...' : 'Publish Post'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/blog')}
            disabled={loading || isSubmitting}
          >
            Cancel
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
            Error: {error}
          </div>
        )}
      </form>
    </div>
  )
}
