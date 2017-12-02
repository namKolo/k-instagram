// @flow
import path from 'path';

import express from 'express';
import expressProxy from 'express-http-proxy';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../internal/webpack/dev';
import config from '../app/config';

export const devLayer = (app: Object): Object => {
  const compiler = webpack(webpackConfig);
  /*
    Attach webpack-dev-middleware to our server to bundle app and hot reload
  */
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true,
    },
  });
  app.use(devMiddleware);

  /*
    We build own server to bundle files instead of using webpack-dev-server. Therefore, we need
    to attach webpack-hot-middleware too to enable HMR on the server
  */
  const hotMiddleware = webpackHotMiddleware(compiler);
  app.use(hotMiddleware);

  /*
    Our bundled files are kept in the memory. Therfore we need to use built-in fs to read
    that file and send to client
  */
  const fs = devMiddleware.fileSystem;
  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  return app;
};

export const apiLayer = (app: Object): Object => {
  app.use(
    /^\/(api)/,
    expressProxy(config.apiServerUrl, {
      limit: '40mb',

      proxyReqPathResolver(req) {
        return req.originalUrl;
      },
    }),
  );

  return app;
};

export const parserLayer = (app: Object): Object => {
  app.use(bodyParser.json());
  return app;
};

export const staticLayer = (app: Object): Object => {
  const publicPath = path.resolve(process.cwd(), 'public', 'build');
  app.use(express.static(publicPath));
  return app;
};
