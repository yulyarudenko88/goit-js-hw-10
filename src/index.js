import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { makeCountryList, makeCountryCard } from './templates';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const ref = {
  input: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),
};

ref.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  let countryName = ref.input.value;
  // console.log(countryName);

  if (countryName.trim() === '') {
    ref.countryList.innerHTML = '';
    ref.countryCard.innerHTML = '';
    return;
  }

  fetchCountries(countryName.trim())
    .then(countries => {
      // console.log(countries);
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        ref.countryList.innerHTML = '';
        ref.countryCard.innerHTML = '';
        return;
      }

      if (countries.length <= 10 && countries.length >= 2) {
        const list = countries.reduce(
          (markup, country) => markup + makeCountryList(country),
          ''
        );
        ref.countryList.innerHTML = list;
        ref.countryCard.innerHTML = '';
        return;
      }

      if (countries.length === 1) {
        const card = countries.map(country => makeCountryCard(country));
        ref.countryList.innerHTML = '';
        ref.countryCard.innerHTML = card;
        return;
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      ref.countryList.innerHTML = '';
      ref.countryCard.innerHTML = '';
    });
}
