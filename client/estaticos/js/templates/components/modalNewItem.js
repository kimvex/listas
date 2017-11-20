'use strict';

/**
 * Modal para agregar, editar items y listas
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


import { createItem, updateItem, updateList } from '../../utils/request';
import { actualizacion } from '../../redux/actions';

// funciones para los estados de Redux
function mapDispatchToProps(dispatch){
  return {
    updateStates(info) {
      dispatch(actualizacion(info));
    }
  }
}

function mapStateToProps(state) {
  return {
    nameItem: state.nameItem,
    descriptionItem: state.descriptionItem,
    priceItem: state.priceItem,
    idList: state.idList,
    idItem: state.idItem,
    editItem: state.editItem,
    nameList: state.nameList,
    descriptionList: state.descriptionList,
    editList: state.editList,
    valorButton: state.valorButton,
  };
}

class ModalNewItem extends Component {

  crearItem = (e) => {
    const item = {
      name: this.props.nameItem,
      description: this.props.descriptionItem,
      price: this.props.priceItem,
    }

    createItem(this.props.idList, item)
      .then(newItem => {
        console.log(newItem)
        this.props.updateStates({ 
          items: newItem.items, 
          showModal: false, 
          nameItem: '',
          descriptionItem: '',
          editItem: false
        })
      })
      .catch((error) => {
        return console.log(error);
      });
    e.preventDefault();
  }

  updateItemUnic = (e) => {
    const item = {
      name: this.props.nameItem,
      description: this.props.descriptionItem,
      price: this.props.priceItem,
    }

    updateItem(this.props.idItem, item, this.props.idList)
      .then(newItem => {
        this.props.updateStates({ 
          items: newItem.items, 
          item: newItem.item, 
          showModal: false,
          nameItem: '',
          descriptionItem: '',
          editItem: false,
          priceItem: '',
        })
      })
      .catch((error) => {
        return console.log(error);
      });
    e.preventDefault();
  }

  updateListUnic = (e) => {
    const list = {
      name: this.props.nameItem,
      description: this.props.descriptionItem,
    }

    updateList(this.props.idList, list)
      .then(listaUpdate => this.props.updateStates({ 
        listas: listaUpdate.listas, 
        showModal: false, 
        editItem: false,
        editList: false,
        nameItem: '',
        descriptionItem: '',
        listSelect: listaUpdate.listUpdate.name
      }))
      .catch((error) => {
        return console.log(error);
      })
    e.preventDefault();
  }

  cerrar = () => this.props.updateStates({ showModal: false });

  // Metodo para elegir que request se hara dependiendo de donde se abrio el modal: Item o Lista
  elecctionRequest = () => {
    if (this.props.editItem) {
      this.props.updateStates({ valorButton: 'Actualizar articulo' });
      return this.updateItemUnic;
    } else  if (this.props.editList) {
    this.props.updateStates({ valorButton: 'Actualizar Lista' });
      return this.updateListUnic;
    }

    this.props.updateStates({ valorButton: 'Crear articulo' });
    return this.crearItem;
  }

  // Metodo para mostrar el input de precio
  precioShow = () => {
    if (!this.props.editList) {
      return <input onChange={(e) => this.props.updateStates({ priceItem: e.target.value }) } className='campo-nombre' placeholder='Precio' type='number' name='price' value={this.props.priceItem} required />;
    }
  }

  render() {
    return (
      <div className='modal-new-item'>
        <div className='modal-new-item-i'>
          <form className='modal-new-item-i-form' onSubmit={ this.elecctionRequest() }>
            <input onChange={(e) => this.props.updateStates({ nameItem: e.target.value }) } className='campo-nombre' placeholder='Nombre' type='text' name='name' value={this.props.nameItem} required/>
            <textarea onChange={(e) => this.props.updateStates({ descriptionItem: e.target.value }) } className='campo-descripton' placeholder='Descripcion' name='description' value={this.props.descriptionItem} required>
            </textarea>
            {
              this.precioShow()
            }
            <input className='boton-agregar' type='submit' value={ this.props.valorButton } />
            <input onClick={ this.cerrar } className='boton-agregar' type='button' value='Cerrar'/>
          </form>
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ModalNewItem);
