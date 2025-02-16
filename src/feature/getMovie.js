import { constants } from "../constants.js";
export const getMovies = {
  byName: (search) => fetchMoviesByName(search),
  byId: (id) => fetchMovieById(id),
  random: () => fetchRandomMovies(),
};

/**
 * Fetch movies based on a search term.
 * @param {string} search - The movie name to search for.
 * @returns {Promise<Object[]>} - A promise resolving to an array of movie results.
 */
const fetchMoviesByName = async (search) => {
  try {
    showSpinner();
    const url = `${constants.API_URL}/search/movie?api_key=${
      constants.API_KEY
    }&query=${encodeURIComponent(search)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Movie not found`);
    }
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    hideSpinner();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by name:", error);
    hideSpinner();
  }
};
/**
 * Fetch a specific movie by its ID.
 * @param {number} id - The ID of the movie.
 * @returns {Promise<Object>} - A promise resolving to the movie details.
 */
const fetchMovieById = async (id) => {
  try {
    showSpinner();
    const url = `${constants.API_URL}/movie/${id}?api_key=${constants.API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Movie not found`);
    }
    const data = await response.json();

    // Delay hiding the spinner
    await new Promise((resolve) => setTimeout(resolve, 1500));
    hideSpinner();
    return data;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    hideSpinner();
  }
};

/**
 * Fetch a set amount of random popular movies.
 * @param {number} amount - The number of movies to fetch.
 * @returns {Promise<Object[]>} - A promise resolving to an array of random movies.
 */
const fetchRandomMovies = async () => {
  try {
    showSpinner();
    const popularUrl = `${constants.API_URL}/movie/popular?api_key=${constants.API_KEY}&page=1`;
    const response = await fetch(popularUrl);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Movie not found`);
    }
    const data = await response.json();
    const movies = data.results.sort(() => Math.random() - 0.5); // Shuffle results
    await new Promise((resolve) => setTimeout(resolve, 1500));
    hideSpinner();
    return movies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    hideSpinner();
  }
};
const showSpinner = () => {
  document.querySelector("." + constants.SPINNER).classList.add("show");
};

const hideSpinner = () => {
  document.querySelector("." + constants.SPINNER).classList.remove("show");
};
