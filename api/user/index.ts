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

export async function updateUser(email: string, body: User): Promise<Result<User>> {
  try {
    const response = await axios.patch(`/user?email=${email}`, body);
    return { success: true, value: response.data }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}
  }
}

export async function deleteUser(email: string): Promise<Result<void>> {
  try {
    await axios.delete(`/user?email=${email}`);
    return { success: true, value: undefined }
  } catch (error) {
    return { success: false, error: getErrorMessage((error as AxiosError).status)}
  }
}
export async function getUserList(role: string) {
  try {
    const response = await axios.get(`/user/users?role=${role}`);
    return response.data
  } catch (error) {
    return false
  }
}

export async function getUserById(email: string) {
  try {
    const response = await axios.get(`/user?email=${email}`);
    return response.data
  } catch (error) {
    return false
  }
}