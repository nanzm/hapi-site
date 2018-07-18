'use strict'

const Joi = require('joi')
const Boom = require('boom')
const ErrorExtractor = require('../../utils/error-extractor')
const Video = require('../../models/video')
const Qnsdk = require('../../common/qnsdk')

const Handler = {
  index: {
    handler: async (request, h) => {
      const videos = await Video.find()
      return h.view('videos/index', { videos })
    }
  },

  add: {
    handler: async (request, h) => {
      const { title, prefix, cover } = request.payload
      await Video.create({ title, prefix, cover })
      return h.redirect('/videos')
    },
    validate: {
      payload: {
        title: Joi.string().trim(),
        prefix: Joi.string().trim(),
        cover: Joi.string().trim()
      },
      failAction: (request, h, error) => {
        const errors = ErrorExtractor(error)
        return h.view('videos/index', { errors }).code(400).takeover()
      }
    }
  },

  del: {
    handler: async (request, h) => {
      await Video.deleteOne({ _id: request.params.id })
      return h.redirect('/videos')
    }
  },

  player: {
    handler: async (request, h) => {
      const { prefix } = request.query
      const videos = await new Qnsdk().list({ prefix, limit: 1 }, 'cdn-block2')
      let video = videos.data.items[0]
      return h.view('videos/player', { prefix, video })
    },
    validate: {
      query: {
        prefix: Joi.string().required()
      }
    }
  },

  api_course_list: {
    tags: ['api'],
    description: '课程列表',
    notes: '根据 prefix 和 marker 查询课程列表',
    handler: async (request, h) => {
      try {
        const { prefix, limit, marker } = request.query
        const videos = await new Qnsdk().list({ prefix, limit: limit || 30, marker }, 'cdn-block2')
        if (videos.statusCode !== 200) throw new Error('七牛sdk查询 statusCode!=200')

        return h.response(videos.data)
      } catch (e) {
        return Boom.badRequest(e.message)
      }
    },
    validate: {
      query: {
        prefix: Joi.string().required().description('前缀，模拟目录'),
        limit: Joi.number().description('数量'),
        marker: Joi.string().description('上一次列举返回的位置标记，作为本次列举的起点信息')
      }
    }
  }
}

module.exports = Handler
