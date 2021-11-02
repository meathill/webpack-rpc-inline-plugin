function doSomething(key) {
  const foo = /*webpack-rpc-inline-plugin*/require('./bar.txt');

  foo();
}

module.exports = doSomething;
