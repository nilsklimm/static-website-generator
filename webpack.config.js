const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const { NODE_ENV = 'developement' } = env;

  const ifDev = (yes, no) => NODE_ENV === 'developement' ? yes : no;

  return {
    entry: {
      bundle: `${__dirname}/src/client/index.js`,
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    output: {
      filename: '[name].js',
      path: `${__dirname}/dist`,
      publicPath: '/',
    },
    plugins: [
      ...ifDev([new webpack.HotModuleReplacementPlugin()], []),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),
      new HtmlWebpackPlugin({
        template: `${__dirname}/src/client/index.html`,
        inject: 'body',
      }),
      new webpack.DefinePlugin({
        'WEBPACK_ENV': JSON.stringify({
          mode: NODE_ENV,
        }),
      })
    ],
    devServer: {
      contentBase: './dist',
      hot: true,
      historyApiFallback: {
        index: '/'
      }
    }
  };
}
