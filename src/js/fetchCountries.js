export function fetchCountries(name) {
  const fields = 'name,altSpellings,capital,population,flags,languages';
  const url = `https://restcountries.com/v3.1/name/${name}?fields=${fields}`;

  return fetch(url)
    .then(r => {
      if (!r.ok) {
        throw new Error(r.status);
      }
      return r.json();
    })
    .then(countries => {
      return countries.map(
        ({ name, capital, population, flags, languages }) => ({
          name: name.official,
          capital,
          population,
          flag: flags.svg,
          languages,
        })
      );
    });
}
