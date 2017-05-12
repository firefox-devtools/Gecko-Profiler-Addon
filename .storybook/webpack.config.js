// load the default config generator.
var genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = function(config, env) {
  config = genDefaultConfig(config, env);
  config['debug'] = true;
  config['devtool'] = '#eval';
  return config;
};
