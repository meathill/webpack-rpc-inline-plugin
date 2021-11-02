const PLUGIN_NAME = 'WebpackRpcInlinePlugin';

class InlinePlugin {

  apply(compiler) {
    const {prefix} = this.options;

    compiler.hooks.beforeCompile.tap(PLUGIN_NAME, compilation => {

    });
  }
}

module.exports = InlinePlugin;
