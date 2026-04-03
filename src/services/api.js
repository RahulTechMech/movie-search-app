import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (query) => {
  try {
    const url = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    const res = await axios.get(url);
    return res.data.results;
  } catch (error) {
    throw error;
  }
};
