const handler = require('express-async-handler');
const express = require('express');
const requests = require('../fetch/fetch');
const router =new express.Router();

router.get('/city', handler(async (req, res) => {
  const {q} = req.query;

  const data = await requests.fetchCityByName(q);
  console.log(data.status);

  if (data.status === 404) {
    res.status(404).send();
    return;
  }
  if (data.status === 204) {
    res.status(204).send();
    return;
  }
  if (data.status === 200) {
    res.status(200).send(data);
  }
}));

router.get('/coordinates', handler(async (req, res) => {
  const {lat, lon} = req.query;

  const data = await requests.fetchCityByCoordinate(lat, lon);
  console.log(data.status);
  if (data.status === 404) {
    res.status(404).send();
    return;
  }
  if (data.status === 204) {
    res.status(204).send();
    return;
  }
  if (data.status === 200) {
    res.status(200).send(data);
  }
}));

module.exports = {
  router,
};
