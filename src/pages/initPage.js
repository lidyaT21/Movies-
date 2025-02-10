import { createWelcomeElement } from "../view/welcomeView.js";
import { createSearchElement } from "../view/searchView.js";
import { createResultsElement } from "../view/resultsView.js";
import { createErrorElement } from "../view/errorView.js";
import { getMovies } from "../feature/getMovie.js";
import { constants } from "../constants.js";
import { createMovieElement } from "../view/movieDetailView.js";
import { createResultElement } from "../view/resultView.js";

export const initPage = async () => {
  const userInterface = document.getElementById(constants.USER_INTERFACE_ID);
  // Clear the user interface
  userInterface.innerHTML = "";
  if (document.getElementById(constants.ERROR_ELEMENT_ID)) {
    document.getElementById(constants.ERROR_ELEMENT_ID).remove();
  }

  userInterface.appendChild(createWelcomeElement());
  userInterface.appendChild(createSearchElement());

  const results = createResultsElement();
  userInterface.appendChild(results);
  PopularMovies(document.getElementById(constants.RESULTS_ID));
  document
    .getElementById(constants.SEARCH_FORM_ID)
    .addEventListener("submit", searchMoviesHandler);

  document
    .getElementById(constants.SEARCH_BUTTON_ID)
    .addEventListener("click", searchMoviesHandler);
};

// popullar Movies
const PopularMovies = async (results) => {
  try {
    results.innerHTML = "";

    const movies = await getMovies.random(12);
    console.log(movies);
    movies.forEach((movie) => {
      const movieElement = createResultElement(movie);
      if (movieElement) {
        results.appendChild(movieElement);
      }
    });
    console.log(movies);

    readMoreButtonEventListener();
  } catch (error) {
    if (results.childNodes.length === 0) {
      results.parentNode.appendChild(
        createErrorElement("Failed to load popular movies. Try again.")
      );
    }
  }
};

const searchMoviesHandler = () => {
  searchMovies(document.getElementById(constants.RESULTS_ID));
};
const searchMovies = async (results) => {
  const popular = document.querySelector("." + constants.POPULAR_MOVIE_CLASS);
  if (popular) {
    popular.remove();
  }
  try {
    const searchInput = document.getElementById(constants.SEARCH_INPUT_ID);
    const searchValue = searchInput.value.trim();

    results.innerHTML = "";

    // Remove existing error messages
    const existingError = results.parentNode.querySelector(".error-message");
    if (existingError) existingError.remove();

    if (searchValue === "") {
      results.parentNode.appendChild(
        createErrorElement("Please enter a movie name and try again.")
      );
      return;
    }
    console.log(results.parentNode);
    console.log("Search value:", searchValue);

    const movies = await getMovies.byName(searchValue);
    console.log("Fetched movies:", movies);

    if (!movies || movies.length === 0) {
      results.parentNode.appendChild(
        createErrorElement("No movies found. Try again.")
      );
      return;
    }

    // Append results to the DOM
    movies.forEach((result) => {
      const movieElement = createResultElement(result);

      if (movieElement) {
        results.appendChild(movieElement);
      }
    });

    readMoreButtonEventListener();
  } catch (error) {
    results.parentNode.appendChild(
      createErrorElement("API error, please try again.")
    );
    console.error("Search error:", error);
  }
};
