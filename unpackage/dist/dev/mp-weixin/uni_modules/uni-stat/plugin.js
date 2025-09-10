"use strict";
require("./utssdk/index.js");
require("../../common/vendor.js");
const uni_modules_uniStat_utssdk_common_core_stat = require("./utssdk/common/core/stat.js");
const stat_instance = uni_modules_uniStat_utssdk_common_core_stat.Stat.getInstance();
const lifecycle = new UTSJSONObject({
  // onLaunch(options : OnLaunchOptions) { stat_instance.onLaunch(options, this) },
  // @ts-ignore
  onLoad() {
    stat_instance.onLoad(this);
  },
  // @ts-ignore
  onShow() {
    stat_instance.onShow(this);
  },
  // @ts-ignore
  onHide() {
    stat_instance.onHide(this);
  },
  // @ts-ignore
  onUnload() {
    stat_instance.onUnload(this);
  }
  // onError(error : string) { stat_instance.onError(error) }
});
const uniStat = new UTSJSONObject({
  install(app = null, options) {
    if (uni_modules_uniStat_utssdk_common_core_stat.Stat.no_space && (options.enable == null || options.enable == true))
      return null;
    stat_instance.init(options);
    app.mixin(lifecycle);
  }
});
exports.uniStat = uniStat;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/uni_modules/uni-stat/plugin.js.map
