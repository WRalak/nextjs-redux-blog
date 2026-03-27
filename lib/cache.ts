// lib/cache.ts
interface CacheItem<T> {
  data: T
  timestamp: number
  expiry: number
}

class CacheService {
  private static instance: CacheService
  private defaultExpiry = 3600000 // 1 hour

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService()
    }
    return CacheService.instance
  }

  set<T>(key: string, data: T, expiry: number = this.defaultExpiry): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (!item) return null

    const cached: CacheItem<T> = JSON.parse(item)
    if (Date.now() - cached.timestamp > cached.expiry) {
      localStorage.removeItem(key)
      return null
    }

    return cached.data
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }

  invalidatePattern(pattern: string): void {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes(pattern)) {
        localStorage.removeItem(key)
      }
    })
  }
}

export const cache = CacheService.getInstance()