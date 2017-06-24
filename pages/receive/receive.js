//receive.js
import _ from '../../utils/util.js';
import API from '../../services/api';

const App = getApp();

Page({
  data: {
    cid: 3,
    articles: []
  },
  onLoad: function () {
    const that = this;
    _.showLoading();
    that.fetchData(1, 3);
  },
  fetchData: function (page, cid) {
    const that = this;
    API.fetchIndex(page, cid).then(json => {
      console.log('walletPage: ', JSON.stringify(json, null, 2));
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
  handleCopy: function() {
    console.log('复制到剪贴板');
  }
})
