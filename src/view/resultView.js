import { constants } from "../constants.js";

export const createResultElement = (movies) => {
  const element = document.createElement("div");
  element.classList.add(constants.CARD_CLASS);

  // Create anchor tag linking to movie details

  // Create image element
  const img = document.createElement("img");
  img.classList.add(constants.CARD_IMG_CLASS);
  img.alt = movies.title;
  img.src = movies.poster_path
    ? `https://image.tmdb.org/t/p/w500${movies.poster_path}`
    : "../images/no-image.jpg";

  // Create card body
  const cardBody = document.createElement("div");
  cardBody.classList.add(constants.CARD_BODY_CLASS);

  // Create title
  const title = document.createElement("h5");
  title.classList.add(constants.CARD_TITLE_CLASS);
  title.textContent = movies.title;

  // Create paragraph for release date
  const releaseDate = document.createElement("p");
  releaseDate.classList.add(constants.CARD_BODY_CLASS);
  const small = document.createElement("small");
  small.classList.add("text-muted");
  small.textContent = `Release: ${movies.release_date}`;
  releaseDate.appendChild(small);

  // Create Read More button
  const button = document.createElement("button");
  button.classList.add(constants.READ_MORE_BUTTON_CLASS);
  button.textContent = "Read More";

  // Append elements together
  cardBody.appendChild(title);
  cardBody.appendChild(releaseDate);
  cardBody.appendChild(button);

  element.appendChild(img);
  element.appendChild(cardBody);
  element.id = movies.id;
  return element;
};
