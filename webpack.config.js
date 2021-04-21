const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build', 'scripts'),
  },
  devServer: {
    contentBase: './src/html',
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: './src/html/admin.html',
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './src/html/main.html',
      chunks: ['main'],
    }),
  ],
};
