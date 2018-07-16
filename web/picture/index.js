'use strict'

const Routes = require('./routes')

async function register (server, options) {
  server.route(Routes)

  server.log('info', 'Plugin picture!')
}

exports.plugin = {
  name: 'picture',
  version: '1.0.0',
  register
}
