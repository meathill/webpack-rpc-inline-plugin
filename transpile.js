function transpile(code) {
  // unwrap arrow function
  const prefix = code.substring(0, 226); // 226 is the length of UMD
  const postfix = code.substring(code.length - 12); // the last wrapper
  const unwrapped = code.substring(226, code.length - 12);

  // find variable map name, and main function name
  const regex = /^([a-zA-Z$_][\w$]*)={/;
  let match = regex.exec(unwrapped);
  const mapName = match[1];

  // return map variable
  const func = new Function(`${unwrapped}; return ${mapName};`);
  const mapped = func();

  // replace all `require`s
  const functionBody = unwrapped.replace(/([a-zA-Z$_][\w$]*)=[a-zA-Z]\((\d+)\)([,;])/g, (match, varName, key, splitter) => {
    key = parseInt(key, 10);
    const func = mapped[key];
    const r = Object.create(null);
    func(r);
    return `${varName}=${r.exports.toString()}${splitter}`;
  });

  // recreate final code
  code = prefix + functionBody + postfix;

  return code;
}

module.exports = transpile;
