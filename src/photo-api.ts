import axios from "axios";

const API_KEY = "azs8rW0W72OCT-Zd76iLD71_6ahhIu_39FvO7jKHhU0";
axios.defaults.baseURL = "https://api.unsplash.com/search/photos";

export const fetchImages = async <T>(
  page: number,
  query: string
): Promise<T> => {
  const { data } = await axios.get(
    `?client_id=${API_KEY}&page=${page}&query=${query}`
  );
  return data;
};
