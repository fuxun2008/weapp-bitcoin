//exchange.js
import _ from '../../utils/util.js';

Page({
  data: {
    logs: []
  },
  onLoad: function () {
  },
  onShareAppMessage: function () {
    return {
      title: '付勋' + '邀你测试自己的比特币投资天赋',
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
