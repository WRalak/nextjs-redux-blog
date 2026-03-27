// hooks/usePosts.ts
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import {
  fetchPostsRequest,
  fetchPostByIdRequest,
  searchPostsRequest,
  setCurrentPage,
  clearCurrentPost,
} from '@/store/slices/postsSlice'

export const usePosts = () => {
  const dispatch = useDispatch()
  const { posts, currentPost, total, loading, error, skip, limit, searchQuery } = useSelector(
    (state: RootState) => state.posts
  )

  const fetchPosts = (page: number = 1) => {
    const skip = (page - 1) * limit
    dispatch(fetchPostsRequest({ skip, limit }))
  }

  const fetchPostById = (id: number) => {
    dispatch(fetchPostByIdRequest(id))
  }

  const searchPosts = (query: string) => {
    dispatch(searchPostsRequest(query))
  }

  const changePage = (page: number) => {
    dispatch(setCurrentPage(page))
    fetchPosts(page)
  }

  const clearPost = () => {
    dispatch(clearCurrentPost())
  }

  return {
    posts,
    currentPost,
    total,
    loading,
    error,
    searchQuery,
    currentPage: Math.floor(skip / limit) + 1,
    totalPages: Math.ceil(total / limit),
    fetchPosts,
    fetchPostById,
    searchPosts,
    changePage,
    clearPost,
  }
}