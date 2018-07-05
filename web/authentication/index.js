'use strict'
const Routes = require('./routes')

async function register (server, options) {
  const cache = server.cache({ cache: 'mongoCache', segment: 'sessions', expiresIn: 60 * 1000 })
  server.app.cache = cache

  // const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 })
  // server.app.cache = cache

  await server.register(require('hapi-auth-cookie'))

  server.auth.strategy('session', 'cookie', {
    password: '3Sc1EIBIfes~q9XV~i2MFrmbsHD_z5IJ',
    cookie: 'sid',
    redirectTo: '/login',
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

      server.log('info', '----------------------validateFunc--------------------------')

      return out
    }
  })
  server.auth.default('session')

  server.route(Routes)
  server.log('info', 'Plugin authentication!')
}

exports.plugin = {
  name: 'authentication',
  version: '1.0.0',
  register
}
