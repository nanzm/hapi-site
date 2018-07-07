'use strict'

const Handler = require('./handler')

const Routes = [{
  method: 'GET',
  path: '/qiniu',
  handler: Handler.index,
  options: {

  }
}, {
  method: 'GET',
  path: '/qiniu/trans',
  handler: Handler.trans,
  options: {

  }
}, {
  method: 'GET',
  path: '/qiniu/del',
  handler: Handler.del,
  options: {

  }
}, {
  method: 'GET',
  path: '/qiniu/token',
  handler: Handler.token,
  options: {

  }
}, {
  method: 'GET',
  path: '/qiniu/move',
  handler: Handler.move,
  options: {
  }
}, {
  method: '*',
  path: '/qiniu/notify',
  handler: Handler.notify,
  options: {
    auth: false
  }
}]

module.exports = Routes
