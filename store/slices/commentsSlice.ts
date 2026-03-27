// store/slices/commentsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Comment {
  id: number
  body: string
  postId: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

interface CommentsState {
  comments: Comment[]
  loading: boolean
  error: string | null
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentsRequest: (state, action: PayloadAction<number>) => {
      state.loading = true
      state.error = null
    },
    fetchCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.loading = false
      state.comments = action.payload
    },
    fetchCommentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    addCommentRequest: (state, action: PayloadAction<{ postId: number; body: string }>) => {
      state.loading = true
    },
    addCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.loading = false
      state.comments.unshift(action.payload)
    },
    addCommentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    clearComments: (state) => {
      state.comments = []
    },
  },
})

export const {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  clearComments,
} = commentsSlice.actions

export default commentsSlice.reducer