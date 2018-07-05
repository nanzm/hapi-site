'use strict'

const Boom = require('boom')

const Handler = {
  test: async function () {
    throw new Error('服务器向你抛了一个错误！')
  },
  missing: (request, h) => {
    const accept = request.headers.accept

    if (accept && accept.match(/json/)) {
      return Boom.notFound('Fuckity fuck, this resource isn’t available.')
    }

    return h.view('404').code(404)
  }
}

module.exports = Handler
