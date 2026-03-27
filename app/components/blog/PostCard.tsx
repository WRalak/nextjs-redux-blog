// components/blog/PostCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/store/slices/postsSlice'
import { CalendarIcon, ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'

interface PostCardProps {
  post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
  // Generate a deterministic image URL based on post ID
  const imageUrl = `https://picsum.photos/id/${post.id % 100}/400/200`
  
  return (
    <Link href={`/blog/${post.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.body}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <HeartIcon className="h-4 w-4" />
                <span>{post.reactions.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChatBubbleLeftIcon className="h-4 w-4" />
                <span>0</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarIcon className="h-4 w-4" />
              <span>Recently</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}