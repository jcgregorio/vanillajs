const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('../webpack-common');
common.plugins.push(
  new CopyWebpackPlugin([
    {from:'elements/images',to:'images'}
  ])
);

module.exports = common;
