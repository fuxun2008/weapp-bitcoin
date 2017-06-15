//index.js
//获取应用实例
import _ from '../../utils/util';
import API from '../../services/api';

const App = getApp();
const MAXSIZE = 10;

Page({
  data: {
    currentTab: 0,
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
    errorMsg: '',
    hasData: true,
    hasMore: true
  },
  onLoad: function () {
    console.log('onLoad');
    const that = this;
    _.showLoading();
    that.fetchData(1, 0);
  },
  onShareAppMessage: function (options) {
    const name = App.globalData.WechatUser.nickName || App.globalData.defaultName;
    return {
      title: name + '邀你来十分钟读懂比特币',
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
          currentTab: data.cid,
          tabs: data.category_list,
          imgUrls: that.data.imgUrls.concat(data.article_top_list),
          articles: that.data.articles.concat(data.article_list),
          page: page,
          hasData: true,
          errorMsg: '',
          hasMore: data.article_list.length === MAXSIZE ? true : false
        });
      } else {
        that.setData({
          errorMsg: '暂时没有数据哦~',
          hasMore: false,
          hasData: false
        });
      }
    }, error => {
      _.hideLoading();
      that.setData({
        errorMsg: '咦，网络不见了，请检查网络连接后点击页面刷新~',
        hasData: false
      });
      console.error('咦，网络不见了，请检查网络连接后点击页面刷新~', error);
    });
  },
  //事件处理函数
  bindViewTap: function(e) {
    const that = this;
    const cid = parseInt(e.currentTarget.dataset.cid, 10);
    _.showLoading();
    that.setData({
      currentTab: cid,
      imgUrls: [],
      articles: [],
      page: 1,
      hasMore: false,
      hasData: true
    });
    that.fetchData(1, cid);
  },
  onReachBottom: function () {
    const that = this;
    const page = parseInt(that.data.page, 10);
    const nextPage = page + 1;
    const hasMore = that.data.hasMore;
    const cid = that.data.currentTab;
    if (hasMore) {
      that.fetchData(nextPage, cid);
    }
  },
  reloadData: function() {
    console.log('reloadData');
    const that = this;
    const cid = that.data.currentTab;
    _.showLoading();
    that.fetchData(1, cid);
  }
});
