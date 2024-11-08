import axios from '../lib/axios'
import { Result, Role } from '@/types'
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

