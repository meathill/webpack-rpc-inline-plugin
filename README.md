Webpack RPC Inline Plugin
========

![Workflow status](https://github.com/meathill/webpack-rpc-inline-plugin/actions/workflows/node.js.yml/badge.svg)


This plugin will inline scripts to the places where they are imported.


Built for
---------

Sometimes, we may need to execute script in another context. Like in puppeteer,
we will call `page.evaluate(func, param1, param2)` to execute the function in
the context of THAT `page`.

In the situation, the whole function will be stringifies and passed to another
context. Then over there, **the another context**, the function will be re-instanced,
and executed.

If we use module methods as usual, like below:

```js
import someFunc from './some-func.js';

const param1 = 'hello';

page.evaluate(function (param1) {
  someFunc(param1);
}, param1);
```

JS engine won't find any matched function called `someFunc`, because it were
not passed.


Usage
-----

Install via `npm i webpack-rpc-inline-plugin -D`

Setup plugin in webpack.config.js:

```js
const InlinePlugin = require('webpack-rpc-inline-plugin');

module.exports = {
  plugins: [
    new InlinePlugin({
      // the rules will tell plugin which destination files should be inlined
      rules: [
        /my-rpc-file\.js$/,
      ],
      // the exclue has higher priority than `rules`
      exclude: [

      ],
    }),
  ],
};
```

```js
// inline-function.js
module.exports = function sayHello() {
  return 'hello';
}

// index.js
function rpcFunction() {
  const sayHello = require('./inline-function.js');
}
doRpcExecute(rpcFunction);


// will be compiled to: main.js
function rpcFunction() {
  const sayHello = function sayHello() {
    return 'hello';
  }
}
```


Demo
----

You can run `npm run dev` to see the result in `/dist` folder.


Author
------

Meathill <[mailto:meathill@gmail.com](meathill@gmail.com)>


LICENCE
-------

[MIT](https://opensource.org/licenses/MIT)
