import { constants } from "../constants.js";
export const createErrorElement = (error, isButton = false) => {
  const element = document.createElement("h2");
  element.innerText = error;
  element.id = constants.ERROR_ELEMENT_ID;
  if (!isButton) {
    return element;
  }
  const button = document.createElement("button");
  button.innerText = "Go home";
  button.id = constants.HOME_BUTTON_ID;
  button.classList.add(constants.BUTTON_CLASS);
  element.appendChild(button);
  return element;
};
