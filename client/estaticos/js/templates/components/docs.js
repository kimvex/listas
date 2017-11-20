'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Menu from './menu';
import Body from './body-docs';

class Docs extends Component {
  render() {
    return (
      <div className='contenido-docs'>
        <Menu/>
        <Body/>
      </div>
    );
  }
}

module.exports = Docs;
