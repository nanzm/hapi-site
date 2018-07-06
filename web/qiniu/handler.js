'use strict'

const boom = require('boom')
const Qiniu = require('../_common/qnsdk')

const Handler = {
  /**
   * 列表
   */
  index: async function (req, h) {
    try {
      let opts = { marker: '' }
      if (req.query.marker) opts.marker = req.query.marker

      const result = await new Qiniu().list(opts, req.query.bucket || '')

      let isBlock2 = req.query.bucket == 'cdn-block2'

      return h.view('qiniu/list', { data: result.data, isBlock2 })

    } catch (e) {
      const { path, method } = req
      return h.view('server-error', {
        message: e.message, stack: e.stack, path, method: method.toUpperCase()
      })
    }
  },
  /**
   * 转码
   */
  trans: async function (req, h) {
    try {
      //TODO
      const file = req.query.key
      const result = await new Qiniu().trans(file)
      debugger
      return h.response(result).code(400)
    } catch (e) {
      debugger
      return h.response(e).code(500)
    }
  },
  /**
   * 删除
   */
  del: async function (req, h) {
    try {
      let redirectUrl = req.headers.referer || '/qiniu'

      if (req.query.key && req.query.bucket) {
        await new Qiniu().delete(req.query.key, req.query.bucket)

        return h.redirect(redirectUrl)
      } else {
        throw new Error('需要传入相应的key')
      }
    } catch (e) {
      const { path, method } = req
      return h.view('server-error', {
        message: e.message, stack: e.stack, path, method: method.toUpperCase()
      })
    }

  },
  /**
   * token
   */
  token: async function (req, h) {
    try {
      const result = new Qiniu().token()
      return h.response({ token: result })
    } catch (e) {
      return boom.serverUnavailable()
    }
  },
  notify: async function (req, h) {
    debugger
  }
}

module.exports = Handler
