'use strict'

const Joi = require('joi')
const nanoid = require('nanoid')
const errorExtractor = require('../../utils/error-extractor')
const User = require('../../models').User

async function transError (request, h, err) {
  request.validateError = err
  return h.continue
}

const Handler = {
  login: {
    handler: async function (request, h) {
      return h.view('login')
    }
  },

  form: {
    validate: {
      payload: {
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      },
      failAction: transError
    },
    handler: async function (request, h) {
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
    }
  },

  logout: {
    handler: async function (request, h) {
      request.server.app.cache.drop(request.state['sid'].sid)
      request.cookieAuth.clear()

      return h.redirect('/')
    }
  },

  signup: {
    handler: async function (request, h) {
      return h.view('signup')
    }
  },

  signup_success: {
    handler: async function (request, h) {
      return h.view('signup-success')
    }
  },

  signup_submit: {
    validate: {
      payload: {
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      },
      failAction: transError
    },
    handler: async function (request, h) {
      if (request.validateError) {
        const err = errorExtractor(request.validateError)
        return h.view('signup', { errors: err, email: request.payload.email })
      }

      const { email, password } = request.payload
      try {
        await User.create({ email, password })
        // saved!
        return h.redirect('/signup_success')
      } catch (e) {
        if (e.code === 11000) e.errmsg = '账号已存在'
        return h.view('signup', { errormessage: e.errmsg })
      }
    }
  },

  forgot_password: {
    handler: async function (request, h) {
      return h.view('forgot-password')
    }
  },

  forgot_password_submit: {
    validate: {
      payload: {
        email: Joi.string().email()
      },
      failAction: transError
    },
    handler: async function (request, h) {
      return h.view('forgot-password')
    }
  }
}

module.exports = Handler
