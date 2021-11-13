import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const BASE_URL = `https://restcountries.com/v3.1`;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', onInputEl);
function onInputEl() {
  const countryInput = inputEl.value;
  // console.log(countryInput);
  fetchCountry(countryInput).then(showProfile);
}

function fetchCountry(countryInput) {
  return fetch(`${BASE_URL}/name/${countryInput}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw Error('error 404');
  });
}

function showProfile(countries) {
  console.log(countries);
  const markup = countries.map(country => {
    chooseMarkup(country);
    console.log(country);
  });

  // if (countryInput === name.common) {

  function chooseMarkup({ name, capital, flags, population, languages }) {
    countryInfo.innerHTML = `<div><img src="${flags.svg}" alt="flag${name.common}" height="30"/><span>${name.common}</span></div>`;

    countryList.innerHTML = `<li class="country-item">${name.official}</li>
            <li class=""><img src="${flags.svg}" alt="yoast seo" height="30"/></li>
            <li class="country-item">${capital}</li>
            <li class="country-item">${population}</li>
            <li class="country-item">${languages}</li>`;
    // }
  }

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // function chooseMarkup(country) {}
  // countries.map(({ name }) => {
  //   if (countryInput === name.common) {
  //     const markupCountryList = countries
  //       .map(({ name, capital, flags, population, languages }) => {
  //         return `
  //         <li class="country-item">${name.official}</li>
  //         <li class=""><img src="${flags.svg}" alt="yoast seo" height="30"/></li>
  //         <li class="country-item">${capital}</li>
  //         <li class="country-item">${population}</li>
  //         <li class="country-item">${languages}</li>`;
  //       })
  //       .join('');
  //     countryList.insertAdjacentHTML('beforeend', markupCountryList);
  //     console.log(countryList);
  //   }
  // });
  // const markupCountryInfo = countries
  //   .map(country => {
  //     return `<div><img src="${flags.svg}" alt="flag${name.common}" height="30"/><span>${name.common}</span></div>`;
  //   })
  //   .join('');
  // countryInfo.insertAdjacentHTML('beforeend', markupCountryInfo);
  // console.log(countryInfo);
}
