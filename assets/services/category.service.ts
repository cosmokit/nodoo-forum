import axios from "axios";
import { CATEGORIES_URL } from "../config";
import Cache from './cache.service';

async function findAll(): Promise<any> {
  const cachedCategories = await Cache.get('categories');
  if (cachedCategories) return cachedCategories;
  return axios
    .get(CATEGORIES_URL)
    .then(response => {
      const categories = response.data["hydra:member"];
      Cache.set('categories', categories);
      return categories;
    });
}

export default { findAll };
