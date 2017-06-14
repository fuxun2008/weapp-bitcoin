//index.js
//获取应用实例
import _ from '../../utils/util';
import API from '../../services/api';

const App = getApp();
const MAXSIZE = 10;

Page({
  data: {
    currentTab: 1,
    tabs: [],
    imgUrls: [],
    swiper: {
      indicatorDots: false,
      autoplay: true,
      circular: true,
      interval: 3000,
      duration: 500
    },
    articles: [],
    page: 1,
    errorMsg: '暂时没有数据哦~',
    hasData: false,
    hasMore: true,
    showLoading: true
  },
  onLoad: function () {
    console.log('onLoad');
    const that = this;
    that.fetchData(1, 0);
    App.initialize(() => {
      this.setData({
        errorMsg: '咦？网络不见了，请检查网络连接~',
        showLoading: false,
        hasData: false
      });
      return false;
    }).then(result => {
      console.log('APP Data: ', JSON.stringify(result, null, 2));
      Object.assign(App.globalData.MeetYouUser, result.MeetYouUser);
      console.log('App.globalData.MeetYouUser: ', JSON.stringify(App.globalData.MeetYouUser, null, 2));
      // this.MeetYouUser = result.MeetYouUser;
      const meetYouUser = result.MeetYouUser;
      const sqs = meetYouUser.skip_quick_setting;
      const mode = parseInt(meetYouUser.mode);
    });
  },
  onShareAppMessage: function() {
    return {
      title: '付勋' + '邀你来十分钟读懂比特币',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
        console.log(res);
      },
      fail: function(res) {
        // 转发失败
        console.log(res.errMsg);
      }
    };
  },
  fetchData: function(page, cid) {
    const that = this;
    API.fetchIndex(page, cid).then(json => {
      console.log('indexPage: ', JSON.stringify(json, null, 2));
      if (json && json.code === 0) {
        const data = json.data;
        data.article_list.forEach((item, index) => {
          if (item.created_at <= 0) {
            item.created_at = new Date().getTime();
          }
          item.created_at = _.msToDate(item.created_at, 'yyyy-MM-dd');
        });
        that.setData({
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
  },
  //事件处理函数
  bindViewTap: function(e) {
    const that = this;
    const id = parseInt(e.currentTarget.dataset.id, 10);
    that.setData({
      currentTab: id
    });
  },
  onReachBottom: function () {
    const that = this;
    const hasMore = that.data.hasMore;
    if (hasMore) {
      that.fetchData(that.data.page++, 0);
    }
  },
  reloadData: function() {
    console.log('reloadData');
    const that = this;
    that.fetchData();
  }
});
