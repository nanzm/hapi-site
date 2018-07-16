'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/picture',
    options: Handler.index
  }, {
    method: 'POST',
    path: '/picture',
    options: Handler.add
  }, {
    method: 'GET',
    path: '/picture/del/{id}',
    options: Handler.del
  }, {
    method: 'GET',
    path: '/picture/{id}',
    options: Handler.detail
  }
]

module.exports = Routes
