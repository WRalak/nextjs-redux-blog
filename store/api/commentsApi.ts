import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com'

export const commentsApi = {
  getComments: async (postId: number) => {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`)
    return response
  },

  addComment: async (postId: number, comment: string) => {
    const response = await axios.post(`${API_BASE_URL}/comments`, {
      postId,
      body: comment,
      name: 'Current User',
      email: 'user@example.com'
    })
    return response
  }
}
