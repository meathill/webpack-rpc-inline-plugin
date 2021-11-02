module.exports = function (source) {
  return `return ${JSON.stringify(source)};`;
}
