module.exports = function (redis) {
  const Schema = redis.schema;
  const favoriteCitySchema = new
  Schema({cityName: {type: 'string', unique: true}}, {versionKey: false});
  return redis.model('cities', favoriteCitySchema);
};
