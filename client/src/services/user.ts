import axios from 'axios'
import { serverOrigin } from '../main';

type UserProps = {
  email: string;
  password: string;
}

type UserReturnType = {
  token: string;
}

export const loginUser = async (data: UserProps): Promise<UserReturnType> => {
  const baseUrl = serverOrigin + '/api/users/login'
  const user = await axios.post(baseUrl, data)
  
  return user.data
}

export const registerUser = async (data: UserProps): Promise<UserReturnType> => {
  const baseUrl = serverOrigin + '/api/users/register'
  const user = await axios.post(baseUrl, data)
  
  return user.data
}

export const getUser = async () => {
  const baseUrl = serverOrigin + '/api/users'
  const user = await axios.get(baseUrl)

  return user.data
}

