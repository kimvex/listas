'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import uid from 'uid';

import UnicItem from './unicItem';

function mapStateToProps(state){
  return {
    items: state.items,
    listSelect: state.listSelect,
  }
}

class ListOfItems extends Component{
  render(){
    return(
      <ul className='lista-ul'>
        {
          this.props.items.map(x => <UnicItem key={uid()} informacion={x} />)
        }
      </ul>
    );
  }
}

module.exports = connect(mapStateToProps, null)(ListOfItems);