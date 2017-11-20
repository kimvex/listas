'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Menu from './components/menu';
import Contenido from './components/contenido';
import { actualizacion } from '../redux/actions';
import { loadLists } from '../utils/request';

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
