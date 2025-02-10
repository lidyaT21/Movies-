/**
 * Create the welcome screen
 * @returns {Element}
 */

export const createWelcomeElement = () => {
  const element = document.createElement("section");
  element.classList = "welcome";
  const heading = document.createElement("h1");
  heading.innerText = `🍿 Welcome to Movie Finder 🍿`;
  element.appendChild(heading);
  return element;
};
