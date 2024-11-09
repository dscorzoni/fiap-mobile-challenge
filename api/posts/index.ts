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
