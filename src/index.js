import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
// var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const resultContainer = document.querySelector('.country-info');
const resultList = document.querySelector('.country-list');

document
  .querySelector('input#search-box')
  .addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt) {
  clearMarkup();
  const countryName = evt.target.value.trim();
  if (!countryName) {
    // clearMarkup();
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length === 1) {
        oneCountry(countries[0]);
      } else if (countries.length > 1 && countries.length <= 10) {
        listOfCountries(countries);
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}
function oneCountry({ name, capital, population, flag, languages }) {
  const markup = `
  <div class="title-wrapper">
  <img src="${flag}" alt="${name}" width=60>
  <h1>${name}</h1>
</div>
<p class="label">Capital: <span class="label-value">${capital}</span></p>
<p class="label">Population: <span class="label-value">${population}</span></p>
<p class="label">Languages: <span class="label-value">${Object.values(
    languages
  ).join(', ')}</span></p>`;

  resultContainer.innerHTML = markup;
}

function listOfCountries(countries) {
  const markup = countries
    .map(({ flag, name }) => {
      return `<li class="list-item">
      <img src="${flag}" alt="${name}" width=30>
      <h3>${name}</h3>
      </li>`;
    })
    .join('');
  resultList.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  resultContainer.innerHTML = '';
  resultList.innerHTML = '';
}
