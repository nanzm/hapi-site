'use strict'

const boom = require('boom')
const Qiniu = require('../_common/qnsdk')

const Handler = {
  index: async function (request, h) {
    try {
      const result = await new Qiniu().list()
      debugger
      return h.view('qiniu/list', { data: result.data })
    } catch (e) {
      const { path, method } = request
      return h.view('server-error', {
        message: e.message, stack: e.stack, path, method: method.toUpperCase()
      })
    }
  },
  token: async function (request, h) {
    try {
      const result = new Qiniu().token()
      return h.response({ token: result })
    } catch (e) {
      return boom.serverUnavailable()
    }
  },
  notify: async function (request, h) {

  }
}

module.exports = Handler
