const nodeExternals = require('webpack-node-externals')
const Nodemon = require('nodemon-webpack-plugin')

function basePath (dir) {
  return require('path').join(__dirname, dir)
}

module.exports = {
  entry: './src/index.js',
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new Nodemon()
  ],
  output: {
    path: basePath('dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': basePath('src'),
      'config': basePath('config')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [basePath('src')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [basePath('src')]
      },
    ]
  }
}
