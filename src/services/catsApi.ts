import type { CatImage } from '../types/cat';

const API_URL = 'https://api.thecatapi.com/v1/images/search';

export const fetchCats = async (page: number, limit: number = 20): Promise<CatImage[]> => {
  const response = await fetch(`${API_URL}?limit=${limit}&page=${page}`);
  const data = await response.json();
  return data;
};