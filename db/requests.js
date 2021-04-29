/**
 * Select city from database.
 * @param {string} city
 * @param {Client} db
 */
async function selectCity(city, db) {
  const sql = `select cityName from Cities where cityName = ` +
    `'${city.toLowerCase()}'`;
  return queryRequest(sql, db);
}

/**
 * @param {Client} db;
 * Get All Favourite Cities from db.
 */
async function getCities(db) {
  return queryRequest('select cityName from Cities', db);
}

/**
 * delete city from database.
 * @param {string} city
 * @param {Client} db
 */
async function deleteCity(city, db) {
  const sql = `delete from Cities where cityName=\'${[city.toLowerCase()]}\'`;
  return await queryRequest(sql, db);
}

/**
 * Add new city to database;
 * @param {string} city
 * @param {Client} db
 */
async function insertCity(city, db) {
  const sql = 'insert into Cities (cityName)' +
    ` values (\'${[city.toLowerCase()]}\')`;
  return await queryRequest(sql, db);
}

/**
 * send request to database
 * @param{string} res
 * @param{Client} db
 */
async function queryRequest(res, db) {
  const result = db.query(res);
  if (result.error != null) {
    throw new Error(result.error);
  }
  return result;
}

module.exports = {
  insertCity, deleteCity, selectCity, getCities,
};
