const initTable = require('../db/db');
const fetcher = require('../fetch/fetch');
const handler = require('express-async-handler');
const express = require('express');
const requests = require('../db/requests');
const app = new express.Router();
let con;

/**
 *
 * @param {database} connection towards sql database;
 */
function initSchema(connection) {
  initTable(connection);
  con = connection;
}


app.get('*', handler(async (req, res) => {
  const result = await requests.getCities(con).catch(() => {
    res.status(500).send();
  });
  if (result.error) {
    res.status(500).send();
    return;
  }
  const citiesArray = [];
  console.log(result);
  if (result.rowCount !== 0) {
    result.rows.forEach((row) => {
      citiesArray.push(row.cityname);
    });
    res.status(200).send({favouriteCities: citiesArray});
    return;
  }
  res.status(404).send();
}));


app.post('/', handler(async (req, res) => {
  const {q} = req.query;
  const data = await fetcher.fetchCityByName(q);
  if (data == null) {
    res.status(404).send();
    return;
  }
  const result = await requests.selectCity(data.data[0].city_name, con).catch(() => {
    res.status(500).send();
  });
  if (result.rowCount !== 0) {
    res.status(404).send();
  } else {
    requests.insertCity(data.data[0].city_name, con).catch(() => {
      res.status(500).send();
    });
    res.status(200).send(data);
  }
}));


app.delete('/', handler(async (req, res) => {
  const {q} = req.query;

  const data = await fetcher.fetchCityByName(q);
  if (data == null) {
    res.status(404).send();
    return;
  }
  if (req.query != null) {
    requests.deleteCity(q, con).catch(() => {
      res.status(404).send();
    });
    res.status(200).send();
  }
}));


module.exports = {
  app, initSchema,
};
