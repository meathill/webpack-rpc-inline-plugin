function doSomething(key) {
  const foo = /*webpack-rpc-inline-plugin*/require('./foo');
  const bar = require('./bar');

  function myOwn() {
    console.log('myOwn');
  }

  foo();
  bar(key);

  myOwn();
}

module.exports = doSomething;
