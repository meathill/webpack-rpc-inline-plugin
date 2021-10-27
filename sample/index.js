function doSomething(key) {
  const foo = /*webpack-rpc-inline-plugin*/require('./foo');

  foo();
}

module.exports = doSomething;
