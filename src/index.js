import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const BASE_URL = `https://restcountries.com/v3.1`;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function fetchCountry(countryInput) {
  return fetch(
    `${BASE_URL}/name/${countryInput}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw Error(response.statusText);
  });
}

inputEl.addEventListener('input', onInputEl);
function onInputEl() {
  countryInfo.innerHTML = '';
  const countryInput = inputEl.value.trim();

  fetchCountry(countryInput).then(showProfile);

  console.log(countryInput);

  if (countryInput === '') {
    console.log('очистить данные');
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }
}

function showProfile(countries) {
  console.log(countries);

  if (countries.length === 1) {
    return chooseMarkup(countries[0]);
  }

  renderCountries(countries);
}

function renderCountries(countries) {
  countryInfo.insertAdjacentHTML(
    'beforeend',
    countries
      .map(country => {
        return `<div><img src="${country.flags.svg}" alt="flag${country.name.common}" height="30"/><span>${country.name.common}</span></div>`;
      })
      .join(''),
  );
}

function chooseMarkup({ name, capital, flags, population, languages }) {
  countryList.innerHTML = `<li class="country-item">${name.official}</li>
            <li class=""><img src="${flags.svg}" alt="yoast seo" height="30"/></li>
            <li class="country-item">${capital}</li>
            <li class="country-item">${population}</li>
            <li class="country-item">${languages}</li>`;
}
// }
// chooseMarkup(countries);
// function renderCountries({ flags, name }) {
//   countryInfo.innerHTML = `<div><img src="${flags.svg}" alt="flag${name.common}" height="30"/><span>${name.common}</span></div>`;
// }
// const markup = countries.map(country => {
//   console.log(country);
//   countryInfo.innerHTML = `<div><img src="${country.flags.svg}" alt="flag${country.name.common}" height="30"/><span>${country.name.common}</span></div>`;
// });
// // renderCountries(countries);
// // function renderCountries(countries) {
// //   return countryList.insertAdjacentHTML(
// //     'beforeend',
// //     countries
// //       .map(country => {
// //         return `<div><img src="${country.flags.svg}" alt="flag${country.name.common}" height="30"/><span>${country.name.common}</span></div>`;
// //       })
// //       .join(''),
// //   );}

//
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

//  const markupCountryInfo = countries
//    .map(country => {
//      return `<div><img src="${flags.svg}" alt="flag${name.common}" height="30"/><span>${name.common}</span></div>`;
//    })
//    .join('');
//  countryInfo.insertAdjacentHTML('beforeend', markupCountryInfo);
//  console.log(countryInfo);
//  const markup = countries;

// фиг знает что\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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

// const markupCountryInfo = countries
//   .map(country => {
//     return `<div><img src="${flags.svg}" alt="flag${name.common}" height="30"/><span>${name.common}</span></div>`;
//   })
//   .join('');
// countryInfo.insertAdjacentHTML('beforeend', markupCountryInfo);
// console.log(countryInfo);
// const markup = countries;
// запас
// import './css/styles.css';

// const DEBOUNCE_DELAY = 300;
// const BASE_URL = `https://restcountries.com/v3.1`;
// const inputEl = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// inputEl.addEventListener('input', onInputEl);
// function onInputEl() {
//   const countryInput = inputEl.value.trim();
//   console.log(countryInput);
//   fetchCountry(countryInput).then(showProfile);
//   if (countryInput === '') {
//     console.log('очистить данные');
//   }
// }

// function fetchCountry(countryInput) {
//   return fetch(`${BASE_URL}/name/${countryInput}`).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw Error('error 404');
//   });
// }

// function showProfile(countries) {
//   if (countries.length === 1) {
//     chooseMarkup(countries[0]);
//     console.log(countries);
//   }
//   const markup = countries.map(country => {
//     console.log(country);
//     countryInfo.innerHTML = `<div><img src="${country.flags.svg}" alt="flag${country.name.common}" height="30"/><span>${country.name.common}</span></div>`;
//   });

//   function chooseMarkup({ name, capital, flags, population, languages }) {
//     countryList.innerHTML = `<li class="country-item">${name.official}</li>
//             <li class=""><img src="${flags.svg}" alt="yoast seo" height="30"/></li>
//             <li class="country-item">${capital}</li>
//             <li class="country-item">${population}</li>
//             <li class="country-item">${languages}</li>`;
//   }

//   // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// }
