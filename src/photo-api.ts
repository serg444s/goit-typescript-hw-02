import axios from "axios";

export const fetchImages = async (page, query) => {
  const API_KEY = "azs8rW0W72OCT-Zd76iLD71_6ahhIu_39FvO7jKHhU0";
  axios.defaults.baseURL = "https://api.unsplash.com/search/photos";
  const response = await axios.get(
    `?client_id=${API_KEY}&page=${page}&query=${query}`
  );
  return response.data;
};

// https://api.unsplash.com/search/photos?client_id=azs8rW0W72OCT-Zd76iLD71_6ahhIu_39FvO7jKHhU0&page=1&query=cat
