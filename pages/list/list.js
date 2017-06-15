//list.js
import _ from '../../utils/util.js';
import API from '../../services/api';

const MAXSIZE = 10;

Page({
  data: {
    currentTab: 0,
    articles: [],
    page: 1,
    errorMsg: '暂时没有数据哦~',
    hasData: true,
    hasMore: true,
    showLoading: true
  },
  onLoad: function (options) {
    console.log('options: ', JSON.stringify(options, null, 2));
    const that = this;
    const cid = parseInt(options.cid, 10);
    wx.setNavigationBarTitle({
      title: options.name + '资讯' || '资讯新闻'
    });
    that.fetchData(1, cid);
  },
  fetchData: function (page, cid) {
    const that = this;
    API.fetchIndex(page, cid).then(json => {
      console.log('miningPage: ', JSON.stringify(json, null, 2));
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
          articles: that.data.articles.concat(data.article_list),
          page: page,
          hasData: true,
          hasMore: data.article_list.length === MAXSIZE ? true : false,
          showLoading: false
        });
      } else {
        that.setData({
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
    that.setData({
      showLoading: true
    });
    that.fetchData(1, cid);
  }
})
