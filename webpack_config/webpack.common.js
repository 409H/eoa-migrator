const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');

module.exports = {
  target: "web",
  entry: path.resolve(config.path.src, './index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: 'url-loader?limit=100000'
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css'],
    alias: {
      '@components': path.resolve(config.path.src, 'components'),
      '@providers': path.resolve(config.path.src, 'providers'),
      '@app': path.resolve(config.path.src, './App.jsx'),
      '@contracts': path.resolve(config.path.src, 'contracts'),
      '@config': path.resolve(config.path.src, 'config.ts'),
      '@assets': path.resolve(config.path.src, 'assets'),
      '@utils': path.resolve(config.path.src, 'utils'),
    },
    fallback: {
      "vm": require.resolve("vm-browserify"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "os": require.resolve("os-browserify/browser"),
      "https": require.resolve("https-browserify")
    }
  },
  experiments: {
    topLevelAwait: true
  },
  output: {
    path: config.path.output,
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(config.path.src, 'index.html'),
      inject: true,
      title: config.title,
      appDescription: config.description,
      appUrl: config.url,
      image: config.img,
      type: config.type,
      metaCsp: `default-src 'none'; script-src 'self'; worker-src 'self' blob:; child-src 'self'; style-src 'self' 'unsafe-inline'; manifest-src 'self'; font-src 'self'; img-src 'self' data: ; connect-src *; frame-src 'self';`
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  ]
};