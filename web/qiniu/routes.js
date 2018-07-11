'use strict'

const Handler = require('./handler')

const Routes = [{
  method: 'GET',
  path: '/qiniu',
  options: Handler.index
}, {
  method: 'GET',
  path: '/qiniu/trans',
  options: Handler.trans
}, {
  method: 'GET',
  path: '/qiniu/del',
  options: Handler.del
}, {
  method: 'GET',
  path: '/qiniu/token',
  options: Handler.token
}, {
  method: 'GET',
  path: '/qiniu/move',
  options: Handler.move
}, {
  method: '*',
  path: '/qiniu/notify',
  options: Handler.notify
}]

module.exports = Routes
