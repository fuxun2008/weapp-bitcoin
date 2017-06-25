//wallet.js
import _ from '../../utils/util.js';
import API from '../../services/api';

const App = getApp();

console.log(App.globalData.WalletId);

Page({
  data: {
    walletId: ''
  },
  onLoad: function () {
    const that = this;
    that.setData({
      walletId: App.globalData.WalletId
    });
  },
  onShareAppMessage: function (options) {
    const name = App.globalData.WechatUser.nickName || App.globalData.defaultName;
    return {
      title: name + '喊你来捡钱包啦！',
      path: '/pages/exchange/exchange',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res.errMsg);
      }
    };
  },
  gotoReceive: function () {
    const that = this;
    wx.navigateTo({
      url: '../receive/receive?id=' + that.data.walletId
    });
  },
  gotoTransfer: function () {
    wx.navigateTo({
      url: '../transfer/transfer'
    });
  }
})
