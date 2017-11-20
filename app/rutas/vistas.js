'use strict';
/*
  Rutas para las vistas
*/

const Route = require('express').Router();
const { vistas } = require('../utils/');

Route.get('/', (sol, res) => {
  res.sendFile(vistas.index);
});

Route.get('/docs', (sol, res) => {
  res.sendFile(vistas.docs);
});

module.exports = Route;
