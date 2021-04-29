const api = process.env.WEATHER_API;
const fetch = require('node-fetch');
/**
 *
 * @param {string}name
 * @return {Promise<*>}
 */
async function fetchCityByName(name) {
  require('dotenv').config();

  const url = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API}&city=${encodeURI(name)}`;
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
  if (response.status === 200) {
    return response.json();
  } else {
    return null;
  }
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
