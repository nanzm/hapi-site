'use strict'

const qnUtils = require('../_common/qn_sdk')

const Handler = {
  index: async function () {
    try {
      const result = await qnUtils.list()
      debugger
    } catch (e) {
      debugger
    }
  },
  notify: async function () {
  }
}

module.exports = Handler
