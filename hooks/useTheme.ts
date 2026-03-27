// hooks/useTheme.ts
import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Get theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme || 'system'
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark')
    
    let shouldBeDark = false
    
    if (theme === 'system') {
      // Check system preference
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    } else {
      shouldBeDark = theme === 'dark'
    }
    
    // Apply theme
    if (shouldBeDark) {
      root.classList.add('dark')
    } else {
      root.classList.add('light')
    }
    
    setIsDark(shouldBeDark)
    
    // Listen for system theme changes if using system theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        const shouldBeDark = mediaQuery.matches
        root.classList.remove('light', 'dark')
        root.classList.add(shouldBeDark ? 'dark' : 'light')
        setIsDark(shouldBeDark)
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return {
    theme,
    isDark,
    toggleTheme,
    setThemeMode,
    themeLabel: theme === 'system' ? 'System' : theme.charAt(0).toUpperCase() + theme.slice(1)
  }
}
