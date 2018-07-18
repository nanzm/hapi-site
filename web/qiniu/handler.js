'use strict'

const boom = require('boom')
const Qiniu = require('../../common/qnsdk')

const Handler = {
  /**
   * 列表
   */
  index: {
    auth: { mode: 'required' },
    handler: async function (req, h) {
      try {
        let opts = { marker: '' }
        if (req.query.marker) opts.marker = req.query.marker

        const result = await new Qiniu().list(opts, req.query.bucket || '')

        let isBlock2 = req.query.bucket === 'cdn-block2'

        return h.view('qiniu/list', { data: result.data, isBlock2 })
      } catch (e) {
        const { path, method } = req
        return h.view('server-error', {
          message: e.message, stack: e.stack, path, method: method.toUpperCase()
        })
      }
    }
  },
  /**
   * 转码
   */
  trans: {
    auth: { mode: 'required' },
    handler: async function (req, h) {
      try {
        const file = req.query.key
        await new Qiniu().trans(file)
        return h.redirect('/qiniu?bucket=cdn-block2')
      } catch (e) {
        return h.view('server-error', { e })
      }
    }
  },
  /**
   * 删除
   */
  del: {
    auth: { mode: 'required' },
    handler: async function (req, h) {
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
    }
  },
  /**
   * token
   */
  token: {
    auth: { mode: 'required' },
    handler: async function (req, h) {
      try {
        const result = new Qiniu().token()
        return h.response({ token: result })
      } catch (e) {
        return boom.serverUnavailable(e)
      }
    }
  },
  /**
   * 移动
   */
  move: {
    auth: { mode: 'required' },
    handler: async function (req, h) {
      try {
        const key = req.query.key
        new Qiniu().move(key)
        return h.redirect('/qiniu')
      } catch (e) {
        return boom.serverUnavailable(e)
      }
    }
  },
  notify: {
    handler: async function (req, h) {
      try {
      } catch (e) {

      }
    }
  }
}

module.exports = Handler
