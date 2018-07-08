'use strict'

const Handler = {
  index: async (request, h) => {
    return h.redirect('/videos')
  },
  videos: async (request, h) => {
    try {
      return h.view('videos/index')
    } catch (e) {
      return h.view('500')
    }
  },
  single: async (request, h) => {
    try {
      const url = request.query.url
      return h.view('videos/player', { url: url })
    } catch (e) {
      return h.view('500')
    }
  }

}

module.exports = Handler
