//exchange.js
import _ from '../../utils/util.js';
import Http from '../../components/http';
import API from '../../services/api';

const App = getApp();

Page({
  data: {
    date: 'hour',
    method: 'buy',
    curr: {
      price: 0,
      diff: '0.00',
      direct: '0'
    },
    jBtc: 0,
    jRen: 0,
    hourly: [],
    weekly: []
  },
  onShow: function () {
    const that = this;
    const auth = App.globalData.Authorization || wx.getStorageSync('Authorization');
    _.showLoading();
    if (auth) {
      Http.setAuthorization(auth);
      that.fetchData();
    } else {
      App.initialize(() => {
        _.hideLoading();
        that.setData({
          errorMsg: '咦？网络不见了，请检查网络连接~',
          hasMore: false,
          hasData: false
        });
        return false;
      }).then(result => {
        that.fetchData();
      }, error => {
        _.hideLoading();
        console.log('ERROR...');
      });
    }
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
  },
  onPullDownRefresh: function() {
    const that = this;
    that.fetchData();
  },
  fetchData: function () {
    const that = this;
    API.handleMarketIndex().then(json => {
      console.log('exchangePage: ', JSON.stringify(json, null, 2));
      _.hideLoading();
      if (json && json.code === 0) {
        const data = json.data;
        that.setData({
          curr: data.curr,
          hourly: data.hourly,
          weekly: data.weekly,
          hasData: true
        });
      } else {
        that.setData({
          errorMsg: '暂时没有数据哦！点我刷新页面重试~',
          hasData: false
        });
      }
    }, error => {
      _.hideLoading();
      that.setData({
        errorMsg: '咦，网络不见了，请检查网络连接后点我刷新页面~',
        hadData: false
      });
      console.error('咦，网络不见了，请检查网络连接后点我刷新页面~', error);
    });
  },
  reloadData: function () {
    console.log('reloadData');
    const that = this;
    _.showLoading();
    that.fetchData();
  },
  toggleType: function (e) {
    const date = e.currentTarget.dataset.date;
    this.setData({
      date: date
    });
  },
  toggleMethod: function (e) {
    const method = e.currentTarget.dataset.method;
    this.setData({
      method: method
    });
  },
  inputIn: function (e) {
    const value = e.detail.value;
    console.log(e.detail);
    const btc = value === '' ? 0 : (value / this.data.curr.price).toFixed(6);
    this.setData({
      jBtc: btc
    });
  },
  inputOut: function (e) {
    const value = e.detail.value;
    console.log(e.detail);
    const ren = value === '' ? 0 : (value * this.data.curr.price).toFixed(6);
    this.setData({
      jRen: ren
    });
  },
  formSubmitIn: function(e) {
    const val = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', val);
    _.showLoading();
    API.handleMarketBuy(val.money).then(json => {
      _.hideLoading();
      if (json && json.code === 0) {
        _.showToast(json.data.message, 2000, 'success');
        console.log('BuyInfo: ', JSON.stringify(json, null, 2));
      } else {
        if (json.code === 2003) {
          _.errorTips();
          return;
        }
        _.showToast(json.msg, 2000, 'loading');
      }
    }, err => {
      _.hideLoading();
      _.showToast('买入失败，请重试~', 2000, 'loading');
      console.error('咦，网络不见了，请检查网络连接后点击页面刷新~', error);
    });
  },
  formSubmitOut: function (e) {
    const val = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', val);
    _.showLoading();
    API.handleMarketSell(val.money).then(json => {
      _.hideLoading();
      if (json && json.code === 0) {
        console.log('SellInfo: ', JSON.stringify(json, null, 2));
        _.showToast(json.data.message, 2000, 'success');
      } else {
        _.showToast(json.msg, 2000, 'loading');
      }
    }, err => {
      _.hideLoading();
      _.showToast('买入失败，请重试~', 2000, 'loading');
      console.error('咦，网络不见了，请检查网络连接后点击页面刷新~', error);
    });
  }
});
