const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/app.js',
    admin: './src/js/admin.js',
    product: './src/js/product.js',
    cart: './src/js/cart.js',
    filter: './src/js/filter.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build', 'scripts'),
    publicPath: 'build/scripts',
  },
  devtool: 'eval-source-map',
  devServer: {
    // contentBase: path.join(__dirname, 'build', 'html'),
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
