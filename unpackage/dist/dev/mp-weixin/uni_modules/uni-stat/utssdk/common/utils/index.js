"use strict";
const common_vendor = require("../../../../../common/vendor.js");
require("../../interface.js");
const uni_modules_uniStat_utssdk_common_core_statType = require("../core/stat-type.js");
function Serialize(obj) {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      let key = obj[p];
      if (obj[p] == null) {
        key = "";
      }
      const text = p + "=" + key;
      str.push(text);
    }
  }
  return "?" + str.join("&");
}
function IsNumber(value = null) {
  return typeof value === "number";
}
function FilterParam(keys = [], data) {
  let result = new UTSJSONObject({});
  keys.forEach((key) => {
    result[key] = data[key];
  });
  let formdata = result;
  return formdata;
}
function Log(data, type = false) {
  let logData = getEventData(data.lt, data);
  let msg_type = "";
  switch (data.lt) {
    case "1":
      msg_type = "应用启动";
      break;
    case "3":
      msg_type = "应用进入后台";
      break;
    case "11":
      msg_type = "页面切换";
      break;
    case "21":
      msg_type = "事件触发";
      break;
    case "31":
      msg_type = "应用错误";
      break;
    case "41":
      msg_type = "应用崩溃";
      break;
    case "101":
      msg_type = "PUSH";
      break;
  }
  if (type) {
    common_vendor.index.__f__("log", "at uni_modules/uni-stat/utssdk/common/utils/index.uts:87", `=== 统计队列数据上报 :`, logData);
    return null;
  }
  if (msg_type != "") {
    common_vendor.index.__f__("log", "at uni_modules/uni-stat/utssdk/common/utils/index.uts:94", `=== 统计数据采集：${msg_type} :`, logData);
  }
}
function Map2String(statData) {
  let statDataJson = new UTSJSONObject({});
  statData.forEach((rd, key) => {
    statDataJson[key] = rd;
  });
  return UTS.JSON.stringify(statDataJson);
}
function Map2Json(statData) {
  let statDataJson = new UTSJSONObject({});
  statData.forEach((rd, key) => {
    let arr = [];
    rd.forEach((elm) => {
      let data = getEventData(key, elm);
      arr.push(data);
    });
    statDataJson[key] = arr;
  });
  return statDataJson;
}
const handle_data = (statData) => {
  let firstArr = [];
  let contentArr = [];
  let lastArr = [];
  statData.forEach((rd, key) => {
    rd.forEach((elm) => {
      let data = getEventData(key, elm);
      if (key == "1") {
        firstArr.push(data);
      } else if (key == "4") {
        lastArr.push(data);
      } else {
        contentArr.push(data);
      }
    });
  });
  firstArr.push(...contentArr, ...lastArr);
  return UTS.JSON.stringify(firstArr);
};
function getEventData(lt, elm) {
  let data = new UTSJSONObject({});
  switch (lt) {
    case "1":
      data = FilterParam(uni_modules_uniStat_utssdk_common_core_statType.AppShowParamsKeys, elm);
      break;
    case "3":
      data = FilterParam(uni_modules_uniStat_utssdk_common_core_statType.AppHideParamsKeys, elm);
      break;
    case "11":
      data = FilterParam(uni_modules_uniStat_utssdk_common_core_statType.PageShowParamsKeys, elm);
      break;
    case "21":
      data = FilterParam(uni_modules_uniStat_utssdk_common_core_statType.EventParamsKeys, elm);
      break;
    case "31":
      data = FilterParam(uni_modules_uniStat_utssdk_common_core_statType.ErrorParamsKeys, elm);
      break;
    case "41":
      data = FilterParam(uni_modules_uniStat_utssdk_common_core_statType.CrashParamsKeys, elm);
      break;
    case "101":
      data = FilterParam(uni_modules_uniStat_utssdk_common_core_statType.PushParamsKeys, elm);
      break;
  }
  return data;
}
exports.IsNumber = IsNumber;
exports.Log = Log;
exports.Map2Json = Map2Json;
exports.Map2String = Map2String;
exports.Serialize = Serialize;
exports.handle_data = handle_data;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/common/utils/index.js.map
