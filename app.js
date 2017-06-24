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
    this.initialize();
  },
  onUnAuthorize: function () {
    wx.hideToast();
    wx.showToast({
      title: '401授权失效！',
      icon: 'loading',
      duration: 2000
    });
  },
  initialize: function () {
    let that = this;
    Authorize.adapter('network', API);
    Authorize.adapter('storage', Storage.instance);

    this.Authorize = Authorize.instance;

    Authorize.initialize().then(result => {
      this.Authorize = Authorize.instance;
      Http.setAuthorization(result.Authorization);
      this.globalData.WechatUser = Object.assign({}, result.WechatUser);
      this.globalData.WalletId = result.WalletId;
      // this.globalData.BitUser = Object.assign({}, result.BitUser);
    });
  },
  globalData: {
    defaultName: '中本聪',
    WechatUser: {},
    WalletId: ''
    // BitUser: {}
  }
})
