'use strict'

const Mongoose = require('mongoose')
const User = require('./user')
const Video = require('./video')

// tell Mongoose to use Node.js promises
Mongoose.Promise = global.Promise

// Connect to database
Mongoose.connect(process.env.DATABASE || 'mongodb://localhost/hapi-site')

// listen for connection errors and print the message
Mongoose.connection.on('error', err => {
  console.error(`⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨  → ${err.message}`)
  throw err
})

module.exports = { User, Video }
