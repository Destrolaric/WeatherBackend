const initTable = require('../db/db');
const fetcher = require('../fetch/fetch');
const handler = require('express-async-handler');
const express = require('express');
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

app.get('*', handler(async (req, res, next) => {
  await con.query('select cityName from Cities', (error, cities, fields) => {
    if (error) {
      res.status(404).send();
      return;
    }
    const citiesArray = [];

    cities.forEach((info) => citiesArray.push(info.cityName));
    res.send({favouriteCities: citiesArray});
  });
}));
app.post('/', handler(async (req, res) => {
  const {q} = req.query;

  const data = await fetcher.fetchCityByName(q);

  if (data == null) {
    res.status(404).send();
    return;
  }

  const exists = await model.findOne({cityName: data.name}).exec();

  if (exists !== null) {
    res.status(409).send();
    return;
  }

  con.query('');
  res.status(201).send(data);
}));
app.delete('/', handler(async (req, res) =>{
  const remove = await model.findOneAndRemove({cityName: q});
  if (remove === null) {
    res.status(404);
    res.send();
    return;
  }

  res.status(204).send();
}));

module.exports = {
  app, initSchema,
};
