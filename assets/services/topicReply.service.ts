import axios from "axios";
import { TOPIC_REPLIES_URL } from "../config";

function create(credentials: any): Promise<any> {
  return axios.post(TOPIC_REPLIES_URL, credentials).then(response => response);
}

function update(credentials: any): Promise<any> {
  return axios
    .put(`${TOPIC_REPLIES_URL}/${credentials.id}`, credentials)
    .then(response => response);
}

function deleteReply(id: number): Promise<any> {
  return axios.delete(`${TOPIC_REPLIES_URL}/${id}`).then(response => response);
}

export default { create, update, deleteReply };
