const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  externals: [nodeExternals()],
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
  module: {
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
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin('docs.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
