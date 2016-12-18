module.exports = {
  entry: "./src/main.js",
  output: {
    //path: "./dist",
    filename: "./main.js",
    pathinfo: true,
    libraryTarget: "commonjs2",
  },

  target: "node",

  node: {
    console: true,
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  }
};
