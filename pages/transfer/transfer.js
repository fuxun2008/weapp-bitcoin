//transfer.js
import _ from '../../utils/util.js';
import API from '../../services/api';

const App = getApp();

Page({
  data: {
    wallet: '',
    money: '',
    remark: ''
  },
  onLoad: function (options) {
    const that = this;
    const id = options.id;
    if (id) {
      that.setData({
        wallet: id
      });
    }
  },
  handleScan: function () {
    const that = this;
    wx.scanCode({
      onlyFromCamera: false,
      success: function (res) {
        console.log('res: ', JSON.stringify(res, null, 2));
        that.setData({
          wallet: res.result || 'zWw594f57535a553Z2r'
        });
      },
      fail: function (res) {
        console.error('res: ', JSON.stringify(res, null, 2));
        that.setData({
          wallet: 'zWw594f57535a553Z2r'
        });
      }
    });
  },
  formSubmit: function (e) {
    const that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    API.handleWalletTransfer(e.detail.value).then(json => {
      if (json && json.code === 0) {
        console.log('transferInfo: ', JSON.stringify(json, null, 2));
        _.showToast('转账成功', 2000, 'success', function() {
          wx.navigateBack({
            delta: 1
          });
        });
      } else {
        _.showToast(json.msg, 2000, 'loading');
      }
    }, err => {
      _.showToast(err.msg, 2000, 'loading');
    });
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})
