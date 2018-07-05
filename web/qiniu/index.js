'use strict'

const Routes = require('./routes')

async function register (server, options) {
  server.route(Routes)
  server.log('info', 'Plugin qiniu!')
}

exports.plugin = {
  name: 'qiniu',
  version: '1.0.0',
  register
}
