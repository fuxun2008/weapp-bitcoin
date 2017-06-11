import Http from '../components/http';
import _ from '../utils/util';
import Config from '../config';
const Promise = require('../components/promise').Promise;

const ENV = {
  production: '',
  development: 'test-'
};
const env = Config.env || 'development';
const WX_URL = `https://${ENV[env]}wxproj.seeyouyima.com`;

const API_METHODS = {
  'user': `${WX_URL}/users/wx/connect`,
  'userSetting': `${WX_URL}/users/wx/mode`,
  'index': `${WX_URL}/gravidity/api`,
  'babyGrowth': `${WX_URL}/gravidity/gestation_growth_describe`,
  'tips': `${WX_URL}/gravidity/v2/tips_info`,
  'momChange': `${WX_URL}/gravidity/mother_change_detail`,
  'caneatDetail': `${WX_URL}/tools/taboo/food`,
  'caneatRecommend': `${WX_URL}/tools/taboo_category_list`,
  'caneatSearch': `${WX_URL}/tools/taboo/search`
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

const fetchIndex = (_obj, mode, params = []) => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['index'];
    let obj = {
      mode: mode,
      tools_type: 2
    };
    if (mode === 1) {
      obj.gestation_info = _obj.gestationInfo;
    } else if (mode === 2) {
      obj.todo = '';
    } else if (mode === 3) {
      obj.parenting_info = _obj.parentingInfo;
      obj.parenting_year = _obj.parentingYear;
      obj.month_of_year = _obj.monthOfYear;
      obj.day_of_month = _obj.dayOfMonth;
      obj.baby_sex = _obj.babySex;
    }
    Http.instance.post({
      url: `${url}?${_.obj2uri(obj)}`,
      data: params
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const fetchMomChangeDetail = week => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['momChange'];
    Http.instance.get({
      url,
      data: {
        week: week
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const fetchBabyGrowthDetail = week => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['babyGrowth'];
    return Http.get({
      url,
      data: {
        gestation_week: week
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const fetchTipsDetail = (id, key) => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['tips'];
    return Http.get({
      url,
      data: {
        tips_id: id,
        keys: key
      }
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const fetchCanEatDetail = id => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['caneatDetail'];
    return Http.get({
      url,
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

const fetchCanEatRecommend = () => {
  return new Promise((resolve, reject) => {
    const url = API_METHODS['caneatRecommend'];
    return Http.get({
      url,
      data: {}
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

const fetchCanEatSearch = (category, crowd, matters, start = 0, size = 20, title = '') => {
  return new Promise((resolve, reject) => {
    const data = _.obj2uri({
      'category_id': category,
      'crowd': crowd,
      'matters': matters,
      'start': start,
      'size': size,
      'title': title
    });
    const url = API_METHODS['caneatSearch'];
    return Http.post({
      url,
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      data: data
    }).then(data => {
      resolve(data);
    }, err => {
      reject(err);
    });
  });
};

module.exports = {
  fetchMomChangeDetail,
  fetchBabyGrowthDetail,
  fetchTipsDetail,
  fetchIndex,
  authorize,
  putUserInfo,
  fetchCanEatDetail,
  fetchCanEatRecommend,
  fetchCanEatSearch
};
