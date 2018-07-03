'use strict'

const Handler = require('./handler')

const Routes = [{
  method: 'GET',
  path: '/test',
  handler: Handler.test,
  options: {
    auth: 'session'
  }
}, {
  method: 'GET',
  path: '/public/{param*}',
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
  method: '*',
  path: '/{p*}',
  handler: Handler.missing,
  options: {
    auth: false
  }
}]

module.exports = Routes
