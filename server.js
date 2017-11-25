/*eslint no-console:0 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), config.devServer).listen(config.devServer.port, 'localhost', err => {
  if (err) {
    console.log(err);
  }
  console.log(`Dev server listening at localhost:${config.devServer.port}`);
});
