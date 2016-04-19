var webpack = require('webpack');
var path = require('path');
var libraryName = 'mdDateTimePicker';
var outputFile = libraryName + '.js';

var config = {
  entry: __dirname + '/src/js/mdDateTimePicker.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist/js',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'mdDateTimePicker': 'mdDateTimePicker'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  target: 'web',
  resolve: {
    root: path.resolve('./src/js'),
    extensions: ['', '.js']
  }
};
module.exports = config;
