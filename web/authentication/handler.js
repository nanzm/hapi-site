'use strict'

const nanoid = require('nanoid')
const errorExtractor = require('../../utils/error-extractor')
const users = {
  test: {
    username: 'john',
    password: '123',
    name: 'John Doe'
  }
}

const Handler = {
  /**
   * 登录页面
   * @param request
   * @param h
   * @returns {Promise<*>}
   */
  login: async function (request, h) {
    let redirectUrl = request.info.referrer
    if (request.auth.isAuthenticated) {
      return h.redirect(redirectUrl)
    }
    return h.view('login')
  },
  /**
   * 登录
   * @param request
   * @param h
   * @returns {Promise<*>}
   */
  form: async function (request, h) {
    let err = null
    if (request.validateError) {
      err = errorExtractor(request.validateError)
      return h.view('login', { errors: err, email: request.payload.email })
    }

    // const sid = nanoid
    // await request.server.app.cache.set(sid, { account }, 0)
    // request.cookieAuth.set({ sid })

    return h.redirect('/')
  },
  /**
   * 退出登录
   * @param request
   * @param h
   * @returns {Promise<*>}
   */
  logout: async function (request, h) {
    request.server.app.cache.drop(request.state['sid-example'].sid)
    request.cookieAuth.clear()

    return h.redirect('/')
  },
  /**
   * 注册
   * @param request
   * @param h
   * @returns {Promise<*>}
   */
  signup: async function (request, h) {
    return h.view('signup')
  },
  /**
   * 忘记密码
   * @param request
   * @param h
   * @returns {Promise<*>}
   */
  forgot_password: async function (request, h) {
    return h.view('forgot-password')
  }
}

module.exports = Handler
