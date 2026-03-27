// hooks/useSimpleAuth.ts
// Simple authentication hook that works reliably

import { useState, useEffect } from 'react'

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  bio?: string
  image?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Helper function to set cookie
const setCookie = (name: string, value: string, days: number) => {
  if (typeof window !== 'undefined') {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }
}

// Helper function to delete cookie
const deleteCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
  }
}

export const useSimpleAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  })

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')
        const expiry = localStorage.getItem('auth_expiry')
        
        if (token && expiry && Date.now() < parseInt(expiry)) {
          const user = JSON.parse(userStr || '{}')
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          console.log('useSimpleAuth: Restored auth from localStorage:', user)
        } else if (token && expiry && Date.now() >= parseInt(expiry)) {
          // Token expired
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('auth_expiry')
          deleteCookie('token')
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Token expired',
          })
          console.log('useSimpleAuth: Token expired, logged out')
        } else {
          // Clear cookie if no valid auth
          deleteCookie('token')
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
          console.log('useSimpleAuth: No valid auth found')
        }
      } catch (error) {
        console.error('useSimpleAuth: Error initializing from localStorage:', error)
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to initialize authentication',
        })
      }
    }
  }, [])

  const login = (username: string, password: string, user?: Partial<User>) => {
    // Mock authentication - accept any credentials
    const mockUser: User = {
      id: 1,
      username: username,
      email: `${username.toLowerCase()}@example.com`,
      firstName: user?.firstName || username.charAt(0).toUpperCase() + username.slice(1),
      lastName: user?.lastName || 'User',
    }

    // Save to localStorage and cookie
    const token = `mock_token_${Date.now()}`
    const expiry = (Date.now() + 30 * 60 * 1000).toString()
    
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(mockUser))
    localStorage.setItem('auth_expiry', expiry)
    
    // Set cookie for middleware
    setCookie('token', token, 1) // 1 day expiry

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    })

    console.log('useSimpleAuth: Logged in user:', mockUser)
    return true
  }

  const logout = () => {
    // Clear localStorage and cookies
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('auth_expiry')
    
    deleteCookie('token')

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })

    console.log('useSimpleAuth: Logged out user')
    return true
  }

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
  }
}
