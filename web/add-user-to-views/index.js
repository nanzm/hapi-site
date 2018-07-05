'use strict'

const _ = require('lodash')

function register (server, options) {
  server.ext('onPreResponse', (request, h) => {
    const response = request.response
    // rendering a view? then add the user object
    if (response.variety && _.isEqual(response.variety, 'view')) {
      response.source.context = response.source.context || {}

      if (request.auth.isAuthenticated) {
        response.source.context.user = request.auth.credentials
        return h.continue
      }
    }

    return h.continue
  })

  server.log('info', 'Plugin add user!')
}

exports.plugin = {
  name: 'add-user-object-to-views',
  version: '1.0.0',
  register
}
