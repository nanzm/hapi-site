'use strict'

const Video = require('../../models/video')

const Handler = {
  index: async (request, h) => {
    try {
      const videos = await Video.find()

      return h.view('videos/index', { videos })
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
