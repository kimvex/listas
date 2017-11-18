'use strict';

/*
  Archivo encargado de configurar express
  y servir los datos
*/

// Modulo descargados
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

// Modulos creados
const router = require('./rutas/');
const { estaticos } = require('./utils/');
const mongo = require('./controllers/mongodb');

module.exports = function server() {
  const app = express();

  // configuracion de express
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));
  app.use(estaticos);
  app.use(helmet());
  app.use('/api', cors());
  app.use('/api', router);

  mongo()
    .then(res => console.log(res))
    .catch((err) => {
      throw err;
    });

  return app;
};
