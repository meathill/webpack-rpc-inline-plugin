const {resolve} = require('path');
const InlinePlugin = require('../index.js');

module.exports = {
  entry: resolve(__dirname, './index.js'),
  output: {
    library: {
      name: 'sample',
      type: 'umd',
      umdNamedDefine: true,
    },
    globalObject: 'this',
  },
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
        /main\.js$/,
      ],
    }),
  ],
}
