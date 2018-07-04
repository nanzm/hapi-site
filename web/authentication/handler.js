'use strict'

const Handler = {
  login: async function (request, h) {
    return h.view('login')
  },
  logout: async function (request, h) {
  },
  signup: async function (request, h) {
    return h.view('signup')
  },
  forgot_password: async function (request, h) {
    return h.view('forgot-password')
  }
}

module.exports = Handler
