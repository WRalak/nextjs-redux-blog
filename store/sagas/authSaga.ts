// store/sagas/authSaga.ts
import { call, put, takeLatest, delay } from 'redux-saga/effects'
import { mockAuthApi } from '@/lib/mockAuthApi'
import toast from 'react-hot-toast'
import { loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess } from '../slices/authSlice'
import { addNotification } from '../slices/uiSlice'

const API_BASE_URL = 'https://dummyjson.com'

interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  token: string
  image?: string
}

function* loginSaga(action: ReturnType<typeof loginRequest>): Generator<any, void, any> {
  try {
    const response = yield call(mockAuthApi.login, action.payload.username, action.payload.password)

    const user = {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      image: response.data.image,
    }

    // Save to localStorage (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('auth_expiry', (Date.now() + 30 * 60 * 1000).toString())
    }

    yield put(loginSuccess({ user, token: response.data.token }))
    toast.success('Login successful!')
    yield put(addNotification({ message: 'Welcome back!', type: 'success' }))
    
    // Redirect to dashboard (only on client side)
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard'
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Login failed. Please try again.'
    yield put(loginFailure(errorMessage))
    toast.error(errorMessage)
    yield put(addNotification({ message: errorMessage, type: 'error' }))
  }
}

function* logoutSaga(): Generator<any, void, any> {
  try {
    // Remove from localStorage (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('auth_expiry')
    }
    yield put(logoutSuccess())
    toast.success('Logged out successfully')
    yield put(addNotification({ message: 'You have been logged out', type: 'info' }))
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  } catch (error) {
    console.error('Logout error:', error)
  }
}

function* checkAuthSaga(): Generator<any, void, any> {
  // Only check auth on client side
  if (typeof window === 'undefined') return
  
  const token = localStorage.getItem('token')
  const expiry = localStorage.getItem('auth_expiry')
  const userStr = localStorage.getItem('user')
  
  console.log('checkAuthSaga - Found data:', { token, expiry, userStr })
  
  if (token && expiry && Date.now() < parseInt(expiry)) {
    try {
      const user = JSON.parse(userStr || '{}')
      console.log('checkAuthSaga - Restoring auth for user:', user)
      yield put(loginSuccess({ user, token }))
    } catch (error) {
      console.error('checkAuthSaga - Error parsing user:', error)
      // Don't logout on error, just continue without authentication
      yield put(loginFailure('Failed to restore session'))
    }
  } else if (token && expiry && Date.now() >= parseInt(expiry)) {
    // Token expired
    console.log('checkAuthSaga - Token expired')
    yield put(logoutRequest())
  } else {
    console.log('checkAuthSaga - No valid auth found')
    // Don't redirect when no auth exists
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga)
  yield takeLatest(logoutRequest.type, logoutSaga)
  // Only run checkAuthSaga on client side to prevent hydration errors
  if (typeof window !== 'undefined') {
    yield call(checkAuthSaga)
  }
}