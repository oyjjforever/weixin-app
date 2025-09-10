"use strict";
require("./interface.js");
const ReportUniErrorSubject = "uni-report";
const ReportUniErrors = /* @__PURE__ */ new Map([
  /**
   * 已集成uni统计，但未关联服务空间
   */
  [61e3, "应用已集成uni统计，但未关联服务空间，请在uniCloud目录右键关联服务空间!"],
  /**
   * 统计已集成，但未初始化
   */
  [61001, "统计服务尚未初始化，请在main.uts中引入统计插件！"],
  /**
   * 调用失败
   */
  [61002, "uni-app-launch 下 options 参数必填，请检查！"],
  [61003, "Report的 name参数必填"],
  [61004, "Report的name参数类型必须为字符串"],
  [61005, "Report的name参数长度最大为255"],
  [61006, "Report的options参数只能为String或者Object类型"],
  [61007, "Report的options参数若为String类型，则长度最大为255"],
  [61008, "Report的name参数为title时，options参数类型只能为String"]
]);
class ReportFailImpl extends UniError {
  constructor(errCode) {
    var _a;
    super();
    this.errSubject = ReportUniErrorSubject;
    this.errCode = errCode;
    this.errMsg = (_a = UTS.mapGet(ReportUniErrors, errCode)) !== null && _a !== void 0 ? _a : "";
  }
}
exports.ReportFailImpl = ReportFailImpl;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/unierror.js.map
