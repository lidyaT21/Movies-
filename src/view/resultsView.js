import { constants } from "../constants.js";

export const createResultsElement = () => {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  const element = document.createElement("div");
  element.id = constants.RESULTS_ID;
  element.classList.add(constants.CONTAINER_CLASS);
  heading.textContent = "POPULAR MOVIES";
  heading.classList.add(constants.POPULAR_MOVIE_CLASS);
  section.appendChild(heading);
  section.appendChild(element);
  return section;
};
