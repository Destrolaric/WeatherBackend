const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const favourites = require('./requests/favourites');
const weather = require('./requests/weather');
const cors = require('cors');
app.use(cors());

/**
 *
 * @return {Promise<void>}
 */
async function start() {
  require('dotenv').config();

  if (process.env.REDISTOGO_URL) {
    const rtg = require('url').parse(process.env.REDISTOGO_URL);
    const redis = require('redis').createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(':')[1]);
    app.use('/weather', weather.router);
    favourites.initSchema(redis);
    app.use('/favourite', favourites.app);
  }
  app.listen(port, () => {
    console.log(`system started `);
  });
}


start().then((r) => console.log(r));
