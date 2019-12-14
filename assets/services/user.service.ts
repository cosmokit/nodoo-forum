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

export default { register, find };
