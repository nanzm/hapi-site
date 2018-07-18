'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const VideoSchema = new Schema({
  title: String,
  prefix: String,
  cover: String,
  meta: {
    created_at: Date,
    updated_at: Date
  }
})

VideoSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

module.exports = mongoose.model('Video', VideoSchema)
