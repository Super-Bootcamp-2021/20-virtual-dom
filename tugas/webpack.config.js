const path = require('path');

module.exports = {
  entry: {
    worker: './webapp/src/worker/v-dom.ts',
    tasks: './webapp/src/tasks/v-dom.ts',
    performance: './webapp/src/performance/main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './webapp//www',
    port: 7000,
  },
  resolve: {
    extensions: ['.js', '.ts', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
