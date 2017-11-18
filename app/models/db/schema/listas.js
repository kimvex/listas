'use strict';
/*
  Esquema de Listas
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listaSchema = new Schema({
  name: String,
  description: String,
  date: { type: Date, default: Date.now },
  items: [{ type: Schema.Types.ObjectId, ref: 'Items' }],
});

module.exports = listaSchema;
