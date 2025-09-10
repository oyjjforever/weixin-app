"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniStat_utssdk_interface = require("../../interface.js");
const uni_modules_uniStat_utssdk_common_utils_pageTime = require("../utils/pageTime.js");
const uni_modules_uniStat_utssdk_common_utils_pageInfo = require("../utils/pageInfo.js");
const uni_modules_uniStat_utssdk_common_core_statType = require("./stat-type.js");
const uni_modules_uniStat_utssdk_common_utils_db = require("../utils/db.js");
const uni_modules_uniStat_utssdk_common_utils_index = require("../utils/index.js");
const uni_modules_uniStat_utssdk_common_config = require("../config.js");
class Report {
  constructor() {
    this.licationShow = false;
    this.licationHide = false;
    this.eportInterval = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_report_Interval(uni_modules_uniStat_utssdk_common_config.OPERATING_TIME);
    this._navigationBarTitle = new uni_modules_uniStat_utssdk_interface.TitleConfigParams({
      config: "",
      page: "",
      report: "",
      lt: ""
    });
    this.statData = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_default_data();
    let registerInterceptor = typeof common_vendor.index.addInterceptor === "function";
    if (registerInterceptor) {
      this.interceptSetNavBar();
      this.interceptLogin();
      this.interceptShare(true);
      this.interceptRequestPayment();
    }
  }
  /**
   * 拦截 setNavigationBarTitle 事件
   */
  interceptSetNavBar() {
    let self = this;
    common_vendor.index.addInterceptor("setNavigationBarTitle", {
      // @ts-ignore
      invoke(args) {
        self._navigationBarTitle.page = args.title;
      }
      // @ts-ignore
    });
  }
  /**
   * 拦截 login 事件
   */
  interceptLogin() {
    let self = this;
    common_vendor.index.addInterceptor("login", {
      complete() {
        self._login();
      }
      // @ts-ignore
    });
  }
  interceptShare(type = false) {
    let self = this;
    if (!type) {
      self._share();
      return null;
    }
    common_vendor.index.addInterceptor("share", {
      complete() {
        self._share();
      }
      // @ts-ignore
    });
  }
  interceptRequestPayment() {
    let self = this;
    common_vendor.index.addInterceptor("requestPayment", {
      success() {
        self._payment("pay_success");
      },
      fail() {
        self._payment("pay_fail");
      }
      // @ts-ignore
    });
  }
  /**
   * 实现登录拦截逻辑
   */
  _login() {
    this.sendEventRequest(new uni_modules_uniStat_utssdk_interface.EventParams({
      key: "login"
    }));
  }
  _share() {
    this.sendEventRequest(new uni_modules_uniStat_utssdk_interface.EventParams({
      key: "share"
    }));
  }
  _payment(key) {
    this.sendEventRequest(new uni_modules_uniStat_utssdk_interface.EventParams({
      key
    }));
  }
  /**
   * 进入应用
   * @param {any} options 应用参数
   */
  launch(options = null) {
    uni_modules_uniStat_utssdk_common_utils_pageTime.set_page_residence_time();
    this.licationShow = true;
    uni_modules_uniStat_utssdk_common_utils_db.dbSet("__launch_options", options);
    let request_option = new UTSJSONObject(
      {
        // @ts-ignore
        path: options.path,
        cst: uni_modules_uniStat_utssdk_common_core_statType.ReprotCstType.AppNormal
      }
      // TODO 安卓没有 scene ，需要补一个
      // @ts-ignore
    );
    request_option.scene = options.scene;
    this.sendAppRequest(request_option, true);
  }
  /**
   * 进入应用
   * @description 上报主要数据采集是从onShow
   */
  load() {
  }
  /**
   * 进入应用或应用从后台进入前台
   */
  appShow() {
    if (!this.licationHide)
      return null;
    const time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_residence_time("app");
    if (time.overtime) {
      let lastPageRoute = common_vendor.index.getStorageSync("UNI_STAT_LAST_PAGE_ROUTE");
      let options = new UTSJSONObject({
        path: lastPageRoute,
        scene: this.statData.sc,
        cst: uni_modules_uniStat_utssdk_common_core_statType.ReprotCstType.AppAwakenTimeout
      });
      this.sendAppRequest(options);
    }
    this.licationHide = false;
  }
  /**
   * 引用进入后台触发
   * @param {Boolean} type 是否立即触发上报
   */
  appHide(type = false) {
    this.licationHide = true;
    const time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_residence_time("outher");
    const route = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_route().fullpath;
    common_vendor.index.setStorageSync("UNI_STAT_LAST_PAGE_ROUTE", route);
    const formdata = new uni_modules_uniStat_utssdk_interface.PageParams({
      url: route,
      urlref: route,
      urlref_ts: time.residenceTime
      // urlref_tt: ''
    });
    this.sendHideRequest(formdata, type);
    uni_modules_uniStat_utssdk_common_utils_pageTime.set_first_time();
  }
  /**
   * 进入页面触发
   * @param {Page } self 当前页面实例
   */
  // @ts-ignore
  pageShow(self) {
    this._navigationBarTitle = new uni_modules_uniStat_utssdk_interface.TitleConfigParams(
      { config: "", page: "", report: "", lt: "" }
      // 获取页面路径
    );
    const _a = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_route(self), path = _a.path, fullpath = _a.fullpath;
    const pageTitle = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_page_name(path);
    this._navigationBarTitle.config = pageTitle;
    if (this.licationShow) {
      uni_modules_uniStat_utssdk_common_utils_pageTime.set_first_time();
      common_vendor.index.setStorageSync("UNI_STAT_LAST_PAGE_ROUTE", fullpath);
      this.licationShow = false;
      return null;
    }
    const time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_residence_time("page");
    if (time.overtime) {
      let options = new UTSJSONObject({
        path: fullpath,
        scene: this.statData.sc,
        cst: uni_modules_uniStat_utssdk_common_core_statType.ReprotCstType.PageStayTimeout
      });
      this.sendAppRequest(options);
    }
    uni_modules_uniStat_utssdk_common_utils_pageTime.set_first_time();
  }
  /**
   * 离开页面触发
   * @param {ComponentPublicInstance } self 当前页面实例
   */
  // @ts-ignore
  pageHide(self) {
    if (this.licationHide)
      return null;
    const time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_residence_time("page");
    let fullpath = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_route(self).fullpath;
    let lastPageRoute = common_vendor.index.getStorageSync("UNI_STAT_LAST_PAGE_ROUTE");
    if (lastPageRoute == null) {
      lastPageRoute = fullpath;
    }
    common_vendor.index.setStorageSync("UNI_STAT_LAST_PAGE_ROUTE", fullpath);
    const options = new uni_modules_uniStat_utssdk_interface.PageParams({
      url: fullpath,
      urlref: lastPageRoute,
      urlref_ts: time.residenceTime,
      urlref_tt: ""
    });
    this.sendPageRequest(options);
  }
  appError(em = null) {
    var _a;
    let errmsg;
    errmsg = (_a = em.stack) !== null && _a !== void 0 ? _a : em.message;
    let route = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_route().path;
    let options = new uni_modules_uniStat_utssdk_interface.StatDefault({
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: "31",
      url: route,
      ut: this.statData.ut,
      ch: this.statData.ch,
      mpsdk: this.statData.mpsdk,
      mpv: this.statData.mpv,
      v: this.statData.v,
      em: errmsg,
      usv: this.statData.usv,
      t: uni_modules_uniStat_utssdk_common_utils_pageTime.get_time()
    });
    this.request(options, false);
  }
  /**
   * 应用崩溃时触发 ，只有 app 生效
   * @param {string[] } crash_data 崩溃日志数组
   */
  appCrash(crash_data) {
    const statdata = this.statData;
    let options = new uni_modules_uniStat_utssdk_interface.StatDefault({
      "lt": "41",
      "uuid": statdata.uuid,
      "ak": statdata.ak,
      "v": statdata.v,
      "ut": statdata.ut,
      "p": statdata.p,
      "ch": statdata.ch,
      "mpsdk": statdata.mpsdk,
      "did": statdata.uuid,
      "net": statdata.net,
      "os": statdata.mpn,
      "sv": statdata.sv,
      "brand": statdata.brand,
      "md": statdata.md,
      "root": statdata.root,
      // "batlevel": "", // 设备电池电量
      // "battemp": "", // 电池温度
      // "memuse": "", // 系统已使用内存
      // "memtotal": "", // 系统总内存
      // "diskuse": "", // 系统磁盘已使用大小
      // "disktotal": "", // 系统磁盘总大小
      // "abis": "", // 设备支持的CPU架构
      // "appcount": "", // 运行的app个数
      // "mem": "", // APP使用的内存量
      // "wvcount": "", // 打开Webview窗口的个数
      // "duration": "", // APP使用时长
      // "fore": "", // 是否前台运行
      "pn": statdata.pn,
      "pv": statdata.pv,
      // "url": "", // 页面url
      "log": ""
      // 错误日志
    });
    uni_modules_uniStat_utssdk_common_utils_pageInfo.get_net().then((net) => {
      options.net = net;
      this.crashRequest(options, crash_data);
    }).catch(() => {
      this.crashRequest(options, crash_data);
    });
  }
  /**
   * 发送请求,应用维度上报
   * @param {Object} options 页面信息
   * @param {Boolean} type 是否立即上报
   */
  sendAppRequest(options, type = false) {
    var _a;
    let is_opt = options.query != null && UTS.JSON.stringify(options.query) != "{}";
    let query = is_opt ? "?" + UTS.JSON.stringify(options.query) : "";
    const first_time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_first_visit_time();
    const last_time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_last_visit_time();
    if (last_time != 0) {
      const odid = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_odid();
      const have_device = uni_modules_uniStat_utssdk_common_utils_pageInfo.is_handle_device();
      if (!have_device) {
        this.statData.odid = odid;
      }
    }
    this.statData.lt = uni_modules_uniStat_utssdk_common_core_statType.ReportType.AppStart;
    this.statData.url = options.path + query;
    this.statData.t = uni_modules_uniStat_utssdk_common_utils_pageTime.get_time();
    this.statData.sc = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_scene(options);
    this.statData.fvts = first_time;
    this.statData.lvts = last_time;
    this.statData.tvc = uni_modules_uniStat_utssdk_common_utils_pageTime.get_total_visit_count();
    this.statData.cst = (_a = options.cst) !== null && _a !== void 0 ? _a : uni_modules_uniStat_utssdk_common_core_statType.ReprotCstType.AppNormal;
    this.request(this.statData, type);
  }
  /**
   * 发送请求,页面维度上报
   * @param {Object} opt
   */
  sendPageRequest(opt) {
    let url = opt.url, urlref = opt.urlref, urlref_ts = opt.urlref_ts;
    this._navigationBarTitle.lt = uni_modules_uniStat_utssdk_common_core_statType.ReportType.PageShow;
    let options = new uni_modules_uniStat_utssdk_interface.StatDefault({
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: uni_modules_uniStat_utssdk_common_core_statType.ReportType.PageShow,
      ut: this.statData.ut,
      url,
      // TODO 好像是没有这个参数,看一下具体描述
      tt: this.statData.tt,
      urlref,
      urlref_ts,
      ch: this.statData.ch,
      usv: this.statData.usv,
      t: uni_modules_uniStat_utssdk_common_utils_pageTime.get_time()
    });
    this.request(options);
  }
  /**
   * 进入后台上报数据
   * @param {Object} opt 页面进入应用参数
   * @param {Boolean} type 是否立即上报数据
   */
  sendHideRequest(opt, type) {
    let urlref = opt.urlref, urlref_ts = opt.urlref_ts;
    let options = new uni_modules_uniStat_utssdk_interface.StatDefault({
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt: uni_modules_uniStat_utssdk_common_core_statType.ReportType.AppHide,
      ut: this.statData.ut,
      urlref,
      urlref_ts,
      ch: this.statData.ch,
      usv: this.statData.usv,
      t: uni_modules_uniStat_utssdk_common_utils_pageTime.get_time()
    });
    this.request(options, type);
  }
  /**
   * 推送数据上报
   * @param {any} options
   * @param {string} cid
   */
  sendPushRequest(options = null, cid) {
    let time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_time();
    const statData = new uni_modules_uniStat_utssdk_interface.StatDefault({
      uuid: this.statData.uuid,
      p: this.statData.p,
      ak: this.statData.ak,
      lt: uni_modules_uniStat_utssdk_common_core_statType.ReportType.Push,
      cid,
      t: time,
      ut: this.statData.ut
    });
    const dataStr = UTS.JSON.stringify(statData);
    let uniStatData = UTS.JSON.parse(dataStr, UTS.UTSType.withGenerics(Map, [String, UTS.UTSType.withGenerics(Array, [uni_modules_uniStat_utssdk_interface.StatDefault], true)], true));
    if (uniStatData == null) {
      uniStatData = /* @__PURE__ */ new Map([]);
    }
    const hasKey = uniStatData.has(uni_modules_uniStat_utssdk_common_core_statType.ReportType.Push);
    if (!hasKey) {
      uniStatData.set(uni_modules_uniStat_utssdk_common_core_statType.ReportType.Push, []);
    }
    UTS.mapGet(uniStatData, uni_modules_uniStat_utssdk_common_core_statType.ReportType.Push).push(statData);
    const stat_data = uni_modules_uniStat_utssdk_common_utils_index.handle_data(uniStatData);
    let optionsData = new uni_modules_uniStat_utssdk_interface.RequestData({
      usv: uni_modules_uniStat_utssdk_common_config.STAT_VERSION,
      t: time,
      requests: stat_data
    });
    this.sendRequest(optionsData);
  }
  /**
   * 自定义事件上报
   * @param {EventParams} data 事件参数
   */
  sendEventRequest(data) {
    var _a;
    const key = data.key;
    const value = (_a = data.value) !== null && _a !== void 0 ? _a : "";
    let routepath = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_route().fullpath;
    const lt = uni_modules_uniStat_utssdk_common_core_statType.ReportType.Event;
    this._navigationBarTitle.config = uni_modules_uniStat_utssdk_common_utils_pageInfo.get_page_name(routepath);
    this._navigationBarTitle.lt = lt;
    let options = new uni_modules_uniStat_utssdk_interface.StatDefault({
      ak: this.statData.ak,
      uuid: this.statData.uuid,
      p: this.statData.p,
      lt,
      ut: this.statData.ut,
      url: routepath,
      ch: this.statData.ch,
      e_n: key,
      e_v: typeof value === "object" ? UTS.JSON.stringify(value) : value.toString(),
      usv: this.statData.usv,
      t: uni_modules_uniStat_utssdk_common_utils_pageTime.get_time()
    });
    this.request(options);
  }
  /**
   * 崩溃请求发送请求
   * @param {StatDefault} data 上报数据
   * @param {Object} type 是否上报
   */
  crashRequest(data, crash_data) {
    const statConfig = uni_modules_uniStat_utssdk_common_config.Config.getOptions();
    let time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_time();
    const title = this._navigationBarTitle;
    data.ttn = title.page;
    data.ttpj = title.config;
    data.ttc = title.report;
    let statData = uni_modules_uniStat_utssdk_common_utils_db.dbGet("__UNI__STAT__DATA");
    if (statData == null) {
      statData = "{}";
    }
    let uniStatData = UTS.JSON.parse(statData, UTS.UTSType.withGenerics(Map, [String, UTS.UTSType.withGenerics(Array, [uni_modules_uniStat_utssdk_interface.StatDefault], true)], true));
    if (uniStatData == null) {
      uniStatData = /* @__PURE__ */ new Map([]);
    }
    for (let i = 0; i < crash_data.length; i++) {
      const log = crash_data[i];
      data.log = log;
      if (statConfig.debug) {
        uni_modules_uniStat_utssdk_common_utils_index.Log(data);
      }
      const lt = data.lt;
      const hasKey = uniStatData.has(lt);
      if (!hasKey) {
        uniStatData.set(lt, []);
      }
      UTS.mapGet(uniStatData, lt).push(data);
    }
    const statDataStr = uni_modules_uniStat_utssdk_common_utils_index.Map2String(uniStatData);
    uni_modules_uniStat_utssdk_common_utils_db.dbSet("__UNI__STAT__DATA", statDataStr);
    if (statConfig.debug) {
      const statJSON = uni_modules_uniStat_utssdk_common_utils_index.Map2Json(uniStatData);
      common_vendor.index.__f__("log", "at uni_modules/uni-stat/utssdk/common/core/report.uts:622", "=== 统计待上传队列数据 :", statJSON);
    }
    const stat_data = uni_modules_uniStat_utssdk_common_utils_index.handle_data(uniStatData);
    let optionsData = new uni_modules_uniStat_utssdk_interface.RequestData(
      {
        usv: uni_modules_uniStat_utssdk_common_config.STAT_VERSION,
        t: time,
        requests: stat_data
      }
      // 重置队列
    );
    uni_modules_uniStat_utssdk_common_utils_db.dbRemove("__UNI__STAT__DATA");
    this.sendRequest(optionsData, true);
  }
  /**
   * 发送请求
   * @param {StatDefault} data 上报数据
   * @param {Object} type 类型
   */
  request(data, type = false) {
    const statConfig = uni_modules_uniStat_utssdk_common_config.Config.getOptions();
    let time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_time();
    const title = this._navigationBarTitle;
    data.ttn = title.page;
    data.ttpj = title.config;
    data.ttc = title.report;
    if (statConfig.debug) {
      uni_modules_uniStat_utssdk_common_utils_index.Log(data);
    }
    const lt = data.lt;
    let statData = uni_modules_uniStat_utssdk_common_utils_db.dbGet("__UNI__STAT__DATA");
    if (statData == null) {
      statData = "{}";
    }
    let uniStatData = UTS.JSON.parse(statData, UTS.UTSType.withGenerics(Map, [String, UTS.UTSType.withGenerics(Array, [uni_modules_uniStat_utssdk_interface.StatDefault], true)], true));
    if (uniStatData == null) {
      uniStatData = /* @__PURE__ */ new Map([]);
    }
    const hasKey = uniStatData.has(lt);
    if (!hasKey) {
      uniStatData.set(lt, []);
    }
    UTS.mapGet(uniStatData, lt).push(data);
    const statDataStr = uni_modules_uniStat_utssdk_common_utils_index.Map2String(uniStatData);
    uni_modules_uniStat_utssdk_common_utils_db.dbSet("__UNI__STAT__DATA", statDataStr);
    let page_residence_time = uni_modules_uniStat_utssdk_common_utils_pageTime.get_page_residence_time();
    const is_timeout = page_residence_time < this.eportInterval && !type;
    if (is_timeout)
      return null;
    uni_modules_uniStat_utssdk_common_utils_pageTime.set_page_residence_time();
    if (statConfig.debug) {
      const statJSON = uni_modules_uniStat_utssdk_common_utils_index.Map2Json(uniStatData);
      common_vendor.index.__f__("log", "at uni_modules/uni-stat/utssdk/common/core/report.uts:701", "=== 统计待上传队列数据 :", statJSON);
    }
    const stat_data = uni_modules_uniStat_utssdk_common_utils_index.handle_data(uniStatData);
    let optionsData = new uni_modules_uniStat_utssdk_interface.RequestData(
      {
        usv: uni_modules_uniStat_utssdk_common_config.STAT_VERSION,
        t: time,
        requests: stat_data
      }
      // 重置队列
    );
    uni_modules_uniStat_utssdk_common_utils_db.dbRemove("__UNI__STAT__DATA");
    this.sendRequest(optionsData);
  }
  sendRequest(options, delCrash = false) {
    const statConfig = uni_modules_uniStat_utssdk_common_config.Config.getOptions();
    if (Report.uniCloudInstance != null) {
      const app = Report.uniCloudInstance;
      const uniCloudObj = app.importObject("uni-stat-receiver", {
        customUI: true
      });
      uniCloudObj.report(options).then(() => {
        if (statConfig.debug) {
          common_vendor.index.__f__("log", "at uni_modules/uni-stat/utssdk/common/core/report.uts:751", `=== 统计队列数据上报 :`, options);
        }
      }).catch((err = null) => {
        common_vendor.index.__f__("log", "at uni_modules/uni-stat/utssdk/common/core/report.uts:765", "=== 统计上报错误 :", UTS.JSON.stringify(err));
      });
    }
  }
}
Report.uniCloudInstance = null;
exports.Report = Report;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/common/core/report.js.map
