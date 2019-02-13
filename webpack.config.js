const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.PUBLIC_PATH || '',
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: process.env.NODE_ENV || 'development',
}
