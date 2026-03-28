import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com'

export const postsApi = {
  getPosts: async (skip = 0, limit = 10) => {
    const response = await axios.get(`${API_BASE_URL}/posts?_start=${skip}&_limit=${limit}`)
    return response
  },

  getPostById: async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`)
    return response
  },

  searchPosts: async (query: string) => {
    const response = await axios.get(`${API_BASE_URL}/posts?q=${encodeURIComponent(query)}`)
    return response
  },

  createPost: async (postData: any) => {
    const response = await axios.post(`${API_BASE_URL}/posts`, postData)
    return response
  },

  updatePost: async (id: number, postData: any) => {
    const response = await axios.put(`${API_BASE_URL}/posts/${id}`, postData)
    return response
  },

  deletePost: async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/posts/${id}`)
    return response
  }
}
