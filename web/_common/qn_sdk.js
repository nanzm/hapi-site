'use strict'

const qiniu = require('qiniu')

const accessKey = process.env.ACCESSKEY
const secretKey = process.env.SECRETKEY

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

module.exports = {
  token: function (options) {
    if (!options) {
      options = {
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        scope: 'cdn-block1'
      }
    }
    let putPolicy = new qiniu.rs.PutPolicy(options)
    return putPolicy.uploadToken(mac)
  },
  list: function (bucket, options) {
    const config = new qiniu.conf.Config()
    //config.useHttpsDomain = true;
    config.zone = qiniu.zone.Zone_z0
    const bucketManager = new qiniu.rs.BucketManager(mac, config)

    const bucketParam = bucket || 'cdn-block1'

    const optionsParam = options || {
      limit: 100,
      prefix: ''
    }

    return new Promise(function (resolve, reject) {
      bucketManager.listPrefix(bucketParam, optionsParam, function (err, respBody, respInfo) {
        if (err) {
          return reject(err)
        }

        resolve(respInfo)
      })
    })

  }
}

