/* global beforeAll, test, expect */

const webpack = require('webpack');
const webpackConfig = require('../sample/webpack.config.js');

beforeAll(() => {
  const compiler = webpack(webpackConfig);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString({
          chunks: false,
          colors: true,
        }));
        resolve(stats);
      }
    });
  });
});

test('check result', () => {
  const result = require('../dist/main');
  const code = result.toString();
  expect(code).toMatch(/return [a-z] \+ 1;/);
  expect(code).toMatch('return "world";');
});
