const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { resolve } = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../stories');
module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css', 'png', '.svg', 'jpg'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../.storybook/tsconfig.json'),
      }),
    ],
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
        include: [SRC_PATH, STORIES_PATH],
        exclude: resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.css$/,
        exclude: resolve('src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new TSDocgenPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
  ],
};
