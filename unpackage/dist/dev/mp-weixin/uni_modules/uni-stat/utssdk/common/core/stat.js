"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniStat_utssdk_common_core_report = require("./report.js");
const uni_modules_uniStat_utssdk_common_core_statType = require("./stat-type.js");
const uni_modules_uniStat_utssdk_interface = require("../../interface.js");
const uni_modules_uniStat_utssdk_common_utils_pageInfo = require("../utils/pageInfo.js");
const uni_modules_uniStat_utssdk_common_config = require("../config.js");
const reportInstance = new uni_modules_uniStat_utssdk_common_core_report.Report();
class Stat {
  // 上报逻辑实例
  // 使用单例，只初始化一次
  static getInstance() {
    let space = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_space(common_vendor.tr.config);
    if (uni_modules_uniStat_utssdk_common_core_report.Report.uniCloudInstance == null) {
      if (space != null) {
        let spaceData = {
          provider: space.provider,
          spaceId: space.spaceId,
          clientSecret: space.clientSecret
        };
        const endpoint = space.endpoint;
        if (endpoint != null) {
          spaceData.endpoint = space.endpoint;
        }
        if (space.provider == "alipay") {
          spaceData.secretKey = space.secretKey;
          spaceData.accessKey = space.accessKey;
          spaceData.spaceAppId = space.spaceAppId;
        }
        uni_modules_uniStat_utssdk_common_core_report.Report.uniCloudInstance = common_vendor.tr.init(spaceData);
      } else {
        if (!Stat.no_space) {
          common_vendor.index.__f__("log", "at uni_modules/uni-stat/utssdk/common/core/stat.uts:50", "\x1B[31m应用已集成uni统计，但未关联服务空间，请在uniCloud目录右键关联服务空间\x1B[0m");
          Stat.no_space = true;
        }
      }
    }
    if (this.__stat_instance == null) {
      this.__stat_instance = new Stat();
    }
    return this.__stat_instance;
  }
  constructor() {
    this.appInstance = null;
    this.isHide = false;
  }
  /**
   * 初始化插件参数
   * @param {Object} options
   */
  init(options) {
    var _a;
    Stat.is_register = true;
    uni_modules_uniStat_utssdk_common_config.Config.setOptions(new uni_modules_uniStat_utssdk_interface.UniStatOptions(Object.assign({}, options)));
    const uniStatConfig = uni_modules_uniStat_utssdk_common_config.Config.getOptions();
    reportInstance.eportInterval = (_a = uniStatConfig.reportInterval) !== null && _a !== void 0 ? _a : 10;
  }
  /**
   * 应用启动
   * @param {OnLaunchOptions} options 应用参数
   * @param {ComponentPublicInstance} appInstance 应用实例
   */
  // options : OnLaunchOptions, appInstance : ComponentPublicInstance
  onLaunch(options, appInstance) {
  }
  /**
   * 页面加载
   * @param {ComponentPublicInstance} appInstance 应用实例
   */
  onLoad(appInstance) {
    this.registerEvent(uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleLoad, appInstance);
  }
  /**
   * 显示页面或应用进入前台
   * @param {ComponentPublicInstance} appInstance 应用实例
   */
  onShow(appInstance) {
    this.isHide = false;
    const mptype = uni_modules_uniStat_utssdk_common_utils_pageInfo.is_page(appInstance);
    if (mptype) {
      this.registerEvent(uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCyclePageShow, appInstance, null);
    }
  }
  /**
   * 页面隐藏或应用进入后台
   * @param {ComponentPublicInstance} appInstance 应用实例
   */
  onHide(appInstance) {
    this.isHide = true;
    const mptype = uni_modules_uniStat_utssdk_common_utils_pageInfo.is_page(appInstance);
    if (mptype) {
      this.registerEvent(uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCyclePageHide, appInstance, null);
    }
  }
  /**
   * 卸载页面
   * @param {ComponentPublicInstance} appInstance 应用实例
   */
  onUnload(appInstance) {
    if (this.isHide) {
      this.isHide = false;
      return null;
    }
    this.registerEvent(uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCyclePageUnLoad, appInstance, null);
  }
  /**
   * 错误
   * @param {String} error 应用实例
   */
  onError(error) {
    this.error(error);
  }
  /**
   * 获取推送ID
   */
  // pushEvent(options : any) {
  //   // TODO uni x 暂不支持，如需要开启，请放开注释
  //   const ClientID = is_push_clientid()
  //   if (ClientID) {
  //     uni.getPushClientId({
  //       success: (res) => {
  //         const cid = res.cid
  //         //  只有获取到才会上传
  //         // if (cid != null) {
  //         reportInstance.sendPushRequest(options, cid)
  //         // }
  //       },
  //     } as GetPushClientIdOptions)
  //   }
  // }
  /**
   * 注册事件
   * @param {number} EventType 事件类型
   * @param {Page} appInstance	当前页面实例
   * @param {UTSJSONObject} options 应用参数
   */
  registerEvent(EventType, appInstance = null, options = null, error = "") {
    const statConfig = uni_modules_uniStat_utssdk_common_config.Config.getOptions();
    if (statConfig.enable == false)
      return null;
    const isPageReport = uni_modules_uniStat_utssdk_common_utils_pageInfo.is_page_report();
    switch (EventType) {
      case uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleLaunch:
        reportInstance.launch(options);
        break;
      case uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleAppShow:
        reportInstance.appShow();
        break;
      case uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleAppHide:
        reportInstance.appHide(true);
        break;
      case uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleLoad:
        break;
      case uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCyclePageShow:
        if (isPageReport) {
          reportInstance.pageShow(appInstance);
        }
        break;
      case uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCyclePageHide:
        if (isPageReport) {
          reportInstance.pageHide(appInstance);
        }
        break;
      case uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCyclePageUnLoad:
        if (isPageReport) {
          reportInstance.pageHide(appInstance);
        }
        break;
      case uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleError:
        if (error != null) {
          reportInstance.appError(error);
        }
        break;
      case uni_modules_uniStat_utssdk_common_core_statType.StatType.Crash:
        reportInstance.appCrash(options);
        break;
    }
  }
  error(em) {
  }
  // 自定义参数上报
  appEvent(name, options = null, fn) {
    const statConfig = uni_modules_uniStat_utssdk_common_config.Config.getOptions();
    if (statConfig.enable == false)
      return null;
    if (Stat.no_space) {
      fn(false, 61e3);
      return null;
    }
    if (!Stat.is_register) {
      fn(false, 61001);
      return null;
    }
    if (name == "uni-app-launch" && options == null) {
      fn(false, 61002);
      return null;
    }
    if (name == "uni-app-launch") {
      this.registerEvent(uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleLaunch, null, options);
      fn(true, 61001);
      return null;
    }
    if (name == "uni-app-show") {
      this.registerEvent(uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleAppShow, null, null);
      fn(true, 61001);
      return null;
    }
    if (name == "uni-app-hide") {
      this.registerEvent(uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleAppHide, null, null);
      fn(true, 61001);
      return null;
    }
    if (name == "uni-page-show") {
      reportInstance.pageShow(options);
      fn(true, 61001);
      return null;
    }
    if (name == "uni-page-hide") {
      reportInstance.pageHide(options);
      fn(true, 61001);
      return null;
    }
    if (name == "uni-app-error") {
      this.registerEvent(uni_modules_uniStat_utssdk_common_core_statType.StatType.LifeCycleError, null, null, options);
      fn(true, 61001);
      return null;
    }
    const is_calibration = uni_modules_uniStat_utssdk_common_utils_pageInfo.calibration(name, options);
    if (is_calibration != null) {
      fn(false, is_calibration);
      return null;
    }
    if (name === "title") {
      reportInstance._navigationBarTitle.report = options;
    }
    const value = typeof options === "object" ? UTS.JSON.stringify(options) : options;
    const data = new uni_modules_uniStat_utssdk_interface.EventParams({
      key: name,
      value
    });
    reportInstance.sendEventRequest(data);
    fn(true, 61001);
  }
}
Stat.__stat_instance = null;
Stat.is_register = false;
Stat.no_space = false;
exports.Stat = Stat;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/common/core/stat.js.map
