'use strict'

async function register (server, options) {
  await server.register([{
    plugin: require('good'),
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        myConsoleReporter: [
          { module: 'good-squeeze', name: 'Squeeze', args: [{ log: '*', response: '*' }] },
          { module: 'good-console' }, 'stdout'],
        myFileReporter: [
          { module: 'good-squeeze', name: 'Squeeze', args: [{ ops: '*' }] },
          { module: 'good-squeeze', name: 'SafeJson' },
          { module: 'good-file', args: ['./log/awesome_log'] }
        ]
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
