import { all, call, put, takeLatest } from 'redux-saga/effects'
import { commentsApi } from '../api/commentsApi'
import { 
  fetchCommentsRequest, 
  fetchCommentsSuccess, 
  fetchCommentsFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure
} from '../slices/commentsSlice'

function* fetchComments(action: ReturnType<typeof fetchCommentsRequest>): Generator<any, void, any> {
  try {
    const response = yield call(commentsApi.getComments, action.payload)
    yield put(fetchCommentsSuccess(response.data))
  } catch (error) {
    yield put(fetchCommentsFailure(error instanceof Error ? error.message : 'Failed to fetch comments'))
  }
}

function* addComment(action: { payload: { postId: number; comment: string; parentId?: number } }): Generator<any, void, any> {
  try {
    const response = yield call(commentsApi.addComment, action.payload.postId, action.payload.comment, action.payload.parentId)
    yield put(addCommentSuccess(response.data))
  } catch (error) {
    yield put(addCommentFailure(error instanceof Error ? error.message : 'Failed to add comment'))
  }
}

export default function* commentsSaga(): Generator<any, void, any> {
  yield all([
    takeLatest(fetchCommentsRequest.type, fetchComments),
    takeLatest(addCommentRequest.type, addComment),
  ])
}