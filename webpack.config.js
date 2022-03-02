const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  // entry point of our app
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/, 
        exclude: /node_modules/,
        loader: 'babel-loader', 
        options: {
          presets: ['@babel/env', '@babel/react'],
        }
      },      
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    inject: false,
    template: path.resolve(__dirname, './client/index.html'),
    filename: "./index.html"
  })],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: "/",
    },
    compress: true,
    port: 8080,
    proxy: {
      '/auth': 'http://localhost:3000'
    }
  },
};