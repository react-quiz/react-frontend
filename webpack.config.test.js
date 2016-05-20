const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  resolve: {
    extensions: ['', '.scss', '.js', '.json', '.md'],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './node_modules/react-toolbox/components/')
    ],
    alias: {
      'react-toolbox': path.resolve(__dirname, './node_modules/react-toolbox/lib/')
    }
  },
  target: 'node',
  node: {
    process: true
  },
  module: {
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }, {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox")
      }, {
        test: /\.(txt)$/,
        loader: 'raw',
        include: path.resolve(__dirname, './components/layout/main/modules')
      }, {
        test: /\.(md)$/,
        loader: ExtractTextPlugin.extract('html!highlight!markdown')
      }, {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?self=>{},this=>global!exports?global.fetch!node-fetch'
    }),
    new ExtractTextPlugin('docs.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test')
    }),
    new webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
        template: path.resolve('./', 'index.html'),
        webpackDevServer: '/webpack-dev-server.js'
    })
  ]
};
