// hooks/useAuth.ts
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { loginRequest, logoutRequest } from '@/store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  )

  const login = (username: string, password: string) => {
    dispatch(loginRequest({ username, password }))
  }

  const logout = () => {
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