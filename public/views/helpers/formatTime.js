'use strict'

const moment = require('moment')

module.exports = time => {
  let ts = String(time).substr(0, String(time).length - 4)
  return moment(Number(ts)).format('YYYY MMMM Do , h:mm:ss a')
}
