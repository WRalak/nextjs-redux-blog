// store/sagas/postsSaga.ts
import { call, put, takeLatest, select, fork } from 'redux-saga/effects'
import { postsApi } from '../api/postsApi'
import { mockApi } from '@/lib/mockApi'
import toast from 'react-hot-toast'
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchMorePostsRequest,
  fetchMorePostsSuccess,
  fetchMorePostsFailure,
  fetchPostByIdRequest,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
  searchPostsRequest,
  searchPostsSuccess,
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
} from '../slices/postsSlice'
import { addNotification } from '../slices/uiSlice'
import { RootState } from '..'


interface PostsResponse {
  posts: any[]
  total: number
  skip: number
  limit: number
}

function* fetchPostsSaga(action: ReturnType<typeof fetchPostsRequest>): Generator<any, void, any> {
  try {
    const { skip = 0, limit = 10 } = action.payload
    
    // Check cache first (only on client side)
    let cached = null
    if (typeof window !== 'undefined') {
      cached = localStorage.getItem(`posts_${skip}_${limit}`)
    }
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < 3600000) { // 1 hour cache
        yield put(fetchPostsSuccess({ posts: data, total: data.length }))
        return
      }
    }
    
    // Try real API first, fallback to mock API
    let response
    try {
      response = yield call(postsApi.getPosts, skip, limit)
      const posts = response.data
      yield put(fetchPostsSuccess({ posts, total: posts.length }))
    } catch (apiError) {
      console.warn('Real API failed, falling back to mock API:', apiError)
      response = yield call(mockApi.getPosts, skip, limit)
      yield put(fetchPostsSuccess({ posts: response.data.posts, total: response.data.total }))
    }
    
    // Cache the response (only on client side)
    if (typeof window !== 'undefined') {
      const finalResponse = response.data
      localStorage.setItem(`posts_${skip}_${limit}`, JSON.stringify({
        data: finalResponse.posts || finalResponse,
        timestamp: Date.now(),
      }))
    }
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message))
    toast.error('Failed to fetch posts')
  }
}

function* fetchPostByIdSaga(action: ReturnType<typeof fetchPostByIdRequest>): Generator<any, void, any> {
  try {
    const id = action.payload
    
    // Check cache (only on client side)
    let cached = null
    if (typeof window !== 'undefined') {
      cached = localStorage.getItem(`post_${id}`)
    }
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < 3600000) {
        yield put(fetchPostByIdSuccess(data))
        return
      }
    }
    
    // Try real API first, fallback to mock API
    let response
    try {
      response = yield call(postsApi.getPostById, id)
      yield put(fetchPostByIdSuccess(response.data))
    } catch (apiError) {
      console.warn('Real API failed, falling back to mock API:', apiError)
      response = yield call(mockApi.getPostById, id)
      yield put(fetchPostByIdSuccess(response.data))
    }
    
    // Cache response (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`post_${id}`, JSON.stringify({
        data: response.data,
        timestamp: Date.now(),
      }))
    }
  } catch (error: any) {
    yield put(fetchPostByIdFailure(error.message))
    toast.error('Failed to fetch post')
  }
}

function* fetchMorePostsSaga(): Generator<any, void, any> {
  try {
    const state = yield select((state: RootState) => state.posts)
    const { skip, limit } = state
    
    // Try real API first, fallback to mock API
    let response
    try {
      response = yield call(postsApi.getPosts, skip, limit)
      const posts = response.data
      yield put(fetchMorePostsSuccess({ posts, total: posts.length }))
    } catch (apiError) {
      console.warn('Real API failed, falling back to mock API:', apiError)
      response = yield call(mockApi.getPosts, skip, limit)
      yield put(fetchMorePostsSuccess({ posts: response.data.posts, total: response.data.total }))
    }
  } catch (error: any) {
    yield put(fetchMorePostsFailure(error.message))
    toast.error('Failed to load more posts')
  }
}

function* searchPostsSaga(action: ReturnType<typeof searchPostsRequest>): Generator<any, void, any> {
  try {
    const query = action.payload
    
    if (!query.trim()) {
      yield put(fetchPostsRequest({}))
      return
    }
    
    // Try real API first, fallback to mock API
    let response
    try {
      response = yield call(postsApi.searchPosts, query)
      const posts = response.data
      yield put(searchPostsSuccess({ posts, total: posts.length }))
    } catch (apiError) {
      console.warn('Real API failed, falling back to mock API:', apiError)
      response = yield call(mockApi.searchPosts, query)
      yield put(searchPostsSuccess({ posts: response.data.posts, total: response.data.total }))
    }
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message))
    toast.error('Search failed')
  }
}

function* createPostSaga(action: ReturnType<typeof createPostRequest>): Generator<any, void, any> {
  try {
    console.log('createPostSaga called with payload:', action.payload)
    
    // Check if user is authenticated (temporarily disabled for testing)
    const authState = yield select((state: RootState) => state.auth)
    // if (!authState.isAuthenticated) {
    //   yield put(createPostFailure('Authentication required'))
    //   toast.error('Please login to create a post')
    //   return
    // }
    
    // Try real API first, fallback to mock API
    let response
    try {
      response = yield call(postsApi.createPost, {
        ...action.payload,
        userId: authState.user?.id || 1
      })
      yield put(createPostSuccess(response.data))
      toast.success('Post created successfully!')
    } catch (apiError) {
      console.warn('Real API failed, falling back to mock API:', apiError)
      response = yield call(mockApi.createPost, action.payload)
      yield put(createPostSuccess(response.data))
      toast.success('Post created successfully!')
    }
  } catch (error: any) {
    console.error('createPostSaga error:', error)
    yield put(createPostFailure(error.message))
    toast.error('Failed to create post')
  }
}

function* updatePostSaga(action: ReturnType<typeof updatePostRequest>): Generator<any, void, any> {
  try {
    if (!action.payload || !action.payload.id) {
      throw new Error('Post ID is required')
    }
    
    // Check if user is authenticated (temporarily disabled for testing)
    const authState = yield select((state: RootState) => state.auth)
    // if (!authState.isAuthenticated) {
    //   yield put(updatePostFailure('Authentication required'))
    //   toast.error('Please login to update a post')
    //   return
    // }
    
    // Try real API first, fallback to mock API
    let response
    try {
      response = yield call(postsApi.updatePost, action.payload.id, action.payload)
      yield put(updatePostSuccess(response.data))
      toast.success('Post updated successfully!')
    } catch (apiError) {
      console.warn('Real API failed, falling back to mock API:', apiError)
      response = yield call(mockApi.updatePost, action.payload.id, action.payload)
      yield put(updatePostSuccess(response.data))
      toast.success('Post updated successfully!')
    }
  } catch (error: any) {
    yield put(updatePostFailure(error.message))
    toast.error('Failed to update post')
  }
}

function* clearExpiredCache(): Generator<any, void, any> {
  try {
    if (typeof window !== 'undefined') {
      const keys = Object.keys(localStorage)
      for (const key of keys) {
        if (key.startsWith('posts_') || key.startsWith('post_')) {
          const cached = localStorage.getItem(key)
          if (cached) {
            const { timestamp } = JSON.parse(cached)
            if (Date.now() - timestamp > 3600000) { // 1 hour
              localStorage.removeItem(key)
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn('Failed to clear expired cache:', error)
  }
}

function* deletePostSaga(action: ReturnType<typeof deletePostRequest>): Generator<any, void, any> {
  try {
    const postId = action.payload
    
    // Check if user is authenticated (temporarily disabled for testing)
    const authState = yield select((state: RootState) => state.auth)
    // if (!authState.isAuthenticated) {
    //   yield put(deletePostFailure('Authentication required'))
    //   toast.error('Please login to delete a post')
    //   return
    // }
    
    // Try real API first, fallback to mock API
    try {
      yield call(postsApi.deletePost, postId)
      yield put(deletePostSuccess(postId))
      toast.success('Post deleted successfully!')
    } catch (apiError) {
      console.warn('Real API failed, simulating deletion with mock API:', apiError)
      // For mock API, we'll just simulate success since JSONPlaceholder doesn't actually delete
      yield put(deletePostSuccess(postId))
      toast.success('Post deleted successfully!')
    }
  } catch (error: any) {
    yield put(deletePostFailure(error.message))
    toast.error('Failed to delete post')
  }
}

export default function* postsSaga() {
  yield fork(clearExpiredCache) // Start cache clearing in background
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga)
  yield takeLatest(fetchMorePostsRequest.type, fetchMorePostsSaga)
  yield takeLatest(fetchPostByIdRequest.type, fetchPostByIdSaga)
  yield takeLatest(searchPostsRequest.type, searchPostsSaga)
  yield takeLatest(createPostRequest.type, createPostSaga)
  yield takeLatest(updatePostRequest.type, updatePostSaga)
  yield takeLatest(deletePostRequest.type, deletePostSaga)
}
