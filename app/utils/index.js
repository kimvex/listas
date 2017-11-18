'use strict';

/*
  Archivo encargado de los datos
  y archivos esticos de la app
*/

const express = require('express');
const path = require('path');

module.exports = {
  uriMongo: 'mongodb://localhost/lista',
  estaticos: express.static(path.join(__dirname, '../client/estaticos')),
  port: 2000 || process.env.PORT,
};
