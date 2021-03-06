'use strict'

const Routes = require('./routes')

function register (server, options) {
  server.route(Routes)
  server.log('info', 'Plugin base!')
}

exports.plugin = {
  name: 'base-routes',
  version: '1.0.0',
  register
}
