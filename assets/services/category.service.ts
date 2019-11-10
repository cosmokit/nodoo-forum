import axios from "axios";
import { CATEGORIES_URL } from "../config";

function findAll(): Promise<any> {
  return axios
    .get(CATEGORIES_URL)
    .then(response => response.data["hydra:member"]);
}

export default { findAll };
