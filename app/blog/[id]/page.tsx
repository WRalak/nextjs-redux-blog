// app/blog/[id]/page.tsx
'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { usePosts } from '@/hooks/usePosts'
import { useComments } from '@/hooks/useComments'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { HeartIcon, ChatBubbleLeftIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function BlogPostPage() {
  const { id } = useParams()
  const { currentPost, loading, fetchPostById, clearPost } = usePosts()
  const { comments, loading: commentsLoading, fetchComments, addComment } = useComments()
  const { isAuthenticated } = useAuth()
  const [newComment, setNewComment] = useState('')
  const [liked, setLiked] = useState(false)
  
  useEffect(() => {
    if (id) {
      fetchPostById(Number(id))
      fetchComments(Number(id))
    }
    
    return () => {
      clearPost()
    }
  }, [id])
  
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      await addComment(Number(id), newComment)
      setNewComment('')
    }
  }
  
  if (loading || !currentPost) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }
  
  const imageUrl = `https://picsum.photos/id/${currentPost.id % 100}/1200/600`
  
  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Image */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={imageUrl}
          alt={currentPost.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-white bg-opacity-20 rounded-full backdrop-blur-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentPost.title}
            </h1>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Stats */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setLiked(!liked)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
              >
                {liked ? (
                  <HeartSolidIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
                <span>{currentPost.reactions.likes + (liked ? 1 : 0)}</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <ChatBubbleLeftIcon className="h-6 w-6" />
                <span>{comments.length}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <EyeIcon className="h-6 w-6" />
                <span>{currentPost.views}</span>
              </div>
            </div>
          </div>
          
          {/* Post Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentPost.body}
            </p>
          </div>
          
          {/* Comments Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Comments ({comments.length})
            </h2>
            
            {/* Add Comment Form */}
            {isAuthenticated && (
              <form onSubmit={handleAddComment} className="mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button type="submit" className="mt-2">
                  Post Comment
                </Button>
              </form>
            )}
            
            {/* Comments List */}
            {commentsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : comments.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {comment.user?.fullName || 'Anonymous User'}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}