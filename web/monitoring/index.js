'use strict'

async function register (server, options) {
  await server.register([{
    plugin: require('good'),
    options: {
      ops: {
        interval: 10000
      },
      reporters: {
        myConsoleReporter: [
          { module: 'good-console' }, 'stdout']
      }
    }
  }])

  server.log('info', 'Plugin monitoring!')
}

exports.plugin = {
  name: 'monitoring',
  version: '1.0.0',
  register
}
