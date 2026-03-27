// store/sagas/authSaga.ts
import { call, put, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios'
import toast from 'react-hot-toast'
import { loginRequest, loginSuccess, loginFailure, logoutSuccess } from '../slices/authSlice'
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

function* loginSaga(action: ReturnType<typeof loginRequest>): Generator<any, void, LoginResponse> {
  try {
    const response: LoginResponse = yield call(
      axios.post,
      `${API_BASE_URL}/auth/login`,
      {
        username: action.payload.username,
        password: action.payload.password,
        expiresInMins: 30,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    ).then(res => res.data)

    const user = {
      id: response.id,
      username: response.username,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      image: response.image,
    }

    // Save to localStorage
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('auth_expiry', Date.now() + 30 * 60 * 1000).toString()

    yield put(loginSuccess({ user, token: response.token }))
    toast.success('Login successful!')
    yield put(addNotification({ message: 'Welcome back!', type: 'success' }))
    
    // Redirect to dashboard
    window.location.href = '/dashboard'
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
    yield put(loginFailure(errorMessage))
    toast.error(errorMessage)
    yield put(addNotification({ message: errorMessage, type: 'error' }))
  }
}

function* logoutSaga(): Generator<any, void, any> {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('auth_expiry')
    yield put(logoutSuccess())
    toast.success('Logged out successfully')
    yield put(addNotification({ message: 'You have been logged out', type: 'info' }))
    window.location.href = '/'
  } catch (error) {
    console.error('Logout error:', error)
  }
}

function* checkAuthSaga(): Generator<any, void, any> {
  const token = localStorage.getItem('token')
  const expiry = localStorage.getItem('auth_expiry')
  
  if (token && expiry && Date.now() < parseInt(expiry)) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    yield put(loginSuccess({ user, token }))
  } else if (token && expiry && Date.now() >= parseInt(expiry)) {
    // Token expired
    yield call(logoutSaga)
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga)
  yield takeLatest('auth/logoutRequest', logoutSaga)
  yield call(checkAuthSaga)
}