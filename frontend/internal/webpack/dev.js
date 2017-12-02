import path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import baseConfig from './base';

const sourcePath = path.resolve(process.cwd(), 'app/index.js');

export default merge(baseConfig, {
  devtool: 'eval-source-map',
  entry: {
    app: ['webpack-hot-middleware/client', 'react-hot-loader/patch', sourcePath],
    vendor: ['react', 'react-dom'],
  },
  target: 'web',
  output: {
    path: '/build/',
    publicPath: '/build/',
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // enable hot reload webpack feature
    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime', // Specify the common bundle's name.
    }),

    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
      env: 'development',
    }),
    new ExtractTextPlugin('style.css'),
  ],
  module: {
    rules: [
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader?sourceMap'],
        }),
      },
    ],
  },
});
