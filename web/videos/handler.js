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
      const movie = await Video.findOne({ 'ids.slug': slug })

      if (!movie) {
        return h.view('404')
      }
      return h.view('videos/single', { movie })
    } catch (e) {

    }
  }

}

module.exports = Handler
