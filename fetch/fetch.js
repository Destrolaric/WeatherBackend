const api = '4ebd41ef190c4dbdbc6c3b8cab1e5e31';

/**
 *
 * @param {string}name
 * @return {Promise<*>}
 */
async function fetchCityByName(name) {
  const url = `https://api.weatherbit.io/v2.0/current?key=${api}&city=${name}`;
  return await fetchCity(url);
}

/**
 *
 * @param {string}url
 * @return {Promise<any>}
 */
async function fetchCity(url) {
  const response = await fetch(url, {
    'method': 'GET',
  });
  return response;
}

/**
 *
 * @param {float}lat
 * @param {float}lon
 * @return {Promise<any|undefined>}
 */
async function fetchCityByCoordinate(lat, lon) {
  const url = `https://api.weatherbit.io/v2.0/current?key=${api}&lon=${lon}&lat=${lat}`;
  return await fetchCity(url);
}
module.exports = {
  fetchCityByName, fetchCityByCoordinate,
};
