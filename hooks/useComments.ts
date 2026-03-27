// hooks/useComments.ts
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { fetchCommentsRequest, addCommentRequest, clearComments } from '@/store/slices/commentsSlice'

export const useComments = () => {
  const dispatch = useDispatch()
  const { comments, loading, error } = useSelector((state: RootState) => state.comments)

  const fetchComments = (postId: number) => {
    dispatch(fetchCommentsRequest(postId))
  }

  const addComment = (postId: number, body: string, parentId?: number) => {
    dispatch(addCommentRequest({ postId, body, parentId }))
  }

  const resetComments = () => {
    dispatch(clearComments())
  }

  return {
    comments,
    loading,
    error,
    fetchComments,
    addComment,
    resetComments,
  }
}