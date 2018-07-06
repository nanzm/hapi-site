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
      if (req.query && req.query.marker) opts.marker = req.query.marker

      const result = await new Qiniu().list(opts)
      return h.view('qiniu/list', { data: result.data })
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

    } catch (e) {

    }
  },
  /**
   * 删除
   */
  del: async function (req, h) {
    try {
      let redirectUrl = req.headers.referer || '/qiniu'
      if (req.query && req.query.key) {
        await new Qiniu().delete(req.query.key)
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
