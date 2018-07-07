'use strict'

const Boom = require('boom')

const Handler = {
  index: async (request, h) => {
    return h.redirect('/videos')
  },
  videos: async (request, h) => {
    try {
      return h.view('videos/index')
    } catch (e) {

    }
  },
  single: async (request, h) => {
    try {
      const url = request.query.url
      return h.view('videos/single', { url: url })
    } catch (e) {
      return Boom.serverUnavailable(e.message)
    }
  }

}

module.exports = Handler
