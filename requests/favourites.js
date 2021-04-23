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
    if (cities.rowCount !== 0) {
      console.log(cities);
      cities.rows.forEach((row) => {
        citiesArray.push(row.cityname);
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
  await con.query(`select cityName from Cities where cityName = ${q.toLowerCase()}`,
    (err, result) => {
      if (result != null) {
        res.status(404);
        res.send();
      } else {
        console.log(`insert into Cities (cityName)` +
          ` values (\`${q.toLowerCase()}\`)`);
        con.query('insert into Cities (cityName)' +
          ` values (\'${[q.toLowerCase()]}\')`);
        res.status(200).send(data);
      }
    });
}));
app.delete('/', handler(async (req, res) => {
  const {q} = req.query;

  if (req.query != null) {
    await con
      .query(`delete from Cities where cityName=\'${[q.toLowerCase()]}\'`,
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
