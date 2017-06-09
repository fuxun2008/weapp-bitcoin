const ENV = 'development'; // development, production
// 孕期 10701000000
// 经期 11000000000
const APPID = 10;
const PLATFORM = 7;
const VERSION = '1.1.2';
const CHANNELNO = '0000';
const OS = 'weixin';
const myclient = `${APPID}${PLATFORM}${VERSION}${CHANNELNO}`.replace(/\./g, '');

module.exports = {
  myclient: myclient,
  v: VERSION,
  platform: PLATFORM,
  app_id: APPID,
  os: OS,
  env: ENV
};
