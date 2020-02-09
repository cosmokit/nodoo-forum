import axios from "axios";
import { USERS_URL } from "../config";
import Cache from './cache.service';

function register(credentials: {
  username: string;
  email: string;
  password: string;
}): Promise<any> {
  return axios.post(USERS_URL, credentials).then(response => response);
}

async function find(id: number): Promise<any> {
  const cachedUser = await Cache.get(`user-${id}`);
  if (cachedUser) return cachedUser;
  return axios.get(`${USERS_URL}/${id}`).then(response => {
    const user = response.data;
    Cache.set(`user-${id}`, user);
    return user;
  });
}

function sendResetPasswordEmail(email: string): Promise<any> {
  return axios
    .post(`${USERS_URL}/forgot_password`, { email })
    .then(response => response);
}

function resetPassword(token: string, password: string): Promise<any> {
  return axios
    .post(`${USERS_URL}/reset_password`, { token, password })
    .then(response => response);
}

export default { register, find, sendResetPasswordEmail, resetPassword };
