const handler = require('express-async-handler');
const express = require('express');
const requests = require('../fetch/fetch');
const router =new express.Router();

router.get('/city', handler(async (req, res) => {
  const {q} = encodeURI(req.query);

  const data = await requests.fetchCityByName(q);

  if (data == null) {
    console.log('no data found');
    res.status(404).send();
    return;
  }
  res.status(200).send(data);
}));

router.get('/coordinates', handler(async (req, res) => {
  const {lat, lon} = req.query;

  const data = await requests.fetchCityByCoordinate(lat, lon);
  if (data == null) {
    res.status(404).send();
    return;
  }
  res.status(200).send(data);
}));

module.exports = {
  router,
};
