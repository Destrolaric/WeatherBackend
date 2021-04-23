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
    if (cities != null) {
      console.log(cities);

      cities.on('cityName', (columns) => {
        columns.forEach((info) => citiesArray.push(info.value));
      });
      res.send({favouriteCities: citiesArray});
      return;
    }
    res.status(404).send();
  });
}));
app.post('/', handler(async (req, res) => {
  const {q} = req.query;

  const data = await fetcher.fetchCityByName(q);

  if (data == null) {
    res.status(404).send();
    return;
  }
  await con.query(`select cityName from Cities where cityName = ${q}`,
    (err, result) => {
      if (result != null || err != null) {
        res.status(404);
        res.send();
      } else {
        con.query(`insert into Cities (cityName) values (\`${q}\`)`);
        res.status(200).send(data);
      }
    });
}));
app.delete('/', handler(async (req, res) => {
  if (req.query != null) {
    await con.query(`delete from Cities where cityName=${req.query}`,
      (err, result) => {
        if (err !== null) {
          res.status(404);
          res.send();
          return;
        }

        res.status(200).send();
      });
  } else {
    res.status(404).send();
  }
}));


module.exports = {
  app, initSchema,
};
