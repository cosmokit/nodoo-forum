import axios from "axios";
import { SUBCATEGORIES_URL } from "../config";

function find(id: number): Promise<any> {
  return axios
    .get(`${SUBCATEGORIES_URL}/${id}`)
    .then(response => response.data);
}

function findAll(): Promise<any> {
  return axios.get(SUBCATEGORIES_URL).then(response => response.data);
}

function findTopicsPaginated(id: number, currentPage: number): Promise<any> {
  return axios
    .get(`${SUBCATEGORIES_URL}/${id}/topics?page=${currentPage}`)
    .then(response => response.data);
}

export default { find, findAll, findTopicsPaginated };
