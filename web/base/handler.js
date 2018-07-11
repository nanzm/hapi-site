'use strict'

const Boom = require('boom')

const Handler = {
  test: {
    handler: async function (request, h) {
      return h.view('test')
    }
  },

  css: {
    auth: false,
    handler: {
      directory: {
        path: 'public/css'
      }
    }
  },

  fonts: {
    auth: false,
    handler: {
      directory: {
        path: 'public/fonts'
      }
    }
  },

  image: {
    auth: false,
    handler: {
      directory: {
        path: 'public/images'
      }
    }
  },

  js: {
    auth: false,
    handler: {
      directory: {
        path: 'public/js'
      }
    }
  },

  missing: {
    auth: {
      mode: 'try'
    },
    handler: (request, h) => {
      const accept = request.headers.accept
      if (accept && accept.match(/json/)) {
        return Boom.notFound('Fuckity fuck, this resource isn’t available.')
      }
      return h.view('404').code(404)
    }
  }
}

module.exports = Handler
