import { constants } from "../constants.js";
export const getMovies = {
  byName: (search) => fetchMoviesByName(search),
  byId: (id) => fetchMovieById(id),
  random: (amount) => fetchRandomMovies(amount),
};

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

const fetchMovieById = async (id) => {
  try {
    showSpinner();
    const url = `${constants.API_URL}/movie/${id}?api_key=${constants.API_KEY}`;
    console.log(url);

    const response = await fetch(url);
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

const fetchRandomMovies = async (amount) => {
  try {
    showSpinner();
    const popularUrl = `${constants.API_URL}/movie/popular?api_key=${constants.API_KEY}&page=1`;
    const response = await fetch(popularUrl);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Movie not found`);
    }
    const data = await response.json();
    const movies = data.results
      .sort(() => 0.5 - Math.random())
      .slice(0, amount);
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
