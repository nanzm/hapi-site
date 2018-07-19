'use strict'

const Pack = require('../../package')

async function register (server, options) {
  await server.register([{
    plugin: require('hapi-swagger'),
    options: {
      schemes: ['https', 'http'],
      host: process.env.NODE_ENV === 'production' ? 'nancode.cn' : 'localhost:3000',
      info: {
        title: '接口文档',
        version: Pack.version,
        description: '测试测试'
      },
      documentationPath: '/docs'
    }
  }])

  server.log('info', 'Plugin hapiswagger!')
}

exports.plugin = {
  name: 'swagger',
  version: '1.0.0',
  register
}
