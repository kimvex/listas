'use strict';

/**
 * Cuerpo para la documentacion en markdown.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';

import { getTextMarkDown } from '../../utils/request';

class Body extends Component {
  state = {
    textMarkDown: ''
  }

  componentDidMount() {
    getTextMarkDown()
      .then(text => this.setState({ textMarkDown: text }))
      .catch((error) => {
        return console.log(error);
      });
  }

  // Metodo para crear el text a markdown
  textMarkDown = () => {
    const md = new Remarkable();
    return {
      __html: md.render(this.state.textMarkDown, {
        html: true,
        linkify: true,
        typographer: true,
      }) }
  }

  render() {
    return (
      <div className='markdown'>
        <div className='markdown-text' dangerouslySetInnerHTML={this.textMarkDown()}>
        </div>
      </div>
    );
  }
}

module.exports = Body;
