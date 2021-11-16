import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const BASE_URL = `https://restcountries.com/v3.1`;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));

function infoReset() {
  countryInfo.innerHTML = '';
}
function ListReset() {
  countryList.innerHTML = '';
}
function notifyFailure() {
  Notify.failure('Oops, there is no country with that name', {
    showOnlyTheLastOne: true,
  });
}
function notifyInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.', {
    showOnlyTheLastOne: true,
  });
}
function fetchCountry(countryInput) {
  return fetch(
    `${BASE_URL}/name/${countryInput}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    if (countryInput !== '') {
      notifyFailure();
    }

    throw Error(response.statusText);
  });
}

function onInputEl() {
  infoReset();
  const countryInput = inputEl.value.trim();
  if (countryInput === '') {
    infoReset();
    ListReset();
  }
  fetchCountry(countryInput).then(showCountry);
}

function showCountry(countries) {
  ListReset();
  infoReset();
  renderCountriesInfo(countries);

  if (countries.length === 1) {
    infoReset();
    return renderCountriesList(countries[0]);
  }
  if (countries.length > 10) {
    infoReset();
    return notifyInfo();
  }
}

function renderCountriesInfo(countries) {
  countryInfo.insertAdjacentHTML(
    'beforeend',
    countries
      .map(country => {
        return `<div class="searchRow"><img src="${country.flags.svg}" 
        alt="flag${country.name.common}" height="20"/>
        <h1 class="zagolovok">${country.name.common}</h1>
        </div>`;
      })
      .join(''),
  );
}

function renderCountriesList({ name, capital, flags, population, languages }) {
  countryList.innerHTML = `
  <div class="card">
  <div class="row">
  <img src="${flags.svg}"  alt="flag${name.common}" 
  height="30"/>
  <h1 class="rowZagolovok">${name.common}</h1>
  </div>
  <div class="text-block">
  <p class="text"><span class="description">Capital:</span> ${capital}</p>
  <p class="text"><span class="description">Population:</span> ${population}</p>
  <p class="text"><span class="description">Languages:</span> ${languages}</p>
  </div>
   </div>`;
}

// import './css/styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// var debounce = require('lodash.debounce');

// const DEBOUNCE_DELAY = 300;
// const BASE_URL = `https://restcountries.com/v2`;
// const inputEl = document.querySelector('#search-box');
// const countryInfo = document.querySelector('.country-info');
// const countryList = document.querySelector('.country-list');

// inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));

// function listReset() {
//   countryList.innerHTML = '';
// }
// function infoReset() {
//   countryInfo.innerHTML = '';
// }
// function notifyFailure() {
//   Notify.failure('Oops, there is no country with that name', {
//     showOnlyTheLastOne: true,
//   });
// }
// function notifyInfo() {
//   Notify.info('Too many matches found. Please enter a more specific name.', {
//     showOnlyTheLastOne: true,
//   });
// }
// function fetchCountry(countryInput) {
//   return fetch(
//     `${BASE_URL}/name/${countryInput}?fields=name,capital,population,flags,languages`,
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     if (countryInput !== '') {
//       notifyFailure();
//     }

//     throw Error(response.statusText);
//   });
// }

// function onInputEl() {
//   listReset();
//   const countryInput = inputEl.value.trim();
//   if (countryInput === '') {
//     listReset();
//     infoReset();
//   }
//   fetchCountry(countryInput).then(showCountry);
// }

// function showCountry(countries) {
//   infoReset();
//   listReset();
//   renderCountriesInfo(countries);

//   if (countries.length === 1) {
//     listReset();
//     return renderCountriesList(countries[0]);
//   }
//   if (countries.length > 10) {
//     listReset();
//     return notifyInfo();
//   }
// }

// function renderCountriesInfo(countries) {
//   countryList.insertAdjacentHTML(
//     'beforeend',
//     countries
//       .sort((firstName, secondName) => {
//         firstName.name.localeCompare(secondName.name);
//       })
//       .map(({ name, flags }) => {
//         return `<li class="searchRow"><img src="${flags.svg}"
//         alt="flag${name}" height="20"/>
//         <h1 class="zagolovok">${name}</h1>
//         </li>`;
//       })
//       .join(''),
//   );
// }

// // function renderCountriesList({ name, capital, flags, population, languages }) {
// //   countryList.innerHTML = `
// //   <div class="card">
// //   <div class="row">
// //   <img src="${flags.svg}"  alt="flag${name.common}"
// //   height="30"/>
// //   <h1 class="rowZagolovok">${name.common}</h1>
// //   </div>
// //   <div class="text-block">
// //   <p class="text"><span class="description">Capital:</span> ${capital}</p>
// //   <p class="text"><span class="description">Population:</span> ${population}</p>
// //   <p class="text"><span class="description">Languages:</span> ${languages}</p>
// //   </div>
// //    </div>`;
// // }

// function renderCountriesList(countries) {
//   countries.map(({ name, capital, flags, population, languages }) => {
//     countryInfo.innerHTML = `
//   <div class="row">
//   <img src="${flags.svg}"  alt="flag${name}"
//   height="30"/>
//   <h1 class="rowZagolovok">${name}</h1>
//   </div>
//   <div class="text-block">
//   <p class="text"><span class="description">Capital:</span> ${capital}</p>
//   <p class="text"><span class="description">Population:</span> ${population}</p>
//   <p class="text"><span class="description">Languages:</span> ${[languages]}</p>
//   </div>`;
//   });
// }
