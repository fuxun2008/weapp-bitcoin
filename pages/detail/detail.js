//logs.js
import _ from '../../utils/util';
import API from '../../services/api';
import htmlToWxml from '../../components/htmlToWxml';

const App = getApp();

Page({
  data: {
    id: 0,
    title: '',
    resource: '',
    timestamp: '',
    cover: '',
    views: 0,
    info: '',
    errorMsg: '',
    hasData: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('detailOptions: ', JSON.stringify(options, null, 2));
    const that = this;
    let id = parseInt(options.id);
    _.showLoading();
    that.fetchData(id);
  },
  onShareAppMessage: function (options) {
    const self = this;
    const name = App.globalData.WechatUser.nickName || App.globalData.defaultName;
    return {
      title: name + '分享给你一篇能秒懂比特币的文章',
      path: '/pages/detail/detail?id=' + self.data.id,
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
      _.hideLoading();
      if (json && json.code === 0) {
        const data = json.data;
        if (data.created_at <= 0) {
          data.created_at = new Date().getTime();
        }
        data.created_at = _.msToDate(data.created_at, 'yyyy-MM-dd');
        data.content = data.content.replace(/(\r\n\t)|(\r\n)|(\n)/g, '').replace(/&nbsp;/g, '  ');
        that.setData({
          id: data.id,
          title: data.title,
          cover: data.cover,
          info: htmlToWxml.html2json(data.content),
          resource: data.source || '比特币资讯',
          views: data.views,
          timestamp: data.created_at,
          errorMsg: '',
          hasData: true
        });
      } else {
        that.setData({
          id: id,
          errorMsg: '暂时没有数据哦~',
          hasData: false
        });
        console.warn('暂时没有数据哦~');
      }
    }, error => {
      _.hideLoading();
      that.setData({
        id: id,
        errorMsg: '咦，网络不见了，请检查网络连接后点击页面刷新~',
        hasData: false
      });
      console.error('咦，网络不见了，请检查网络连接后点击页面刷新~', error);
    });
  },
  reloadData: function () {
    const that = this;
    const id = that.data.id;
    _.showLoading();
    that.fetchData(id);
  }
});
