const { join } = require('path');
const { EnvironmentPlugin } = require('webpack');

module.exports = function() {
  return {
    plugins: [
      new EnvironmentPlugin({
        NODE_ENV: 'development',
      }),
    ],
    // devtool: '#inline-source-map', doesn't work due to bug in debugger
    entry: {
      background: join(__dirname, './src/pages/background/index.js'),
      popup: join(__dirname, './src/pages/popup/index.js'),
      options: join(__dirname, './src/pages/options/index.js'),
      content: join(__dirname, './src/pages/content/index.js'),
    },
    output: {
      path: __dirname,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
  };
};
