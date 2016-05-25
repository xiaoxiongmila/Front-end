var webpack = require('webpack');
var path = require('path');
var nodeModules = [path.resolve(__dirname,'node_modules')];

var config  = {
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude:[path.resolve(__dirname,'node_modules')],
      include: [path.resolve(__dirname,'app')],
      loader: 'babel'
    },
    {
        test: /\.json$/,
        loader: 'json'
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    },
    {
      test: /\.woff$/,
      loader: 'url?limit=100000'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by xiaoxiongmila')
  ]
};

module.exports = config;