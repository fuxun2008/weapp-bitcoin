import Http from '../components/http';
import _ from '../utils/util';
const Promise = require('../components/promise').Promise;

const WX_URL = `https://api.design-sprint.cn`;

const API_METHODS = {
  'user': `${WX_URL}/wx/connect`,
  'index': `${WX_URL}/article/list`,
  'detail': `${WX_URL}/article/detail`,
  'mineGet': `${WX_URL}/mine/get`,
  'mineStart': `${WX_URL}/mine/start`,
  'mineStop': `${WX_URL}/mine/stop`,
  'mineReset': `${WX_URL}/mine/reset`,
  'walletDetail': `${WX_URL}/wallet/detail`,
  'walletShow': `${WX_URL}/wallet/show`,
  'walletTransfer': `${WX_URL}/wallet/transfer`,
  'marketIndex': `${WX_URL}/market/index`,
  'marketBuy': `${WX_URL}/market/buy`,
  'marketSell': `${WX_URL}/market/sell`
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

const handleMineStart = () => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['mineStart'];
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

const handleMineStop = () => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['mineStop'];
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

const handleWalletDetail = (page = 1) => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['walletDetail'];
    Http.instance.get({
      url: url,
      data: {
        page: page
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const handleWalletShow = () => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['walletShow'];
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

const handleWalletTransfer = json => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['walletTransfer'];
    Http.instance.post({
      url: url,
      data: json
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const handleMarketIndex = () => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['marketIndex'];
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

const handleMarketBuy = (money = 0) => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['marketBuy'];
    Http.instance.post({
      url: url,
      data: {
        money: money
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};
const handleMarketSell = (money = 0) => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['marketSell'];
    Http.instance.post({
      url: url,
      data: {
        money: money
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

module.exports = {
  WX_URL,
  fetchIndex,
  fetchDetail,
  handleMineGet,
  handleMineStart,
  handleMineStop,
  handleMineReset,
  handleWalletDetail,
  handleWalletShow,
  handleWalletTransfer,
  handleMarketIndex,
  handleMarketBuy,
  handleMarketSell,
  authorize
};
