//index.js
//获取应用实例
import _ from '../../utils/util';
import API from '../../services/api';

const App = getApp();
const MAXSIZE = 20;

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
    errorMsg: '暂时没有数据哦~',
    hasData: true,
    hasMore: false,
    showLoading: false
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    that.fetchData();





    // App.initialize(() => {
    //   this.setData({
    //     errorMsg: '咦？网络不见了，请检查网络连接~',
    //     showLoading: false,
    //     hasData: false
    //   });
    //   return false;
    // }).then(result => {
    //   // console.log(JSON.stringify(result, null, 2));
    //   Object.assign(App.globalData.MeetYouUser, result.MeetYouUser);
    //   console.log('App.globalData.MeetYouUser: ', JSON.stringify(App.globalData.MeetYouUser, null, 2));
    //   // this.MeetYouUser = result.MeetYouUser;
    //   const meetYouUser = result.MeetYouUser;
    //   const sqs = meetYouUser.skip_quick_setting;
    //   const mode = parseInt(meetYouUser.mode);
    //   console.log('用户模式：', mode);

    //   if (result && meetYouUser) {
    //     skipQsFlag = sqs;
    //   }
    //   console.info('是否跳过设置: ', skipQsFlag);
    //   if (skipQsFlag) {
    //     that.judgeMode(meetYouUser, _endDay);
    //   } else {
    //     that.setData({
    //       skipQsFlag: false,
    //       showLoading: false,
    //       hasData: true
    //     });
    //   }
    // });
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
  fetchData: function() {
    const that = this;
    API.fetchIndex().then(json => {
      console.log('indexPage: ', JSON.stringify(json, null, 2));
      if (json && json.code === 0) {
        const data = json.data;
        that.setData({
          currentTab: '1',
          tabs: data.category_list,
          imgUrls: data.article_top_list,
          swiper: {
            indicatorDots: false,
            autoplay: true,
            circular: true,
            interval: 3000,
            duration: 500
          },
          articles: data.article_list,
          hasData: true,
          hasMore: data.article_list.length === MAXSIZE ? true : false,
          showLoading: false
        });
      } else {
        that.setData({
          currentTab: '1',
          tabs: [],
          swiper: {
            imgUrls: [],
            indicatorDots: false,
            autoplay: true,
            circular: true,
            interval: 3000,
            duration: 500
          },
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
  reloadData: function() {
    console.log('reloadData');
  }
});
