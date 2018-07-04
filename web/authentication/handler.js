'use strict'

const nanoid = require('nanoid')
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

    if (request.method === 'post') {

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
    return h.view('login')
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
