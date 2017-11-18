'use strict';
/*
  Este archivo se encarga de importar los esquemas
*/

const mongoose = require('mongoose');

const Listas = require('./schema/listas');
const Items = require('./schema/items');

exports.Listas = mongoose.model('Listas', Listas);
exports.Items = mongoose.model('Items', Items);
