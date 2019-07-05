/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  context: resolve(__dirname, 'src'),
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    './index.tsx',
    // the entry point of our app
  ],
  output: {
    filename: 'hotloader.js',
    // the output bundle
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    // necessary for HMR to know where to load the hot update chunks
  },
  devtool: 'inline-source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devServer: {
    port: '8080',
    // Change it if other port needs to be used
    hot: true,
    // enable HMR on the server
    noInfo: false,
    compress: true,
    quiet: false,
    // minimize the output to terminal.
    contentBase: resolve(__dirname, 'src'),
    // match the output path
    publicPath: '/',
    // match the output `publicPath`
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        // exclude: resolve('src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // inject <script> in html file.
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({ template: resolve(__dirname, './index.html') }),
  ],
};
