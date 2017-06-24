import Http from '../components/http';
import _ from '../utils/util';
const Promise = require('../components/promise').Promise;

const WX_URL = `https://api.damabtc.com`;

const API_METHODS = {
  'user': `${WX_URL}/wx/connect`,
  'index': `${WX_URL}/article/list`,
  'detail': `${WX_URL}/article/detail`,
  'mineGet': `${WX_URL}/mine/get`,
  'mineGo': `${WX_URL}/mine/start`,
  'mineStop': `${WX_URL}/mine/stop`,
  'mineReset': `${WX_URL}/mine/reset`
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

const fetchIndex = (page = 1, cid) => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['index'];
    Http.instance.get({
      url: url,
      data: {
        page: page,
        cid: cid
      }
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

const handleMineGet = () => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['mineGet'];
    Http.instance.get({
      url: url,
      data: {}
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const handleMineGo = () => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['mineGo'];
    Http.instance.post({
      url: url,
      data: {}
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const handleMineStop = (counter = 0) => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['mineStop'];
    Http.instance.post({
      url: url,
      data: {
        counter: counter
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const handleMineReset = () => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['mineReset'];
    Http.instance.get({
      url: url,
      data: {}
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
  handleMineGet,
  handleMineGo,
  handleMineStop,
  handleMineReset,
  authorize
};
