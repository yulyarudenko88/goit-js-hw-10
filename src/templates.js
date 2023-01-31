export function makeCountryList({ flags, name }) {
  return `
  <li class = country-item>
  <img class = 'country-list__flags' src="${flags.svg}" alt="${name.official}" width=50/>
  <h2 class = country-list__title>${name.official}</h2>
  </li>
  `;
}

export function makeCountryCard({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  return `
  <div class="country">
    <img class = "country__flag" src="${flags.svg}" alt="${
    name.official
  }" width = 100/>
    <h2 class = "country__title">Country: ${name.official}</h2>
    <p class = "country__text"><span class = "country__subtitle">Capital:</span> ${capital}</p>
    <p class="country__text"><span class = "country__subtitle">Population:</span> ${population}</p>
    <p class="country__text"><span class = "country__subtitle">Languages:</span> ${Object.values(languages)}</p>
  </div>
 `;
}
