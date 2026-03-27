import { useState } from 'react'
import { ShareIcon, LinkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'

interface ShareOption {
  name: string
  icon: string
  action: () => void
}

interface ShareButtonProps {
  url: string
  title: string
  description?: string
}

export function ShareButton({ url, title, description }: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareOptions: ShareOption[] = [
    {
      name: 'Copy Link',
      icon: '🔗',
      action: () => copyToClipboard(url)
    },
    {
      name: 'Facebook',
      icon: '📘',
      action: () => shareOnSocial('facebook', url, title)
    },
    {
      name: 'Twitter',
      icon: '🐦',
      action: () => shareOnSocial('twitter', url, title)
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      action: () => shareOnSocial('linkedin', url, title)
    },
    {
      name: 'Email',
      icon: '✉️',
      action: () => shareViaEmail(url, title, description)
    }
  ]

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const shareOnSocial = (platform: string, url: string, title: string) => {
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} ${url}`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'noopener,noreferrer')
  }

  const shareViaEmail = (url: string, title: string, description?: string) => {
    const subject = encodeURIComponent(`Check out this article: ${title}`)
    const body = encodeURIComponent(`${description || title}\n\nRead more: ${url}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center space-x-2"
      >
        <ShareIcon className="h-4 w-4" />
        Share
      </Button>

      {showShareMenu && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border border-gray-200 dark:border-gray-600 z-50">
          <div className="p-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Share this post
            </h3>
            <div className="space-y-1">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center space-x-3"
                >
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.name}</span>
                  {option.name === 'Copy Link' && copied && (
                    <span className="text-green-600 dark:text-green-400 text-xs">
                      Copied!
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  )
}
