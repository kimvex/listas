'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteItem } from '../../utils/request';
import { actualizacion } from '../../redux/actions';

function mapDispatchToProps(dispatch){
  return {
    updateStates(info) {
      dispatch(actualizacion(info));
    }
  }
}

function mapStateToProp(state) {
  return {
    item: state.item,
    items: state.items
  }
}

class Item extends Component{

  delete = () => {
    deleteItem(this.props.item._id)
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

  mostrarModal = () => this.props.updateStates({
    idItem: this.props.item._id,
    nameItem: this.props.item.name,
    descriptionItem: this.props.item.description,
    priceItem: this.props.item.price,
    showModal: true,
    editItem: true
  });

  render(){
    console.log(this.props.item)
    return (
      <div className='conetendor-items'>
        <div className='lista-item-unica'>
          <nav className='lista-nav'>
            <span onClick={this.mostrarModal}>Editar</span>
            <span onClick={this.delete}>Eliminar</span>
          </nav>
          <h3>{ this.props.item.name }</h3>
          <p>
            {
              this.props.item.description
            }
          </p>
          <p>
            Precio:

            $
            {
              this.props.item.price
            }
          </p>
          <footer>
            <span>
              Publicado
            </span>
            <span>
              {
                moment(this.props.item.dateCreation).format('LL h:m')
              }
            </span>
          </footer>
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProp, mapDispatchToProps)(Item);