'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const PictureSchema = new Schema({
  title: String,
  desc: String,
  meta: {
    created_at: Date,
    updated_at: Date
  }
})

PictureSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

module.exports = mongoose.model('Picture', PictureSchema)
