'use strict';

/*
  Archivo encargado de los datos
  y archivos esticos de la app
*/

const express = require('express');
const path = require('path');

module.exports = {
  uriMongo: `mongodb://${process.env.USERDB}:${process.env.PASSWORDDB}@listas-shard-00-00-fionq.mongodb.net:27017,listas-shard-00-01-fionq.mongodb.net:27017,listas-shard-00-02-fionq.mongodb.net:27017/test?ssl=true&replicaSet=listas-shard-0&authSource=admin`,
  estaticos: express.static(path.join(__dirname, '../../client/estaticos')),
  port: process.env.PORT,
  vistas: {
    index: path.join(__dirname, '../../client/templates/index.html'),
    docs: path.join(__dirname, '../../client/templates/docs.html'),
  },
};
