// lib/analytics.ts
interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  userId?: string
  timestamp: number
}

class Analytics {
  private static instance: Analytics | null = null
  private events: AnalyticsEvent[] = []

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  private constructor() {
    this.events = []
    if (typeof window !== 'undefined') {
      this.initializeTracking()
    }
  }

  private initializeTracking() {
    if (typeof window === 'undefined') return
    
    // Initialize page view tracking
    this.trackPageView(window.location.pathname)
    
    // Track user engagement
    this.trackUserEngagement()
    
    // Track performance metrics
    this.trackPerformance()
  }

  trackPageView(path: string) {
    this.trackEvent('page_view', 'navigation', 'Page View', undefined, path)
  }

  trackEvent(action: string, category: string, label?: string, value?: number, userId?: string) {
    const event: AnalyticsEvent = {
      action,
      category,
      label,
      value,
      userId: userId || this.getUserId(),
      timestamp: Date.now()
    }

    this.events.push(event)
    this.sendToAnalytics(event)
  }

  trackUserEngagement() {
    if (typeof window === 'undefined') return
    
    let maxScrollDepth = 0
    const trackScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
      )
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        this.trackEvent('scroll_depth', 'engagement', 'Scroll Depth', scrollDepth)
      }
    }

    window.addEventListener('scroll', trackScroll, { passive: true })

    let startTime = Date.now()
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      this.trackEvent('time_on_page', 'engagement', 'Time on Page', timeSpent)
    })

    // Track clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.getAttribute('href')) {
        this.trackEvent('link_click', 'engagement', 'Link Click', undefined, target.getAttribute('href') || undefined)
      }
    })

    // Track form interactions
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement
      this.trackEvent('form_submit', 'engagement', 'Form Submit', form.id ? parseInt(form.id) : undefined)
    })

    // Track search queries
    const searchInputs = document.querySelectorAll('input[type="search"]')
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        clearTimeout((target as any).searchTimeout)
        ;(target as any).searchTimeout = setTimeout(() => {
          if (target.value.trim()) {
            this.trackEvent('search', 'search', 'Search Query', undefined, target.value)
          }
        }, 1000)
      })
    })
  }

  trackPerformance() {
    if (typeof window === 'undefined') return
    
    // Track page load time
    if (window.performance) {
      window.addEventListener('load', () => {
        const perfData = window.performance.getEntriesByType('navigation')[0]
        if (perfData) {
          this.trackEvent('page_load_time', 'performance', 'Page Load Time', Math.round(perfData.duration))
        }
      })
    }
  }

  trackError(error: Error, context?: string) {
    this.trackEvent('error', 'error', context, undefined, error.message)
  }

  trackConversion(goal: string, value?: number) {
    this.trackEvent('conversion', 'conversion', goal, value)
  }

  getEvents(): AnalyticsEvent[] {
    return this.events
  }

  private getUserId(): string {
    // Get user ID from localStorage or generate a temporary one
    return localStorage.getItem('userId') || `anonymous_${Date.now()}`
  }

  private sendToAnalytics(event: AnalyticsEvent) {
    // In a real implementation, this would send to your analytics service
    console.log('Analytics Event:', event)
    
    // Example: Send to Google Analytics, Mixpanel, Amplitude, etc.
    // gtag('event', event.action, {
    //   'event_category': event.category,
    //   'event_label': event.label,
    //   'value': event.value
    // })
  }
}

export const analytics = Analytics.getInstance()
