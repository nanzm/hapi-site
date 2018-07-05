'use strict'

const nanoid = require('nanoid')
const errorExtractor = require('../../utils/error-extractor')
const User = require('../../models').User

const Handler = {
  /**
   * 登录页面
   */
  login: async function (request, h) {
    return h.view('login')
  },
  /**
   * 登录
   */
  form: async function (request, h) {
    if (request.validateError) {
      const validErr = errorExtractor(request.validateError)
      return h.view('login', { errors: validErr, email: request.payload.email })
    }

    const { email, password } = request.payload
    try {
      const account = await User.findOne({ email })
      const isMatch = await User.comparePassword(password, account.password)
      if (!isMatch) throw new Error('密码错误')

      const sid = nanoid()
      await request.server.app.cache.set(sid, { account }, 0)
      request.cookieAuth.set({ sid })

      return h.redirect('/')

    } catch (e) {
      return h.view('login', { errormessage: e.message })
    }
  },
  /**
   * 退出登录
   */
  logout: async function (request, h) {
    request.server.app.cache.drop(request.state['sid'].sid)
    request.cookieAuth.clear()

    return h.redirect('/')
  },
  /**
   * 注册页面
   */
  signup: async function (request, h) {
    return h.view('signup')
  },
  /**
   * 注册成功
   */
  signup_success: async function (request, h) {
    return h.view('signup-success')
  },
  /**
   * 注册提交
   */
  signup_submit: async function (request, h) {
    if (request.validateError) {
      const err = errorExtractor(request.validateError)
      return h.view('signup', { errors: err, email: request.payload.email })
    }

    const { email, password } = request.payload
    try {
      const usre = await  User.create({ email, password })
      // saved!
      return h.redirect('/signup_success')

    } catch (e) {

      if (e.code == 11000) e.errmsg = '账号已存在'
      return h.view('signup', { errormessage: e.errmsg })
    }
  },
  /**
   * 忘记密码
   */
  forgot_password: async function (request, h) {
    return h.view('forgot-password')
  },
  /**
   * 忘记密码提交
   */
  forgot_password_submit: async function (request, h) {
    return h.view('forgot-password')
  }
}

module.exports = Handler
