'use strict'

const Routes = require('./routes')

async function register (server, options) {
  // const cache = server.cache({ cache: 'mongoCache', segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 })
  // server.app.cache = cache

  const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 })
  server.app.cache = cache

  await server.register(require('hapi-auth-cookie'))

  server.auth.strategy('session', 'cookie', {
    redirectTo: '/login',
    password: process.env.AUTH_PASSWORD,
    cookie: process.env.SID,
    isSecure: false,
    validateFunc: async (request, session) => {
      const cached = await cache.get(session.sid)

      const out = {
        valid: !!cached
      }

      if (out.valid) {
        out.credentials = cached.account
        console.warn(cached.account)
      }
      return out
    }
  })
  server.auth.default({
    mode: 'try',
    strategy: 'session'
  })

  server.route(Routes)
  server.log('info', 'Plugin authentication!')
}

exports.plugin = {
  name: 'authentication',
  version: '1.0.0',
  register
}
