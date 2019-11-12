import axios from "axios";
import { SUBCATEGORIES_URL } from "../config";

function find(id: number): Promise<any> {
  return axios
    .get(`${SUBCATEGORIES_URL}/${id}`)
    .then(response => response.data);
}

export default { find };
