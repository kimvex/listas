'use strict';

/*
  Archivo encargado de agregar los actions
  para cambiar los estados de redux
*/

module.exports = {
  actualizacion(info) {
    return {
      type: 'ACTUALIZACION',
      payload: info,
    };
  },
};
