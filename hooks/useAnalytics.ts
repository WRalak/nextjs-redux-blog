// hooks/useAnalytics.ts
import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

export const useAnalytics = () => {
  useEffect(() => {
    // Track page views
    analytics.trackPageView(window.location.pathname)
    
    // Track user interactions
    const trackClicks = () => {
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'A' && target.getAttribute('href')) {
          analytics.trackEvent('link_click', 'engagement', 'Link Click', undefined, target.getAttribute('href') || undefined)
        }
      })
    }

    const trackFormSubmissions = () => {
      document.addEventListener('submit', (e) => {
        const form = e.target as HTMLFormElement
        analytics.trackEvent('form_submit', 'engagement', 'Form Submit', form.id ? parseInt(form.id) : undefined)
      })
    }

    const trackSearchQueries = () => {
      const searchInputs = document.querySelectorAll('input[type="search"]') as NodeListOf<HTMLInputElement>
      searchInputs.forEach((input) => {
        input.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement
          clearTimeout((target as any).searchTimeout)
          ;(target as any).searchTimeout = setTimeout(() => {
            if (target.value.trim()) {
              analytics.trackEvent('search', 'search', 'Search Query', undefined, target.value)
            }
          }, 1000)
        })
      })
    }

    // Add event listeners
    trackClicks()
    trackFormSubmissions()
    trackSearchQueries()

    // Cleanup
    return () => {
      document.removeEventListener('click', trackClicks)
      document.removeEventListener('submit', trackFormSubmissions)
      const searchInputs = document.querySelectorAll('input[type="search"]') as NodeListOf<HTMLInputElement>
      searchInputs.forEach((input) => {
        input.removeEventListener('input', trackSearchQueries)
      })
    }
  }, [])
}
