import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from "./reducers/reducers.js";

import initialState from "./states/initialState.js";

const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render((<Provider store={store}><App /></Provider>), document.getElementById('root'));