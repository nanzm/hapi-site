'use strict'

const Joi = require('joi')
const ErrorExtractor = require('../../utils/error-extractor')
const Picture = require('../../models/picture')

const Handler = {
  index: {
    handler: async (request, h) => {
      const pictures = await Picture.find()
      return h.view('picture/index', { pictures })
    }
  },
  add: {
    handler: async (request, h) => {
      const { title, desc } = request.payload
      await Picture.create({ title, desc })
      return h.redirect('/picture')
    },
    validate: {
      payload: {
        title: Joi.string().trim(),
        desc: Joi.string().trim()
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
      return h.view('picture/detail')
    }
  }
}

module.exports = Handler
