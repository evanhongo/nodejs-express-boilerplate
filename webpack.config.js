const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  name: 'main',
  entry: {
    server: path.resolve(__dirname, 'src/main.ts'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: ""
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()]    
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2018'
        },
        exclude: /node_modules/
      },
    ],
  },
};