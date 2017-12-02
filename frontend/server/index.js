// @flow
import { compose } from 'redux';

import express from 'express';

import config from '../config/index';
import { devLayer, apiLayer, parserLayer, staticLayer } from './middleware';

var app = express();

const isDevelopment = config.env !== 'production';
const port = config.server.port;

const attachLayers = app =>
  compose(isDevelopment ? devLayer : staticLayer, apiLayer, parserLayer)(app);

attachLayers(app);

// And run the server
const server = app.listen(port, function() {
  server.keepAliveTimeout = 0;
  console.log('Server running on port ' + port);
});
