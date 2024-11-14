import axios from '../lib/axios'
import { Result, Role, User } from '@/types'
import { getErrorMessage } from '../utils/errors';
import { AxiosError } from 'axios';

export async function createUser(params: {
  username: string,
  email: string,
  password: string,
  role: Role
}): Promise<Result<void>> {

  try {
    await axios.post('/user', params);
    return { success: true , value: undefined }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}
  }
}

export async function getUsers(): Promise<Result<User[]>> {
  try {
    const response = await axios.get('/user');
    return { success: true, value: response.data }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}
  }
}