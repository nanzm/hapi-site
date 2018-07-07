'use strict'

const qiniu = require('qiniu')

const accessKey = process.env.ACCESSKEY
const secretKey = process.env.SECRETKEY

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
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    this.mac = mac

    // bucketManager
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

  /**
   *  文件列表
   * @param optionsParam 常用参数 目标分隔符 分页marker
   * @param bucketParam 默认是 cdn-block1
   * @returns {Promise<any>}
   */
  list (optionsParam, bucketParam) {
    const that = this
    const bucket = bucketParam || 'cdn-block1'
    const options = Object.assign({
      limit: 100,
      prefix: ''
      // marker    上一次列举返回的位置标记，作为本次列举的起点信息
      // limit     每次返回的最大列举文件数量
      // delimiter 指定目录分隔符
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

  /**
   * 删除
   * @param key
   * @param bucket
   * @returns {Promise<any>}
   */
  delete (key, bucket) {
    const that = this

    return new Promise(function (resolve, reject) {
      if (!key) reject(new Error('必须传入key'))

      that.bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
        if (err) {
          reject(err)
        } else {
          resolve(respInfo)
        }
      })
    })
  }

  /**
   *  视频转码
   * @param key 源key
   * @returns {Promise<any>}
   */
  trans (key) {
    const operManager = new qiniu.fop.OperationManager(this.mac, this.config)

    // substr get saveKey
    const index = key.lastIndexOf('.')
    const saveKey = key.substr(0, index)

    // 多媒体队列
    const pipeline = 'doing1'

    const srcBucket = 'cdn-block1'
    const srcKey = key

    // 回调
    const options = {
      'notifyURL': 'http://nancode.cn/qiniu/notify',
      'force': false
    }

    // 处理指令集合
    const saveBucket = 'cdn-block2'
    const fops = [
      'avthumb/mp4|saveas/' + qiniu.util.urlsafeBase64Encode(saveBucket + ':' + saveKey + '.mp4'),
      'vframe/jpg/offset/10|saveas/' + qiniu.util.urlsafeBase64Encode(saveBucket + ':' + saveKey + '.jpg')
    ]
    // 持久化数据处理返回的是任务的persistentId，可以根据这个id查询处理状态
    return new Promise(function (resolve, reject) {
      operManager.pfop(srcBucket, srcKey, fops, pipeline, options, function (err, respBody, respInfo) {
        if (err) {
          return reject(err)
        }
        resolve(respInfo)
      })
    })
  }

  /**
   * 移动
   */
  move (key) {
    const that = this
    const srcKey = key
    const srcBucket = 'cdn-block2'

    const destBucket = 'cdn-block1'
    const destKey = key

    // 强制覆盖已有同名文件
    const options = {
      force: true
    }

    return new Promise(function (resolve, reject) {
      that.bucketManager.move(srcBucket, srcKey, destBucket, destKey, options, function (err, respBody, respInfo) {
        if (err) {
          return reject(err)
        }
        resolve(respInfo)
      })
    })
  }
}

module.exports = qn
