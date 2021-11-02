const {resolve} = require('path');
const InlinePlugin = require('../index.js');

module.exports = {
  entry: resolve(__dirname, './index.js'),
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: require.resolve('./loader'),
      },
    ],
  },
  mode: 'production',
  /*
  plugins: [
    new InlinePlugin(),
  ],
  */
}
