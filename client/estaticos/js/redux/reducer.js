'use strict';

/*
  Archivo encargado de agregar los reducer
*/

module.exports = (state, actions) => {
  switch (actions.type) {
    case 'ACTUALIZACION':
      const newProps = actions.payload;
        return { ...state, ...newProps };
      break;
    default:
      return state;
  }
};
