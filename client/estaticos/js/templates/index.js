'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Storage from '../redux/storage';
import Principal from './principal';

ReactDOM.render(<Provider store={Storage}>
  <Principal />
</Provider>, document.querySelector('#content'));
