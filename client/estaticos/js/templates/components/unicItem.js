'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteItem, loadItem } from '../../utils/request';
import { actualizacion } from '../../redux/actions';

function mapDispatchToProps(dispatch){
  return {
    updateStates(info) {
      dispatch(actualizacion(info));
    }
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
  }
}

class UnicItem extends Component{

  delete = () => {
    deleteItem(this.props.informacion._id)
      .then(eliminado => {
        let newArrItems = [];

        this.props.items.map(x => {
          if(x._id !== eliminado.data._id){
            newArrItems.push(x);
          }
        });

        this.props.updateStates({ items: newArrItems, item: null });
      })
      .catch((error) => {
        return console.log(error);
      })
  }

  mostrarItem = () => {
    loadItem(this.props.informacion._id)
      .then(item => this.props.updateStates({ item: item }))
      .catch((error) => {
        return console.log(error);
      });
  }

  mostrarModal = () => this.props.updateStates({ 
    idItem: this.props.informacion._id, 
    nameItem: this.props.informacion.name,
    descriptionItem: this.props.informacion.description,
    priceItem: this.props.informacion.price,
    showModal: true,
    editItem: true
    });

  render(){
    return (
      <div className='lista-item-unica'>
        <nav className='lista-nav'>
          <span onClick={this.mostrarModal}>Editar</span>
          <span onClick={this.delete}>Eliminar</span>
        </nav>
        <h3 onClick={this.mostrarItem}>{this.props.informacion.name}</h3>
        <footer onClick={this.mostrarItem}>
          <span>
            Publicado
          </span>
          <span>
            {
              moment(this.props.informacion.dateCreation).format('LL h:mm')
            }
          </span>
        </footer>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(UnicItem);