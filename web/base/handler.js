'use strict'

const Boom = require('boom')

const Handler = {
  missing: (request, h) => {
    const accept = request.headers.accept

    if (accept && accept.match(/json/)) {
      return Boom.notFound('Fuckity fuck, this resource isn’t available.')
    }

    return h.view('404').code(404)
  }
}

module.exports = Handler
