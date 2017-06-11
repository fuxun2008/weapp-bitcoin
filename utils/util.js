/**
 * 时间格式转换 ms -> date
 * @return {string} yyyy-MM-dd hh:mm:ss格式时间
 */
const msToDate = (_ms, _format) => {
  let ms = _ms;
  let format = _format;
  if (ms.toString().length === 10) {
    ms *= 1000;
  }
  format = format || 'yyyy-MM-dd hh:mm:ss';
  const d = new Date(ms);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const seconds = d.getSeconds();

  const addPrefix = source => (source < 10 ? `0${source}` : source);

  format = format.replace('yyyy', year)
    .replace('MM', addPrefix(month))
    .replace('dd', addPrefix(day))
    .replace('hh', addPrefix(hour))
    .replace('mm', addPrefix(minute))
    .replace('ss', addPrefix(seconds));

  return format;
};

/**
 * 时间格式转换 ms -> date
 * @return {string} yyyy-MM-dd hh:mm:ss格式时间
 */
const nowToDate = _format => {
  let format = _format;
  format = format || 'yyyy-MM-dd hh:mm:ss';
  return msToDate(new Date().getTime(), format);
};

/**
 * 过去距离当前时间差
 * @param  {int} ms 毫秒数
 * @return {string}    时间差标示
 */
const dateFromNow = ms => {
  const time = parseFloat(ms) / 1000;
  let result = '';
  if (time) {
    if (time > 60 && time < 3600) {
      result = `${parseInt(time / 60.0, 10)}分钟前`;
    } else if (time >= 3600 && time < 24 * 3600) {
      result = `${parseInt(time / 3600.0, 10)}小时前`;
    } else if (time >= 24 * 3600 && time < 30 * 24 * 3600) {
      result = `${parseInt(time / 3600.0 / 24.0, 10)}天前`;
    } else if (time >= 30 * 24 * 3600 && time < 12 * 30 * 24 * 3600) {
      result = `${parseInt(time / 3600.0 / 24.0 / 30, 10)}月前`;
    } else if (time >= 12 * 30 * 24 * 3600) {
      result = `${parseInt(time / 3600.0 / 24.0 / 30.0 / 12.0, 10)}年前`;
    } else {
      result = `${parseInt(time / 1.0, 10)}秒前`;
    }
  }

  return result;
};

/**
 * uri参数字符串转成object
 * @param  {string}    input       uri参数字串 x=xx&y=yy
 * @param  {boolean}   flag        是否decode
 * @return {object}                object格式数据 { x: xx, y: yy }
 */
const parse = function (input, flag) {
  if (input === null || input === '') {
    return {};
  }
  if ((typeof input) !== 'string') {
    throw new TypeError('invalidate arguments[0]');
  }
  const reg = new RegExp('[\?\&][^\?\&]+=[^\?\&]+', 'g');
  let result = input.match(reg);
  const query = {};
  if (result) {
    for (var i = 0; i < result.length; i++) {
      var temp = result[i].substring(1);
      var arr = temp.split('=');
      var value = arr[1];
      if (flag === true) {
        value = decodeURIComponent(value);
      }
      query[arr[0]] = value;
    }
  }
  return query;
};


/**
 * object转成uri参数字符串
 * @param  {object}    query       object格式数据 { x: xx, y: yy }
 * @param  {boolean}   flag        是否decode
 * @return {string}                uri参数字串 x=xx&y=yy
 */
const stringify = function (query, flag) {
  if (query === null || query === undefined) {
    return '';
  }
  if ((typeof query) !== 'object') {
    throw new TypeError('invalidate arguments[0]');
  }
  let search = '';
  for (var key in query) {
    if (query.hasOwnProperty(key)) {
      search += '&' + key + '=' + (query[key] ? encodeURIComponent(query[key]) : '');
    }
  }
  if (flag) {
    search = search.substring(1);
  }
  return search;
};

module.exports = {
  msToDate,
  nowToDate,
  dateFromNow,
  parse,
  stringify
};
