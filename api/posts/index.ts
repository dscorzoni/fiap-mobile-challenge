import { Post, PostData } from '@/types'
import axios from '../lib/axios'
import { getErrorMessage } from '../utils/errors';
import { AxiosError } from 'axios';

export async function getPosts() {
  try {
    const response = await axios.get('/posts/')
    return { success: true , value: response.data }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}
  }
}

export async function getPostsById(id: string) {
  try {
    const response = await axios.get(`/posts/${id}`)
    return { success: true , value: response.data }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}
  }
}

export async function getPostsByUser(email: string) {
  try {
    const response = await axios.get(`/posts/user?email=${email}`)
    return { success: true , value: response.data }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}

  }
}

export async function updatePost(id: string, post: Partial<PostData>) {
  try {
    const response = await axios.put(`/posts/${id}`, post)
    return { success: true , value: response.data }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}
  }
}

export async function deletePost(postId: string) {
  try {
    const response = await axios.delete('/posts/' + postId)
    return { success: true , value: response.status }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}
  }
}

export async function createPost(data: PostData) {
  try {
    const response = await axios.post('/posts/', data)
    return { success: true , value: response.data }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}
  }
}
