// store/sagas/postsSaga.ts
import { call, put, takeLatest, select } from 'redux-saga/effects'
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
        yield put(fetchPostsSuccess({ posts: data.posts, total: data.total }))
        return
      }
    }
    
    const response = yield call(mockApi.getPosts, skip, limit)
    
    // Cache the response (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`posts_${skip}_${limit}`, JSON.stringify({
        data: response.data,
        timestamp: Date.now(),
      }))
    }
    
    yield put(fetchPostsSuccess({ posts: response.data.posts, total: response.data.total }))
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
    
    const response = yield call(mockApi.getPostById, id)
    
    // Cache response (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`post_${id}`, JSON.stringify({
        data: response.data,
        timestamp: Date.now(),
      }))
    }
    
    yield put(fetchPostByIdSuccess(response.data))
  } catch (error: any) {
    yield put(fetchPostByIdFailure(error.message))
    toast.error('Failed to fetch post')
  }
}

function* fetchMorePostsSaga(): Generator<any, void, any> {
  try {
    const state = yield select((state: RootState) => state.posts)
    const { skip, limit } = state
    
    const response = yield call(mockApi.getPosts, skip, limit)
    
    yield put(fetchMorePostsSuccess({ posts: response.data.posts, total: response.data.total }))
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
    
    const response = yield call(mockApi.searchPosts, query)
    
    yield put(searchPostsSuccess({ posts: response.data.posts, total: response.data.total }))
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message))
    toast.error('Search failed')
  }
}

function* createPostSaga(action: ReturnType<typeof createPostRequest>): Generator<any, void, any> {
  try {
    console.log('createPostSaga called with payload:', action.payload)
    const response = yield call(mockApi.createPost, action.payload)
    console.log('createPostSaga response:', response)
    
    yield put(createPostSuccess(response.data))
    toast.success('Post created successfully!')
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
    
    const response = yield call(mockApi.updatePost, action.payload.id, action.payload)
    
    yield put(updatePostSuccess(response.data))
    toast.success('Post updated successfully!')
  } catch (error: any) {
    yield put(updatePostFailure(error.message))
    toast.error('Failed to update post')
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga)
  yield takeLatest(fetchMorePostsRequest.type, fetchMorePostsSaga)
  yield takeLatest(fetchPostByIdRequest.type, fetchPostByIdSaga)
  yield takeLatest(searchPostsRequest.type, searchPostsSaga)
  yield takeLatest(createPostRequest.type, createPostSaga)
  yield takeLatest(updatePostRequest.type, updatePostSaga)
}
