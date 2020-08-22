const mongoose = require('mongoose');
const Weather = require('../models/weather');


module.exports.create = async(weatherData) => {
  const created = await Weather.create(weatherData);
  return created;
}

module.exports.getByName = async(name) => {
  return Weather.findOne( { name } );
}