const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const portSrc = require(path.join(__dirname, 'port'));

const devServer = {
  contentBase: './dist/',
  historyApiFallback: true,
  hot: true,
  port: portSrc.port,
  publicPath: '/',
  noInfo: false,
  inline: true,
  open: true,
  watchContentBase: true,
  progress: false,
};

const entry = [
  `webpack-dev-server/client?http://localhost:${portSrc.port}`,
  'webpack/hot/only-dev-server',
  './src/index',
];

const plugins = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedChunksPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin([
    {
      // TEMP
      from: 'dev/images',
      to: 'mock/images',
    },
    {
      from: 'dev/*.css',
      to: '[name].css',
    },
  ]),
  new HtmlWebpackPlugin({
    template: 'src/index.tpl',
    filename: 'index.html',
    inject: false,
  }),
];

const rules = {
  test: /\.(js|jsx)$/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
  include: [/src/, /dev/],
};

module.exports = config => {
  config.devServer = devServer;
  config.entry = entry;
  config.cache = true;
  config.devtool = 'eval-cheap-module-source-map';
  config.plugins = [].concat(config.plugins, plugins);
  config.module.rules.push(rules);
};
