import Async from './async';
const Promise = require('../components/promise').Promise;

class Authorize {
  constructor() {
    this.adapters = {};
    this.initializing = false;
  }

  adapter(name, engine) {
    // supports: 'network, storage'
    // network: authorize
    // storage: write, read;
    // http: http instance;
    this.adapters[name] = engine;
    return this;
  }

  login() {
    const network = this.adapters['network'];
    return new Promise((resolve, reject) => {
      // 瀑布式任务
      Async.waterfall([
        done => {
          wx.login({
            success: function (res) {
              console.log('wx.login信息：', JSON.stringify(res, null, 2));
              if (res.code) {
                done(null, res.code);
              } else {
                done({
                  err: res,
                  msg: '获取wx.login的code失败！'
                }, null);
              }
            },
            fail: function (error) {
              done({
                err: error,
                msg: '网络异常，获取wx.login的接口失败！'
              }, null);
            }
          });
        },
        (code, done) => {
          wx.getUserInfo({
            success: function (data) {
              console.log('wx.getUserInfo信息：', JSON.stringify(data, null, 2));
              const result = {
                data,
                code
              };
              if (data.encryptedData && data.iv) {
                done(null, result);
              } else {
                done({
                  err: data,
                  msg: '获取wx.getUserInfo的encryptedData和iv失败！'
                }, null);
              }
            },
            fail: function (error) {
              done({
                err: error,
                msg: '网络异常，获取wx.getUserInfo的接口失败！'
              }, null);
            }
          });
        },
        (result, done) => {
          network.authorize(result.code, result.data.iv, result.data.encryptedData).then(json => {
            console.log('authorize信息：', JSON.stringify(json, null, 2));
            const data = {
              Authorization: json.data.access_token,
              WalletId: json.data.wallet_id,
              // BitUser: json.data.weixin,
              WechatUser: result.data.userInfo
            };
            if (json.code == 0) {
              done(null, data);
            } else {
              done({
                err: json,
                msg: '获取authorize信息失败！'
              }, null);
            }
          }, error => {
            done({
              err: error,
              msg: '网络异常，获取用户信息wx/connect的接口失败！'
            }, null);
          });
        }
      ], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  initialize() {
    if (this.initializing) {
      return;
    }
    this.initializing = true;
    return new Promise((resolve, reject) => {
      this.login().then(result => {
        console.log('登录成功数据: ', JSON.stringify(result, null, 2));
        this.initializing = false;
        this.Authorization = result.Authorization;
        this.WalletId = result.WalletId;
        // this.BitUser = result.BitUser;
        this.WechatUser = result.WechatUser;
        this.saveStorage().then(result => {
          resolve(this);
        }, error => {
          console.error(error);
        });
      }, error => {
        // 服务端拉取失败，从本地读取
        console.info('服务端拉取失败，从本地读取...');
        this.loadStorage().then(result => {
          console.log('本地存储数据: ', JSON.stringify(result, null, 2));
          this.initializing = false;
          this.Authorization = result.Authorization;
          this.WalletId = result.WalletId;
          // this.BitUser = result.BitUser;
          resolve(this);
        }, error => {
          this.initializing = false;
          console.error(error.msg, JSON.stringify(error, null, 2));
        });
        this.initializing = false;
        console.error(error.msg, JSON.stringify(error, null, 2));
      });
    });
  }

  loadStorage() {
    if (!this.adapters.storage) {
      throw new Error('请首先设置storage adapter！');
    }
    const storage = this.adapters.storage;
    return new Promise((resolve, reject) => {
      Async.series({
        Authorization: done => {
          storage.read('Authorization').then(authorization => {
            console.info('读取Authorization成功！');
            done(null, authorization);
          }, error => {
            done({
              err: error,
              msg: '读取Authorization失败！'
            }, null);
          });
        },
        WalletId: done => {
          storage.read('WalletId').then(walletId => {
            console.info('读取WalletId成功！');
            done(null, walletId);
          }, error => {
            done({
              err: error,
              msg: '读取WalletId失败！'
            }, null);
          });
        // },
        // BitUser: done => {
        //   storage.read('BitUser').then(user => {
        //     console.info('读取BitUser成功！');
        //     done(null, user);
        //   }, error => {
        //     done({
        //       err: error,
        //       msg: '读取BitUser失败！'
        //     }, null);
        //   });
        }
      }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.info('读取Authorization，WalletId成功！');
          resolve(result);
        }
      });
    });
  }

  saveStorage() {
    if (!this.adapters.storage) {
      throw new Error('请首先设置storage adapter！');
    }
    const storage = this.adapters.storage;
    return new Promise((resolve, reject) => {
      Async.series({
        Authorization: done => {
          storage.write('Authorization', this.Authorization).then(authorization => {
            console.info('存储Authorization成功！');
            done(null, authorization);
          }, error => {
            done({
              err: error,
              msg: '存储Authorization失败！'
            }, null);
          });
        },
        WalletId: done => {
          storage.write('WalletId', this.WalletId).then(walletId => {
            console.info('存储WalletId成功！');
            done(null, walletId);
          }, error => {
            done({
              err: error,
              msg: '存储WalletId失败！'
            }, null);
          });
        },
        WechatUser: done => {
          storage.write('WechatUser', this.WechatUser).then(user => {
            console.info('存储WechatUser成功！');
            done(null, user);
          }, error => {
            done({
              err: error,
              msg: '存储WechatUser失败！'
            }, null);
          });
        // },
        // BitUser: done => {
        //   storage.write('BitUser', this.BitUser).then(user => {
        //     console.info('存储BitUser成功！');
        //     done(null, user);
        //   }, error => {
        //     done({
        //       err: error,
        //       msg: '存储BitUser失败！'
        //     }, null);
        //   });
        }
      }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.info('存储Authorization，WalletId, WechatUser成功！');
          resolve(result);
        }
      });
    });
  }

  static adapter(name, engine) {
    return Authorize.instance.adapter(name, engine);
  }

  static initialize() {
    return Authorize.instance.initialize();
  }

  static loadStorage() {
    return Authorize.instance.loadStorage();
  }

  static saveStorage() {
    return Authorize.instance.saveStorage();
  }

  static get instance() {
    if (Authorize.__instance) {
      return Authorize.__instance;
    } else {
      return Authorize.__instance = new Authorize;
    }
  }
}

module.exports = Authorize;
