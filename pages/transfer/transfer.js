//transfer.js
import _ from '../../utils/util.js';
import API from '../../services/api';

const App = getApp();

Page({
  data: {
  },
  onLoad: function () {
    const that = this;
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})
