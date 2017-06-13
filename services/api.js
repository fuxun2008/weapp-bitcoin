import Http from '../components/http';
import _ from '../utils/util';
const Promise = require('../components/promise').Promise;

const WX_URL = `https://api.design-sprint.cn`;

const API_METHODS = {
  'user': `${WX_URL}/wx/connect`,
  'userSetting': `${WX_URL}/wx/mode`,
  'index': `${WX_URL}/article/list`,
  'detail': `${WX_URL}/article/detail`
};

const authorize = (code, iv, info) => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['user'];
    Http.instance.post({
      url,
      data: {
        code: code,
        iv: iv,
        info: info
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const putUserInfo = (data) => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['userSetting'];

    const mode = parseInt(data.mode, 10);
    const circle = data.menstrual_cycle;
    const duration = data.duration_of_menstruation;
    const lastMenses = data.last_menses;
    const duedate = data.duedate;
    const babyBirthday = data.baby_birthday;
    const babySex = data.baby_sex;
    let dataObj = {};

    if (mode === 1) { // 怀孕
      dataObj = {
        mode: 1,
        duration_of_menstruation: parseInt(duration) || 5,
        menstrual_cycle: parseInt(circle) || 28,
        last_menses: lastMenses || '',
        duedate: duedate || ''
      };
    } else if (mode === 2) { // 备孕
      dataObj = {
        mode: 2,
        duration_of_menstruation: parseInt(duration) || 5,
        menstrual_cycle: parseInt(circle) || 28,
        last_menses: lastMenses || '',
        duedate: duedate || ''
      };
    } else if (mode === 3) { // 辣妈
      dataObj = {
        mode: 3,
        baby_birthday: babyBirthday || '',
        baby_sex: babySex + 1 || 0
      };
    }

    Http.instance.put({
      url,
      data: dataObj
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const fetchIndex = () => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['index'];
    Http.instance.get({
      url: url
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const fetchDetail = id => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['detail'];
    Http.instance.get({
      url: url,
      data: {
        id: id
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

module.exports = {
  fetchIndex,
  fetchDetail,
  authorize,
  putUserInfo
};
