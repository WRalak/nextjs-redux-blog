import Image from 'next/image'
import Link from 'next/link'
import { HeartIcon, ChatBubbleLeftIcon, EyeIcon } from '@heroicons/react/24/outline'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  post: {
    id: number
    title: string
    body: string
    reactions: {
      likes: number
    }
    views: number
    tags: string[]
    createdAt?: string
  }
}

export function PostCard({ post }: PostCardProps) {
  const imageUrl = `https://picsum.photos/id/${post.id % 100}/400/250`
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.body}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
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
            <div className="flex items-center space-x-1">
              <EyeIcon className="h-4 w-4" />
              <span>{post.views}</span>
            </div>
          </div>
          
          {post.createdAt && (
            <span>
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
