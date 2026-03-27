// store/sagas/postsSaga.ts
import { call, put, takeLatest, select } from 'redux-saga/effects'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostByIdRequest,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
  searchPostsRequest,
  searchPostsSuccess,
} from '../slices/postsSlice'
import { addNotification } from '../slices/uiSlice'
import { RootState } from '..'

const API_BASE_URL = 'https://dummyjson.com'

interface PostsResponse {
  posts: any[]
  total: number
  skip: number
  limit: number
}

function* fetchPostsSaga(action: ReturnType<typeof fetchPostsRequest>): Generator<any, void, PostsResponse> {
  try {
    const { skip = 0, limit = 10 } = action.payload
    
    // Check cache first
    const cached = localStorage.getItem(`posts_${skip}_${limit}`)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < 3600000) { // 1 hour cache
        yield put(fetchPostsSuccess({ posts: data.posts, total: data.total }))
        return
      }
    }
    
    const response: PostsResponse = yield call(
      axios.get,
      `${API_BASE_URL}/posts`,
      { params: { skip, limit } }
    ).then(res => res.data)
    
    // Cache the response
    localStorage.setItem(`posts_${skip}_${limit}`, JSON.stringify({
      data: response,
      timestamp: Date.now(),
    }))
    
    yield put(fetchPostsSuccess({ posts: response.posts, total: response.total }))
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message))
    toast.error('Failed to fetch posts')
  }
}

function* fetchPostByIdSaga(action: ReturnType<typeof fetchPostByIdRequest>): Generator<any, void, any> {
  try {
    const id = action.payload
    
    // Check cache
    const cached = localStorage.getItem(`post_${id}`)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < 3600000) {
        yield put(fetchPostByIdSuccess(data))
        return
      }
    }
    
    const response = yield call(axios.get, `${API_BASE_URL}/posts/${id}`).then(res => res.data)
    
    // Cache the response
    localStorage.setItem(`post_${id}`, JSON.stringify({
      data: response,
      timestamp: Date.now(),
    }))
    
    yield put(fetchPostByIdSuccess(response))
  } catch (error: any) {
    yield put(fetchPostByIdFailure(error.message))
    toast.error('Failed to fetch post')
  }
}

function* searchPostsSaga(action: ReturnType<typeof searchPostsRequest>): Generator<any, void, PostsResponse> {
  try {
    const query = action.payload
    
    if (!query.trim()) {
      yield put(fetchPostsRequest({}))
      return
    }
    
    const response: PostsResponse = yield call(
      axios.get,
      `${API_BASE_URL}/posts/search`,
      { params: { q: query } }
    ).then(res => res.data)
    
    yield put(searchPostsSuccess({ posts: response.posts, total: response.total }))
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message))
    toast.error('Search failed')
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga)
  yield takeLatest(fetchPostByIdRequest.type, fetchPostByIdSaga)
  yield takeLatest(searchPostsRequest.type, searchPostsSaga)
}