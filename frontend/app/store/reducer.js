// @flow
import camelCase from 'lodash/camelCase';
import { combineReducers } from 'redux';
import { reducer as thunk } from 'redux-saga-thunk';
import { routerReducer } from 'react-router-redux';

const reducers = {
  thunk,
  router: routerReducer,
};

const req = require.context('.', true, /\.\/.+\/reducer\.js$/);

req.keys().forEach(key => {
  const storeName = camelCase(key.replace(/\.\/(.+)\/.+$/, '$1'));
  reducers[storeName] = req(key).default;
});

export default combineReducers(reducers);
