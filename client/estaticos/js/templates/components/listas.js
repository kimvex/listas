'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ListOfLists from './listOfLists';

class Listas extends Component{
  render(){
    return(
      <div className='contenedor-lista'>
        <ListOfLists/>
      </div>
    );
  }
}

module.exports = connect(null, null)(Listas);