//receive.js
import _ from '../../utils/util.js';
import API from '../../services/api';

const App = getApp();

Page({
  data: {
    walletId: '',
    avatar: '/images/baby_head.png',
    qrcode: '/images/img_error.gif'
  },
  onLoad: function (options) {
    const that = this;
    console.log('ReceiveOptions: ', JSON.stringify(options, null, 2));
    const id = options.id || App.globalData.WalletId;
    that.setData({
      walletId: id,
      avatar: App.globalData.WechatUser.avatarUrl + '?ts=' + Math.random(),
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
