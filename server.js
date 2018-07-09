'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Dotenv = require('dotenv')
const Handlebars = require('handlebars')
const fundebug = require('fundebug-nodejs')
const HandlebarsRepeatHelper = require('handlebars-helper-repeat')
Handlebars.registerHelper('repeat', HandlebarsRepeatHelper)

Dotenv.config({ path: Path.resolve(__dirname, 'config.env') })

const server = new Hapi.Server({
  host: 'localhost',
  port: 3000,
  cache: [{
    name: 'mongoCache',
    engine: require('catbox-mongodb'),
    partition: 'hapi-cache',
    uri: process.env.MONGODB_CACHE
  }]
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
      plugin: require('./web/monitoring')
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
      plugin: require('./web/qiniu')
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

//bug report
fundebug.apikey = process.env.FUNDEBUG
fundebug.releasestage = process.env.NODE_ENV

process.on('unhandledRejection', (err) => {
  console.error(err)
  fundebug.HapiErrorHandler(err)
  process.exit(1)
})

init()
