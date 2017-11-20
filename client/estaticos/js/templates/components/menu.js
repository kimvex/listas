'use strict';
/*
  Componente encargado del menu
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Menu extends Component {
  render() {
    return (
      <nav className='menu'>
        <span className='titulo-menu'>
          API Lista & Items
        </span>
        <ul className='lista-menu'>
          <a href='/'>
            <li>Inicio</li>
          </a>
          <a href='/docs'>
            <li>Docs</li>
          </a>
          <a href='https://github.com/kimvex/listas'>
            <li>Gihub @kimvex</li>
          </a>
        </ul>
      </nav>
    );
  }
}

module.exports = Menu;