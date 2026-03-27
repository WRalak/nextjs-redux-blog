// store/slices/postsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  image?: string
}

interface PostsState {
  posts: Post[]
  currentPost: Post | null
  total: number
  skip: number
  limit: number
  loading: boolean
  error: string | null
  searchQuery: string
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  total: 0,
  skip: 0,
  limit: 10,
  loading: false,
  error: null,
  searchQuery: '',
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest: (state, action: PayloadAction<{ skip?: number; limit?: number }>) => {
      state.loading = true
      state.error = null
    },
    fetchPostsSuccess: (state, action: PayloadAction<{ posts: Post[]; total: number }>) => {
      state.loading = false
      state.posts = action.payload.posts
      state.total = action.payload.total
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    fetchPostByIdRequest: (state, action: PayloadAction<number>) => {
      state.loading = true
      state.error = null
    },
    fetchPostByIdSuccess: (state, action: PayloadAction<Post>) => {
      state.loading = false
      state.currentPost = action.payload
    },
    fetchPostByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    searchPostsRequest: (state, action: PayloadAction<string>) => {
      state.loading = true
      state.searchQuery = action.payload
    },
    searchPostsSuccess: (state, action: PayloadAction<{ posts: Post[]; total: number }>) => {
      state.loading = false
      state.posts = action.payload.posts
      state.total = action.payload.total
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.skip = (action.payload - 1) * state.limit
    },
    clearCurrentPost: (state) => {
      state.currentPost = null
    },
  },
})

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostByIdRequest,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
  searchPostsRequest,
  searchPostsSuccess,
  setCurrentPage,
  clearCurrentPost,
} = postsSlice.actions

export default postsSlice.reducer