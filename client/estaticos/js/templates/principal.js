'use strict';

/**
 * Archivo principal para la pagina de inicio
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Menu from './components/menu';
import Contenido from './components/contenido';
import { actualizacion } from '../redux/actions';
import { loadLists } from '../utils/request';

// Funciones para los estados de Redux
function mapDispatchToProps(dispatch){
  return {
    updateStates(info){
      dispatch(actualizacion(info));
    }
  }
}

function mapStateToProps(state){
  return {
    listas: state.listas
  }
}

class Principal extends Component {

  // Cargamos las listas en los props antes de que se renderee la vista
  componentWillMount(){
    loadLists().then(lista => this.props.updateStates({ listas: lista }))
      .catch((erro) => {
        return console.log(error);
      });
  }

  render() {
    return(<div className='contenedor'>
      <Menu/>
      <Contenido/>
    </div>);
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Principal);
