import { useState } from 'react'
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/Button'
import { Comment } from '@/store/slices/commentsSlice'
import { formatDistanceToNow } from 'date-fns'

interface CommentItemProps {
  comment: Comment
  onReply: (parentId: number, content: string) => void
  level?: number
}

export function CommentItem({ comment, onReply, level = 0 }: CommentItemProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (replyContent.trim()) {
      onReply(comment.id, replyContent)
      setReplyContent('')
      setShowReplyForm(false)
    }
  }

  const marginLeft = level > 0 ? `${level * 2}rem` : '0'

  return (
    <div className={`${level > 0 ? 'ml-8' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
              {comment.user?.fullName?.[0]?.toUpperCase() || comment.user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {comment.user?.fullName || comment.user?.username || 'Unknown User'}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                @{comment.user?.username || 'unknown'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>
              {comment.createdAt && formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            >
              {isLiked ? (
                <HeartSolidIcon className="h-4 w-4 text-red-500" />
              ) : (
                <HeartIcon className="h-4 w-4" />
              )}
              <span>{0}</span>
            </button>
          </div>
        </div>

        {/* Comment Body */}
        <div className="text-gray-700 dark:text-gray-300 mb-3">
          {comment.body}
        </div>

        {/* Reply Button */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <form onSubmit={handleReply} className="space-y-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                required
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowReplyForm(false)
                    setReplyContent('')
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
