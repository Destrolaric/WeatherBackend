const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const favourites = require('./requests/favourites');
const weather = require('./requests/weather');
const cors = require('cors');
const {Client} = require('pg');

app.use(cors());

let con;

/**
 *
 * @return {Promise<void>}
 */
async function start() {
  require('dotenv').config();
  try {
    if (process.env.HEROKU_POSTGRESQL_BLACK_URL) {
      con = await new Client({
        connectionString: process.env.HEROKU_POSTGRESQL_BLACK_URL,
        ssl: {rejectUnauthorized: false},
      });
      con.connect();
      app.use('/weather', weather.router);
      favourites.initSchema(con);
      app.use('/favourite', favourites.app);
    }
    app.listen(port, () => {
      console.log(`system started `);
    });
  } catch (e) {
    console.log(e);
  }
}


start().then((r) => {
});
