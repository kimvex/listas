'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteList, loadItems } from '../../utils/request';
import { actualizacion } from '../../redux/actions';

function mapDispatchToProps(dispatch) {
  return {
    updateStates(info) {
      dispatch(actualizacion(info));
    }
  }
}

class UnicList extends Component{

  delete = () => {
    deleteList(this.props.informacion._id)
      .then(list => this.props.updateStates({ listas: list.listas, items:[], item: null, listSelect: '' }))
      .catch((error) => {
        return console.log(error);
      });
  }

  mostrarItems = () => {
    loadItems(this.props.informacion._id)
      .then(datos => {
        console.log(datos);
        this.props.updateStates({ items: datos.items, listSelect: this.props.informacion.name, idList: this.props.informacion._id })
      })
      .catch((error) => {
        return console.log(error);
      });
  }

  mostrarModal = () => this.props.updateStates({ 
      idList: this.props.informacion._id, 
      nameItem: this.props.informacion.name,
      descriptionItem: this.props.informacion.description,
      showModal: true,
      editItem: false,
      editList: true,
    });

  render(){
    return (
      <div className='lista-item-unica'>
        <nav className='lista-nav'>
          <span onClick={this.mostrarModal}>Editar</span>
          <span onClick={this.delete}>Eliminar</span>
        </nav>
        <h3 onClick={this.mostrarItems}>{ this.props.informacion.name }</h3>
        <p onClick={this.mostrarItems}>
          {
            this.props.informacion.description
          }
        </p>
        <footer onClick={this.mostrarItems}>
          <span>
            Publicado
          </span>
          <span>
            {
              moment(this.props.informacion.date).format('LL h:mm')
            }
          </span>
        </footer>
      </div>
    );
  }
}

module.exports = connect(null, mapDispatchToProps)(UnicList);