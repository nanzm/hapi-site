'use strict'

const Handler = require('./handler')

const Routes = [{
  method: 'GET',
  path: '/qn',
  handler: Handler.index,
  options: {
    auth: {
      mode: 'try'
    }
  }
}, {
  method: 'GET',
  path: '/qn/token',
  handler: Handler.token,
  options: {
    auth: {
      mode: 'try'
    }
  }
}, {
  method: 'GET',
  path: '/qn/notify',
  handler: Handler.notify,
  options: {
    auth: false
  }
}]

module.exports = Routes
