'use strict'

const Handler = require('./handler')

const Routes = [{
  method: '*',
  path: '/{p*}',
  handler: Handler.missing,
  options: {
    validate: {
      options: {
        abortEarly: false,
        allowUnknown: true
      }
    },
    auth: false
  }
}, {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public'
      // listing: true
    }
  },
  options: {
    auth: false
  }
}, {
  method: 'GET',
  path: '/test',
  handler: Handler.test,
  options: {
    auth: false
  }
}]

module.exports = Routes
