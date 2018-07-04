'use strict'

const Path = require('path')
const Movie = require(Path.resolve(__dirname, '..', '..', 'models')).Movie

const Handler = {
  index: async (request, h) => {
    try {
      const movies = await Movie.find()

      return h.view('videos/index', { movies })
    } catch (e) {

    }
  },
  single: async (request, h) => {
    try {
      const slug = request.params.slug
      const movie = await Movie.findOne({ 'ids.slug': slug })

      if (!movie) {
        return h.view('404')
      }
      return h.view('videos/single', { movie })
    } catch (e) {

    }
  }

}

module.exports = Handler
