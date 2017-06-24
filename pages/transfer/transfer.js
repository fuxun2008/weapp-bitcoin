//transfer.js
import _ from '../../utils/util.js';
import API from '../../services/api';

const App = getApp();

Page({
  data: {
    walletId: ''
  },
  onLoad: function () {
    const that = this;
  },
  handleScan: function () {
    const that = this;
    wx.scanCode({
      onlyFromCamera: false,
      success: function (res) {
        console.log('res: ', JSON.stringify(res, null, 2));
        that.setData({
          walletId: res.result
        });
      },
      fail: function (res) {
        console.error('res: ', JSON.stringify(res, null, 2));
        that.setData({
          walletId: ''
        });
      }
    });
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})
