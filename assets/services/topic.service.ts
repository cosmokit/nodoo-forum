import axios from "axios";
import { TOPICS_URL } from "../config";
import Cache from './cache.service';

async function find(id: number): Promise<any> {
  const cachedTopic = await Cache.get(`topic-${id}`);
  if (cachedTopic) return cachedTopic;
  return axios.get(`${TOPICS_URL}/${id}`).then(response => {
    const topic = response.data;
    Cache.set(`topic-${id}`, topic);
    return topic;
  });
}

async function findRepliesPaginated(id: number, currentPage: number): Promise<any> {
  const cachedReplies = await Cache.get(`replies-${id}-${currentPage}`);
  if (cachedReplies) return cachedReplies;
  return axios
    .get(`${TOPICS_URL}/${id}/replies?page=${currentPage}`)
    .then(response => {
      const replies = response.data;
      Cache.set(`replies-${id}-${currentPage}`, replies)
      return replies;
    });
}

function create(credentials: {
  title: string;
  content: string;
  author: string;
  subcategory: string;
}): Promise<any> {
  return axios.post(`${TOPICS_URL}`, credentials);
}

function update(credentials: any): Promise<any> {
  return axios
    .put(`${TOPICS_URL}/${credentials.id}`, credentials)
    .then(response => response);
}

function deleteTopic(id: number): Promise<any> {
  return axios.delete(`${TOPICS_URL}/${id}`).then(response => response);
}

export default { find, findRepliesPaginated, create, update, deleteTopic };
