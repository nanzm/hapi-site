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
      try {
        const { title, desc } = request.payload
        await Picture.create({ title, desc })
      } catch (e) {
        request.server.log(e.message)
        return h.view('picture/index', { error: '添加项目失败' })
      }
      return h.view('picture/index', { info: '添加项目失败' })
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
  }
}

module.exports = Handler
