module.exports = function (con) {
  try {
    const sql = `CREATE TABLE IF NOT EXISTS Cities (cityName varchar);`;
    con.query(sql);
  } catch (e) {
    console.log(e);
  }
};
