module.exports = {
  entry: './src',
  output: {
    path: './dist',
    filename: 'bundle.js',
  },
  resolve: ['', 'js', '.json'],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
}
