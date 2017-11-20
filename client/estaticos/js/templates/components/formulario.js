'use strict';

/**
 * Archivo que contiene el formulario para crear
 * nuevas listas.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { newList } from '../../utils/request';
import { actualizacion } from '../../redux/actions';

// Funciones para los estados de Redux
function mapDispatchToProps(dispatch) {
  return {
    updateStates(info) {
      dispatch(actualizacion(info));
    }
  }
}

function mapStateToProps(state) {
  return {
    listas: state.listas,
    nameList: state.nameList,
    descriptionList: state.descriptionList,
  }
}

class Formulario extends Component {

  agregarNewLista = (e) => {
    const list = {
      name: this.props.nameList,
      description: this.props.descriptionList,
    }

    newList(list)
      .then(listaYListas => this.props.updateStates({ listas: listaYListas.listas, nameList: '', descriptionList: '' }))
      .catch((error) => {
        return console.log(error);
      });
    e.preventDefault();
  }

  render(){
    return (
      <div className='contenedor-formulario'>
        <form className='formulario' onSubmit={this.agregarNewLista}>
          <input onChange={(e) => this.props.updateStates({ nameList: e.target.value })} className='campo-nombre' type='text' placeholder='Nombre Lista' name='name' value={this.props.nameList} required/>
          <textarea onChange={(e) => this.props.updateStates({ descriptionList: e.target.value })} className='campo-descripton' placeholder='Descripción de la lista' name='description' value={this.props.descriptionList} required>
          </textarea>
          <input type='submit' className='boton-agregar' value='Crear Lista'/>
        </form>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Formulario);
