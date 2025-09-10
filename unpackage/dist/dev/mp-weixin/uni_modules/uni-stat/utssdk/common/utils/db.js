"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const APPID = common_vendor.index.getSystemInfoSync().appId;
function dbSet(name, value) {
  let data = common_vendor.index.getStorageSync("UNI_STAT_DATA:" + APPID);
  let newData = new UTSJSONObject({});
  if (data != null && typeof data == "object") {
    newData = data;
  }
  newData[name] = value;
  common_vendor.index.setStorageSync("UNI_STAT_DATA:" + APPID, newData);
}
function dbGet(name) {
  let data = common_vendor.index.getStorageSync("UNI_STAT_DATA:" + APPID);
  if (data == null)
    return null;
  if (typeof data != "object")
    return null;
  const newData = data;
  return newData[name];
}
function dbRemove(name) {
  let data = common_vendor.index.getStorageSync("UNI_STAT_DATA:" + APPID);
  if (data == "") {
    data = new UTSJSONObject({});
  }
  if (data != null) {
    let newData = data;
    if (newData[name] != null) {
      newData[name] = null;
      common_vendor.index.setStorageSync("UNI_STAT_DATA:" + APPID, newData);
    }
  }
}
exports.dbGet = dbGet;
exports.dbRemove = dbRemove;
exports.dbSet = dbSet;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/common/utils/db.js.map
