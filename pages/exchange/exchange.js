//exchange.js
import _ from '../../utils/util.js';
import API from '../../services/api';

const App = getApp();

Page({
  data: {
    cid: 4,
    articles: []
  },
  onLoad: function () {
    const that = this;
    that.fetchData(1, 4);
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
  fetchData: function (page, cid) {
    const that = this;
    API.fetchIndex(page, cid).then(json => {
      console.log('exchangePage: ', JSON.stringify(json, null, 2));
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
  },
  formSubmitIn: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formSubmitOut: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
});
