import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects'
import { commentsApi } from '../api/commentsApi'
import toast from 'react-hot-toast'
import { 
  fetchCommentsRequest, 
  fetchCommentsSuccess, 
  fetchCommentsFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure
} from '../slices/commentsSlice'
import { RootState } from '..'

function* fetchComments(action: ReturnType<typeof fetchCommentsRequest>): Generator<any, void, any> {
  try {
    const postId = action.payload
    
    // Check cache first (only on client side)
    let cached = null
    if (typeof window !== 'undefined') {
      cached = localStorage.getItem(`comments_${postId}`)
    }
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < 1800000) { // 30 minutes cache
        yield put(fetchCommentsSuccess(data))
        return
      }
    }
    
    const response = yield call(commentsApi.getComments, postId)
    const comments = response.data
    
    // Transform the data to match our Comment interface
    const transformedComments = comments.map((comment: any) => ({
      id: comment.id,
      body: comment.body,
      postId: comment.postId,
      user: {
        id: comment.id,
        username: comment.name?.replace(/\s+/g, '').toLowerCase() || `user${comment.id}`,
        fullName: comment.name || 'User'
      },
      parentId: comment.parentId,
      replies: [],
      createdAt: new Date().toISOString() // JSONPlaceholder doesn't provide createdAt
    }))
    
    // Cache the response (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`comments_${postId}`, JSON.stringify({
        data: transformedComments,
        timestamp: Date.now(),
      }))
    }
    
    yield put(fetchCommentsSuccess(transformedComments))
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch comments'
    yield put(fetchCommentsFailure(errorMessage))
    toast.error(errorMessage)
  }
}

function* addComment(action: ReturnType<typeof addCommentRequest>): Generator<any, void, any> {
  try {
    const { postId, body, parentId } = action.payload
    
    // Check if user is authenticated (temporarily disabled for testing)
    const authState = yield select((state: RootState) => state.auth)
    // if (!authState.isAuthenticated) {
    //   yield put(addCommentFailure('Authentication required'))
    //   toast.error('Please login to add a comment')
    //   return
    // }
    
    const response = yield call(commentsApi.addComment, postId, body, parentId)
    
    // Transform the response to match our Comment interface
    const newComment = {
      id: response.data.id,
      body: response.data.body,
      postId: response.data.postId,
      user: {
        id: authState.user?.id || 1,
        username: authState.user?.username || 'currentuser',
        fullName: authState.user?.fullName || 'Current User'
      },
      parentId: response.data.parentId,
      replies: [],
      createdAt: new Date().toISOString()
    }
    
    yield put(addCommentSuccess(newComment))
    
    // Clear cache for this post's comments
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`comments_${postId}`)
    }
    
    toast.success(parentId ? 'Reply added successfully!' : 'Comment added successfully!')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to add comment'
    yield put(addCommentFailure(errorMessage))
    toast.error(errorMessage)
  }
}

export default function* commentsSaga(): Generator<any, void, any> {
  yield all([
    takeLatest(fetchCommentsRequest.type, fetchComments),
    takeLatest(addCommentRequest.type, addComment),
  ])
}