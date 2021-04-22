module.exports = function(JawsMariaDb) {
  const Schema = JawsMariaDb.Schema;
  const favoriteCitySchema = new
  Schema({cityName: {type: 'string', unique: true}}, {versionKey: false});

  return JawsMariaDb.model('cities', favoriteCitySchema);
};
