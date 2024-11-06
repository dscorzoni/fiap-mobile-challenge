import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
export async function getPosts() {
  try {
    const token = await AsyncStorage.getItem('jwtToken')
    if (!token) {
      return false
    }
    const instance = axios.create({
        baseURL: '',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `access_token=${token}`
        }
      })
    const response = await instance.get('/posts/')
    return response.data
  } catch (error) {
    console.error('Erro ao carregar posts', error)
    return false
  }
}
