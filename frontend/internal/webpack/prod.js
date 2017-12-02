import path from 'path';

import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import merge from 'webpack-merge';
import baseConfig from './base';

const sourcePath = path.resolve(process.cwd(), 'app/index.js');
const buildPath = path.resolve(process.cwd(), 'public/build');

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    app: sourcePath,
    vendor: ['react', 'react-dom'],
  },
  target: 'web',
  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    /*
      clean up build folder
    */
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(process.cwd(), 'public'),
    }),
    /*
      uglify output
    */
    new UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
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
  ],
  module: {
    rules: [
      {
        test: /(\.css|\.scss|\.sass)$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap'),
      },
    ],
  },
});
