'use strict';

/*
  Esquema de items
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Items = new Schema({
  name: String,
  description: String,
  price: { type: Number, default: 0 },
  dateCreation: { type: Date, default: Date.now },
});

module.exports = Items;
