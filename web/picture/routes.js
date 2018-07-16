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
  }
]

module.exports = Routes
