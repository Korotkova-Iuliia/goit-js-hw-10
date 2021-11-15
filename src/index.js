import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const BASE_URL = `https://restcountries.com/v3.1`;
const inputEl = document.querySelector('#search-box');
const countryNewInfo = document.querySelector('.country-info');
const countryNEWList = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));

function listNEWReset() {
  countryNEWList.innerHTML = '';
}
function infoNewReset() {
  countryNewInfo.innerHTML = '';
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
  listNEWReset();
  const countryInput = inputEl.value.trim();
  if (countryInput === '') {
    listNEWReset();
    infoNewReset();
  }
  fetchCountry(countryInput).then(showCountry);
}

function showCountry(countries) {
  infoNewReset();
  listNEWReset();
  renderCountriesInfo(countries);

  if (countries.length === 1) {
    listNEWReset();
    return renderCountriesList(countries[0]);
  }
  if (countries.length > 10) {
    listNEWReset();
    return notifyInfo();
  }
}

function renderCountriesInfo(countries) {
  countryNEWList.insertAdjacentHTML(
    'beforeend',
    countries.map(country => {
      console.log(country);
      return `<li class="searchRow"><img src="${country.flags.svg}" 
        alt="flag${country.name.common}" height="20"/>
        <h1 class="zagolovok">${country.name.common}</h1>
        </li>`;
    }),

    // .join(''),
  );
  countryNEWList.sort(function (a, b) {
    var nameA = a.name.common.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.common.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  console.log(countryNEWList);
  // const sortByName = [...countryNEWList].sort((a, b) => {
  //   return a - b;
  // });
}

function renderCountriesList({ name, capital, flags, population, languages }) {
  countryNewInfo.innerHTML = `

  <div class="row">
  <img src="${flags.svg}"  alt="flag${name.common}" 
  height="30"/>
  <h1 class="rowZagolovok">${name.common}</h1>
  </div>
  <div class="text-block">
  <p class="text"><span class="description">Capital:</span> ${capital}</p>
  <p class="text"><span class="description">Population:</span> ${population}</p>
  <p class="text"><span class="description">Languages:</span> ${languages}</p>
  </div>`;
}
