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

export async function deletePost(postId: string) {
  try {
    const response = await axios.delete('/posts/' + postId)
    return response.status
  } catch (error) {
    console.error('Erro ao deletar post.', error)
    return false
  }
}