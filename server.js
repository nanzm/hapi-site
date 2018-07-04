'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Dotenv = require('dotenv')
const Handlebars = require('handlebars')
const HandlebarsRepeatHelper = require('handlebars-helper-repeat')

Handlebars.registerHelper('repeat', HandlebarsRepeatHelper)

Dotenv.config({ path: Path.resolve(__dirname, 'secrets.env') })

const server = new Hapi.Server({
  host: 'localhost',
  port: 3000,
  // cache: [{
  //   name: 'mongoCache',
  //   engine: require('catbox-mongodb'),
  //   partition: 'hapi-cache',
  //   uri: 'mongodb://localhost:27017/?maxPoolSize=5'
  // }]
})

server.events.on('log', (event, tags) => {
  console.log(event.data)
})

async function init () {
  await server.register([
    {
      plugin: require('inert')
    },
    {
      plugin: require('vision')
    },
    {
      plugin: require('./web/authentication')
    },
    {
      plugin: require('./web/error')
    },
    {
      plugin: require('./web/base')
    },
    {
      plugin: require('./web/videos')
    },
    {
      plugin: require('./web/add-user-to-views')
    }
  ])

  const viewsPath = Path.resolve(__dirname, 'public', 'views')

  server.views({
    engines: {
      hbs: Handlebars
    },
    path: viewsPath,
    layoutPath: Path.resolve(viewsPath, 'layouts'),
    layout: 'layout',
    helpersPath: Path.resolve(viewsPath, 'helpers'),
    partialsPath: Path.resolve(viewsPath, 'partials'),
    isCached: process.env.NODE_ENV === 'production',
    context: {}
  })

  //启动
  await server.start()
  console.log(`Server started → ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

init()
