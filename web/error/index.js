'use strict'

async function register (server, options) {
  await server.register([{
    plugin: require('hapi-dev-errors'),
    options: {
      useYouch: true,
      showErrors: process.env.NODE_ENV !== 'production'
      // showErrors: true
    }
  }])

  server.log('info', 'Plugin error!')
}

exports.plugin = {
  name: 'error',
  version: '1.0.0',
  register
}
