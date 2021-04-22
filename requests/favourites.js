const getFavouriteCity = require('db/db');
const fetcher = require('fetch/fetch');
const handler = require('express-async-handler');
const express = require('express');
const app = new express.Router();
let favourite;

/**
 *
 * @param {database} JawsMariaDb
 */
function initSchema(JawsMariaDb) {
  favourite = getFavouriteCity(JawsMariaDb);
}
app.get('/', handler(async (req, res, next) => {
  const q = req.query;
  const data = await fetcher.fetchCityByName(q);
  if (data == null) {
    res.status(404).send;
    return;
  }
  const exists = favourite.findOne({cityname: data.name}).exec;
  if (!exists !== null) {
    res.status(409).send();
  }
  new favourite({cityName: data.name}).save();
  res.status(200).send(data);
}));
app.post('/', handler(async (req, res) =>{
  const q = req.query;
}));
app.delete('/', handler(async (req, res) =>{
  const remove = await favourite.findOneAndRemove({cityName: q});
  if (remove === null) {
    res.status(404);
    res.send();
    return;
  }

  res.status(204).send();
}));

module.exports = {
  router, initSchema,
};
