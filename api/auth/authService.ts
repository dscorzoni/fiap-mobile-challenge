import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../lib/axios'
import { NavigationProp } from '@react-navigation/native'
import { router } from 'expo-router'
import { Alert } from 'react-native'

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
      return true // Login bem-sucedido
    } else {
      return false // Falha no login
    }
  } catch (error) {
    console.error('Erro de autenticação:', error)
    return false
  }
}

export async function logout() {
  try {
    const response = await axios.post('/auth/logout')
    if (response.status !== 200) {
      throw new Error('Erro ao fazer logout')
    } else {
      await AsyncStorage.removeItem('jwtToken')
      Alert.alert('Usuário deslogado')
      router.replace('/login') // Redireciona para a tela de login
    }
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}

export async function userLogged(): Promise<boolean> {
  try {
    const token = await AsyncStorage.getItem('jwtToken')
    if (!token) {
      return false
    }

    const response = await axios.get('/user/logged', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.status === 200
  } catch (error) {
    console.error('Erro ao verificar se o usuário está logado:', error)
    return false
  }
}
const extractAccessToken = (response: any): string | null => {
  const setCookieHeader = response.headers['set-cookie']
  if (!setCookieHeader || typeof setCookieHeader !== 'object') {
    return null
  }

  for (const key in setCookieHeader) {
    if (setCookieHeader.hasOwnProperty(key)) {
      const cookie = setCookieHeader[key]
      if (cookie.includes('access_token=')) {
        const token = cookie
          .split(';')
          .find((item: string) => item.trim().startsWith('access_token='))
        if (token) {
          return token.split('=')[1]
        }
      }
    }
  }

  return null
}

export async function handleLogin(email: string, password: string) {
  const success = await login(email, password)
  if (success) {
    router.push('/home')
  } else {
    Alert.alert('Erro ao fazer login', 'Verifique suas credenciais.')
  }
}
