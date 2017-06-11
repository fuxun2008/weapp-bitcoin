//wallet.js
import _ from '../../utils/util.js';

Page({
  data: {
    logs: []
  },
  onLoad: function () {
  },
  onShareAppMessage: function () {
    return {
      title: '付勋' + '喊你来捡钱包啦！支付宝钱包、微信钱包都不如比特币钱包~',
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
  }
})
