import axios from "axios";
import { USERS_URL } from "../config";

function register(credentials: {
  username: string;
  email: string;
  password: string;
}): Promise<any> {
  return axios.post(USERS_URL, credentials).then(response => response);
}

function find(id: number): Promise<any> {
  return axios.get(`${USERS_URL}/${id}`).then(response => response.data);
}

function sendResetPasswordEmail(email: string): Promise<any> {
  return axios
    .post(`${USERS_URL}/forgot_password`, { email })
    .then(response => response);
}

function resetPassword(token: string, password: string): Promise<any> {
  return axios
      .post(`${USERS_URL}/reset_password`, {token, password})
      .then(response => response);
}

export default { register, find, sendResetPasswordEmail, resetPassword };
