const {resolve} = require('path');
const InlinePlugin = require('../index.js');
const {ModifySourcePlugin} = require('modify-source-webpack-plugin');

module.exports = {
  entry: resolve(__dirname, './index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: require.resolve('./loader'),
      },
    ],
  },
  mode: 'production',
  plugins: [
    new InlinePlugin({
      rules: [
        /index\.js$/,
      ],
    }),
    /*
    new ModifySourcePlugin({
      rules: [
        {
          test: /\.txt$/,
          modify: (src, path) =>
            src +
            `\n\n// This file (${path}) is written by me. All rights reserved`
        }
      ]
    }),
    */
  ],
}
