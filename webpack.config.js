'use strict';

const webpack = require('webpack');
const PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {

  entry: './src/app/components/App.jsx',
  output: {
    path: './src/public/',
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: { 
        warnings: false,
        drop_console: true
      },
      mangle: {
        except: ['$'],
        screw_ie8: true,
        keep_fnames: true
      }
    })
  ] : []
};

