"use strict";
class StatType {
}
StatType.LifeCycleLaunch = 1;
StatType.LifeCycleLoad = 2;
StatType.LifeCycleAppShow = 3;
StatType.LifeCycleAppHide = 4;
StatType.LifeCyclePageShow = 5;
StatType.LifeCyclePageHide = 6;
StatType.LifeCyclePageUnLoad = 7;
StatType.LifeCycleError = 8;
StatType.Crash = 9;
class ReportType {
}
ReportType.AppStart = "1";
ReportType.AppShow = "2";
ReportType.AppHide = "3";
ReportType.AppExit = "4";
ReportType.PageShow = "11";
ReportType.PageHide = "12";
ReportType.Event = "21";
ReportType.Error = "31";
ReportType.Push = "101";
class ReprotCstType {
}
ReprotCstType.AppNormal = 1;
ReprotCstType.AppAwakenTimeout = 2;
ReprotCstType.PageStayTimeout = 3;
const AppShowParamsKeys = ["uuid", "ak", "lt", "ut", "mpsdk", "mpv", "mpn", "v", "p", "sv", "net", "brand", "md", "lang", "lat", "lng", "pr", "ww", "wh", "sw", "sh", "url", "tt", "ch", "fvts", "lvts", "cn", "pn", "ct", "sc", "tvc", "usv", "t", "odid", "cst"];
const AppHideParamsKeys = ["ak", "uuid", "ttn", "ttpj", "ttc", "lt", "ut", "p", "urlref", "urlref_ts", "ch", "usv", "t"];
const PageShowParamsKeys = ["ak", "uuid", "lt", "ut", "p", "url", "ttpj", "ttn", "ttc", "ttct", "urlref", "urlref_ts", "ch", "usv", "t"];
const PushParamsKeys = ["lt", "cid", "t", "ut"];
const EventParamsKeys = ["ak", "uuid", "p", "lt", "ut", "url", "ch", "e_n", "e_v", "usv", "t"];
const ErrorParamsKeys = ["ak", "uuid", "p", "lt", "url", "ut", "ch", "mpsdk", "mpv", "v", "em", "usv", "t"];
const CrashParamsKeys = ["lt", "ak", "v", "ut", "p", "ch", "mpsdk", "did", "net", "os", "sv", "brand", "md", "root", "pn", "pv", "log"];
exports.AppHideParamsKeys = AppHideParamsKeys;
exports.AppShowParamsKeys = AppShowParamsKeys;
exports.CrashParamsKeys = CrashParamsKeys;
exports.ErrorParamsKeys = ErrorParamsKeys;
exports.EventParamsKeys = EventParamsKeys;
exports.PageShowParamsKeys = PageShowParamsKeys;
exports.PushParamsKeys = PushParamsKeys;
exports.ReportType = ReportType;
exports.ReprotCstType = ReprotCstType;
exports.StatType = StatType;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/common/core/stat-type.js.map
