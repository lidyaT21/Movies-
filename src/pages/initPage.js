import { createWelcomeElement } from "../view/welcomeView.js";
import { createSearchElement } from "../view/searchView.js";
import { createResultsElement } from "../view/resultsView.js";
import { createErrorElement } from "../view/errorView.js";
import { getMovies } from "../feature/getMovie.js";
import { constants } from "../constants.js";
import { createMovieElement } from "../view/movieDetailView.js";
import { createResultElement } from "../view/resultView.js";

// Initialize the page and load UI elements
export const initPage = async () => {
  const userInterface = document.getElementById(constants.USER_INTERFACE_ID);
  userInterface.innerHTML = "";

  // Remove any existing error messages
  const errorElement = document.getElementById(constants.ERROR_ELEMENT_ID);
  if (errorElement) errorElement.remove();

  // Append welcome and search elements
  userInterface.append(createWelcomeElement(), createSearchElement());

  const results = createResultsElement();
  userInterface.appendChild(results);

  // Load popular movies and set up event listeners
  loadPopularMovies(document.getElementById(constants.RESULTS_ID));
  document
    .getElementById(constants.SEARCH_FORM_ID)
    .addEventListener("submit", searchMoviesHandler);
  document
    .getElementById(constants.SEARCH_BUTTON_ID)
    .addEventListener("click", searchMoviesHandler);
};

// Fetch and display popular movies
const loadPopularMovies = async (results) => {
  try {
    results.innerHTML = "";
    const movies = await getMovies.random(12);
    movies.forEach((movie) => {
      const movieElement = createResultElement(movie);
      if (movieElement) results.appendChild(movieElement);
    });
    attachReadMoreListeners();
  } catch (error) {
    if (!results.hasChildNodes()) {
      results.parentNode.appendChild(
        createErrorElement("Failed to load popular movies. Try again.")
      );
    }
  }
};

// Handle search form submission
const searchMoviesHandler = () => {
  searchMovies(document.getElementById(constants.RESULTS_ID));
};

// Fetch and display searched movies
const searchMovies = async (results) => {
  // Remove popular movies section if present
  document.querySelector("." + constants.POPULAR_MOVIE_CLASS)?.remove();
  try {
    const searchInput = document.getElementById(constants.SEARCH_INPUT_ID);
    const searchValue = searchInput.value.trim();
    results.innerHTML = "";

    // Remove existing error messages
    results.parentNode.querySelector(".error-message")?.remove();

    if (!searchValue) {
      results.parentNode.appendChild(
        createErrorElement("Please enter a movie name and try again.")
      );
      return;
    }

    const movies = await getMovies.byName(searchValue);
    if (!movies || movies.length === 0) {
      results.parentNode.appendChild(
        createErrorElement("No movies found. Try again.")
      );
      return;
    }

    // Append search results to the DOM
    movies.forEach((result) => {
      const movieElement = createResultElement(result);
      if (movieElement) results.appendChild(movieElement);
    });

    attachReadMoreListeners();
  } catch (error) {
    results.parentNode.appendChild(
      createErrorElement("API error, please try again.")
    );
    console.error("Search error:", error);
  }
};

// Attach event listeners to "Read More" buttons
const attachReadMoreListeners = () => {
  document
    .querySelectorAll("." + constants.VIEW_MORE_BUTTON_CLASS)
    .forEach((button) => {
      button.addEventListener("click", (event) =>
        showMovieHandler(event.target.closest("[id]").id)
      );
    });
};

// Fetch and display movie details when "Read More" is clicked
const showMovieHandler = async (id) => {
  const movie = await getMovies.byId(id);
  displayMovie(movie);
  setBackgroundImage(movie.backdrop_path);
};

// Display the selected movie details
const displayMovie = (movie) => {
  const userInterface = document.getElementById(constants.USER_INTERFACE_ID);
  userInterface.innerHTML = "";
  userInterface.appendChild(createMovieElement(movie));

  // Attach event listener to "Back" button
  document
    .querySelector("." + constants.BACK_BUTTON_CLASS)
    .addEventListener("click", initPage);
};

// Set the background image for the movie details page
const setBackgroundImage = (backgroundPath) => {
  const overlayDiv = document.createElement("div");
  Object.assign(overlayDiv.style, {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${backgroundPath})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "-1",
    opacity: "0.1",
  });
  document.getElementById(constants.MOVIE_DETAILS_ID).prepend(overlayDiv);
};
