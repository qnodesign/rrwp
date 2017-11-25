const path = require('path');
const webpack = require('webpack');
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackVisualizerPlugin = require('webpack-visualizer-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const srcPath = path.join(__dirname, 'src');
const publicPath = '';

const entry = {
  vendor: [
    'classnames',
    'core-js',
    'fetch-intercept',
    'history',
    'prop-types',
    'react',
    'react-dom',
    'react-html-parser',
    'react-redux',
    'react-router-dom',
    'react-router-redux',
    'react-transition-group',
    'reactstrap',
    'redux',
    'redux-logger',
    'redux-thunk',
    'url-search-params-polyfill',
    'whatwg-fetch',
  ],
};

const plugins = [
  new ExtractTextPlugin({ filename: '[name].[hash].css' }),
  new LoaderOptionsPlugin({ options: { minimize: true } }),
  new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] }),
];

/* possible conditions */
plugins.push(new WebpackVisualizerPlugin({ filename: '../reports/webpack-visualizer.html' }));
plugins.push(
  new BundleAnalyzerPlugin({
    statsFilename: '../reports/webpack-stats.json',
    reportFilename: '../reports/webpack-report.html',
    openAnalyzer: false,
    analyzerMode: 'static',
  })
);

const rules = [
  { test: /\.css$/, use: ['style-loader', 'css-loader'] },
  { test: /\.(png|jpg|jpeg|gif|ico)$/, use: 'url-loader?limit=1name=images/[name].[ext]' },
  { test: /\.svg$/, use: 'svg-url-loader?limit=1name=images/[name].[ext]' },
  { test: /\.(woff|woff2)$/, use: 'file-loader?name=fonts/[name].[ext]' },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader?modules&camelCase=dashes&importLoaders=1&localIndentName=[name]-[local]-[hash:base64:7]',
        'less-loader',
      ],
    }),
  },
];

const config = {
  entry,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      config: `${srcPath}/config/${process.env.NODE_ENV}`,
      common: `${srcPath}/common`,
    },
  },
  module: {
    rules,
  },
  plugins,
};

if (process.env.NODE_ENV) {
  require(path.join(__dirname, `webpack.config.${process.env.NODE_ENV}`))(config);
}

module.exports = config;
