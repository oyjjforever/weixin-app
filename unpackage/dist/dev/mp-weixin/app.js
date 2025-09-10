"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./test-main-console.js");
const uni_modules_uniStat_plugin = require("./uni_modules/uni-stat/plugin.js");
const uni_modules_uniStat_utssdk_interface = require("./uni_modules/uni-stat/utssdk/interface.js");
const store_index = require("./store/index.js");
const uni_modules_uniStat_utssdk_index = require("./uni_modules/uni-stat/utssdk/index.js");
if (!Math) {
  "./pages/template/food-recipe/food-recipe.js";
}
const _sfc_main = common_vendor.defineComponent(new UTSJSONObject({
  globalData: new UTSJSONObject({
    str: "default globalData str",
    num: 0,
    bool: false,
    obj: new UTSJSONObject({
      str: "default globalData obj str",
      num: 0,
      bool: false
    }),
    null: null,
    arr: [],
    mySet: /* @__PURE__ */ new Set(),
    myMap: /* @__PURE__ */ new Map(),
    func: () => {
      return "globalData func";
    },
    launchOptions: {
      path: ""
    },
    onShowOption: {
      path: ""
    }
  }),
  onLaunch: function(res) {
    this.globalData.launchOptions = res;
    store_index.setLifeCycleNum(store_index.state.lifeCycleNum + 1e3);
    common_vendor.index.__f__("log", "at App.uvue:37", "App Launch");
    uni_modules_uniStat_utssdk_index.report(new uni_modules_uniStat_utssdk_interface.ReportOptions({
      name: "uni-app-launch",
      options: res,
      success(res_data) {
        common_vendor.index.__f__("log", "at App.uvue:55", res_data);
      },
      fail(err) {
        common_vendor.index.__f__("log", "at App.uvue:57", err);
      }
    }));
    store_index.checkSystemTheme();
  },
  onShow: function(res) {
    this.globalData.onShowOption = res;
    let url = this.getRedirectUrl(res.appScheme, res.appLink);
    if (null != url) {
      common_vendor.index.navigateTo({
        url
      });
    }
    store_index.setLifeCycleNum(store_index.state.lifeCycleNum + 100);
    common_vendor.index.__f__("log", "at App.uvue:103", "App Show");
    uni_modules_uniStat_utssdk_index.report(new uni_modules_uniStat_utssdk_interface.ReportOptions({
      name: "uni-app-show",
      success(res_data) {
        common_vendor.index.__f__("log", "at App.uvue:110", res_data);
      },
      fail(err) {
        common_vendor.index.__f__("log", "at App.uvue:112", err);
      }
    }));
  },
  onHide: function() {
    store_index.setLifeCycleNum(store_index.state.lifeCycleNum - 100);
    common_vendor.index.__f__("log", "at App.uvue:120", "App Hide");
    uni_modules_uniStat_utssdk_index.report(new uni_modules_uniStat_utssdk_interface.ReportOptions({
      name: "uni-app-hide",
      success(res) {
        common_vendor.index.__f__("log", "at App.uvue:127", res);
      },
      fail(err) {
        common_vendor.index.__f__("log", "at App.uvue:129", err);
      }
    }));
  },
  onError(err = null) {
    uni_modules_uniStat_utssdk_index.report(new uni_modules_uniStat_utssdk_interface.ReportOptions({
      name: "uni-app-error",
      options: err,
      success(res) {
        common_vendor.index.__f__("log", "at App.uvue:165", res);
      },
      fail(err2) {
        common_vendor.index.__f__("log", "at App.uvue:167", err2);
      }
    }));
  },
  methods: new UTSJSONObject({
    increasetLifeCycleNum() {
      store_index.setLifeCycleNum(store_index.state.lifeCycleNum + 100);
      common_vendor.index.__f__("log", "at App.uvue:175", "App increasetLifeCycleNum");
    },
    getRedirectUrl(scheme = null, ulink = null) {
      let url = null;
      if (null != scheme && scheme.length > 0) {
        const PATHPRE = "redirect";
        let parts = null;
        let pos = scheme.search("//");
        if (pos > 0) {
          parts = scheme.substring(pos + 2);
        }
        if (null != parts && parts.startsWith(PATHPRE)) {
          url = parts.substring(PATHPRE.length);
        }
      } else if (null != ulink && ulink.length > 0) {
        const PATH = "ulink/redirect.html";
        let parts = ulink.split("?");
        if (parts.length > 1 && parts[0].endsWith(PATH) && parts[1].length > 0) {
          parts[1].split("&").forEach((e) => {
            let params = e.split("=");
            if (params.length > 1 && params[0].length > 0 && params[1].length > 0) {
              if ("url" == params[0]) {
                if (null == url) {
                  url = decodeURIComponent(params[1]);
                }
              }
            }
          });
        }
      }
      return url;
    }
  })
}));
const uniStatcollectItems = new UTSJSONObject({
  uniStatPageLog: true
});
const uniStatOptions = new UTSJSONObject({
  debug: false,
  collectItems: uniStatcollectItems
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(uni_modules_uniStat_plugin.uniStat, uniStatOptions);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
