import './css/styles.css';
// import { fetchCountries } from './fetchCountries';
// import { fetchCountries2 } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const BASE_URL = `https://restcountries.com/v3.1`;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

inputEl.addEventListener('input', onInputEl);
function onInputEl(e) {
  const countryInput = inputEl.value;
  // console.log(countryInput);
  function fetchCountries() {
    return fetch(`${BASE_URL}/name/${countryInput}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error('error 404');
      })
      .then(countries => {
        console.log(countries[0]);
        return countries;
      });
  }
  console.log(fetchCountries());
}

// const markup = countries
//   .map(({ capital }) => {
//     return `<li class="country-info"><p>${capital}</p></li>`;
//   })
//   .join('');
// countryList.insertAdjacentHTML('beforeend', markup);
// console.log(countryList);

// function renderCountries(countries) {
//   const markup = countries
//     .map(({ common }) => {
//       return console.log(common);
//       //   return `<ul class="country-list">${common}</ul>
//       // <div class="country-info">
//       // //  <li class="country-languages__link">${name}</li>
//       //  </div>`;
//     })
//     .join('');
//   countryList.insertAdjacentHTML('beforeend', markup);
// }

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//     "flags": {
//   "svg": "https://restcountries.com/data/per.svg",
//   "png": "https://restcountries.com/data/png/per.png"
// }

// // no рабочий код\\\\\\\\\\\\\\\\\\\\\\\\\
// import './css/styles.css';
// // import { fetchCountries } from './fetchCountries';
// // import { fetchCountries2 } from './fetchCountries';
// const DEBOUNCE_DELAY = 300;
// const BASE_URL = `https://restcountries.com/v3.1`;
// const inputEl = document.querySelector('#search-box');
// const countryList = document.querySelector('country-list');
// let countryInput = '';

// inputEl.addEventListener('input', e => {
//   const countryInput = inputEl.value;
//   fetchCountries(countryInput).then(countries => {
//     return countries;
//   });
// });

// console.log(fetchCountries());

// function fetchCountries(countryInput) {
//   return fetch(`${BASE_URL}/name/${countryInput}`).then(response => {
//     if (!response.ok) {
//       throw Error('error 404');
//     }
//     return response.json();
//   });
// }
