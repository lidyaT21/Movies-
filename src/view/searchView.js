import { constants } from "../constants.js";

export const createSearchElement = () => {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");

  form.id = constants.SEARCH_FORM_ID;
  input.id = constants.SEARCH_INPUT_ID;
  button.id = constants.SEARCH_BUTTON_ID;
  input.placeholder = "Search Movie by name";
  button.type = "button";
  form.onsubmit = (e) => e.preventDefault();

  button.innerHTML = "search";

  form.appendChild(input);
  form.appendChild(button);
  return form;
};
