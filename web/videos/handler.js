'use strict'

const Video = require('../../models/video')

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
      const slug = request.params.slug

      return h.view('videos/single')

    } catch (e) {

    }
  }

}

module.exports = Handler
