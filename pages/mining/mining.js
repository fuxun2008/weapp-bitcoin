//mining.js
import _ from '../../utils/util.js';
import API from '../../services/api';
import Storage from '../../components/storage';

let stopwatchInterval;
stopwatchInterval = 0;
const WEIGHT = 4;

Page({
  data: {
    num: 0, // 1小时挖出的币数
    gold: '0.0000',
    time: '00:00:00',
    status: true, // start:开始，stop:停止
    errorMsg: '',
    hasData: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');
    const that = this;
    _.showLoading();
    that.fetchData();
  },
  onReady: function() {
    // 页面渲染完成
    console.log('onReady');

  },
  onShow: function () {

  },
  onShareAppMessage: function (options) {
    const name = App.globalData.WechatUser.nickName || App.globalData.defaultName;
    return {
      title: name + '教你如何挖出价值不菲的比特币！',
      path: '/pages/mining/mining',
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
  reloadData: function() {
    const that = this;
    _.showLoading();
    that.fetchData();
  },
  fetchData: function() {
    const that = this;
    API.handleMineGet().then(json => {
      console.log('miningInfo: ', JSON.stringify(json, null, 2));
      _.hideLoading();
      if (json && json.code === 0) {
        that.setData({
          hasData: true
        });
        that.initWatch(json.data);
      } else {
        that.setData({
          errorMsg: '暂时没有数据哦~',
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
  initWatch: function(data) {
    const that = this;
    const speed = data.speed;
    const srt = Storage.readSync('stopwatchRunningTime');
    const sbt = Storage.readSync('stopwatchBeginingTimestamp');
    if (!data.is_stop) { // Number(sbt) && Number(srt)
      const runningTime = Number(srt) + data.timestamp - Number(sbt); // data.timestamp = new Date().getTime()
      Storage.writeSync('stopwatchRunningTime', runningTime);
      that.startWatch(speed, data.timestamp);
    }

    if (srt) {
      that.setData({
        speed: speed,
        gold: (speed / 3600000 * Number(srt)).toFixed(WEIGHT), // data.xbtc
        time: that.returnFormattedToMilliseconds(Number(srt))
      });
    }
    else {
      that.setData({
        speed: speed,
        gold: data.xbtc
      });
      Storage.writeSync('stopwatchRunningTime', 0);
    }
  },
  startWatch: function (sped, startTimestamp) {
    const that = this;
    const speed = sped || that.data.speed;
    clearInterval(stopwatchInterval);

    // const startTimestamp = new Date().getTime();
    let runningTime = 0;
    const str = Storage.readSync('stopwatchRunningTime');

    Storage.writeSync('stopwatchBeginingTimestamp', startTimestamp);

    if (Number(str)) {
      runningTime = Number(str);
    }
    else {
      Storage.writeSync('stopwatchRunningTime', 1);
    }

    stopwatchInterval = setInterval(function () {
      const stopwatchTime = (new Date().getTime() - startTimestamp + runningTime);
      that.setData({
        gold: (speed / 3600000 * stopwatchTime).toFixed(WEIGHT),
        time: that.returnFormattedToMilliseconds(stopwatchTime)
      });
    }, 100);

    that.setData({
      status: false
    });
  },
  pauseWatch: function (startTimestamp) {
    const that = this;
    clearInterval(stopwatchInterval);
    const bt = Storage.readSync('stopwatchBeginingTimestamp');
    const srt = Storage.readSync('stopwatchRunningTime');
    console.log('stopwatchBeginingTimestamp: ', bt, ' stopwatchRunningTime', srt);
    if (Number(bt)) {
      const runningTime = Number(srt) + startTimestamp - Number(bt); // startTimestamp = new Date().getTime()

      Storage.writeSync('stopwatchBeginingTimestamp', 0);
      Storage.writeSync('stopwatchRunningTime', runningTime);

      that.setData({
        status: true
      });
    }
  },
  resetWatch: function () {
    const that = this;
    clearInterval(stopwatchInterval);

    Storage.writeSync('stopwatchBeginingTimestamp', 0);
    Storage.writeSync('stopwatchRunningTime', 0);
    that.setData({
      gold: '0.0000',
      time: that.returnFormattedToMilliseconds(0),
      status: true
    });
  },
  returnFormattedToMilliseconds: function (time) {
    const milliseconds = Math.floor((time % 1000) / 100);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return _.formatTime(hours) + ":" + _.formatTime(minutes) + ":" + _.formatTime(seconds) + "." + milliseconds;
  },
  goto: function (e) {
    const that = this;
    const ds = e.currentTarget.dataset;
    const status = ds.status;
    const speed = that.data.speed;
    console.log('status: ', status);
    if (status) {
      API.handleMineGo().then(json => {
        console.log('mineGo: ', JSON.stringify(json, null, 2));
        if (json && json.code === 0) {
          that.startWatch(speed, json.data.timestamp);
        } else {
          wx.showToast({
            title: '接口异常，请重试~',
            icon: 'loading',
            duration: 3000
          });
        }
      }, error => {
        _.hideLoading();
        wx.showToast({
          title: '接口异常，请重试~',
          icon: 'loading',
          duration: 3000
        });
        console.error('咦，网络不见了，请检查网络连接后点击页面刷新~', error);
      });
    } else {
      API.handleMineStop().then(json => {
        console.log('mineStop: ', JSON.stringify(json, null, 2));
        if (json && json.code === 0) {
          that.pauseWatch(json.data.timestamp);
        } else {
          wx.showToast({
            title: '接口异常，请重试~',
            icon: 'loading',
            duration: 3000
          });
        }
      }, error => {
        _.hideLoading();
        wx.showToast({
          title: '接口异常，请重试~',
          icon: 'loading',
          duration: 3000
        });
        console.error('咦，网络不见了，请检查网络连接后点击页面刷新~', error);
      });
    }
  }
});
