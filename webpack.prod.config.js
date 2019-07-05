/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  context: resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
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
  optimization: {
    minimize: true,
    concatenateModules: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        exclude: /\.min\.js$/,
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: resolve(__dirname, './index.html') }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
  ],
};
