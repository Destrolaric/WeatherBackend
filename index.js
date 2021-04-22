const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const favourites = require('./requests/favourites');
const weather = require('./requests/weather');
const cors = require('cors');
const MySql = require('mysql');
app.use(cors());

let con;

/**
 *
 * @return {Promise<void>}
 */
async function start() {
  if (process.env.JAWSDB_URL) {
    con = MySql.createConnection(process.env.JAWSDB_URL);
    con.connect();
    app.use('/weather', weather.router);
    favourites.initSchema(con);
    app.use('/favourite', favourites.app);
  }
  app.listen(port, () => {
    console.log(`system started `);
  });
}


start().then((r) => {
  if (con) con.end();
});
