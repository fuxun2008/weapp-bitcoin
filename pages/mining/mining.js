//mining.js
import _ from '../../utils/util.js';

const App = getApp();

let hour = 0;
let minute = 0;
let second = 0; //时 分 秒
let millisecond = 0; //毫秒
let int;
let flag = true;

Page({
  data: {
    time: '00:00:00',
    coin: 0,
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
    // this.start();
    console.log('onLoad');
  },
  onReady: function() {
    // 页面渲染完成
    console.log('onReady');
  },
  onShow: function () {
    // 监听页面显示
    console.log('onShow');
    this.start();
  },
  onHide: function() {
    // 监听页面隐藏
    console.log('onHide');
    this.stop();
  },
  onUnload: function() {
    // 监听页面卸载
    console.log('onUnload');
    this.reset();
  },
  onShareAppMessage: function (options) {
    const name = App.globalData.WechatUser.nickName || App.globalData.defaultName;
    return {
      title: name + '教你如何挖出价值不菲的比特币！',
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
  },
  reset: function() {
    clearInterval(int);
    millisecond = hour = minute = second = 0;
    this.setData({
      time: '00:00:00'
    });
  },
  start: function() {
    const self = this;
    if (flag) {
      flag = false;
      int = setInterval(self.timer, 50);
    }
  },
  timer: function() {
    const self = this;
    millisecond = millisecond + 50;
    if (millisecond >= 1000) {
      millisecond = 0;
      second = second + 1;
    }

    if (second >= 60) {
      second = 0;
      minute = minute + 1;
    }

    if (minute >= 60) {
      minute = 0;
      hour = hour + 1;
    }

    if (hour >= 24) {
      hour = 0;
    }

    this.setData({
      time: [hour, minute, second].map(this.formatNumber).join(':')
    });
  },
  formatNumber: function(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  },
  stop: function() {
    clearInterval(int);
    flag = true;
  }
});
