//app.js
import aldstat from './utils/ald-stat.js'; // 阿拉丁统计SDK

import API from './services/api';
import Http from './components/http';
import Storage from './components/storage';
import Authorize from './controlers/authorize';
import _ from './utils/util';
import Config from './config';
const Promise = require('./components/promise').Promise;


App({
  onLaunch: function () {
    console.log('App Launch');
    let version = wx.getStorageSync('version');
    if (!version) {
      version = Config.v;
      wx.setStorageSync('version', version);
    } else if (version !== Config.v) {
      // 清除缓存
      wx.clearStorageSync();
      version = Config.v;
      wx.setStorageSync('version', version);
    }
    this.version = version;
    this.Http = Http.instance;
    Http.instance.onUnAuthorize(this.onUnAuthorize);
  },
  onUnAuthorize: function () {
    wx.hideToast();
    wx.showToast({
      title: '401授权失效！',
      icon: 'loading',
      duration: 2000
    });
  },
  initialize: function (callback) {
    let that = this;
    return new Promise((resolve, reject) => {
      Authorize.adapter('network', API);
      Authorize.adapter('storage', Storage.instance);

      this.Authorize = Authorize.instance;

      Authorize.initialize(() => {
        callback && callback();
      }).then(result => {
        this.Authorize = Authorize.instance;
        Http.setAuthorization(result.Authorization);
        // console.log('登录信息：', JSON.stringify(result, null, 2));
        resolve(result);
      });
    });
  },
  globalData: {
    DeviceInfo: {},
    MeetYouUser: {}
  }
})
