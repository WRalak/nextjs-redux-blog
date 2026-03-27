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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-sm mx-auto sm:max-w-none">
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-48 sm:h-52 md:h-48 lg:h-52 w-full">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
      </Link>
      
      <div className="p-4 sm:p-5 md:p-6">
        <Link href={`/blog/${post.id}`}>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base">
          {post.body}
        </p>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full whitespace-nowrap"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-1">
              <HeartIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{post.reactions.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChatBubbleLeftIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>0</span>
            </div>
            <div className="flex items-center space-x-1">
              <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{post.views}</span>
            </div>
          </div>
          
          {post.createdAt && (
            <span className="text-xs sm:text-sm">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
