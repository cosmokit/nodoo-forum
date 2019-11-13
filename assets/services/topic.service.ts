import axios from "axios";
import { TOPICS_URL } from "../config";

function find(id: number): Promise<any> {
  return axios.get(`${TOPICS_URL}/${id}`).then(response => response.data);
}

export default { find };
