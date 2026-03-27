// components/ui/ThemeToggle.tsx
'use client'

import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, isDark, mounted, toggleTheme, themeLabel } = useTheme()

  const getIcon = () => {
    if (theme === 'system') {
      return <ComputerDesktopIcon className="h-5 w-5" />
    }
    return isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
        disabled
      >
        <div className="h-5 w-5 animate-pulse bg-gray-300 dark:bg-gray-600 rounded"></div>
        <span className="sr-only">Loading theme toggle</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      title={`Current theme: ${themeLabel}. Click to change.`}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
