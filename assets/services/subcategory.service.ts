import axios from "axios";
import { SUBCATEGORIES_URL } from "../config";
import Cache from './cache.service';

async function find(id: number): Promise<any> {
  const cachedSubcategory = await Cache.get(`subcategory-${id}`);
  if (cachedSubcategory) return cachedSubcategory;
  return axios
    .get(`${SUBCATEGORIES_URL}/${id}`)
    .then(response => {
      const subcategory = response.data;
      Cache.set(`subcategory-${id}`, subcategory)
      return subcategory;
    });
}

async function findAll(): Promise<any> {
  const cachedSubcategories = await Cache.get('subcategories');
  if (cachedSubcategories) return cachedSubcategories;
  return axios.get(SUBCATEGORIES_URL).then(response => {
    const subcategories = response.data;
    Cache.set('subcategories', subcategories);
    return subcategories;
  });
}

async function findTopicsPaginated(id: number, currentPage: number): Promise<any> {
  const cachedTopics = await Cache.get(`topics-${id}-${currentPage}`);
  if (cachedTopics) return cachedTopics;
  return axios
    .get(`${SUBCATEGORIES_URL}/${id}/topics?page=${currentPage}`)
    .then(response => {
      const topics = response.data;
      Cache.set(`topics-${id}-${currentPage}`, topics)
      return topics;
    });
}

export default { find, findAll, findTopicsPaginated };
