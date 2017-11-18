'use strict';
/*
  Archivo encargado de conectar con mongo
*/
const mongoose = require('mongoose');

const { uriMongo } = require('../utils/');

mongoose.Promise = global.Promise;

module.exports = function mongo() {
  return mongoose.connect(uriMongo, { useMongoClient: true })
    .then(data => 'Connected')
    .catch((err) => {
      throw err;
    });
};
