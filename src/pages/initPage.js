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
