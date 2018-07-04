'use strict'

const Routes = require('./routes')

function register (server, options) {
  server.route(Routes)
  server.log('info', 'Plugin videos!')
}

exports.plugin = {
  name: 'videos',
  version: '1.0.0',
  register
}
