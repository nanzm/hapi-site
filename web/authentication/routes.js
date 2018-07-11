'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/login',
    options: Handler.login
  },
  {
    method: 'POST',
    path: '/login',
    options: Handler.form
  },
  {
    method: 'GET',
    path: '/logout',
    options: Handler.logout
  },
  {
    method: 'GET',
    path: '/signup',
    options: Handler.signup
  },
  {
    method: 'GET',
    path: '/signup_success',
    options: Handler.signup_success
  },
  {
    method: 'POST',
    path: '/signup',
    options: Handler.signup_submit
  },
  {
    method: 'GET',
    path: '/forgot-password',
    options: Handler.forgot_password
  },
  {
    method: 'POST',
    path: '/forgot-password',
    options: Handler.forgot_password_submit
  }
]

module.exports = Routes
