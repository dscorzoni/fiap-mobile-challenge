import axios from '../lib/axios'
import { Role } from '@/types'

export async function createUser(params: {
  username: string,
  email: string,
  password: string,
  role: Role
}) {
  try {
    const response = await axios.post('/user', params);
    
    if (response.status === 201) {
      return true
    } else {
      throw new Error('Erro ao cadastrar usuário')
    }
  } catch (error) {
    console.error('Erro ao cadastrar:', error)
    return false;
  }
}

