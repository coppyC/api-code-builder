const path = require('path')

module.exports = env => ({
  entry: './src/main.js',
  mode: env.mode,
  target: env.target,
  output: {
    filename: env.filename + '.js',
    path: path.resolve(__dirname, 'dist'),
    library: env.libraryTarget === 'window' ? 'ACB' : undefined,
    libraryTarget: env.libraryTarget
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          helperDirs: [__dirname + '/src/helpers'],
          partialDirs: [__dirname + '/src/partials'],
        }
      }
    ]
  }
})
