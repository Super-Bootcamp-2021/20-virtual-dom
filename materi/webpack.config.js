const DotenvWebpackPlugin = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: {
    main: './src/main.ts',
    basic: './src/lib/basic/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './www',
    port: 5757,
  },
  plugins: [
    new DotenvWebpackPlugin({
      path: './.env',
      safe: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      vue$: 'vue/dist/vue.esm.js', // full build with compiler
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.yaml$/,
        use: [{ loader: 'json-loader' }, { loader: 'yaml-loader' }],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
