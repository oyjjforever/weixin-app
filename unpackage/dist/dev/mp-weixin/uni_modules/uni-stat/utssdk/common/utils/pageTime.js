"use strict";
const uni_modules_uniStat_utssdk_common_utils_db = require("./db.js");
const uni_modules_uniStat_utssdk_common_config = require("../config.js");
const uni_modules_uniStat_utssdk_interface = require("../../interface.js");
const FIRST_VISIT_TIME_KEY = "__first__visit__time";
const LAST_VISIT_TIME_KEY = "__last__visit__time";
const TOTAL_VISIT_COUNT = "__total__visit__count";
const FIRST_TIME = "__first_time";
const PAGE_RESIDENCE_TIME = "__page__residence__time";
let First_Page_Residence_Time = 0;
let Last_Page_Residence_Time = 0;
const get_time = () => {
  return Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
};
const set_first_time = () => {
  let time = get_time();
  uni_modules_uniStat_utssdk_common_utils_db.dbSet(FIRST_TIME, time);
  return time;
};
const get_first_visit_time = () => {
  const timeStorge = uni_modules_uniStat_utssdk_common_utils_db.dbGet(FIRST_VISIT_TIME_KEY);
  let time;
  if (timeStorge != null && timeStorge != 0) {
    time = timeStorge;
  } else {
    time = get_time();
    uni_modules_uniStat_utssdk_common_utils_db.dbSet(FIRST_VISIT_TIME_KEY, time);
    uni_modules_uniStat_utssdk_common_utils_db.dbRemove(LAST_VISIT_TIME_KEY);
  }
  return time;
};
const get_last_visit_time = () => {
  const timeStorge = uni_modules_uniStat_utssdk_common_utils_db.dbGet(LAST_VISIT_TIME_KEY);
  let time = 0;
  if (timeStorge != null && timeStorge != 0) {
    time = timeStorge;
  }
  uni_modules_uniStat_utssdk_common_utils_db.dbSet(LAST_VISIT_TIME_KEY, get_time());
  return time;
};
const get_total_visit_count = () => {
  const timeStorge = uni_modules_uniStat_utssdk_common_utils_db.dbGet(TOTAL_VISIT_COUNT);
  let count = 1;
  if (timeStorge != null) {
    count = timeStorge;
    count++;
  }
  uni_modules_uniStat_utssdk_common_utils_db.dbSet(TOTAL_VISIT_COUNT, count);
  return count;
};
const get_residence_time = (type) => {
  var _a;
  let residenceTime = 0;
  const last_time = get_time();
  const first_time = (_a = uni_modules_uniStat_utssdk_common_utils_db.dbGet(FIRST_TIME)) !== null && _a !== void 0 ? _a : last_time;
  if (first_time != 0) {
    residenceTime = last_time - first_time;
  }
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  let timeData = new uni_modules_uniStat_utssdk_interface.ResidenceTimeReturn({
    residenceTime,
    overtime: false
  });
  if (type === "app") {
    let overtime = residenceTime > uni_modules_uniStat_utssdk_common_config.APP_PVER_TIME ? true : false;
    timeData.overtime = overtime;
    return timeData;
  }
  if (type === "page") {
    let overtime = residenceTime > uni_modules_uniStat_utssdk_common_config.PAGE_PVER_TIME ? true : false;
    timeData.overtime = overtime;
    return timeData;
  }
  return timeData;
};
const set_page_residence_time = () => {
  First_Page_Residence_Time = get_time();
  uni_modules_uniStat_utssdk_common_utils_db.dbSet(PAGE_RESIDENCE_TIME, First_Page_Residence_Time);
  return First_Page_Residence_Time;
};
const get_page_residence_time = () => {
  var _a;
  Last_Page_Residence_Time = get_time();
  First_Page_Residence_Time = (_a = uni_modules_uniStat_utssdk_common_utils_db.dbGet(PAGE_RESIDENCE_TIME)) !== null && _a !== void 0 ? _a : 0;
  const diff = Last_Page_Residence_Time - First_Page_Residence_Time;
  return diff;
};
exports.get_first_visit_time = get_first_visit_time;
exports.get_last_visit_time = get_last_visit_time;
exports.get_page_residence_time = get_page_residence_time;
exports.get_residence_time = get_residence_time;
exports.get_time = get_time;
exports.get_total_visit_count = get_total_visit_count;
exports.set_first_time = set_first_time;
exports.set_page_residence_time = set_page_residence_time;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/common/utils/pageTime.js.map
