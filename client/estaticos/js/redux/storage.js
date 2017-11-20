'use strict';
/*
  Archivo encargado de crear el storage
  que uno las partes de redux
*/

import { createStore } from 'redux';
import states from './states';
import reducer from './reducer';

const store = createStore(reducer, states);

module.exports = store;
