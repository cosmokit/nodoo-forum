import axios from "axios";
import { TOPICS_URL } from "../config";

function find(id: number): Promise<any> {
  return axios.get(`${TOPICS_URL}/${id}`).then(response => response.data);
}

function findRepliesPaginated(id: number, currentPage: number): Promise<any> {
  return axios
    .get(`${TOPICS_URL}/${id}/replies?page=${currentPage}`)
    .then(response => response.data);
}

function update(credentials: any): Promise<any> {
  return axios
    .put(`${TOPICS_URL}/${credentials.id}`, credentials)
    .then(response => response);
}

function deleteTopic(id: number): Promise<any> {
  return axios.delete(`${TOPICS_URL}/${id}`).then(response => response);
}

export default { find, findRepliesPaginated, update, deleteTopic };
