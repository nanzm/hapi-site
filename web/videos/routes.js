'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/',
    options: Handler.index
  },
  {
    method: 'GET',
    path: '/videos',
    options: Handler.videos
  }, {
    method: 'POST',
    path: '/videos',
    options: Handler.add
  }, {
    method: 'GET',
    path: '/video/del/{id}',
    options: Handler.del
  }, {
    method: 'GET',
    path: '/video/player',
    options: Handler.player
  }, {
    method: 'GET',
    path: '/api/v1/course',
    options: Handler.api_course_list
  }
]

module.exports = Routes
