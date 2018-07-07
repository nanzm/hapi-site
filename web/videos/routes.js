'use strict'

const Joi = require('joi')
const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/',
    handler: Handler.index,
    options: {
      auth: {
        mode: 'try'
      }
    }
  },
  {
    method: 'GET',
    path: '/videos',
    handler: Handler.videos,
    options: {
      auth: {
        mode: 'try'
      }
    }
  },
  {
    method: 'GET',
    path: '/video/play',
    handler: Handler.single,
    options: {
      validate: {
        query: {
          url: Joi.string().required()
        }
      }
      // auth: {
      //   mode: 'try'
      // }
    }
  }
]

module.exports = Routes
