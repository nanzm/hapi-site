'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: ['GET', 'POST'],
    path: '/login',
    handler: Handler.login,
    options: {
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: Handler.logout,
    options: {
      auth: false
    }
  },
  {
    method: ['GET', 'POST'],
    path: '/register',
    handler: Handler.register,
    options: {
      auth: false
    }
  }
]

module.exports = Routes
