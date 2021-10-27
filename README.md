Webpack RPC Inline Plugin
========

This plugin will inline scripts to the places where they are imported.


Built for
---------

Sometimes, we may need to execute script in another context. Like in puppeteer,
we will call `page.evaluate(func, param1, param2)` to execute the function in the context of THAT `page`.

In the situation, the whole function will be stringified and passed to another
context. Then the function will be re-instanced, and executed.

If we use module methods as usual, like below:

```js
import someFunc from './some-func.js';

const param1 = 'hello';

page.evaluate(function (param1) {
  someFunc(param1);
}, param1);
```

JS engine won't find any matched function because `someFunc` were not passed.


Usage
-----

Install via `npm i webpack-rpc-inline-plugin -D`

Setup plugin in webpack.config.js:

```js
const InlinePlugin = require('webpack-rpc-inline-plugin');

module.exports = {
  plugins: [
    new InlinePlugin({
      // the prefix will tell plugin which imports should be inlined
      prefix: '/*webpack-rpc-inline-plugin*/',
    }),
  ],
};
```

Add prefix to turn on plugin in your code:

```js
// normal imports
const lodash = require('lodash');

function rpcFunction() {
  const inlineFunction = /*webpack-rpc-inline-plugin*/require('./inline-function.js');
}
doRpcExecute(rpcFunction);
```


LICENCE
-------

[MIT](https://opensource.org/licenses/MIT)
