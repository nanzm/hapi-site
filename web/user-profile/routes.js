'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/profile',
    handler: Handler.profile,
    options: {
      auth: false
    }
  }
]

module.exports = Routes
