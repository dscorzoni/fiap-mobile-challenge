import { PostData } from '@/types'
import axios from '../lib/axios'

export async function getPosts() {
  try {
    const response = await axios.get('/posts/')
    return response.data
  } catch (error) {
    console.error('Erro ao carregar posts', error)
    return false
  }
}

export async function getPostsById(id: string) {
  try {
    const response = await axios.get(`/posts/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao carregar post', error)
    return false
  }
}
export async function updatePost(data: any) {
  try {
    const response = await axios.put(`/posts/${data.id}`, data)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar post', error)
    return false
  }
}

export async function deletePost(postId: string) {
  try {
    const response = await axios.delete('/posts/' + postId)
    return response.status
  } catch (error) {
    console.error('Erro ao deletar post.', error)
    return false
  }
}

export async function createPost(data: PostData) {
  try {
    const response = await axios.post('/posts/', data)
    return response.data
  } catch (error) {
    console.error('Erro ao criar post', error)
    return false
  }
}