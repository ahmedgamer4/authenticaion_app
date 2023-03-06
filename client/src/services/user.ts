import axios from 'axios'
import { serverOrigin } from '../main';

type LoginUserProps = {
  email: string;
  password: string;
}

type LoginUserReturnType = {
  token: string;
}

export const loginUser = async (data: LoginUserProps): Promise<LoginUserReturnType> => {
  const baseUrl = serverOrigin + '/api/users/login'
  const user = await axios.post(baseUrl, data)
  
  return user.data
}

export const googleLogin = async () => {
  const baseUrl = serverOrigin + '/api/users/auth/google'
  const user = await axios.get(baseUrl)

  return user.data
}
