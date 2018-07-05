'use strict'

const Joi = require('joi')
const Handler = require('./handler')

/**
 * 将错误信息挂到request
 * @param request
 * @param h
 * @param err
 * @returns {Promise<*>}
 */
async function goNext (request, h, err) {
  request.validateError = err
  return h.continue
}

const Routes = [
  {
    method: 'GET',
    path: '/login',
    handler: Handler.login,
    options: {
      auth: {
        mode: 'try'
      }
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: Handler.form,
    options: {
      auth: {
        mode: 'try'
      },
      validate: {
        payload: {
          email: Joi.string().email(),
          password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        },
        failAction: goNext
      }
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: Handler.logout,
    options: {
      auth: {
        mode: 'try'
      }
    }
  },
  {
    method: 'GET',
    path: '/signup',
    handler: Handler.signup,
    options: {
      auth: {
        mode: 'try'
      }
    }
  },
  {
    method: 'GET',
    path: '/signup_success',
    handler: Handler.signup_success,
    options: {
      auth: {
        mode: 'try'
      }
    }
  },
  {
    method: 'POST',
    path: '/signup',
    handler: Handler.signup_submit,
    options: {
      auth: {
        mode: 'try'
      },
      validate: {
        payload: {
          email: Joi.string().email(),
          password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        },
        failAction: goNext
      }
    }
  },
  {
    method: 'GET',
    path: '/forgot-password',
    handler: Handler.forgot_password,
    options: {
      auth: {
        mode: 'try'
      }
    }
  },
  {
    method: 'POST',
    path: '/forgot-password',
    handler: Handler.forgot_password_submit,
    options: {
      auth: {
        mode: 'try'
      },
      validate: {
        payload: {
          email: Joi.string().email()
        },
        failAction: goNext
      }
    }
  }
]

module.exports = Routes
