//exchange.js
import _ from '../../utils/util.js';

const App = getApp();

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
  onLoad: function () {
  },
  onShareAppMessage: function (options) {
    const name = App.globalData.WechatUser.nickName || App.globalData.defaultName;
    return {
      title: name + '邀你测试自己的比特币投资天赋',
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
