'use strict'

const Handler = require('./handler')

const Routes = [{
  method: 'GET',
  path: '/test',
  options: Handler.test
}, {
  method: 'GET',
  path: '/css/{param*}',
  options: Handler.css
}, {
  method: 'GET',
  path: '/fonts/{param*}',
  options: Handler.fonts
}, {
  method: 'GET',
  path: '/images/{param*}',
  options: Handler.image
}, {
  method: 'GET',
  path: '/js/{param*}',
  options: Handler.js
}, {
  method: '*',
  path: '/{path*}',
  options: Handler.missing
}]

module.exports = Routes
