// hooks/useAuth.ts
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { loginRequest, logoutRequest } from '@/store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => {
      const authState = state.auth
      console.log('useAuth - Current auth state:', authState)
      return {
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isLoading: authState.isLoading,
        error: authState.error,
      }
    }
  )

  const login = (username: string, password: string) => {
    console.log('useAuth - Dispatching login request for:', username)
    dispatch(loginRequest({ username, password }))
  }

  const logout = () => {
    console.log('useAuth - Dispatching logout request')
    dispatch(logoutRequest())
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  }
}