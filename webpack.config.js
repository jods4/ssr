const path = require("path");
const { AureliaPlugin } = require("aurelia-webpack-plugin");

module.exports = {
  // The Fetch polyfill is required in JSDOM/NodeJS environment
  entry: { main: ["whatwg-fetch", "aurelia-bootstrapper"] },

  output: {
    path: path.join(__dirname, "wwwroot", "dist"),
    filename: "app.js",
    publicPath: "/dist/",
  },

  resolve: {
    extensions: [".ts", ".js"],
    modules: ["App", "node_modules"],    
  },

  module: {
    rules: [
      { test: /\.html$/i, loaders: "html-loader" },
      { test: /\.ts$/i, loaders: "ts-loader" },
    ]
  },

  plugins: [
    new AureliaPlugin(),
  ]
};