"use strict";
const uni_modules_uniStat_utssdk_interface = require("./interface.js");
const uni_modules_uniStat_utssdk_unierror = require("./unierror.js");
const uni_modules_uniStat_utssdk_common_core_stat = require("./common/core/stat.js");
const stat = uni_modules_uniStat_utssdk_common_core_stat.Stat.getInstance();
const report = function(options) {
  const name = options.name;
  const option = options.options;
  stat.appEvent(name, option, (type, code) => {
    var _a, _b, _c, _d;
    if (type) {
      const res = new uni_modules_uniStat_utssdk_interface.ReportSuccess({
        errMsg: "report:ok"
      });
      (_a = options.success) === null || _a === void 0 ? null : _a.call(options, res);
      (_b = options.complete) === null || _b === void 0 ? null : _b.call(options, res);
    } else {
      let err = new uni_modules_uniStat_utssdk_unierror.ReportFailImpl(code);
      (_c = options.fail) === null || _c === void 0 ? null : _c.call(options, err);
      (_d = options.complete) === null || _d === void 0 ? null : _d.call(options, err);
    }
  });
};
exports.report = report;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/index.js.map
