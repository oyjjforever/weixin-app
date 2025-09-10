"use strict";
const common_vendor = require("../common/vendor.js");
class SafeArea extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          top: { type: Number, optional: false },
          right: { type: Number, optional: false },
          bottom: { type: Number, optional: false },
          left: { type: Number, optional: false },
          width: { type: Number, optional: false },
          height: { type: Number, optional: false }
        };
      },
      name: "SafeArea"
    };
  }
  constructor(options, metadata = SafeArea.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.top = this.__props__.top;
    this.right = this.__props__.right;
    this.bottom = this.__props__.bottom;
    this.left = this.__props__.left;
    this.width = this.__props__.width;
    this.height = this.__props__.height;
    delete this.__props__;
  }
}
const AGREE_PRIVACY = "UNI-PRIVACY-AGREE";
class State extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          lifeCycleNum: { type: Number, optional: false },
          statusBarHeight: { type: Number, optional: false },
          safeArea: { type: SafeArea, optional: false },
          devicePixelRatio: { type: Number, optional: false },
          eventCallbackNum: { type: Number, optional: false },
          noMatchLeftWindow: { type: Boolean, optional: false },
          active: { type: String, optional: false },
          leftWinActive: { type: String, optional: false },
          agreeToPrivacy: { type: Boolean, optional: true },
          allowCapture: { type: Boolean, optional: false },
          isDarkMode: { type: Boolean, optional: false },
          netless: { type: Boolean, optional: false }
        };
      },
      name: "State"
    };
  }
  constructor(options, metadata = State.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.lifeCycleNum = this.__props__.lifeCycleNum;
    this.statusBarHeight = this.__props__.statusBarHeight;
    this.safeArea = this.__props__.safeArea;
    this.devicePixelRatio = this.__props__.devicePixelRatio;
    this.eventCallbackNum = this.__props__.eventCallbackNum;
    this.noMatchLeftWindow = this.__props__.noMatchLeftWindow;
    this.active = this.__props__.active;
    this.leftWinActive = this.__props__.leftWinActive;
    this.agreeToPrivacy = this.__props__.agreeToPrivacy;
    this.allowCapture = this.__props__.allowCapture;
    this.isDarkMode = this.__props__.isDarkMode;
    this.netless = this.__props__.netless;
    delete this.__props__;
  }
}
const getAgreePrivacy = () => {
  const data = common_vendor.index.getStorageSync(AGREE_PRIVACY);
  if (typeof data === "boolean") {
    return data;
  }
  if (data == null) {
    return null;
  }
  return null;
};
const state = common_vendor.reactive(new State({
  lifeCycleNum: 0,
  statusBarHeight: 0,
  devicePixelRatio: 1,
  eventCallbackNum: 0,
  noMatchLeftWindow: true,
  active: "componentPage",
  leftWinActive: "/pages/component/view/view",
  safeArea: new SafeArea({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0
  }),
  agreeToPrivacy: getAgreePrivacy(),
  allowCapture: true,
  isDarkMode: false,
  netless: false
}));
const setLifeCycleNum = (num) => {
  state.lifeCycleNum = num;
};
const checkSystemTheme = () => {
  const info = common_vendor.index.getAppBaseInfo();
  state.isDarkMode = info.hostTheme === "dark";
  common_vendor.index.onHostThemeChange((result) => {
    state.isDarkMode = result.hostTheme === "dark";
  });
};
exports.checkSystemTheme = checkSystemTheme;
exports.setLifeCycleNum = setLifeCycleNum;
exports.state = state;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map
