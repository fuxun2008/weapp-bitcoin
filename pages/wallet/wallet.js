//wallet.js
import _ from '../../utils/util.js';
import Http from '../../components/http';
import API from '../../services/api';

const App = getApp();
const MAXSIZE = 10;

Page({
  data: {
    articleId: 0,
    qrcode: '/images/img_error.gif',
    xbtc: '0.0000',
    btc: '0.0000',
    rmb: 0,
    walletId: '',
    nickName: '',
    avatar: '',
    transList: [],
    page: 1,
    errorMsg: '',
    hasMore: false,
    hasData: false
  },
  onShow: function() {
    console.log('onShow');
    const that = this;
    const auth = App.globalData.Authorization || wx.getStorageSync('Authorization');
    _.showLoading();
    if (auth) {
      Http.setAuthorization(auth);
      that.fetchData(1);
    } else {
      App.initialize(() => {
        _.hideLoading();
        that.setData({
          errorMsg: '咦？网络不见了，请检查网络连接~',
          hasMore: false,
          hasData: false
        });
        return false;
      }).then(() => {
        that.fetchData(1);
      }, error => {
        _.hideLoading();
        console.log('ERROR...');
      });
    }
  },
  onShareAppMessage: function (options) {
    const name = App.globalData.WechatUser.nickName || App.globalData.defaultName;
    return {
      title: name + '喊你来捡钱包啦！',
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
  fetchData: function (page) {
    const that = this;
    API.handleWalletDetail(page).then(json => {
      console.log('walletPage: ', JSON.stringify(json, null, 2));
      _.hideLoading();
      if (json && json.code === 0) {
        const data = json.data;
        const id = data.wallet_id || App.globalData.WalletId;
        that.setData({
          articleId: data.article_id,
          xbtc: data.xbtc || '0.0000',
          btc: data.btc || '0.0000',
          rmb: data.rmb || 0,
          walletId: id,
          nickName: data.nickname,
          avatar: data.avatar + '?_=' + Math.random(),
          transList: page === 1 ? data.trans_list : that.data.transList.concat(data.trans_list),
          page: page,
          qrcode: `${API.WX_URL}/wallet/show?wallet_id=${id}`, // 'http://qr.liantu.com/api.php?w=100&text=' + id
          hasData: true,
          errorMsg: '',
          hasMore: data.trans_list.length === MAXSIZE ? true : false
        });
      } else {
        that.setData({
          errorMsg: '暂时没有数据哦！点我刷新页面重试~',
          page: page,
          hasMore: false,
          hasData: false
        });
      }
    }, err => {
      _.hideLoading();
      that.setData({
        errorMsg: '咦，网络不见了，请检查网络连接后点我刷新页面~',
        hasMore: false,
        hasData: false
      });
      console.error('咦，网络不见了，请检查网络连接后点我刷新页面~', error);
    });
  },
  reloadData: function () {
    console.log('reloadData');
    const that = this;
    _.showLoading();
    that.fetchData(1);
  },
  // onReachBottom: function () {
  //   const that = this;
  //   const page = parseInt(that.data.page, 10);
  //   const nextPage = page + 1;
  //   const hasMore = that.data.hasMore;
  //   if (hasMore) {
  //     that.fetchData(nextPage);
  //   }
  // },
  gotoReceive: function () {
    const that = this;
    wx.navigateTo({
      url: '../receive/receive?id=' + that.data.walletId
    });
  },
  gotoTransfer: function () {
    const that = this;
    const xbtc = that.data.xbtc;
    if (Number(xbtc) === 0 || Number(xbtc) === NaN || xbtc === '0.000') {
      _.errorTips();
      return;
    }
    wx.navigateTo({
      url: '../transfer/transfer'
    });
  }
})
