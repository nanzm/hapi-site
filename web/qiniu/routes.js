'use strict'

const Handler = require('./handler')

const Routes = [{
  method: 'GET',
  path: '/qiniu',
  handler: Handler.index,
  options: {
    auth: {
      mode: 'try'
    }
  }
}, {
  method: 'GET',
  path: '/qiniu/trans',
  handler: Handler.trans,
  options: {
    auth: {
      mode: 'try'
    }
  }
}, {
  method: 'GET',
  path: '/qiniu/del',
  handler: Handler.del,
  options: {
    auth: {
      mode: 'try'
    }
  }
}, {
  method: 'GET',
  path: '/qiniu/token',
  handler: Handler.token,
  options: {
    auth: {
      mode: 'try'
    }
  }
}, {
  method: 'POST',
  path: '/qiniu/notify',
  handler: Handler.notify,
  options: {
    auth: false
  }
}]

module.exports = Routes
