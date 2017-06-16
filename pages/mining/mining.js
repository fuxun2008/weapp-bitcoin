//mining.js
import _ from '../../utils/util.js';
import API from '../../services/api';

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
    cid: 2,
    articles: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.start();
    console.log('onLoad');
    const that = this;
    _.showLoading();
    that.fetchData(1, that.data.cid);
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
  },
  fetchData: function (page, cid) {
    const that = this;
    API.fetchIndex(page, cid).then(json => {
      console.log('miningPage: ', JSON.stringify(json, null, 2));
      _.hideLoading();
      if (json && json.code === 0) {
        const data = json.data;
        data.article_list.forEach((item, index) => {
          if (item.created_at <= 0) {
            item.created_at = new Date().getTime();
          }
          item.created_at = _.msToDate(item.created_at, 'yyyy-MM-dd');
        });
        that.setData({
          cid: data.cid,
          articles: data.article_list
        });
      }
    }, error => {
      _.hideLoading();
      that.setData({
        errorMsg: '咦，网络不见了，请检查网络连接后点击页面刷新~'
      });
      console.error('咦，网络不见了，请检查网络连接后点击页面刷新~', error);
    });
  }
});
