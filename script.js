const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

const cities = [];

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    cities.push(...data);
  });

function displayMatches() {
  const matchArray = findMatches(searchInput.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(searchInput.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class='hl'>${searchInput.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class='hl'>${searchInput.value}</span>`
      );
      return `
    <li>
    <span class='name'>${cityName}, ${stateName}</span>
    <span class='population'>${numberWithCommas(place.population)} hab.</span>
    </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
