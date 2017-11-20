'use strict';

/**
 * Archivo para mostrar los items
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ListOfItems from './listOfItems';
import ModalNewItem from './modalNewItem';
import { actualizacion } from '../../redux/actions';

// Funciones para los estados de Redux
function mapStateToProps(state){
  return {
    listSelect: state.listSelect,
    showModal: state.showModal,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateState(info) {
      dispatch(actualizacion(info));
    }
  }
}

class Items extends Component{

  // Metodo para actualizar los estados y abrir el modal
  showModalAddNewItem = () => this.props.updateState({
      nameItem: '',
      descriptionItem: '',
      priceItem: '',
      showModal: true,
      editItem: false
    });
  
  render(){
    return(
      <div className='conetendor-items'>
        <div className='informacion-titulo-y-crearitem'>
          <h2>{this.props.listSelect}</h2>
          {
           this.props.listSelect === '' ? '' : <button className='boton-crear-item' onClick={this.showModalAddNewItem}>Crear item</button>
          }
        </div>
        {
          this.props.showModal ? <ModalNewItem/> : ''
        }
        <ListOfItems/>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Items);