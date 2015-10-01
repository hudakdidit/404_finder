module.exports = {
  watch: true,
  context: __dirname + "/src",
  entry: {
    app: "./app.js"
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,  
        loader: 'babel'
      }
    ]
  },
  externals: {
      "jquery": "jQuery",
      "$": "jQuery"
    }
}