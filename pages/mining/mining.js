//mining.js
import _ from '../../utils/util.js';
import API from '../../services/api';
import Storage from '../../components/storage';

let stopwatchInterval;
stopwatchInterval = 0;

Page({
  data: {
    gold: '0.0000',
    time: '00:00:00',
    status: 'start' // start:开始，stop:停止
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');
    const that = this;
    const srt = Storage.readSync('stopwatchRunningTime');
    const sbt = Storage.readSync('stopwatchBeginingTimestamp');
    if (Number(sbt) && Number(srt)) {
      const runningTime = Number(srt) + new Date().getTime() - Number(sbt);
      Storage.writeSync('stopwatchRunningTime', runningTime);
      that.startWatch();
    }

    if (srt) {
      that.setData({
        time: that.returnFormattedToMilliseconds(Number(srt))
      });
    }
    else {
      Storage.writeSync('stopwatchRunningTime', 0);
    }
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
  startWatch: function () {
    const that = this;
    clearInterval(stopwatchInterval);

    const startTimestamp = new Date().getTime();
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
        time: that.returnFormattedToMilliseconds(stopwatchTime)
      });
    }, 100);

    that.setData({
      status: 'stop'
    });
  },
  pauseWatch: function () {
    const that = this;
    clearInterval(stopwatchInterval);
    const bt = Storage.readSync('stopwatchBeginingTimestamp');
    const srt = Storage.readSync('stopwatchRunningTime');
    console.log('stopwatchBeginingTimestamp: ', bt, ' stopwatchRunningTime', srt);
    if (Number(bt)) {
      const runningTime = Number(srt) + new Date().getTime() - Number(bt);

      Storage.writeSync('stopwatchBeginingTimestamp', 0);
      Storage.writeSync('stopwatchRunningTime', runningTime);

      that.setData({
        status: 'start'
      });
    }
  },
  resetWatch: function () {
    const that = this;
    clearInterval(stopwatchInterval);

    Storage.writeSync('stopwatchBeginingTimestamp', 0);
    Storage.writeSync('stopwatchRunningTime', 0);
    that.setData({
      time: that.returnFormattedToMilliseconds(0),
      status: 'start'
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
    console.log('status: ', status);
    if (status === 'start') {
      that.startWatch();
    } else {
      that.pauseWatch();
    }
  }
});
