const qiniu = require('qiniu')

// const accessKey = process.env.ACCESSKEY
// const secretKey = process.env.SECRETKEY
const accesskey = 'uSwBl4Izt_hjid-iaMWZJqmEzAf2aqAnaUG9MXY9'
const secretkey = 'lecz-TriYWSUDXuAbocirK4SiDJXN0LyU82RTwoZ'

class qn {
  constructor (opts) {
    this.opts = opts

    this.config = null
    this.mac = null
    this.bucketManager = null

    this._init()
  }

  _init () {
    // config
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z0
    // config.useHttpsDomain = true;
    this.config = config

    // mac
    const mac = new qiniu.auth.digest.Mac(accesskey, secretkey)
    this.mac = mac

    //bucketManager
    this.bucketManager = new qiniu.rs.BucketManager(mac, config)
  }

  token (options) {
    if (!options) {
      options = {
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        scope: 'cdn-block1'
      }
    }
    let putPolicy = new qiniu.rs.PutPolicy(options)
    return putPolicy.uploadToken(this.mac)
  }

  list (optionsParam, bucketParam) {
    const that = this
    const bucket = bucketParam || 'cdn-block1'
    const options = Object.assign({
      limit: 20,
      prefix: ''
      //marker    上一次列举返回的位置标记，作为本次列举的起点信息
      //limit     每次返回的最大列举文件数量
      //delimiter 指定目录分隔符
    }, optionsParam)

    return new Promise(function (resolve, reject) {
      that.bucketManager.listPrefix(bucket, options, function (err, respBody, respInfo) {
        if (err) {
          return reject(err)
        }

        resolve(respInfo)
      })
    })

  }

  delete (key, bucketParam) {
    const that = this
    const bucket = bucketParam || 'cdn-block1'

    return new Promise(function (resolve, reject) {
      if (!keyParam) reject(new Error('必须传入key'))

      that.bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
        if (err) {
          reject(err)
        } else {
          resolve(respInfo)
        }
      })
    })
  }
}

module.exports = qn
