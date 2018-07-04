'use strict'

const Joi = require('joi')
const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/',
    handler: Handler.index,
    options: {
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/videos/{slug}',
    handler: Handler.single,
    options: {
      validate: {
        params: {
          slug: Joi.string().required()
        }
      },
      auth: false
    }
  }
]

module.exports = Routes
