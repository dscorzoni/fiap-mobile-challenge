import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../lib/axios'
import { Role } from '@/types'
import { extractAccessToken } from './utils'

export async function login(email: string, password: string) {
  try {
    const response = await axios.post('/auth/login', {
      email,
      password,
    })
    const accessToken = extractAccessToken(response)
    if (response.status === 200) {
      if (accessToken) {
        await AsyncStorage.setItem('jwtToken', accessToken)
      } else {
        throw new Error('Access token is undefined')
      }
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return false
  }
}

export async function logout() {
  try {
    const response = await axios.post('/auth/logout')

    if (response.status === 200) {
      await AsyncStorage.removeItem('jwtToken')
      return true
    } else {
      throw new Error('Erro ao fazer logout')
    }
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    return false
  }
}
