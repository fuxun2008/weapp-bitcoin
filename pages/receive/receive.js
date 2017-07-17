//receive.js
import _ from '../../utils/util.js';
import API from '../../services/api';
import Storage from '../../components/storage';

const App = getApp();

Page({
  data: {
    walletId: '',
    avatar: '/images/baby_head.png',
    qrcode: '/images/img_error.gif'
  },
  onShareAppMessage: function (options) {
    const that = this;
    const name = App.globalData.WechatUser.nickName || App.globalData.defaultName;
    return {
      title: name + '向你分享小比特币钱包',
      path: '/pages/transfer/transfer?id=' + (that.data.walletId || App.globalData.WalletId),
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
  onLoad: function (options) {
    const that = this;
    const id = options.id || App.globalData.WalletId;
    const url = Storage.readSync('WechatUser').avatarUrl || App.globalData.WechatUser.avatarUrl;
    that.setData({
      walletId: id,
      avatar: url + '?ts=' + Math.random(),
      qrcode: `${API.WX_URL}/wallet/show?wallet_id=` + id // 'http://qr.liantu.com/api.php?w=100&text=' + id
    });
  },
  handleCopy: function() {
    console.log('复制到剪贴板');
    const that = this;
    wx.setClipboardData({
      data: that.data.walletId || App.globalData.WalletId,
      success: function (res) {
        _.showToast('复制成功~');
        console.log('res: ', JSON.stringify(res, null, 2));
      },
      fail: function (res) {
        _.showToast('复制失败，请重试~');
        console.error('res: ', JSON.stringify(res, null, 2));
      }
    })
  }
})
