import './css/styles.css';

const DEBOUNCE_DELAY = 300;

// fetch(`https://restcountries.com/v3.1/name/name`)
//   .then(response => {
//     response.json();
//   })
//   .then(name => {
//     console.log(name);
//   });

function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/name`;
  console.log(fetch(url));

  return fetch(url).then(response => response.json());
}
console.log(fetchCountries());
// function renderCountry(name) {
//   console.log(name);
// }
// API;
