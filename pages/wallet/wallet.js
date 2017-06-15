//wallet.js
import _ from '../../utils/util.js';
import API from '../../services/api';

const App = getApp();
const MAXSIZE = 10;

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
    const that = this;
    that.fetchData(1, 3);
  },
  onShareAppMessage: function (options) {
    const name = App.globalData.WechatUser.nickName || App.globalData.defaultName;
    return {
      title: name + '喊你来捡钱包啦！支付宝钱包、微信钱包都不如比特币钱包~',
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
    that.setData({
      showLoading: true
    });
    API.fetchIndex(page, cid).then(json => {
      console.log('walletPage: ', JSON.stringify(json, null, 2));
      if (json && json.code === 0) {
        const data = json.data;
        data.article_list.forEach((item, index) => {
          if (item.created_at <= 0) {
            item.created_at = new Date().getTime();
          }
          item.created_at = _.msToDate(item.created_at, 'yyyy-MM-dd');
        });
        that.setData({
          currentTab: data.cid,
          tabs: data.category_list,
          imgUrls: data.article_top_list,
          articles: data.article_list,
          hasData: true,
          hasMore: data.article_list.length === MAXSIZE ? true : false,
          showLoading: false
        });
      } else {
        that.setData({
          tabs: [],
          imgUrls: [],
          articles: [],
          hasMore: false,
          hasData: false,
          showLoading: false
        });
      }
    }, error => {
      that.setData({
        errorMsg: '咦，网络不见了，请检查网络连接后点击页面刷新~',
        hasData: false,
        showLoading: false
      });
      console.error('咦，网络不见了，请检查网络连接后点击页面刷新~', error);
    });
  }
})
