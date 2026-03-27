// components/ui/ThemeToggle.tsx
'use client'

import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, isDark, toggleTheme, themeLabel } = useTheme()

  const getIcon = () => {
    if (theme === 'system') {
      return <ComputerDesktopIcon className="h-5 w-5" />
    }
    return isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />
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
