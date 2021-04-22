const getModel = require('../db/db');
const fetcher = require('../fetch/fetch');
const handler = require('express-async-handler');
const express = require('express');
const app = new express.Router();
let model;

/**
 *
 * @param {database} JawsMariaDb
 */
function initSchema(JawsMariaDb) {
  model = getModel(JawsMariaDb);
}
app.get('/', handler(async (req, res, next) => {
  const q = req.query;
  const data = await fetcher.fetchCityByName(q);
  if (data == null) {
    res.status(404).send;
    return;
  }
  const exists = model.findOne({cityname: data.name}).exec;
  if (!exists !== null) {
    res.status(409).send();
  }
  model({cityName: data.name}).save();
  res.status(200).send(data);
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

  model({cityName: data.name}).save();
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
