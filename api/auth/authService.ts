import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../lib/axios'
import { extractAccessToken } from '../utils/token'
import { ERROR_MESSAGE } from '../utils/errors'
import { AxiosError } from 'axios'
import { Result } from '@/types'

export async function login(email: string, password: string): Promise<Result<void>> {
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
      return { success: true, value: undefined}
  } else {
      throw new Error()
    }
  } catch (error) {
    const message = (error as AxiosError).status === 401
      ? ERROR_MESSAGE.LOGIN_FAILED
      : ERROR_MESSAGE.INTERNAL_SERVER_ERROR
    
    return { success: false, error: message}
  }
}

export async function logout(): Promise<Result<void>> {
  try {
    const response = await axios.post('/auth/logout')

    if (response.status === 200) {
      await AsyncStorage.removeItem('jwtToken')
    return { success: true, value: undefined }
    } else {
      throw new Error('Erro ao fazer logout')
    }
  } catch (error) {
    return { success: false, error: ERROR_MESSAGE.INTERNAL_SERVER_ERROR}
  }
}
