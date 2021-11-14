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
  renderCountriesInfo(countries);
  if (countries.length === 1) {
    infoReset();
    return renderCountriesList(countries[0]);
  }
  if (countries.length > 10) {
    return notifyInfo();
  }
}

function renderCountriesInfo(countries) {
  countryInfo.insertAdjacentHTML(
    'beforeend',
    countries
      .map(country => {
        return `<div><img src="${country.flags.svg}" alt="flag${country.name.common}" height="30"/><span>${country.name.common}</span></div>`;
      })
      .join(''),
  );
}

function renderCountriesList({ name, capital, flags, population, languages }) {
  countryList.innerHTML = ` 
  <img src="${flags.svg}" alt="yoast seo" height="30"/>
  <h1 class="country-item">${name.official}</h1>
  <p class="country-item">${capital}</p>
  <p class="country-item">${population}</p>
  <p class="country-item">${languages}</p>`;
}
