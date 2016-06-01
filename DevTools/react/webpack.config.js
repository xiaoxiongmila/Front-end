var webpack = require('webpack');
var path = require('path');



var config = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module:
        {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: [
                path.resolve(__dirname,'node_modules')
            ],
            include: [
                path.resolve(__dirname,'app')
            ]
        },
        {
            test: /\.css$/,
            loader: 'style!css'
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        },
        {
            test: /\.woff$/,
            loader: 'url?limit=100000'
        }
        ]
    },
    resolve: {
        extensions: ['','.js','.jsx']
    }
};

module.exports = config;