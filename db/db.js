module.exports = function (con) {
  try {
    const sql = `CREATE TABLE IF NOT EXISTS Cities (i varchar);`;
    con.query(sql);
  } catch (e) {
    console.log(e);
  }
};
