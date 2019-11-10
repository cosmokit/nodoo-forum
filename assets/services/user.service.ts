import axios from "axios";
import { USERS_URL } from "../config";

function register(credentials: {
  username: string;
  email: string;
  password: string;
}): Promise<any> {
  return axios.post(USERS_URL, credentials).then(response => response);
}

export default { register };
