//mining.js
import _ from '../../utils/util.js';

Page({
  data: {
    article: {
      id: 10,
      title: '比特币触底反弹，澳交所接受使用比特币支付收购款',
      img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
      resource: 'GoogleNews',
      timestamp: _.dateFromNow(1497082010307),
      count: 1234
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成

  },
  onShareAppMessage: function () {
    return {
      title: '付勋' + '教你如何挖出价值不菲的比特币！',
      path: '/pages/mining/mining',
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
