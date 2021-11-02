const {validate} = require('schema-utils');
const transpile = require('./transpile');

const PLUGIN_NAME = 'WebpackRpcInlinePlugin';

const schema = {
  type: 'object',
  properties: {
    rules: {
      type: 'array',
      descripion: 'The JavaScript files should be converted',
    },
    exclude: {
      type: 'array',
      descripion: 'The JavaScript files should NOT be converted',
    },
  },
  additionalProperties: false,
};

const defaultOptions = {
  rules: [
    /\.js$/,
  ],
  exclude: [

  ],
};

class InlinePlugin {
  constructor(options = {}) {
    validate(schema, options, defaultOptions);
    this.options = options;
  }

  apply(compiler) {
    const {rules, exclude} = this.options || {};

    const {webpack} = compiler;
    const {RawSource} = webpack.sources;

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.afterProcessAssets.tap(PLUGIN_NAME, (assets) => {
        for (const key in assets) {
          if (!rules.find(rule => rule.test(key)) || exclude.find(rule => rule.test(key))) {
            continue;
          }
          const {_value} = assets[key];
          assets[key] = new RawSource(transpile(_value));
        }
      });
    });
  }
}

module.exports = InlinePlugin;
