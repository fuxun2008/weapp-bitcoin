//logs.js
import _ from '../../utils/util';
import API from '../../services/api';
import htmlToWxml from '../../components/htmlToWxml';

Page({
  data: {
    article: {
      id: 0,
      title: '',
      resource: '',
      timestamp: '',
      cover: '',
      views: 0,
      info: ''
    },
    errorMsg: '暂时没有数据哦~',
    hasData: true,
    showLoading: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // console.log('baby options: ', JSON.stringify(options, null, 2));
    const that = this;
    let id = parseInt(options.id);
    wx.setNavigationBarTitle({
      title: ''
    });
    that.fetchData(id);
  },
  onShareAppMessage: function () {
    const self = this;
    return {
      title: '付勋教你来读书，' + self.data.article.title,
      path: '/pages/detail/detail?id=' + self.data.article.id,
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
  fetchData: function(id) {
    const that = this;
    API.fetchDetail(id).then(json => {
      console.log('detailPage: ', JSON.stringify(json, null, 2));
      if (json && json.code === 0) {
        const data = json.data;
        if (data && data.length) {
          that.setData({
            id: data.id,
            title: data.title,
            cover: data.cover,
            info: htmlToWxml.html2json(data.content),
            resource: data.source,
            views: data.views,
            timestamp: _.msToDate(data.created_at, 'yyyy-MM-dd'),
            hasData: true,
            showLoading: false
          });
        } else {
          that.setData({
            id: id,
            errorMsg: '暂时没有数据哦~',
            hasData: false,
            showLoading: false
          });
          console.warn('暂时没有数据哦~');
        }
      } else {
        that.setData({
          id: id,
          errorMsg: '暂时没有数据哦~',
          hasData: false,
          showLoading: false
        });
        console.warn('暂时没有数据哦~');
      }
    }, error => {
      that.setData({
        id: id,
        errorMsg: '咦，网络不见了，请检查网络连接后点击页面刷新~',
        hasData: false,
        showLoading: false
      });
      console.error('咦，网络不见了，请检查网络连接后点击页面刷新~', error);
    });
  },
  reloadData: function () {
    const that = this;
    const id = that.data.id;
    that.setData({
      hasData: false,
      showLoading: true
    });
    that.fetchData(id);
  }
});
