import axios from "axios";

const API_URL: string = "http://localhost:8000/api";

function findAll() {
  return axios
    .get(`${API_URL}/categories`)
    .then(response => response.data["hydra:member"]);
}

export default { findAll };
