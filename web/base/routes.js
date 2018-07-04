'use strict'

const Handler = require('./handler')

const Routes = [{
  method: 'GET',
  path: '/test',
  handler: Handler.test,
  options: {
  }
}, {
  method: 'GET',
  path: '/images/{param*}',
  handler: {
    directory: {
      path: 'public/images'
      // listing: true
    }
  },
  options: {
    auth: false
  }
}, {
  method: 'GET',
  path: '/css/{param*}',
  handler: {
    directory: {
      path: 'public/css'
    }
  },
  options: {
    auth: false
  }
}, {
  method: 'GET',
  path: '/js/{param*}',
  handler: {
    directory: {
      path: 'public/js'
    }
  },
  options: {
    auth: false
  }
}, {
  method: '*',
  path: '/{path*}',
  handler: Handler.missing,
  options: {
    auth: false
  }
}]

module.exports = Routes
