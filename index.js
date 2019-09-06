'use strict';

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'set-placeholder',
      plugin: require('./lib/simple-set-transform'),
      baseDir() {
        return __dirname;
      },
    });
  },
};
