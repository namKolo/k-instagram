// @flow
import { routerMiddleware } from 'react-router-redux';

import { history } from 'service/router';

const req = require.context('.', true, /\.\/.+\/middleware\.js$/);

module.exports = req
  .keys()
  .map(key => req(key).default)
  .concat([routerMiddleware(history)]);
