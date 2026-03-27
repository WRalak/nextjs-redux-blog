// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import postsReducer from './slices/postsSlice'
import commentsReducer from './slices/commentsSlice'
import uiReducer from './slices/uiSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
  ui: uiReducer,
})