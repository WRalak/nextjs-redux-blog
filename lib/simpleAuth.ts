// lib/simpleAuth.ts
// Simple authentication system that works reliably

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

class SimpleAuth {
  private static instance: SimpleAuth
  private currentState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }
  private listeners: Set<(state: AuthState) => void> = new Set()

  private constructor() {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      this.initializeFromStorage()
    }
  }

  private initializeFromStorage() {
    try {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      const expiry = localStorage.getItem('auth_expiry')
      
      console.log('SimpleAuth: initializeFromStorage - Found:', { token, userStr, expiry })
      
      if (token && expiry && Date.now() < parseInt(expiry)) {
        const user = JSON.parse(userStr || '{}')
        this.setAuthState(true, user, false, null)
        console.log('SimpleAuth: Restored auth from localStorage:', user)
      } else if (token && expiry && Date.now() >= parseInt(expiry)) {
        this.clearAuth()
        console.log('SimpleAuth: Token expired, cleared auth')
      } else {
        this.setAuthState(false, null, false, null)
        console.log('SimpleAuth: No valid auth found')
      }
    } catch (error) {
      console.error('SimpleAuth: Error initializing from localStorage:', error)
      this.clearAuth()
    }
  }

  private setAuthState(isAuthenticated: boolean, user: User | null, isLoading: boolean, error: string | null) {
    const newState: AuthState = {
      user,
      isAuthenticated,
      isLoading,
      error,
    }
    
    this.currentState = newState
    console.log('SimpleAuth: setAuthState called with:', { isAuthenticated, user, isLoading, error })
    this.notifyListeners()
  }

  private clearAuth() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('auth_expiry')
    this.setAuthState(false, null, false, null)
    console.log('SimpleAuth: clearAuth called')
    this.notifyListeners()
  }

  private notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.currentState)
      } catch (error) {
        console.error('SimpleAuth: Error in listener:', error)
      }
    })
  }

  public login(username: string, password: string, user?: Partial<User>) {
    // Mock authentication - accept any credentials
    const mockUser: User = {
      id: 1,
      username: username,
      email: `${username.toLowerCase()}@example.com`,
      firstName: user?.firstName || username.charAt(0).toUpperCase() + username.slice(1),
      lastName: user?.lastName || 'User',
    }

    // Save to localStorage
    const token = `mock_token_${Date.now()}`
    const expiry = (Date.now() + 30 * 60 * 1000).toString()
    
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(mockUser))
    localStorage.setItem('auth_expiry', expiry)

    this.setAuthState(true, mockUser, false, null)
    console.log('SimpleAuth: login called for:', username)
    this.notifyListeners()
    
    return true
  }

  public logout() {
    this.clearAuth()
    console.log('SimpleAuth: logout called')
    this.notifyListeners()
    
    return true
  }

  public getCurrentUser(): User | null {
    return this.currentState.user
  }

  public isAuthenticated(): boolean {
    return this.currentState.isAuthenticated
  }

  public isLoading(): boolean {
    return this.currentState.isLoading
  }

  public subscribe(listener: (state: AuthState) => void) {
    this.listeners.add(listener)
    // Immediately call listener with current state
    if (this.currentState) {
      listener(this.currentState)
    }
    
    return () => {
      this.listeners.delete(listener)
    }
  }

  public static getInstance(): SimpleAuth {
    if (!SimpleAuth.instance) {
      SimpleAuth.instance = new SimpleAuth()
    }
    return SimpleAuth.instance
  }
}
