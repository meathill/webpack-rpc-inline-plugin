function transpile(code) {
  // unwrap arrow function
  const unwrapped = code.substring(6, code.length - 5);

  // find variable map name, and main function name
  const regex = /var ([a-zA-Z$_][\w$]*)={/;
  let match = regex.exec(unwrapped);
  const mapName = match[1];
  match = /}(\d+)$/.exec(unwrapped);
  const defaultName = match[1];

  // return map variable
  const mapped = new Function(`${unwrapped}; return ${mapName}`);

  // replace all `require`s
  const functionBody = unwrapped.replace(/([a-zA-Z$_][\w$]*)=[a-zA-Z]\(\d+\)([,;])/g, (match, varName, key, splitter) => {
    key = parseInt(key, 10);
    const func = mapped(key);
    const r = Object.create(null);
    func(r);
    return `${varName}=${r.exports.toString()}${splitter}`;
  });

  // recreate final code
  code = `(()=>{${functionBody}})();`;

  return code;
}

module.exports = transpile;
