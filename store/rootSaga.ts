// store/rootSaga.ts
import { all, fork } from 'redux-saga/effects'
import authSaga from './sagas/authSaga'
import postsSaga from './sagas/postsSaga'
import commentsSaga from './sagas/commentsSaga'

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(postsSaga),
    fork(commentsSaga),
  ])
}