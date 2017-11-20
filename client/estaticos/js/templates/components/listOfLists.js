'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import uid from 'uid';

import UnicList from './unicList';

function mapStateToProps(state){
  return {
    listas: state.listas,
  }
}

class ListOfLists extends Component{
  render(){
    return (
      <ul className='lista-ul'>
        {
          this.props.listas.map(x => <UnicList key={uid()} informacion={x} />)
        }
      </ul>
    );
  }
}

module.exports = connect(mapStateToProps)(ListOfLists);