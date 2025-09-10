"use strict";
let ReportSuccess$1 = class ReportSuccess extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          errMsg: { type: String, optional: false }
        };
      },
      name: "ReportSuccess"
    };
  }
  constructor(options, metadata = ReportSuccess.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.errMsg = this.__props__.errMsg;
    delete this.__props__;
  }
};
let ReportOptions$1 = class ReportOptions extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          options: { type: "Any", optional: true },
          success: { type: "Unknown", optional: true },
          fail: { type: "Unknown", optional: true },
          complete: { type: "Unknown", optional: true }
        };
      },
      name: "ReportOptions"
    };
  }
  constructor(options, metadata = ReportOptions.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.options = this.__props__.options;
    this.success = this.__props__.success;
    this.fail = this.__props__.fail;
    this.complete = this.__props__.complete;
    delete this.__props__;
  }
};
let UniStatOptions$1 = class UniStatOptions extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          enable: { type: Boolean, optional: true },
          debug: { type: Boolean, optional: true },
          reportInterval: { type: Number, optional: true },
          uniCloud: { type: "Unknown", optional: true },
          collectItems: { type: UniStatCollectItemsOptions$1, optional: true }
        };
      },
      name: "UniStatOptions"
    };
  }
  constructor(options, metadata = UniStatOptions.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.enable = this.__props__.enable;
    this.debug = this.__props__.debug;
    this.reportInterval = this.__props__.reportInterval;
    this.uniCloud = this.__props__.uniCloud;
    this.collectItems = this.__props__.collectItems;
    delete this.__props__;
  }
};
let UniStatCollectItemsOptions$1 = class UniStatCollectItemsOptions extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          uniPushClientID: { type: Boolean, optional: true },
          uniStatPageLog: { type: Boolean, optional: true }
        };
      },
      name: "UniStatCollectItemsOptions"
    };
  }
  constructor(options, metadata = UniStatCollectItemsOptions.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.uniPushClientID = this.__props__.uniPushClientID;
    this.uniStatPageLog = this.__props__.uniStatPageLog;
    delete this.__props__;
  }
};
let OnLaunchOptionsWithCst$1 = class OnLaunchOptionsWithCst extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          path: { type: String, optional: true },
          cst: { type: Number, optional: true },
          scene: { type: Number, optional: true },
          query: { type: String, optional: true }
        };
      },
      name: "OnLaunchOptionsWithCst"
    };
  }
  constructor(options, metadata = OnLaunchOptionsWithCst.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.path = this.__props__.path;
    this.cst = this.__props__.cst;
    this.scene = this.__props__.scene;
    this.query = this.__props__.query;
    delete this.__props__;
  }
};
let ResidenceTimeReturn$1 = class ResidenceTimeReturn extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          residenceTime: { type: Number, optional: false },
          overtime: { type: Boolean, optional: false }
        };
      },
      name: "ResidenceTimeReturn"
    };
  }
  constructor(options, metadata = ResidenceTimeReturn.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.residenceTime = this.__props__.residenceTime;
    this.overtime = this.__props__.overtime;
    delete this.__props__;
  }
};
let RouteParams$1 = class RouteParams extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          path: { type: String, optional: false },
          fullpath: { type: String, optional: false }
        };
      },
      name: "RouteParams"
    };
  }
  constructor(options, metadata = RouteParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.path = this.__props__.path;
    this.fullpath = this.__props__.fullpath;
    delete this.__props__;
  }
};
let TitleConfigParams$1 = class TitleConfigParams extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          config: { type: String, optional: false },
          page: { type: String, optional: false },
          report: { type: String, optional: false },
          lt: { type: String, optional: false }
        };
      },
      name: "TitleConfigParams"
    };
  }
  constructor(options, metadata = TitleConfigParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.config = this.__props__.config;
    this.page = this.__props__.page;
    this.report = this.__props__.report;
    this.lt = this.__props__.lt;
    delete this.__props__;
  }
};
let PageParams$1 = class PageParams extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          url: { type: String, optional: true },
          ttpj: { type: String, optional: true },
          ttn: { type: String, optional: true },
          ttc: { type: String, optional: true },
          ttct: { type: String, optional: true },
          urlref: { type: String, optional: false },
          urlref_ts: { type: Number, optional: false },
          urlref_tt: { type: String, optional: true }
        };
      },
      name: "PageParams"
    };
  }
  constructor(options, metadata = PageParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.url = this.__props__.url;
    this.ttpj = this.__props__.ttpj;
    this.ttn = this.__props__.ttn;
    this.ttc = this.__props__.ttc;
    this.ttct = this.__props__.ttct;
    this.urlref = this.__props__.urlref;
    this.urlref_ts = this.__props__.urlref_ts;
    this.urlref_tt = this.__props__.urlref_tt;
    delete this.__props__;
  }
};
let RequestData$1 = class RequestData extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          usv: { type: String, optional: false },
          t: { type: Number, optional: false },
          requests: { type: String, optional: false }
        };
      },
      name: "RequestData"
    };
  }
  constructor(options, metadata = RequestData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.usv = this.__props__.usv;
    this.t = this.__props__.t;
    this.requests = this.__props__.requests;
    delete this.__props__;
  }
};
let CustomUnicloudConfig$1 = class CustomUnicloudConfig extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          spaceId: { type: String, optional: false },
          provider: { type: String, optional: false },
          clientSecret: { type: String, optional: true },
          secretKey: { type: String, optional: true },
          secretId: { type: String, optional: true }
        };
      },
      name: "CustomUnicloudConfig"
    };
  }
  constructor(options, metadata = CustomUnicloudConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.spaceId = this.__props__.spaceId;
    this.provider = this.__props__.provider;
    this.clientSecret = this.__props__.clientSecret;
    this.secretKey = this.__props__.secretKey;
    this.secretId = this.__props__.secretId;
    delete this.__props__;
  }
};
let EventParams$1 = class EventParams extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          key: { type: String, optional: false },
          value: { type: String, optional: true }
        };
      },
      name: "EventParams"
    };
  }
  constructor(options, metadata = EventParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.key = this.__props__.key;
    this.value = this.__props__.value;
    delete this.__props__;
  }
};
let StatDefault$1 = class StatDefault extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          uuid: { type: String, optional: false },
          ak: { type: String, optional: false },
          p: { type: String, optional: false },
          ut: { type: String, optional: false },
          mpn: { type: String, optional: true },
          usv: { type: String, optional: true },
          v: { type: String, optional: true },
          ch: { type: String, optional: true },
          cn: { type: String, optional: true },
          pn: { type: String, optional: true },
          ct: { type: String, optional: true },
          t: { type: Number, optional: true },
          tt: { type: String, optional: true },
          brand: { type: String, optional: true },
          md: { type: String, optional: true },
          sv: { type: String, optional: true },
          mpsdk: { type: String, optional: true },
          mpv: { type: String, optional: true },
          lang: { type: String, optional: true },
          pr: { type: Number, optional: true },
          ww: { type: Number, optional: true },
          wh: { type: Number, optional: true },
          sw: { type: Number, optional: true },
          sh: { type: Number, optional: true },
          sc: { type: Number, optional: true },
          lt: { type: String, optional: true },
          odid: { type: String, optional: true },
          url: { type: String, optional: true },
          fvts: { type: Number, optional: true },
          lvts: { type: Number, optional: true },
          tvc: { type: Number, optional: true },
          cst: { type: Number, optional: true },
          urlref_ts: { type: Number, optional: true },
          urlref: { type: String, optional: true },
          ttpj: { type: String, optional: true },
          ttn: { type: String, optional: true },
          ttc: { type: String, optional: true },
          ttct: { type: String, optional: true },
          cid: { type: String, optional: true },
          e_n: { type: String, optional: true },
          e_v: { type: String, optional: true },
          lat: { type: String, optional: true },
          lng: { type: String, optional: true },
          net: { type: String, optional: true },
          em: { type: String, optional: true },
          root: { type: Number, optional: true },
          pv: { type: String, optional: true },
          log: { type: String, optional: true },
          did: { type: String, optional: true },
          os: { type: String, optional: true }
        };
      },
      name: "StatDefault"
    };
  }
  constructor(options, metadata = StatDefault.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.uuid = this.__props__.uuid;
    this.ak = this.__props__.ak;
    this.p = this.__props__.p;
    this.ut = this.__props__.ut;
    this.mpn = this.__props__.mpn;
    this.usv = this.__props__.usv;
    this.v = this.__props__.v;
    this.ch = this.__props__.ch;
    this.cn = this.__props__.cn;
    this.pn = this.__props__.pn;
    this.ct = this.__props__.ct;
    this.t = this.__props__.t;
    this.tt = this.__props__.tt;
    this.brand = this.__props__.brand;
    this.md = this.__props__.md;
    this.sv = this.__props__.sv;
    this.mpsdk = this.__props__.mpsdk;
    this.mpv = this.__props__.mpv;
    this.lang = this.__props__.lang;
    this.pr = this.__props__.pr;
    this.ww = this.__props__.ww;
    this.wh = this.__props__.wh;
    this.sw = this.__props__.sw;
    this.sh = this.__props__.sh;
    this.sc = this.__props__.sc;
    this.lt = this.__props__.lt;
    this.odid = this.__props__.odid;
    this.url = this.__props__.url;
    this.fvts = this.__props__.fvts;
    this.lvts = this.__props__.lvts;
    this.tvc = this.__props__.tvc;
    this.cst = this.__props__.cst;
    this.urlref_ts = this.__props__.urlref_ts;
    this.urlref = this.__props__.urlref;
    this.ttpj = this.__props__.ttpj;
    this.ttn = this.__props__.ttn;
    this.ttc = this.__props__.ttc;
    this.ttct = this.__props__.ttct;
    this.cid = this.__props__.cid;
    this.e_n = this.__props__.e_n;
    this.e_v = this.__props__.e_v;
    this.lat = this.__props__.lat;
    this.lng = this.__props__.lng;
    this.net = this.__props__.net;
    this.em = this.__props__.em;
    this.root = this.__props__.root;
    this.pv = this.__props__.pv;
    this.log = this.__props__.log;
    this.did = this.__props__.did;
    this.os = this.__props__.os;
    delete this.__props__;
  }
};
let AppShowReportParams$1 = class AppShowReportParams extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          uuid: { type: String, optional: false },
          ak: { type: String, optional: false },
          lt: { type: String, optional: false },
          ut: { type: String, optional: false },
          mpsdk: { type: String, optional: false },
          mpv: { type: String, optional: false },
          mpn: { type: String, optional: false },
          v: { type: String, optional: false },
          p: { type: String, optional: false },
          sv: { type: String, optional: false },
          net: { type: String, optional: false },
          brand: { type: String, optional: false },
          md: { type: String, optional: false },
          lang: { type: String, optional: false },
          lat: { type: String, optional: false },
          lng: { type: String, optional: false },
          pr: { type: Number, optional: false },
          ww: { type: Number, optional: false },
          wh: { type: Number, optional: false },
          sw: { type: Number, optional: false },
          sh: { type: Number, optional: false },
          url: { type: String, optional: false },
          tt: { type: String, optional: false },
          ch: { type: String, optional: false },
          fvts: { type: Number, optional: false },
          lvts: { type: Number, optional: false },
          cn: { type: String, optional: false },
          pn: { type: String, optional: false },
          ct: { type: String, optional: false },
          sc: { type: Number, optional: false },
          tvc: { type: Number, optional: false },
          usv: { type: String, optional: false },
          t: { type: Number, optional: false },
          odid: { type: String, optional: false },
          cst: { type: Number, optional: false }
        };
      },
      name: "AppShowReportParams"
    };
  }
  constructor(options, metadata = AppShowReportParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.uuid = this.__props__.uuid;
    this.ak = this.__props__.ak;
    this.lt = this.__props__.lt;
    this.ut = this.__props__.ut;
    this.mpsdk = this.__props__.mpsdk;
    this.mpv = this.__props__.mpv;
    this.mpn = this.__props__.mpn;
    this.v = this.__props__.v;
    this.p = this.__props__.p;
    this.sv = this.__props__.sv;
    this.net = this.__props__.net;
    this.brand = this.__props__.brand;
    this.md = this.__props__.md;
    this.lang = this.__props__.lang;
    this.lat = this.__props__.lat;
    this.lng = this.__props__.lng;
    this.pr = this.__props__.pr;
    this.ww = this.__props__.ww;
    this.wh = this.__props__.wh;
    this.sw = this.__props__.sw;
    this.sh = this.__props__.sh;
    this.url = this.__props__.url;
    this.tt = this.__props__.tt;
    this.ch = this.__props__.ch;
    this.fvts = this.__props__.fvts;
    this.lvts = this.__props__.lvts;
    this.cn = this.__props__.cn;
    this.pn = this.__props__.pn;
    this.ct = this.__props__.ct;
    this.sc = this.__props__.sc;
    this.tvc = this.__props__.tvc;
    this.usv = this.__props__.usv;
    this.t = this.__props__.t;
    this.odid = this.__props__.odid;
    this.cst = this.__props__.cst;
    delete this.__props__;
  }
};
let AppHideReportParams$1 = class AppHideReportParams extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          ak: { type: String, optional: false },
          uuid: { type: String, optional: false },
          lt: { type: String, optional: false },
          ut: { type: String, optional: false },
          p: { type: String, optional: false },
          urlref: { type: String, optional: false },
          urlref_ts: { type: Number, optional: false },
          ch: { type: String, optional: false },
          usv: { type: String, optional: false },
          t: { type: Number, optional: false }
        };
      },
      name: "AppHideReportParams"
    };
  }
  constructor(options, metadata = AppHideReportParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.ak = this.__props__.ak;
    this.uuid = this.__props__.uuid;
    this.lt = this.__props__.lt;
    this.ut = this.__props__.ut;
    this.p = this.__props__.p;
    this.urlref = this.__props__.urlref;
    this.urlref_ts = this.__props__.urlref_ts;
    this.ch = this.__props__.ch;
    this.usv = this.__props__.usv;
    this.t = this.__props__.t;
    delete this.__props__;
  }
};
let PageReportParams$1 = class PageReportParams extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          ak: { type: String, optional: false },
          uuid: { type: String, optional: false },
          lt: { type: String, optional: false },
          ut: { type: String, optional: false },
          p: { type: String, optional: false },
          url: { type: String, optional: false },
          ttpj: { type: String, optional: false },
          ttn: { type: String, optional: false },
          ttc: { type: String, optional: false },
          ttct: { type: String, optional: false },
          urlref: { type: String, optional: false },
          urlref_ts: { type: Number, optional: false },
          ch: { type: String, optional: false },
          usv: { type: String, optional: false },
          t: { type: Number, optional: false },
          cst: { type: Number, optional: true }
        };
      },
      name: "PageReportParams"
    };
  }
  constructor(options, metadata = PageReportParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.ak = this.__props__.ak;
    this.uuid = this.__props__.uuid;
    this.lt = this.__props__.lt;
    this.ut = this.__props__.ut;
    this.p = this.__props__.p;
    this.url = this.__props__.url;
    this.ttpj = this.__props__.ttpj;
    this.ttn = this.__props__.ttn;
    this.ttc = this.__props__.ttc;
    this.ttct = this.__props__.ttct;
    this.urlref = this.__props__.urlref;
    this.urlref_ts = this.__props__.urlref_ts;
    this.ch = this.__props__.ch;
    this.usv = this.__props__.usv;
    this.t = this.__props__.t;
    this.cst = this.__props__.cst;
    delete this.__props__;
  }
};
class ReportSuccess2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          errMsg: { type: String, optional: false }
        };
      },
      name: "ReportSuccess"
    };
  }
  constructor(options, metadata = ReportSuccess2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.errMsg = this.__props__.errMsg;
    delete this.__props__;
  }
}
class ReportOptions2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          name: { type: String, optional: false },
          options: { type: "Any", optional: true },
          success: { type: "Unknown", optional: true },
          fail: { type: "Unknown", optional: true },
          complete: { type: "Unknown", optional: true }
        };
      },
      name: "ReportOptions"
    };
  }
  constructor(options, metadata = ReportOptions2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.name = this.__props__.name;
    this.options = this.__props__.options;
    this.success = this.__props__.success;
    this.fail = this.__props__.fail;
    this.complete = this.__props__.complete;
    delete this.__props__;
  }
}
class UniStatOptions2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          enable: { type: Boolean, optional: true },
          debug: { type: Boolean, optional: true },
          reportInterval: { type: Number, optional: true },
          uniCloud: { type: "Unknown", optional: true },
          collectItems: { type: UniStatCollectItemsOptions2, optional: true }
        };
      },
      name: "UniStatOptions"
    };
  }
  constructor(options, metadata = UniStatOptions2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.enable = this.__props__.enable;
    this.debug = this.__props__.debug;
    this.reportInterval = this.__props__.reportInterval;
    this.uniCloud = this.__props__.uniCloud;
    this.collectItems = this.__props__.collectItems;
    delete this.__props__;
  }
}
class UniStatCollectItemsOptions2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          uniPushClientID: { type: Boolean, optional: true },
          uniStatPageLog: { type: Boolean, optional: true }
        };
      },
      name: "UniStatCollectItemsOptions"
    };
  }
  constructor(options, metadata = UniStatCollectItemsOptions2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.uniPushClientID = this.__props__.uniPushClientID;
    this.uniStatPageLog = this.__props__.uniStatPageLog;
    delete this.__props__;
  }
}
class OnLaunchOptionsWithCst2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          path: { type: String, optional: true },
          cst: { type: Number, optional: true },
          scene: { type: Number, optional: true },
          query: { type: String, optional: true }
        };
      },
      name: "OnLaunchOptionsWithCst"
    };
  }
  constructor(options, metadata = OnLaunchOptionsWithCst2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.path = this.__props__.path;
    this.cst = this.__props__.cst;
    this.scene = this.__props__.scene;
    this.query = this.__props__.query;
    delete this.__props__;
  }
}
class ResidenceTimeReturn2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          residenceTime: { type: Number, optional: false },
          overtime: { type: Boolean, optional: false }
        };
      },
      name: "ResidenceTimeReturn"
    };
  }
  constructor(options, metadata = ResidenceTimeReturn2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.residenceTime = this.__props__.residenceTime;
    this.overtime = this.__props__.overtime;
    delete this.__props__;
  }
}
class RouteParams2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          path: { type: String, optional: false },
          fullpath: { type: String, optional: false }
        };
      },
      name: "RouteParams"
    };
  }
  constructor(options, metadata = RouteParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.path = this.__props__.path;
    this.fullpath = this.__props__.fullpath;
    delete this.__props__;
  }
}
class TitleConfigParams2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          config: { type: String, optional: false },
          page: { type: String, optional: false },
          report: { type: String, optional: false },
          lt: { type: String, optional: false }
        };
      },
      name: "TitleConfigParams"
    };
  }
  constructor(options, metadata = TitleConfigParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.config = this.__props__.config;
    this.page = this.__props__.page;
    this.report = this.__props__.report;
    this.lt = this.__props__.lt;
    delete this.__props__;
  }
}
class PageParams2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          url: { type: String, optional: true },
          ttpj: { type: String, optional: true },
          ttn: { type: String, optional: true },
          ttc: { type: String, optional: true },
          ttct: { type: String, optional: true },
          urlref: { type: String, optional: false },
          urlref_ts: { type: Number, optional: false },
          urlref_tt: { type: String, optional: true }
        };
      },
      name: "PageParams"
    };
  }
  constructor(options, metadata = PageParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.url = this.__props__.url;
    this.ttpj = this.__props__.ttpj;
    this.ttn = this.__props__.ttn;
    this.ttc = this.__props__.ttc;
    this.ttct = this.__props__.ttct;
    this.urlref = this.__props__.urlref;
    this.urlref_ts = this.__props__.urlref_ts;
    this.urlref_tt = this.__props__.urlref_tt;
    delete this.__props__;
  }
}
class RequestData2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          usv: { type: String, optional: false },
          t: { type: Number, optional: false },
          requests: { type: String, optional: false }
        };
      },
      name: "RequestData"
    };
  }
  constructor(options, metadata = RequestData2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.usv = this.__props__.usv;
    this.t = this.__props__.t;
    this.requests = this.__props__.requests;
    delete this.__props__;
  }
}
class CustomUnicloudConfig2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          spaceId: { type: String, optional: false },
          provider: { type: String, optional: false },
          clientSecret: { type: String, optional: true },
          secretKey: { type: String, optional: true },
          secretId: { type: String, optional: true }
        };
      },
      name: "CustomUnicloudConfig"
    };
  }
  constructor(options, metadata = CustomUnicloudConfig2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.spaceId = this.__props__.spaceId;
    this.provider = this.__props__.provider;
    this.clientSecret = this.__props__.clientSecret;
    this.secretKey = this.__props__.secretKey;
    this.secretId = this.__props__.secretId;
    delete this.__props__;
  }
}
class EventParams2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          key: { type: String, optional: false },
          value: { type: String, optional: true }
        };
      },
      name: "EventParams"
    };
  }
  constructor(options, metadata = EventParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.key = this.__props__.key;
    this.value = this.__props__.value;
    delete this.__props__;
  }
}
class StatDefault2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          uuid: { type: String, optional: false },
          ak: { type: String, optional: false },
          p: { type: String, optional: false },
          ut: { type: String, optional: false },
          mpn: { type: String, optional: true },
          usv: { type: String, optional: true },
          v: { type: String, optional: true },
          ch: { type: String, optional: true },
          cn: { type: String, optional: true },
          pn: { type: String, optional: true },
          ct: { type: String, optional: true },
          t: { type: Number, optional: true },
          tt: { type: String, optional: true },
          brand: { type: String, optional: true },
          md: { type: String, optional: true },
          sv: { type: String, optional: true },
          mpsdk: { type: String, optional: true },
          mpv: { type: String, optional: true },
          lang: { type: String, optional: true },
          pr: { type: Number, optional: true },
          ww: { type: Number, optional: true },
          wh: { type: Number, optional: true },
          sw: { type: Number, optional: true },
          sh: { type: Number, optional: true },
          sc: { type: Number, optional: true },
          lt: { type: String, optional: true },
          odid: { type: String, optional: true },
          url: { type: String, optional: true },
          fvts: { type: Number, optional: true },
          lvts: { type: Number, optional: true },
          tvc: { type: Number, optional: true },
          cst: { type: Number, optional: true },
          urlref_ts: { type: Number, optional: true },
          urlref: { type: String, optional: true },
          ttpj: { type: String, optional: true },
          ttn: { type: String, optional: true },
          ttc: { type: String, optional: true },
          ttct: { type: String, optional: true },
          cid: { type: String, optional: true },
          e_n: { type: String, optional: true },
          e_v: { type: String, optional: true },
          lat: { type: String, optional: true },
          lng: { type: String, optional: true },
          net: { type: String, optional: true },
          em: { type: String, optional: true },
          root: { type: Number, optional: true },
          pv: { type: String, optional: true },
          log: { type: String, optional: true },
          did: { type: String, optional: true },
          os: { type: String, optional: true }
        };
      },
      name: "StatDefault"
    };
  }
  constructor(options, metadata = StatDefault2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.uuid = this.__props__.uuid;
    this.ak = this.__props__.ak;
    this.p = this.__props__.p;
    this.ut = this.__props__.ut;
    this.mpn = this.__props__.mpn;
    this.usv = this.__props__.usv;
    this.v = this.__props__.v;
    this.ch = this.__props__.ch;
    this.cn = this.__props__.cn;
    this.pn = this.__props__.pn;
    this.ct = this.__props__.ct;
    this.t = this.__props__.t;
    this.tt = this.__props__.tt;
    this.brand = this.__props__.brand;
    this.md = this.__props__.md;
    this.sv = this.__props__.sv;
    this.mpsdk = this.__props__.mpsdk;
    this.mpv = this.__props__.mpv;
    this.lang = this.__props__.lang;
    this.pr = this.__props__.pr;
    this.ww = this.__props__.ww;
    this.wh = this.__props__.wh;
    this.sw = this.__props__.sw;
    this.sh = this.__props__.sh;
    this.sc = this.__props__.sc;
    this.lt = this.__props__.lt;
    this.odid = this.__props__.odid;
    this.url = this.__props__.url;
    this.fvts = this.__props__.fvts;
    this.lvts = this.__props__.lvts;
    this.tvc = this.__props__.tvc;
    this.cst = this.__props__.cst;
    this.urlref_ts = this.__props__.urlref_ts;
    this.urlref = this.__props__.urlref;
    this.ttpj = this.__props__.ttpj;
    this.ttn = this.__props__.ttn;
    this.ttc = this.__props__.ttc;
    this.ttct = this.__props__.ttct;
    this.cid = this.__props__.cid;
    this.e_n = this.__props__.e_n;
    this.e_v = this.__props__.e_v;
    this.lat = this.__props__.lat;
    this.lng = this.__props__.lng;
    this.net = this.__props__.net;
    this.em = this.__props__.em;
    this.root = this.__props__.root;
    this.pv = this.__props__.pv;
    this.log = this.__props__.log;
    this.did = this.__props__.did;
    this.os = this.__props__.os;
    delete this.__props__;
  }
}
class AppShowReportParams2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          uuid: { type: String, optional: false },
          ak: { type: String, optional: false },
          lt: { type: String, optional: false },
          ut: { type: String, optional: false },
          mpsdk: { type: String, optional: false },
          mpv: { type: String, optional: false },
          mpn: { type: String, optional: false },
          v: { type: String, optional: false },
          p: { type: String, optional: false },
          sv: { type: String, optional: false },
          net: { type: String, optional: false },
          brand: { type: String, optional: false },
          md: { type: String, optional: false },
          lang: { type: String, optional: false },
          lat: { type: String, optional: false },
          lng: { type: String, optional: false },
          pr: { type: Number, optional: false },
          ww: { type: Number, optional: false },
          wh: { type: Number, optional: false },
          sw: { type: Number, optional: false },
          sh: { type: Number, optional: false },
          url: { type: String, optional: false },
          tt: { type: String, optional: false },
          ch: { type: String, optional: false },
          fvts: { type: Number, optional: false },
          lvts: { type: Number, optional: false },
          cn: { type: String, optional: false },
          pn: { type: String, optional: false },
          ct: { type: String, optional: false },
          sc: { type: Number, optional: false },
          tvc: { type: Number, optional: false },
          usv: { type: String, optional: false },
          t: { type: Number, optional: false },
          odid: { type: String, optional: false },
          cst: { type: Number, optional: false }
        };
      },
      name: "AppShowReportParams"
    };
  }
  constructor(options, metadata = AppShowReportParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.uuid = this.__props__.uuid;
    this.ak = this.__props__.ak;
    this.lt = this.__props__.lt;
    this.ut = this.__props__.ut;
    this.mpsdk = this.__props__.mpsdk;
    this.mpv = this.__props__.mpv;
    this.mpn = this.__props__.mpn;
    this.v = this.__props__.v;
    this.p = this.__props__.p;
    this.sv = this.__props__.sv;
    this.net = this.__props__.net;
    this.brand = this.__props__.brand;
    this.md = this.__props__.md;
    this.lang = this.__props__.lang;
    this.lat = this.__props__.lat;
    this.lng = this.__props__.lng;
    this.pr = this.__props__.pr;
    this.ww = this.__props__.ww;
    this.wh = this.__props__.wh;
    this.sw = this.__props__.sw;
    this.sh = this.__props__.sh;
    this.url = this.__props__.url;
    this.tt = this.__props__.tt;
    this.ch = this.__props__.ch;
    this.fvts = this.__props__.fvts;
    this.lvts = this.__props__.lvts;
    this.cn = this.__props__.cn;
    this.pn = this.__props__.pn;
    this.ct = this.__props__.ct;
    this.sc = this.__props__.sc;
    this.tvc = this.__props__.tvc;
    this.usv = this.__props__.usv;
    this.t = this.__props__.t;
    this.odid = this.__props__.odid;
    this.cst = this.__props__.cst;
    delete this.__props__;
  }
}
class AppHideReportParams2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          ak: { type: String, optional: false },
          uuid: { type: String, optional: false },
          lt: { type: String, optional: false },
          ut: { type: String, optional: false },
          p: { type: String, optional: false },
          urlref: { type: String, optional: false },
          urlref_ts: { type: Number, optional: false },
          ch: { type: String, optional: false },
          usv: { type: String, optional: false },
          t: { type: Number, optional: false }
        };
      },
      name: "AppHideReportParams"
    };
  }
  constructor(options, metadata = AppHideReportParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.ak = this.__props__.ak;
    this.uuid = this.__props__.uuid;
    this.lt = this.__props__.lt;
    this.ut = this.__props__.ut;
    this.p = this.__props__.p;
    this.urlref = this.__props__.urlref;
    this.urlref_ts = this.__props__.urlref_ts;
    this.ch = this.__props__.ch;
    this.usv = this.__props__.usv;
    this.t = this.__props__.t;
    delete this.__props__;
  }
}
class PageReportParams2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          ak: { type: String, optional: false },
          uuid: { type: String, optional: false },
          lt: { type: String, optional: false },
          ut: { type: String, optional: false },
          p: { type: String, optional: false },
          url: { type: String, optional: false },
          ttpj: { type: String, optional: false },
          ttn: { type: String, optional: false },
          ttc: { type: String, optional: false },
          ttct: { type: String, optional: false },
          urlref: { type: String, optional: false },
          urlref_ts: { type: Number, optional: false },
          ch: { type: String, optional: false },
          usv: { type: String, optional: false },
          t: { type: Number, optional: false },
          cst: { type: Number, optional: true }
        };
      },
      name: "PageReportParams"
    };
  }
  constructor(options, metadata = PageReportParams2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.ak = this.__props__.ak;
    this.uuid = this.__props__.uuid;
    this.lt = this.__props__.lt;
    this.ut = this.__props__.ut;
    this.p = this.__props__.p;
    this.url = this.__props__.url;
    this.ttpj = this.__props__.ttpj;
    this.ttn = this.__props__.ttn;
    this.ttc = this.__props__.ttc;
    this.ttct = this.__props__.ttct;
    this.urlref = this.__props__.urlref;
    this.urlref_ts = this.__props__.urlref_ts;
    this.ch = this.__props__.ch;
    this.usv = this.__props__.usv;
    this.t = this.__props__.t;
    this.cst = this.__props__.cst;
    delete this.__props__;
  }
}
exports.EventParams = EventParams$1;
exports.PageParams = PageParams$1;
exports.ReportOptions = ReportOptions2;
exports.ReportSuccess = ReportSuccess$1;
exports.RequestData = RequestData$1;
exports.ResidenceTimeReturn = ResidenceTimeReturn$1;
exports.RouteParams = RouteParams$1;
exports.StatDefault = StatDefault$1;
exports.TitleConfigParams = TitleConfigParams$1;
exports.UniStatCollectItemsOptions = UniStatCollectItemsOptions$1;
exports.UniStatOptions = UniStatOptions$1;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/uni-stat/utssdk/interface.js.map
