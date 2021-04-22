module.exports = function (con) {
  try {
    const sql = '  if not exists (select * from sysobjects ' +
      'where name=\'Cities\' and xtype=\'U\')\n' +
      '  create table jymqdme0u5w35sqf.Cities (\n' +
      '    Name varchar(64) not null\n' +
      ')';
    con.query(sql);
  } catch (e) {
    console.log(e);
  }
};
