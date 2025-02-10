import { constants } from "../constants.js";
export function createMovieElement(result) {
  //   const element = document.createElement("div");
  //   element.classList.add(constants.CARD_CLASS);
  //   element.id = constants.MOVIE_ID;
  //   // Go back button
  //   const button = document.createElement("button");
  //   button.classList.add(constants.BUTTON_CLASS, constants.BACK_BUTTON_CLASS);
  //   button.innerText = "Back To Movies";
  //   element.appendChild(button);

  //   // h2 title
  //   const title = document.createElement("h2");
  //   title.innerText = result.original_title;
  //   title.classList.add(constants.CARD_TITLE_CLASS);
  //   element.appendChild(title);

  //   // img poster
  //   const image = document.createElement("img");
  //   image.src = result.poster_path
  //     ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
  //     : "../images/no-image.jpg";
  //   image.classList.add(constants.CARD_IMG_CLASS);
  //   element.appendChild(image);

  //   const topContent = document.createElement("div");
  //   topContent.innerHTML = `
  //     <h2>${result.title}</h2>
  //     <p><i class="fas fa-star text-primary"></i> ${result.vote_average.toFixed(
  //       1
  //     )} / 10</p>
  //     <p class="text-muted">Release Date: ${result.release_date}</p>
  //     <p>${result.overview}</p>
  //     <h5>Genres</h5>
  //     <ul class="list-group">
  //       ${result.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
  //     </ul>
  //   `;
  //   element.appendChild(topContent);

  //   const detailsBottom = document.createElement("div");
  //   detailsBottom.classList.add(constants.MOVIE_BOTTOM_CLASS);

  //   detailsBottom.innerHTML = `
  //       <h2>Movie Info</h2>
  //       <ul>
  //         <li><span class="text-secondary">Budget:</span> $${result.budget}</li>
  //         <li><span class="text-secondary">Revenue:</span> $${result.revenue}</li>
  //         <li><span class="text-secondary">Runtime:</span> ${
  //           result.runtime
  //         } minutes</li>
  //         <li><span class="text-secondary">Status:</span> ${result.status}</li>
  //       </ul>
  //       <h4>Production Companies</h4>
  //       <div class="list-group">
  //         ${result.production_companies
  //           .map((company) => `<span>${company.name}</span>`)
  //           .join(", ")}
  //       </div>
  //     `;

  //   element.appendChild(detailsBottom);

  //   return element;
  // }

  const section = document.createElement("section");
  section.classList.add(constants.MOVIE_CONTAINER_CLASS);
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add(constants.BACK_CLASS);
  const button = document.createElement("button");
  button.classList.add(constants.BUTTON_CLASS);
  button.innerText = "Back To Movies";
  buttonDiv.appendChild(button);
  section.appendChild(buttonDiv);
  const movieDetail = document.createElement("div");
  movieDetail.id = constants.MOVIE_DETAILS_ID;
  const topDetail = document.createElement("div");
  topDetail.classList.add(constants.TOP_DETAILS_CLASS);
  const imageDiv = document.createElement("div");
  // detailsTop.classList.add(constants.DETAILS_TOP_CLASS)
  // image poster
  const image = document.createElement("img");
  image.src = result.poster_path
    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
    : "../images/no-image.jpg";
  image.classList.add(constants.CARD_IMG_CLASS);
  imageDiv.appendChild(image);
  const movieInfo = document.createElement("div");
  movieInfo.innerHTML = `
    <h2>${result.title}</h2>
    <p><i class="fas fa-star text-primary"></i> ${result.vote_average.toFixed(
      1
    )} / 10</p>
    <p class="text-muted">Release Date: ${result.release_date}</p>
    <p>${result.overview}</p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${result.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
  `;

  topDetail.appendChild(imageDiv);
  topDetail.appendChild(movieInfo);

  const bottomDetial = document.createElement("div");
  bottomDetial.classList.add(constants.BOTTOM_DETAILS_CLASS);

  bottomDetial.innerHTML = `
      <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $${result.budget}</li>
        <li><span class="text-secondary">Revenue:</span> $${result.revenue}</li>
        <li><span class="text-secondary">Runtime:</span> ${
          result.runtime
        } minutes</li>
        <li><span class="text-secondary">Status:</span> ${result.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
        ${result.production_companies
          .map((company) => `<span>${company.name}</span>`)
          .join(", ")}
      </div>
    `;
  movieDetail.appendChild(topDetail);
  movieDetail.appendChild(bottomDetial);
  section.appendChild(movieDetail);
  return section;
}
