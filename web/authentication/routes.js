'use strict'

const Joi = require('Joi')
const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/login',
    handler: Handler.login,
    options: {
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: Handler.form,
    options: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string().email(),
          password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        },
        failAction: async function (request, h, err) {
          request.validateError = err
          return h.continue
        }
      }
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
