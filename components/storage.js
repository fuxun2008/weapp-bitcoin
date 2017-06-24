const Promise = require('./promise').Promise;

class Storage {
  constructor() {
    this.__key = `storage-${+new Date()}`;
  }

  read(key) {
    return Storage.read(key);
  }

  readSync(key) {
    return Storage.readSync(key);
  }

  write(key, value) {
    return Storage.write(key, value);
  }

  writeSync(key, value) {
    return Storage.writeSync(key, value);
  }

  static read(key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success: function (res) {
          resolve(res.data);
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
  }

  static readSync(key) {
    return wx.getStorageSync(key);
  }

  static write(key, value) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data: value,
        success: function (res) {
          resolve(res);
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
  }

  static writeSync(key, value) {
    return wx.setStorageSync(key, value);
  }

  static get instance() {
    // 可能内存泄露
    if (Storage.__instance) {
      return Storage.__instance;
    } else {
      return Storage.__instance = new Storage;
    }
  }
}

module.exports = Storage;
