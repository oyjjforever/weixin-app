"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniStat_utssdk_interface = require("../../interface.js");
const uni_modules_uniStat_utssdk_common_config = require("../config.js");
const uni_modules_uniStat_utssdk_common_utils_pageTime = require("./pageTime.js");
const uni_modules_uniStat_utssdk_common_utils_db = require("./db.js");
const uni_modules_uniStat_utssdk_common_utils_index = require("./index.js");
var define_process_env_UNI_STAT_TITLE_JSON_default = { "pages/template/food-recipe/food-recipe": "Food Recipe App" };
const APPID = uni_modules_uniStat_utssdk_common_config.sys.appId;
const RUNTIME_VERSION = uni_modules_uniStat_utssdk_common_config.sys.appVersion;
const get_uuid = () => {
  return uni_modules_uniStat_utssdk_common_config.sys.deviceId;
};
const get_odid = () => {
  return uni_modules_uniStat_utssdk_common_config.sys.deviceId;
};
const get_platform_name = () => {
  let platformList = new UTSJSONObject(
    {
      "app": "n",
      "app-plus": "n",
      "h5": "h5",
      "web": "web",
      "mp-weixin": "wx",
      "mp-baidu": "bd",
      "mp-toutiao": "tt",
      "mp-qq": "qq",
      "quickapp-native": "qn",
      "mp-kuaishou": "ks",
      "mp-lark": "lark",
      "quickapp-webview": "qw"
    }
    // 苹果审核代码中禁止出现 alipay 字样 ，需要特殊处理一下
  );
  const aliArr = ["y", "a", "p", "mp-ali"];
  const aliKey = aliArr.reverse().join("");
  platformList[aliKey] = "ali";
  const platform = uni_modules_uniStat_utssdk_common_config.sys.uniPlatform;
  return platformList[platform];
};
const get_pack_name = () => {
  var _a, _b;
  let packName = "";
  if (get_platform_name() === "n") {
    if (uni_modules_uniStat_utssdk_common_config.sys.osName == "android") {
      packName = (_a = uni_modules_uniStat_utssdk_common_config.sysAppBase.packageName) !== null && _a !== void 0 ? _a : "";
    }
    if (uni_modules_uniStat_utssdk_common_config.sys.osName == "ios") {
      packName = (_b = uni_modules_uniStat_utssdk_common_config.sysAppBase.bundleId) !== null && _b !== void 0 ? _b : "";
    }
  }
  return packName;
};
const get_channel = () => {
  var _a;
  const platformName = get_platform_name();
  let channel = "";
  if (platformName === "n") {
    channel = (_a = uni_modules_uniStat_utssdk_common_config.sysAppBase.channel) !== null && _a !== void 0 ? _a : "";
  }
  return channel;
};
const get_scene = (options) => {
  var _a;
  let scene = 1001;
  if (options.scene != null) {
    return (_a = options.scene) !== null && _a !== void 0 ? _a : 1001;
  }
  return scene;
};
const is_page = (appInstance) => {
  var _a;
  const type = (_a = appInstance === null || appInstance === void 0 ? null : appInstance.$mpType) !== null && _a !== void 0 ? _a : "page";
  return type == "page" ? true : false;
};
const get_page_name = (routepath) => {
  var _a, _b;
  let page = get_page_vm();
  if (page == null)
    return "";
  let route;
  route = (_a = page.$scope && page.$scope.route) !== null && _a !== void 0 ? _a : "";
  if (route != routepath) {
    const pages = getCurrentPages();
    let page_now = UTS.arrayFind(pages, (p) => {
      return p.route == routepath;
    });
    if (page_now == null) {
      return "";
    }
    page = page_now.vm;
  }
  let titleText;
  const title_json = define_process_env_UNI_STAT_TITLE_JSON_default;
  titleText = (_b = title_json[route]) !== null && _b !== void 0 ? _b : "";
  return titleText;
};
const get_page_vm = () => {
  let pages = getCurrentPages();
  if (pages.length == 0) {
    return null;
  }
  let page = pages[pages.length - 1];
  return page.vm;
};
function get_route(page = null) {
  var _a;
  let _self = page !== null && page !== void 0 ? page : get_page_vm();
  if (_self == null) {
    const data_1 = new uni_modules_uniStat_utssdk_interface.RouteParams({
      path: "",
      fullpath: ""
    });
    return data_1;
  }
  let url_params;
  let options = null;
  options = _self.$scope.options;
  url_params = uni_modules_uniStat_utssdk_common_utils_index.Serialize(options);
  let params = "";
  if (url_params != "?") {
    params = url_params;
  }
  let route;
  route = (_a = _self.$scope && _self.$scope.route) !== null && _a !== void 0 ? _a : "";
  const data = new uni_modules_uniStat_utssdk_interface.RouteParams({
    path: route,
    fullpath: route + params
  });
  return data;
}
const is_page_report = () => {
  const uniStatConfig = uni_modules_uniStat_utssdk_common_config.Config.getOptions();
  const collectItems = uniStatConfig.collectItems;
  if (collectItems != null) {
    const statPageLog = collectItems.uniStatPageLog;
    if (statPageLog == null)
      return true;
    return typeof statPageLog == "boolean" ? statPageLog : true;
  }
  return true;
};
const IS_HANDLE_DEVECE_ID = "is_handle_device_id";
const is_handle_device = () => {
  var _a;
  let isHandleDevice = (_a = uni_modules_uniStat_utssdk_common_utils_db.dbGet(IS_HANDLE_DEVECE_ID)) !== null && _a !== void 0 ? _a : "";
  uni_modules_uniStat_utssdk_common_utils_db.dbSet(IS_HANDLE_DEVECE_ID, "1");
  return isHandleDevice === "1";
};
const get_net = () => {
  return new Promise((resolve, reject) => {
    common_vendor.index.getNetworkType(new UTSJSONObject({
      success(e) {
        const net = e.networkType;
        resolve(net);
      },
      fail() {
        reject("");
      }
    }));
  });
};
const get_default_data = () => {
  let isRoot;
  if (uni_modules_uniStat_utssdk_common_config.device.isRoot == true) {
    isRoot = 1;
  } else {
    isRoot = 0;
  }
  let statData = new uni_modules_uniStat_utssdk_interface.StatDefault({
    uuid: get_uuid(),
    ak: APPID,
    p: uni_modules_uniStat_utssdk_common_config.sys.osName == "android" ? "a" : "i",
    ut: get_platform_name(),
    mpn: get_pack_name(),
    usv: uni_modules_uniStat_utssdk_common_config.STAT_VERSION,
    v: RUNTIME_VERSION,
    ch: get_channel(),
    cn: "",
    pn: get_pack_name(),
    ct: "",
    t: uni_modules_uniStat_utssdk_common_utils_pageTime.get_time(),
    tt: "",
    brand: uni_modules_uniStat_utssdk_common_config.sys.deviceBrand,
    md: uni_modules_uniStat_utssdk_common_config.sys.deviceModel,
    sv: uni_modules_uniStat_utssdk_common_config.sys.osVersion.replace(/(Android|iOS)\s/, ""),
    mpsdk: uni_modules_uniStat_utssdk_common_config.sys.SDKVersion,
    mpv: uni_modules_uniStat_utssdk_common_config.sys.uniCompilerVersionCode.toString(),
    // mpv: '',
    lang: uni_modules_uniStat_utssdk_common_config.sys.osLanguage,
    pr: uni_modules_uniStat_utssdk_common_config.sys.devicePixelRatio,
    ww: uni_modules_uniStat_utssdk_common_config.sys.windowWidth,
    wh: uni_modules_uniStat_utssdk_common_config.sys.windowHeight,
    sw: uni_modules_uniStat_utssdk_common_config.sys.screenWidth,
    sh: uni_modules_uniStat_utssdk_common_config.sys.screenHeight,
    lat: "",
    lng: "",
    net: "",
    odid: "",
    pv: uni_modules_uniStat_utssdk_common_config.sysAppBase.appVersion,
    root: isRoot
  });
  return statData;
};
const get_report_Interval = (defaultTime) => {
  const uniStatConfig = uni_modules_uniStat_utssdk_common_config.Config.getOptions();
  let time = uniStatConfig.reportInterval;
  if (!uni_modules_uniStat_utssdk_common_utils_index.IsNumber(time))
    return defaultTime;
  if (time == 0)
    return 0;
  return time;
};
const get_space = (config) => {
  {
    if ((config === null || config === void 0 ? null : config.spaceId) != "") {
      return config;
    }
    return null;
  }
};
const calibration = (eventName, options = null) => {
  if (eventName == "") {
    return 61003;
  }
  if (typeof eventName != "string") {
    return 61004;
  }
  if (eventName.length > 255) {
    return 61005;
  }
  if (typeof options != "string" && typeof options != "object") {
    return 61006;
  }
  if (typeof options == "string" && options.length > 255) {
    return 61007;
  }
  if (eventName == "title" && typeof options != "string") {
    return 61008;
  }
  return null;
};
exports.calibration = calibration;
exports.get_default_data = get_default_data;
exports.get_net = get_net;
exports.get_odid = get_odid;
exports.get_page_name = get_page_name;
exports.get_report_Interval = get_report_Interval;
exports.get_route = get_route;
exports.get_scene = get_scene;
exports.get_space = get_space;
exports.is_handle_device = is_handle_device;
exports.is_page = is_page;
exports.is_page_report = is_page_report;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/common/utils/pageInfo.js.map
