'use strict';

/**
 * Archivo que encajona las opciones de la vista para el usuario
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Formulario from './formulario';
import Listas from './listas';
import Items from './items';
import Item from './item';

function mapStateToProps(state) {
  return {
    listas: state.listas,
    nameList: state.nameList,
    descriptionList: state.descriptionList,
    item: state.item
  }
}

class Contenido extends Component {

  itemHidden = () => {
    if(this.props.item != null) {
      return <Item/>;
    }
  }

  render(){
    return(
      <div className='contenido-div'>
        <Formulario/>
        <Listas/>
        <Items/>
        {
          this.itemHidden()
        }
      </div>
    );
  }
}

module.exports = connect(mapStateToProps, null)(Contenido);