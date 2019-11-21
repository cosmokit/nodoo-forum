const API_URL: string | undefined = process.env.API_URL;

export const LOGIN_URL: string = `${API_URL}/authentication_token`;

export const USERS_URL: string = `${API_URL}/users`;

export const CATEGORIES_URL: string = `${API_URL}/categories`;

export const SUBCATEGORIES_URL: string = `${API_URL}/subcategories`;

export const TOPICS_URL: string = `${API_URL}/topics`;
