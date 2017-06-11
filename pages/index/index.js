//index.js
//获取应用实例
import _ from '../../utils/util';

const App = getApp();

Page({
  data: {
    currentTab: 1,
    tabs: [
      {
        id: 1,
        name: '科普入门'
      },
      {
        id: 2,
        name: '最新新闻'
      },
      {
        id: 3,
        name: '进阶'
      },
      {
        id: 4,
        name: '操作比特'
      }
    ],
    swiper: {
      imgUrls: [{
          id: 1,
          url: 'http://m.anhuinews.com/upload/2017/06/09/20176912333117.jpg',
          desc: '合肥不夜书店的24小时：书里的诗意和远方'
        }, {
          id: 2,
          url: 'http://m.anhuinews.com/upload/2017/06/10/20176106404326.jpg',
          desc: '塌陷区建成漂浮电站'
        }, {
          id: 3,
          url: 'http://m.anhuinews.com/upload/2017/06/08/2017681213020.jpg',
          desc: '中安在线池州频道开通上线(组图)'
        }, {
          id: 4,
          url: 'http://m.anhuinews.com/upload/2017/06/09/2017695504933.png',
          desc: '合安高铁开始架梁 建成后合肥到安庆40分钟'
        }
      ],
      indicatorDots: false,
      autoplay: true,
      circular: true,
      interval: 3000,
      duration: 500
    },
    articles: [
      {
        id: 10,
        title: '比特币触底反弹，澳交所接受使用比特币支付收购款',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: 'GoogleNews',
        timestamp: _.dateFromNow(1497082010307),
        count: 1234
      }, {
        id: 11,
        title: '十分钟看懂比特币的过去、现在和未来',
        img: 'http://m.anhuinews.com/upload/2017/06/10/2017610673781.jpg',
        resource: '搜狐新闻',
        timestamp: _.dateFromNow(1497082020307),
        count: 1211
      }, {
        id: 12,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 13,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 14,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 15,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 16,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 17,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 18,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 19,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 20,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 21,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 22,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 23,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 24,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 25,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 26,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 27,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 28,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 29,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 30,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 31,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 32,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }, {
        id: 33,
        title: '比特币场内平台升级反洗钱系统场外监管政策空白有待填补',
        img: 'http://m.anhuinews.com/upload/2017/06/06/201766631967.jpg',
        resource: '外汇宝',
        timestamp: _.dateFromNow(1497073010801),
        count: 111
      }
    ],
    errorMsg: '暂时没有数据哦~',
    hasData: true,
    hasMore: false,
    showLoading: false
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
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
