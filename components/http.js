import Config from '../config';
import _ from '../utils/util';
const PARAMS = ['v'];
const Promise = require('./promise').Promise;

const request = options => new Promise((resolve, reject) => {
  if (options.loading) {
    wx.showNavigationBarLoading();
  }
  let params = _.parse(options.url);
  PARAMS.forEach(k => {
    params[k] = Config[k];
  });
  const p = _.stringify(params, true);
  let url = options.url.split('?')[0] + '?' + p;
  let header = {
    'content-type': 'application/json'
  };

  if (options.header) {
    for (let k in options.header) {
      header[k] = options.header[k];
    }
  }

  wx.request({
    url: url,
    method: options.method,
    data: options.data || {},
    header: header || {},
    success: function (res) {
      if (res.statusCode >= 400) {
        if (res.statusCode === 401) {
          Http.instance.fire('unauthorize');
        }
        reject({ err: res, msg: '401 -- Http授权失败！' });
      } else {
        resolve(res.data);
      }
    },
    fail: function (error) {
      reject({ err: error, msg: 'wx.request请求失败！' })
    },
    complete: function () {
      if (options.loading) {
        wx.hideNavigationBarLoading();
      }
    }
  });
});

class Http {
  constructor() {
    this.__events = {};
    this.__key = `http-${+new Date()}`;
    this._authorization = null;
    this._virtualAuthorization = null;
    // console.warn('Don\'t use it, but Http.instance.');
  }

  on(eventName, eventHandle) {
    const list = this.__events[eventName] || [];
    list.push(eventHandle);
    this.__events[eventName] = list;
  }

  fire(eventName) {
    const list = this.__events[eventName];
    if (list && list.length) {
      let result = undefined;
      list.forEach(fun => {
        result = fun();
      });
    }
  }

  off(eventName, eventHandle) {
    const list = this.__events[eventName] || [];
    const temp = [];
    list.forEach(fun => {
      if (fun !== eventHandle) {
        temp.push(fun);
      }
    });
    this.__events = temp;
  }

  set VirtualAuthorization(value) {
    // console.warn(`Set VirtualAuthorization to ${value}`);
    this._virtualAuthorization = value;
  }

  get VirtualAuthorization() {
    return this._virtualAuthorization;
  }

  set Authorization(value) {
    // console.warn(`Set Authorization to ${value}`);
    this._authorization = value;
  }

  get Authorization() {
    return this._authorization;
  }

  composeHeader(options) {
    const Authorization = this.Authorization;
    const VirtualAuthorization = this.VirtualAuthorization;
    if (!options.header) {
      options.header = {};
    }
    if (Authorization) {
      options.header['Authorization'] = `XDS ${Authorization}`;
    } else if (VirtualAuthorization) {
      options.header['Authorization-Virtual'] = `VDS ${VirtualAuthorization}`;
    }
    return options;
  }

  get(options) {
    if (!options.method) {
      options.method = 'GET';
    }
    return request(this.composeHeader(options));
  }

  post(options) {
    if (!options.method) {
      options.method = 'POST';
    }
    return request(this.composeHeader(options));
  }

  delete(url) {
    if (!options.method) {
      options.method = 'DELETE';
    }
    return request(this.composeHeader(options));
  }

  put(options) {
    if (!options.method) {
      options.method = 'PUT';
    }
    return request(this.composeHeader(options));
  }

  onUnAuthorize(handle) {
    const handles = this.__events['unauthorize'] || [];
    handles.push(handle);
  }

  static get(options) {
    if (!options.method) {
      options.method = 'GET';
    }
    return request(options);
  }

  static post(options) {
    if (!options.method) {
      options.method = 'POST';
    }
    return request(options);
  }

  static delete(options) {
    if (!options.method) {
      options.method = 'DELETE';
    }
    return request(options);
  }

  static put(options) {
    if (!options.method) {
      options.method = 'PUT';
    }
    return request(options);
  }

  static get instance() {
    if (Http.__instance) {
      return Http.__instance;
    } else {
      return Http.__instance = new Http;
    }
  }

  static setAuthorization(value) {
    Http.instance['Authorization'] = value;
  }

  static setVirtualAuthorization(value) {
    Http.instance['VirtualAuthorization'] = value;
  }
}

module.exports = Http;
