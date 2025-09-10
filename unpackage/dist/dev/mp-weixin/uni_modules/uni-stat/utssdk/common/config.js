"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniStat_utssdk_interface = require("../interface.js");
const sys = common_vendor.index.getSystemInfoSync();
const device = common_vendor.index.getDeviceInfo();
const sysAppBase = common_vendor.index.getAppBaseInfo();
const STAT_VERSION = sys.uniCompilerVersion;
const PAGE_PVER_TIME = 1800;
const APP_PVER_TIME = 300;
const OPERATING_TIME = 10;
class ConfigData {
  static getInstance() {
    if (ConfigData.__config_instance == null) {
      ConfigData.__config_instance = new ConfigData();
    }
    return ConfigData.__config_instance;
  }
  constructor() {
    this.options = null;
  }
  setOptions(options = null) {
    if (options == null) {
      options = new uni_modules_uniStat_utssdk_interface.UniStatOptions({});
    }
    if (options.enable == null) {
      options.enable = true;
    }
    if (options.debug == null) {
      options.debug = false;
    }
    if (options.reportInterval == null) {
      options.reportInterval = 10;
    }
    if (options.collectItems == null) {
      options.collectItems = new uni_modules_uniStat_utssdk_interface.UniStatCollectItemsOptions({});
    }
    let collectItems = options.collectItems;
    if (collectItems.uniPushClientID === null) {
      collectItems.uniPushClientID = false;
    }
    if (collectItems.uniStatPageLog === null) {
      collectItems.uniStatPageLog = true;
    }
    options.collectItems = collectItems;
    this.options = options;
  }
  getOptions() {
    if (this.options == null) {
      this.setOptions(null);
    }
    return this.options;
  }
}
ConfigData.__config_instance = null;
const Config = ConfigData.getInstance();
exports.APP_PVER_TIME = APP_PVER_TIME;
exports.Config = Config;
exports.OPERATING_TIME = OPERATING_TIME;
exports.PAGE_PVER_TIME = PAGE_PVER_TIME;
exports.STAT_VERSION = STAT_VERSION;
exports.device = device;
exports.sys = sys;
exports.sysAppBase = sysAppBase;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/common/config.js.map
