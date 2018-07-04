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
    path: '/signup',
    handler: Handler.signup,
    options: {
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/forgot-password',
    handler: Handler.forgot_password,
    options: {
      auth: false
    }
  }
]

module.exports = Routes
