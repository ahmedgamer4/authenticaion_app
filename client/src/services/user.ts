import axios from 'axios'
import { serverOrigin } from '../main';

type UserProps = {
  email: string;
  password: string;
}

type UserReturnType = {
  token: string;
}

export const loginUser = async (data: UserProps) => {
  const baseUrl = serverOrigin + '/api/users/login'
  await axios.post(baseUrl, data)
}

export const registerUser = async (data: UserProps): Promise<UserReturnType> => {
  const baseUrl = serverOrigin + '/api/users/register'
  const user = await axios.post(baseUrl, data)
  
  return user.data
}

export const logoutUser = async () => {
  const baseUrl = serverOrigin + '/api/users/logout'
  await axios.get(baseUrl)
}

export const getUser = async () => {
  const baseUrl = serverOrigin + '/api/users'
  const user = await axios.get(baseUrl)

  return user.data
}

