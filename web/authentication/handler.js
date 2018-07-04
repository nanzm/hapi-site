'use strict'

const nanoid = require('nanoid')
const users = {
  ['50326921@qq.com']: {
    id: 'john',
    password: 'password',
    name: 'John Doe'
  }
}

const Handler = {
  login: async function (request, h) {
    let redirectUrl = request.info.referrer

    if (request.auth.isAuthenticated) {
      return h.redirect(redirectUrl)
    }

    let message = ''
    let account = null

    if (request.method === 'post') {
      if (!request.payload.email || !request.payload.password) {
        message = 'Missing username or password'
      } else {
        account = users[request.payload.email]
        if (!account || account.password !== request.payload.password) {
          message = 'Invalid username or password'
        }
      }
    }
    return h.view('login')
  },
  logout: async function (request, h) {
    request.server.app.cache.drop(request.state['sid-example'].sid)
    request.cookieAuth.clear()

    return h.redirect('/')
  },
  signup: async function (request, h) {
    return h.view('signup')
  },
  forgot_password: async function (request, h) {
    return h.view('forgot-password')
  }
}

module.exports = Handler
