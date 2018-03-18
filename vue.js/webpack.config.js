const CopyWebpackPlugin = require('copy-webpack-plugin');
const { commonBuilder } = require('pulito');

let common = commonBuilder(__dirname);

common.plugins.push(
  new CopyWebpackPlugin([
    {from:'images',to:'images'}
  ])
);

module.exports = common;
