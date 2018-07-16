'use strict'

const Joi = require('joi')
const ErrorExtractor = require('../../utils/error-extractor')
const Picture = require('../../models/picture')
const qnsdk = require('../_common/qnsdk')

const Handler = {
  index: {
    handler: async (request, h) => {
      const pictures = await Picture.find()
      return h.view('picture/index', { pictures })
    }
  },
  add: {
    handler: async (request, h) => {
      const { title, prefix } = request.payload
      await Picture.create({ title, prefix })
      return h.redirect('/picture')
    },
    validate: {
      payload: {
        title: Joi.string().trim(),
        prefix: Joi.string().trim()
      },
      failAction: (request, h, error) => {
        const errors = ErrorExtractor(error)
        return h.view('picture/index', { errors }).code(400).takeover()
      }
    }
  },
  del: {
    handler: async (request, h) => {
      await Picture.deleteOne({ _id: request.params.id })
      return h.redirect('/picture')
    }
  },
  detail: {
    handler: async (request, h) => {
      let prefix = request.query

      let result = await new qnsdk().list({ prefix }, 'oooooooooooooooo')
      let list = result.data.items

      return h.view('picture/detail', { list })
    },
    validate: {
      query: {
        prifix: Joi.string().trim()
      },
      failAction: (request, h, error) => {
        const errors = ErrorExtractor(error)
        return h.view('picture/detail', { errors }).code(400).takeover()
      }
    }
  }
}

module.exports = Handler
