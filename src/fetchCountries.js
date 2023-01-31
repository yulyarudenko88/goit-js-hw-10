const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(countryName) {
  const url = `${BASE_URL}${countryName}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    // console.log(response);
    return response.json();
  });
}
