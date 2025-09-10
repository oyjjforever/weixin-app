"use strict";
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return expectsLowerCase ? (val) => set2.has(val.toLowerCase()) : (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s2 = str ? `on${capitalize(str)}` : ``;
  return s2;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
function normalizeStyle$1(value) {
  if (isArray(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle$1(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i2) => {
          entries[stringifySymbol(key, i2) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v2) => stringifySymbol(v2))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v2, i2 = "") => {
  var _a;
  return isSymbol(v2) ? `Symbol(${(_a = v2.description) != null ? _a : i2})` : v2;
};
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_SHARE_CHAT = "onShareChat";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const VIRTUAL_HOST_STYLE = "virtualHostStyle";
const VIRTUAL_HOST_CLASS = "virtualHostClass";
const VIRTUAL_HOST_HIDDEN = "virtualHostHidden";
const VIRTUAL_HOST_ID = "virtualHostId";
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject$1(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
function getGlobalOnce() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  function g2() {
    return this;
  }
  if (typeof g2() !== "undefined") {
    return g2();
  }
  return function() {
    return new Function("return this")();
  }();
}
let g$1 = void 0;
function getGlobal$1() {
  if (g$1) {
    return g$1;
  }
  g$1 = getGlobalOnce();
  return g$1;
}
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function normalizeStyle(value) {
  const g2 = getGlobal$1();
  if (g2 && g2.UTSJSONObject && value instanceof g2.UTSJSONObject) {
    const styleObject = {};
    g2.UTSJSONObject.keys(value).forEach((key) => {
      styleObject[key] = value[key];
    });
    return normalizeStyle$1(styleObject);
  } else if (value instanceof Map) {
    const styleObject = {};
    value.forEach((value2, key) => {
      styleObject[key] = value2;
    });
    return normalizeStyle$1(styleObject);
  } else if (isString(value)) {
    return parseStringStyle(value);
  } else if (isArray(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else {
    return normalizeStyle$1(value);
  }
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$1(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  return createErrorHandler2(app);
});
const E = function() {
};
E.prototype = {
  _id: 1,
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx,
      _id: this._id
    });
    return this._id++;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len = evtArr.length;
    for (i2; i2 < len; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, event) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && event) {
      for (var i2 = evts.length - 1; i2 >= 0; i2--) {
        if (evts[i2].fn === event || evts[i2].fn._ === event || evts[i2]._id === event) {
          evts.splice(i2, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i2 = 0; i2 < this._depsLength; i2++) {
        const dep = this.deps[i2];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v2) {
    this._dirtyLevel = v2 ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i2 = effect2._depsLength; i2 < effect2.deps.length; i2++) {
      cleanupDepEffect(effect2.deps[i2], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key
      }
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v2) {
    this.effect.dirty = v2;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a2) => {
          var _a, _b;
          return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue$1.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i2 = queue$1.indexOf(job);
  if (i2 > flushIndex) {
    queue$1.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i2 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i2 < queue$1.length; i2++) {
    const cb = queue$1[i2];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue$1.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a2, b2) => getId(a2) - getId(b2)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b2) => {
  const diff2 = getId(a2) - getId(b2);
  if (diff2 === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, depth, currentDepth, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i2) => i2.__$el || (i2.__$el = {}),
    $data: (i2) => i2.data,
    $props: (i2) => shallowReadonly(i2.props),
    $attrs: (i2) => shallowReadonly(i2.attrs),
    $slots: (i2) => shallowReadonly(i2.slots),
    $refs: (i2) => shallowReadonly(i2.refs),
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => {
      i2.effect.dirty = true;
      queueJob(i2.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  function initInjections() {
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
  }
  {
    initInjections();
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  function initProvides() {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    initProvides();
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v2) => injected.value = v2
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext() && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue$1(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue$1(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue$1(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue$1(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType$2(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a2, b2) {
  return getType$2(a2) === getType$2(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp$1(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp$1(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType$1(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage$1(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$2(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null,
    // fixed by xxxxxx 用于存储uni-app的元素缓存
    $uniElements: /* @__PURE__ */ new Map(),
    $templateUniElementRefs: [],
    $templateUniElementStyles: {},
    $eS: {},
    $eA: {}
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i2) => {
    currentInstance = i2;
  };
  setInSSRSetupState = (v2) => {
    isInSSRComponentSetup = v2;
  };
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions$1(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i2 = getCurrentInstance();
    if (i2 && i2.appContext.config.warnRecursiveComputed) {
      c2._warnRecursive = true;
    }
  }
  return c2;
};
const version = "3.4.21";
const warn = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v2) {
  result[k] = v2;
}
function hasComponentEffect(instance) {
  return queue$1.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i2 = 0; i2 < len; i2++) {
        copy[i2] = clone(src[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  data.$eS = instance.$eS || {};
  data.$eA = instance.$eA || {};
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(
    options,
    instance,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    $templateUniElementRefs,
    ctx: { $scope, $mpPlatform }
  } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$scope || !$templateRefs && !$templateUniElementRefs) {
    return;
  }
  if (isUnmount) {
    $templateRefs && $templateRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    $templateUniElementRefs && $templateUniElementRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    return;
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    if (refs.length === 0) {
      return [];
    }
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    if ($templateRefs) {
      const refs = doSetByRefs($templateRefs);
      if (refs.length && instance.proxy && instance.proxy.$scope) {
        instance.proxy.$scope.setData({ r1: 1 }, () => {
          doSetByRefs(refs);
        });
      }
    }
  };
  if ($templateUniElementRefs && $templateUniElementRefs.length) {
    nextTick(instance, () => {
      $templateUniElementRefs.forEach((templateRef) => {
        if (isArray(templateRef.v)) {
          templateRef.v.forEach((v2) => {
            setTemplateRef(templateRef, v2, setupState);
          });
        } else {
          setTemplateRef(templateRef, templateRef.v, setupState);
        }
      });
    });
  }
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          if (refValue.$) {
            onBeforeUnmount(() => remove(existing, refValue), refValue.$);
          }
        }
      } else if (_isString) {
        if (hasOwn(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance;
  instance.$uniElementIds = /* @__PURE__ */ new Map();
  instance.$templateRefs = [];
  instance.$templateUniElementRefs = [];
  instance.$templateUniElementStyles = {};
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props,
        setupState,
        data,
        ctx
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter(
      (key) => key !== "class" && key !== "style"
    );
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(
        data,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance
  );
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u: u2 } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u2) {
        queuePostRenderEffect(u2);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    NOOP,
    () => queueJob(update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  {
    update();
  }
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  {
    const parentInstance = instance.parent;
    if (parentInstance) {
      const $children = parentInstance.ctx.$children;
      const target = getExposeProxy(instance) || instance.proxy;
      const index2 = $children.indexOf(target);
      if (index2 > -1) {
        $children.splice(index2, 1);
      }
    }
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  const userErrorHandler = app.config.errorHandler;
  return function errorHandler(err, instance, info) {
    if (userErrorHandler) {
      userErrorHandler(err, instance, info);
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    if (appInstance[ON_ERROR]) {
      {
        appInstance.proxy.$callHook(ON_ERROR, err);
      }
    } else {
      logError(err, info, instance ? instance.$.vnode : null, false);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined" && typeof global[method] !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
class UniCSSStyleDeclaration {
  constructor() {
    this.__v_skip = true;
    this.$styles = {};
    this.$onChangeCallbacks = [];
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop in target) {
          const value = target[prop];
          return isFunction(value) ? value.bind(target) : value;
        }
        return target.getPropertyValue(prop);
      },
      set: (target, prop, value) => {
        if (prop in target) {
          return false;
        }
        target.setProperty(prop, value);
        return true;
      }
    });
  }
  setProperty(name, value) {
    name = hyphenateCssProperty(name);
    const oldValue = this.$styles[name];
    if (oldValue === value) {
      return;
    }
    this.$styles[name] = value;
    this.$onChangeCallbacks.forEach((callback) => callback(this.$styles));
  }
  getPropertyValue(property) {
    property = hyphenateCssProperty(property);
    return this.$styles[property] || "";
  }
  get cssText() {
    const styles = Object.entries(this.$styles);
    if (styles.length === 0) {
      return "";
    }
    return styles.map(([key, value]) => `${key}:${value}`).join(";") + ";";
  }
  $onChange(callback) {
    this.$onChangeCallbacks.push(callback);
  }
  $destroy() {
    this.$onChangeCallbacks.length = 0;
  }
}
function hyphenateCssProperty(str) {
  if (str.startsWith("Webkit")) {
    return "-webkit-" + hyphenate(str.slice(6));
  }
  return hyphenate(str);
}
class UniAnimation {
  constructor(id, scope, keyframes, options = {}) {
    var _a;
    this._playState = "";
    this.parsedKeyframes = [];
    this.options = {};
    this.onfinish = null;
    this.oncancel = null;
    this.id = id;
    this.scope = scope;
    this.options = typeof options === "number" ? { duration: options } : options;
    if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.iterations) === Infinity) {
      this.options.iterations = -1;
    }
    this.parsedKeyframes = coverAnimateToStyle(keyframes, options);
    this.onfinish = () => {
    };
    this.oncancel = () => {
    };
  }
  get playState() {
    return this._playState;
  }
  get currentTime() {
    throw new Error("currentTime not implemented.");
  }
  cancel() {
    toRaw(this.scope).setData({
      ["$eA." + this.id]: JSON.stringify({
        id: this.id,
        playState: "cancel",
        keyframes: this.parsedKeyframes,
        options: this.options
      })
    });
  }
  finish() {
    throw new Error("finish not implemented.");
  }
  pause() {
    throw new Error("pause not implemented.");
  }
  play() {
    this.scope.setData({
      ["$eA." + this.id]: JSON.stringify({
        id: this.id,
        playState: "running",
        keyframes: this.parsedKeyframes,
        options: this.options
      })
    });
  }
}
function handleDirection(keyframes, direction) {
  if (direction === "reverse") {
    keyframes.reverse();
  } else if (direction === "alternate") {
    keyframes = [...keyframes, ...keyframes.slice().reverse().slice(1)];
  } else if (direction === "alternate-reverse") {
    keyframes = keyframes.reverse().concat(keyframes.slice(1, -1).reverse());
  }
  return JSON.parse(JSON.stringify(keyframes));
}
function normalizeKeyframes(keyframes, direction = "normal") {
  if (keyframes.length === 0) {
    return [];
  }
  keyframes.forEach((kf) => {
    Object.keys(kf).forEach((key) => {
      const newKey = hyphenate(key);
      if (key !== newKey) {
        kf[newKey] = kf[key];
        delete kf[key];
      }
    });
  });
  keyframes = handleDirection(keyframes, direction);
  const existingOffsets = keyframes.map((kf, index2) => ({
    index: index2,
    offset: kf.offset
  })).filter((item) => item.offset !== void 0);
  if (existingOffsets.length === 0) {
    for (let i2 = 0; i2 < keyframes.length; i2++) {
      keyframes[i2].offset = i2 / (keyframes.length - 1);
    }
    return keyframes;
  }
  if (existingOffsets[0].index > 0) {
    const firstOffset = existingOffsets[0].offset / existingOffsets[0].index;
    for (let i2 = 0; i2 < existingOffsets[0].index; i2++) {
      keyframes[i2].offset = firstOffset * i2;
    }
  }
  for (let i2 = 0; i2 < existingOffsets.length - 1; i2++) {
    const startOffset = existingOffsets[i2].offset;
    const endOffset = existingOffsets[i2 + 1].offset;
    const diffFrames = existingOffsets[i2 + 1].index - existingOffsets[i2].index;
    if (diffFrames !== 1) {
      const step = (endOffset - startOffset) / diffFrames;
      for (let j2 = 1; j2 <= diffFrames; j2++) {
        keyframes[existingOffsets[i2].index + j2].offset = startOffset + j2 * step;
      }
    }
  }
  if (existingOffsets[existingOffsets.length - 1].index < keyframes.length - 1) {
    const lastOffset = existingOffsets[existingOffsets.length - 1].offset;
    const numFrames = keyframes.length - existingOffsets[existingOffsets.length - 1].index;
    const step = (1 - lastOffset) / (numFrames - 1);
    for (let i2 = 0; i2 < numFrames; i2++) {
      keyframes[existingOffsets[existingOffsets.length - 1].index + i2].offset = lastOffset + i2 * step;
    }
  }
  return keyframes.map((kf) => {
    kf.offset = Number(kf.offset.toFixed(5));
    return kf;
  });
}
function coverAnimateToStyle(keyframes, options) {
  let duration = (options === null || options === void 0 ? void 0 : options.duration) || 0;
  const direction = (options === null || options === void 0 ? void 0 : options.direction) || "normal";
  if (!Array.isArray(keyframes)) {
    const propertyNames = Object.keys(keyframes);
    const arrayLength = keyframes[propertyNames[0]].length;
    const frames2 = Array.from({ length: arrayLength }, (_2, i2) => {
      const frame = {};
      propertyNames.forEach((prop) => {
        frame[prop] = keyframes[prop][i2];
      });
      return frame;
    });
    return coverAnimateToStyle(frames2, options);
  }
  const frames = normalizeKeyframes(keyframes, direction);
  if (direction === "alternate") {
    duration = duration * 2;
  }
  return frames.map((frame, index2) => {
    var _a;
    const currentOffset = frame.offset;
    let stepDuration;
    const prevOffset = ((_a = frames[index2 - 1]) === null || _a === void 0 ? void 0 : _a.offset) || 0;
    const currentDuration = Math.round(duration * (currentOffset - prevOffset));
    const currentOffsetStartTime = Math.round(duration * prevOffset);
    stepDuration = currentDuration;
    const result = frame;
    return Object.assign({}, result, {
      // ...result,
      offset: void 0,
      transition: `all ${stepDuration}ms linear`,
      _duration: stepDuration,
      _startTime: currentOffsetStartTime
    });
  });
}
class UniElement {
  constructor(id = "", name = "") {
    this.__v_skip = true;
    this.style = new UniCSSStyleDeclaration();
    this.dataset = {};
    this.offsetTop = NaN;
    this.offsetLeft = NaN;
    this.id = id;
    this.tagName = name.toUpperCase();
    this.nodeName = this.tagName;
  }
  scrollTo(options) {
    if (!this.id) {
      console.warn(`scrollTo is only supported on elements with id`);
      return;
    }
    if (this.$node) {
      this.$node.then((node) => {
        node.scrollTo(options);
      });
    } else {
      console.warn(`scrollTo is only supported on scroll-view`);
    }
  }
  getBoundingClientRectAsync(callback) {
    var _a, _b;
    if (callback) {
      if (!this.id) {
        console.warn(`getBoundingClientRectAsync is not supported on elements without id`);
        try {
          (_a = callback.fail) === null || _a === void 0 ? void 0 : _a.call(callback);
        } catch (error) {
          console.error(error);
        }
        try {
          (_b = callback.complete) === null || _b === void 0 ? void 0 : _b.call(callback);
        } catch (error) {
          console.error(error);
        }
        return;
      }
      this._getBoundingClientRectAsync((domRect) => {
        var _a2, _b2;
        try {
          (_a2 = callback.success) === null || _a2 === void 0 ? void 0 : _a2.call(callback, domRect);
        } catch (error) {
          console.error(error);
        }
        try {
          (_b2 = callback.complete) === null || _b2 === void 0 ? void 0 : _b2.call(callback, domRect);
        } catch (error) {
          console.error(error);
        }
      });
      return;
    }
    if (!this.id) {
      console.warn(`getBoundingClientRectAsync is not supported on elements without id`);
      return Promise.reject();
    }
    return new Promise((resolve2, reject) => {
      this._getBoundingClientRectAsync(resolve2);
    });
  }
  _getBoundingClientRectAsync(callback) {
    const query = index.createSelectorQuery().in(this.$vm);
    query.select("#" + this.id).boundingClientRect();
    query.exec((res) => {
      this._fixDomRectXY(res[0]);
      callback(res[0]);
    });
  }
  _fixDomRectXY(node) {
    if (node.x == void 0) {
      if (node.width >= 0) {
        node.x = node.left;
      } else {
        node.x = node.left - node.width;
      }
    }
    if (node.y == void 0) {
      if (node.height >= 0) {
        node.y = node.top;
      } else {
        node.y = node.top - node.height;
      }
    }
  }
  $onStyleChange(callback) {
    this.style.$onChange(callback);
  }
  getAttribute(name) {
    if (!this.id) {
      console.warn(`getAttribute(${name}) is not supported on UniElement without id`);
      return null;
    }
    switch (name) {
      case "id":
        return this.id;
      case "style":
        return this.style.cssText;
      default:
        console.warn(`getAttribute(${name}) is not supported on UniElement in miniprogram`);
        return null;
    }
  }
  setAttribute(name, value) {
    console.warn(`Miniprogram does not support UniElement.setAttribute(${name}, value)`);
  }
  animate(keyframes, options) {
    if (!this.id) {
      throw new Error("animate is only supported on elements with id");
    }
    const root = this.$vm.$root;
    const scope = root && root.$scope;
    if (!scope) {
      throw new Error(`animate is only supported on elements in page`);
    }
    if (!keyframes) {
      throw new Error("animate keyframes is required");
    }
    const animation = new UniAnimation(this.id, scope, keyframes, options);
    animation.play();
    return animation;
  }
  $destroy() {
    if (this.style) {
      this.style.$destroy();
      this.style = null;
    }
  }
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function pruneUniElements(ins) {
  ins.$uniElements.forEach((uniElement, id) => {
    const options = ins.$uniElementIds.get(id);
    if (!options) {
      uniElement.$destroy();
      ins.$uniElements.delete(id);
    }
  });
}
function destroyUniElements(ins) {
  ins.$uniElements.forEach((uniElement, id) => {
    uniElement.$destroy();
  });
  ins.$uniElements.clear();
  ins.$templateUniElementRefs = [];
}
const customElements = /* @__PURE__ */ new Map();
function registerCustomElement(tagName, elementClass) {
  customElements.set(tagName, elementClass);
}
function createUniElement(id, tagName, ins) {
  if (!ins || !ins.proxy) {
    return null;
  }
  const uniElement = new (customElements.get(tagName) || UniElement)(id, tagName);
  uniElement.$vm = ins.proxy;
  initMiniProgramNode(uniElement, ins);
  uniElement.$onStyleChange((styles) => {
    var _a;
    let cssText = "";
    const templateStyle = ins.$templateUniElementStyles[id];
    if (templateStyle) {
      cssText = `${templateStyle};${stringifyStyle(styles)}`;
    } else {
      cssText = stringifyStyle(styles);
    }
    const mpInstance = (_a = ins.proxy) === null || _a === void 0 ? void 0 : _a.$scope;
    if (mpInstance) {
      mpInstance.setData({
        [`$eS.${id}`]: cssText
      });
    }
  });
  return uniElement;
}
function findUniElement(id, ins = getCurrentInstance()) {
  if (!ins) {
    return null;
  }
  const element = ins.$uniElements.get(id);
  if (element) {
    return element;
  }
  const options = ins.$uniElementIds.get(id);
  if (options) {
    const element2 = createUniElement(id, options.name, ins);
    ins.$uniElements.set(id, element2);
    return element2;
  }
  if (ins.proxy) {
    const children = ins.proxy.$children;
    for (const child of children) {
      const element2 = findUniElement(id, child.$);
      if (element2) {
        return element2;
      }
    }
  }
  return null;
}
function createDummyUniElement() {
  return new UniElement("", "");
}
function createEventElement(id, ins) {
  if (!id || !ins) {
    return createDummyUniElement();
  }
  const element = findUniElement(id, ins);
  if (!element) {
    return createDummyUniElement();
  }
  return createUniElement(id, element.tagName, ins);
}
function createEventTarget(target, ins) {
  const id = (target === null || target === void 0 ? void 0 : target.id) || "";
  const element = createEventElement(id, ins);
  if (element) {
    element.dataset = (target === null || target === void 0 ? void 0 : target.dataset) || {};
    element.offsetTop = typeof (target === null || target === void 0 ? void 0 : target.offsetTop) === "number" ? target === null || target === void 0 ? void 0 : target.offsetTop : NaN;
    element.offsetLeft = typeof (target === null || target === void 0 ? void 0 : target.offsetLeft) === "number" ? target === null || target === void 0 ? void 0 : target.offsetLeft : NaN;
  }
  return element;
}
function initMiniProgramNode(uniElement, ins) {
  if (uniElement.tagName === "SCROLL-VIEW") {
    uniElement.$node = new Promise((resolve2) => {
      setTimeout(() => {
        index.createSelectorQuery().in(ins.proxy).select("#" + uniElement.id).fields({ node: true }, (res) => {
          const node = res.node;
          resolve2(node);
          uniElement.$node = {
            then(fn) {
              fn(node);
            }
          };
        }).exec();
      }, 2);
    });
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq" || ctx.$mpPlatform === "mp-xhs") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2, instance);
    let args = [e2];
    if (instance && instance.ctx.$getTriggerEventDetail) {
      if (typeof e2.detail === "number") {
        e2.detail = instance.ctx.$getTriggerEventDetail(e2.detail);
      }
    }
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function isMPTapEvent(event) {
  return event.type === "tap";
}
function normalizeXEvent(event, instance) {
  if (isMPTapEvent(event)) {
    event.x = event.detail.x;
    event.y = event.detail.y;
    event.clientX = event.detail.x;
    event.clientY = event.detail.y;
    const touch0 = event.touches && event.touches[0];
    if (touch0) {
      event.pageX = touch0.pageX;
      event.pageY = touch0.pageY;
      event.screenX = touch0.screenX;
      event.screenY = touch0.screenY;
    }
  }
  if (event.target) {
    const oldTarget = event.target;
    Object.defineProperty(event, "target", {
      get() {
        if (!event._target) {
          event._target = createEventTarget(oldTarget, instance || void 0);
        }
        return event._target;
      }
    });
  }
  if (event.currentTarget) {
    const oldCurrentTarget = event.currentTarget;
    Object.defineProperty(event, "currentTarget", {
      get() {
        if (!event._currentTarget) {
          event._currentTarget = createEventTarget(oldCurrentTarget, instance || void 0);
        }
        return event._currentTarget;
      }
    });
  }
}
function patchMPEvent(event, instance) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$1(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$1(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
    {
      normalizeXEvent(event, instance);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function setUniElementId(id, options, ref2, refOpts) {
  const ins = getCurrentInstance();
  if (ins) {
    let tagName;
    let tagType;
    if (isString(options)) {
      tagName = options;
    } else {
      tagName = options.name;
      tagType = options.type;
    }
    const { $uniElementIds } = ins;
    id = toRaw(id);
    if (!id) {
      return id;
    }
    if (!$uniElementIds.has(id)) {
      $uniElementIds.set(id, { name: tagName });
    }
    if (ref2) {
      setUniElementRef(ins, ref2, id, {
        k: refOpts === null || refOpts === void 0 ? void 0 : refOpts.k,
        f: refOpts === null || refOpts === void 0 ? void 0 : refOpts.f,
        n: tagName
      }, tagType);
    }
    if (tagType === 2 && ins.props.id) {
      const parent = ins.parent;
      if (parent) {
        const uniElement = findUniElement(id, ins);
        if (uniElement) {
          parent.$uniElements.set(ins.props.id, uniElement);
          const existTemplateRef = parent.$templateUniElementRefs.find((t2) => t2.i === ins.props.id);
          if (existTemplateRef) {
            existTemplateRef.v = uniElement;
          }
        }
      }
    }
  }
  return id;
}
function setUniElementRef(ins, ref2, id, opts, tagType) {
  const { $templateUniElementRefs } = ins;
  if (tagType === 1) {
    const existTemplateRef2 = $templateUniElementRefs.find((t2) => t2.r === ref2);
    if (!existTemplateRef2) {
      $templateUniElementRefs.push({
        i: id,
        r: ref2,
        k: opts.k,
        f: opts.f,
        v: null
      });
    }
    return;
  }
  const uniElement = findUniElement(id, ins);
  const existTemplateRef = $templateUniElementRefs.find((t2) => t2.r === ref2);
  if (existTemplateRef) {
    if (opts.f) {
      existTemplateRef.v.push(uniElement);
    } else {
      existTemplateRef.v = uniElement;
    }
  } else {
    $templateUniElementRefs.push({
      i: id,
      r: ref2,
      k: opts.k,
      f: opts.f,
      v: opts.f ? [uniElement] : uniElement
    });
  }
}
function hasIdProp(_ctx) {
  return _ctx.$.propsOptions && _ctx.$.propsOptions[0] && "id" in _ctx.$.propsOptions[0];
}
function getVirtualHostId(_ctx) {
  return _ctx.virtualHostId;
}
function hasVirtualHostId(_ctx) {
  return !!getVirtualHostId(_ctx);
}
function genIdWithVirtualHost(_ctx, idBinding) {
  if (!hasVirtualHostId(_ctx) || hasIdProp(_ctx)) {
    return idBinding;
  }
  return getVirtualHostId(_ctx);
}
function genUniElementId(_ctx, idBinding, genId) {
  return genIdWithVirtualHost(_ctx, idBinding) || genId || "";
}
const o$1 = (value, key) => vOn(value, key);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const t$1 = (val) => toDisplayString(val);
const sei = setUniElementId;
const gei = genUniElementId;
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
function getLocaleLanguage$1() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    const opts = protocol[i2];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp(name, value, prop, isAbsent) {
  if (!isPlainObject$1(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject$1(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue(hooks, data, params) {
  let promise = false;
  for (let i2 = 0; i2 < hooks.length; i2++) {
    const hook = hooks[i2];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue2) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue2 = hook(returnValue2) || returnValue2;
  });
  return returnValue2;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject$1(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  args[0];
  {
    return;
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  {
    result.errSubject = name;
  }
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  let res = extend({ errMsg: apiErrMsg }, errRes);
  {
    if (typeof UniError !== "undefined") {
      res = typeof errRes.errCode !== "undefined" ? new UniError(name, errRes.errCode, apiErrMsg) : new UniError(apiErrMsg, errRes);
    }
  }
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  const errMsg = formatApiArgs(args);
  if (errMsg) {
    return errMsg;
  }
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_GET_ELEMENT_BY_ID = "getElementById";
const getElementById = defineSyncApi(API_GET_ELEMENT_BY_ID, (id) => {
  const pages2 = getCurrentPages();
  const page = pages2[pages2.length - 1];
  if (!page || !page.$vm) {
    return null;
  }
  return findUniElement(id, page.$vm.$);
});
const API_CREATE_CANVAS_CONTEXT_ASYNC = "createCanvasContextAsync";
class CanvasContext {
  constructor(element, width, height) {
    this.__v_skip = true;
    this._width = 0;
    this._height = 0;
    this._element = element;
    this._width = width;
    this._height = height;
  }
  getContext(type) {
    const context = this._element.getContext(type);
    if (!context.canvas.offsetWidth || !context.canvas.offsetHeight) {
      Object.defineProperties(context.canvas, {
        offsetWidth: {
          value: this._width,
          writable: true
        }
      });
      Object.defineProperties(context.canvas, {
        offsetHeight: {
          value: this._height,
          writable: true
        }
      });
    }
    return context;
  }
  toDataURL(type, encoderOptions) {
    return this._element.toDataURL(type, encoderOptions);
  }
  createImage() {
    return this._element.createImage();
  }
  createImageData() {
    return this._element.createImageData();
  }
  createPath2D() {
    return this._element.createPath2D();
  }
  requestAnimationFrame(callback) {
    return this._element.requestAnimationFrame(callback);
  }
  cancelAnimationFrame(taskId) {
    this._element.cancelAnimationFrame(taskId);
  }
}
const createCanvasContextAsync = defineAsyncApi(API_CREATE_CANVAS_CONTEXT_ASYNC, (options, { resolve, reject }) => {
  const pages2 = getCurrentPages();
  const page = pages2[pages2.length - 1];
  if (!page || !page.$vm) {
    reject("current page invalid.");
  } else {
    const query = options.component ? wx.createSelectorQuery().in(options.component) : wx.createSelectorQuery();
    query.select("#" + options.id).fields({ node: true, size: true }, () => {
    }).exec((res) => {
      if (res.length > 0 && res[0].node) {
        const result = res[0];
        resolve(new CanvasContext(result.node, result.width, result.height));
      } else {
        reject("canvas id invalid.");
      }
    });
  }
});
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  var _a, _b;
  let windowWidth, pixelRatio, platform;
  {
    const windowInfo = ((_a = wx.getWindowInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const deviceInfo = ((_b = wx.getDeviceInfo) === null || _b === void 0 ? void 0 : _b.call(wx)) || wx.getSystemInfoSync();
    windowWidth = windowInfo.windowWidth;
    pixelRatio = windowInfo.pixelRatio;
    platform = deviceInfo.platform;
  }
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
function __f__(type, filename, ...args) {
  if (filename) {
    args.push(filename);
  }
  console[type].apply(console, args);
}
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject$1(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject$1(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject$1(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject$1(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: [Function, Number]
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
class EventBus {
  constructor() {
    this.$emitter = new E$1();
  }
  on(name, callback) {
    return this.$emitter.on(name, callback);
  }
  once(name, callback) {
    return this.$emitter.once(name, callback);
  }
  off(name, callback) {
    if (!name) {
      this.$emitter.e = {};
      return;
    }
    this.$emitter.off(name, callback);
  }
  emit(name, ...args) {
    this.$emitter.emit(name, ...args);
  }
}
const eventBus = new EventBus();
const $on = defineSyncApi(API_ON, (name, callback) => {
  const id = eventBus.on(name, callback);
  {
    return id;
  }
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  const id = eventBus.once(name, callback);
  {
    return id;
  }
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!isArray(name))
    name = name ? [name] : [];
  name.forEach((n2) => {
    eventBus.off(n2, callback);
  });
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  eventBus.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i2 = 0; i2 < onPushMessageCallbacks.length; i2++) {
      const callback = onPushMessageCallbacks[i2];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_2, { resolve, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|__f__|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|rpx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const SYNC_API_RE_X = /getElementById/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const TASK_APIS = ["request", "downloadFile", "uploadFile", "connectSocket"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  if (SYNC_API_RE_X.test(name)) {
    return true;
  }
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function isTaskApi(name) {
  return TASK_APIS.indexOf(name) !== -1;
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve,
        fail: reject
      }), rest);
    })));
  };
}
function createUTSJSONObjectIfNeed(obj) {
  if (!isPlainObject$1(obj) && !Array.isArray(obj)) {
    return obj;
  }
  return globalThis.UTS.JSON.parse(JSON.stringify(obj));
}
const request = {
  returnValue: (res) => {
    const { data } = res;
    res.data = createUTSJSONObjectIfNeed(data);
    return res;
  }
};
const getStorage = {
  returnValue: (res) => {
    return createUTSJSONObjectIfNeed(res);
  }
};
const getStorageSync = getStorage;
var protocols$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getStorage,
  getStorageSync,
  request
});
function parseXReturnValue(methodName, res) {
  const protocol = protocols$1[methodName];
  if (protocol && isFunction(protocol.returnValue)) {
    return protocol.returnValue(res);
  }
  return res;
}
function shouldKeepReturnValue(methodName) {
  return methodName === "getStorage" || methodName === "getStorageSync";
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue2) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue2));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue2 = {}, keepFromArgs = false) {
    if (isPlainObject$1(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject$1(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue2);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      if (isFunction(argsOption)) {
        argsOption(fromArgs, {});
      }
      fromArgs = processCallback(methodName, fromArgs, returnValue2);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue2, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    const realKeepReturnValue = keepReturnValue || shouldKeepReturnValue(methodName);
    return processArgs(methodName, res, returnValue2, {}, realKeepReturnValue);
  }
  return function wrapper(methodName, method) {
    const hasProtocol = hasOwn(protocols2, methodName);
    if (!hasProtocol && typeof wx[methodName] !== "function") {
      return method;
    }
    const needWrapper = hasProtocol || isFunction(protocols2.returnValue) || isContextApi(methodName) || isTaskApi(methodName);
    const hasMethod = hasProtocol || isFunction(method);
    if (!hasProtocol && !method) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    if (!needWrapper || !hasMethod) {
      return method;
    }
    const protocol = protocols2[methodName];
    return function(arg1, arg2) {
      let options = protocol || {};
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue2 = wx[options.name || methodName].apply(wx, args);
      if (isContextApi(methodName) || isTaskApi(methodName)) {
        if (returnValue2 && !returnValue2.__v_skip) {
          returnValue2.__v_skip = true;
        }
      }
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue2, options.returnValue, isContextApi(methodName));
      }
      return returnValue2;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return getLocaleLanguage$1();
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function getOSInfo(system, platform) {
  let osName = "";
  let osVersion = "";
  if (platform && false) {
    osName = platform;
    osVersion = system;
  } else {
    osName = system.split(" ")[0] || platform;
    osVersion = system.split(" ")[1] || "";
  }
  osName = osName.toLocaleLowerCase();
  switch (osName) {
    case "harmony":
    case "ohos":
    case "openharmony":
      osName = "harmonyos";
      break;
    case "iphone os":
      osName = "ios";
      break;
    case "mac":
    case "darwin":
      osName = "macos";
      break;
    case "windows_nt":
      osName = "windows";
      break;
  }
  return {
    osName,
    osVersion
  };
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  const { osName, osVersion } = getOSInfo(system, platform);
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = (language || "").replace(/_/g, "-");
  const parameters = {
    appId: "",
    appName: "lihai-app",
    appVersion: "1.9.7",
    appVersionCode: 10907,
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.66",
    uniCompilerVersion: "4.66",
    uniRuntimeVersion: "4.66",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName,
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0,
    isUniAppX: true
  };
  {
    try {
      parameters.uniCompilerVersionCode = parseFloat("4.66");
      parameters.uniRuntimeVersionCode = parseFloat("4.66");
    } catch (error) {
    }
  }
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model, system = "", platform = "" } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    const { osName, osVersion } = getOSInfo(system, platform);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = (language || "").replace(/_/g, "-");
    const parameters = {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "",
      appName: "lihai-app",
      appVersion: "1.9.7",
      appVersionCode: 10907,
      appLanguage: getAppLanguage(hostLanguage),
      isUniAppX: true,
      uniPlatform: "mp-weixin",
      uniCompileVersion: "4.66",
      uniCompilerVersion: "4.66",
      uniRuntimeVersion: "4.66"
    };
    {
      try {
        parameters.uniCompilerVersionCode = parseFloat("4.66");
        parameters.uniRuntimeVersionCode = parseFloat("4.66");
      } catch (error) {
      }
    }
    extend(toRes, parameters);
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const onError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        wx.$onErrorHandlers = [];
      }
      wx.$onErrorHandlers.push(fromArgs);
    } else {
      injectHook(ON_ERROR, fromArgs, app.$vm.$);
    }
  }
};
const offError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        return;
      }
      const index2 = wx.$onErrorHandlers.findIndex((fn) => fn === fromArgs);
      if (index2 !== -1) {
        wx.$onErrorHandlers.splice(index2, 1);
      }
    } else if (fromArgs.__weh) {
      const onErrors = app.$vm.$[ON_ERROR];
      if (onErrors) {
        const index2 = onErrors.indexOf(fromArgs.__weh);
        if (index2 > -1) {
          onErrors.splice(index2, 1);
        }
      }
    }
  }
};
const onSocketOpen = {
  args() {
    if (wx.__uni_console__) {
      if (wx.__uni_console_warned__) {
        return;
      }
      wx.__uni_console_warned__ = true;
      console.warn(`开发模式下小程序日志回显会使用 socket 连接，为了避免冲突，建议使用 SocketTask 的方式去管理 WebSocket 或手动关闭日志回显功能。[详情](https://uniapp.dcloud.net.cn/tutorial/run/mp-log.html)`);
    }
  }
};
const onSocketMessage = onSocketOpen;
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  rpx2px: upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback,
  __f__,
  getElementById,
  createCanvasContextAsync
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
    globalThis.__uniX = true;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    if (component.$scope) {
      return oldIn.call(this, component.$scope);
    }
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
if (!wx$2.canIUse("getAppBaseInfo")) {
  wx$2.getAppBaseInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.canIUse("getWindowInfo")) {
  wx$2.getWindowInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.canIUse("getDeviceInfo")) {
  wx$2.getDeviceInfo = wx$2.getSystemInfoSync;
}
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
const THEME_CALLBACK = [];
const onHostThemeChange = (callback) => {
  const onHostThemeChangeCallback = (res) => {
    callback({ hostTheme: res.theme });
  };
  const index2 = THEME_CALLBACK.push([callback, onHostThemeChangeCallback]) - 1;
  wx$2.onThemeChange && wx$2.onThemeChange(onHostThemeChangeCallback);
  return index2;
};
const offHostThemeChange = (callbackId) => {
  if (isFunction(callbackId)) {
    callbackId = THEME_CALLBACK.findIndex(([callback]) => callback === callbackId);
  }
  if (callbackId > -1) {
    const arr = THEME_CALLBACK.splice(callbackId, 1)[0];
    isArray(arr) && wx$2.offThemeChange && wx$2.offThemeChange(arr[1]);
  }
};
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  offHostThemeChange,
  onHostThemeChange,
  shareVideoMessage
});
function returnValue(method, res) {
  return parseXReturnValue(method, res);
}
const chooseFile = {
  name: "chooseMessageFile"
};
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  chooseFile,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  offError,
  onError,
  onSocketMessage,
  onSocketOpen,
  previewImage,
  redirectTo,
  returnValue,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function initRuntimeSocket(hosts, port, id) {
  if (hosts == "" || port == "" || id == "")
    return Promise.resolve(null);
  return hosts.split(",").reduce((promise, host2) => {
    return promise.then((socket) => {
      if (socket != null)
        return Promise.resolve(socket);
      return tryConnectSocket(host2, port, id);
    });
  }, Promise.resolve(null));
}
const SOCKET_TIMEOUT = 500;
function tryConnectSocket(host2, port, id) {
  return new Promise((resolve, reject) => {
    const socket = index.connectSocket({
      url: `ws://${host2}:${port}/${id}`,
      multiple: true,
      // 支付宝小程序 是否开启多实例
      fail() {
        resolve(null);
      }
    });
    const timer = setTimeout(() => {
      socket.close({
        code: 1006,
        reason: "connect timeout"
      });
      resolve(null);
    }, SOCKET_TIMEOUT);
    socket.onOpen((e2) => {
      clearTimeout(timer);
      resolve(socket);
    });
    socket.onClose((e2) => {
      clearTimeout(timer);
      resolve(null);
    });
    socket.onError((e2) => {
      clearTimeout(timer);
      resolve(null);
    });
  });
}
const CONSOLE_TYPES = ["log", "warn", "error", "info", "debug"];
const originalConsole = /* @__PURE__ */ CONSOLE_TYPES.reduce((methods, type) => {
  methods[type] = console[type].bind(console);
  return methods;
}, {});
let sendError = null;
const errorQueue = /* @__PURE__ */ new Set();
const errorExtra = {};
function sendErrorMessages(errors) {
  if (sendError == null) {
    errors.forEach((error) => {
      errorQueue.add(error);
    });
    return;
  }
  const data = errors.map((err) => {
    if (typeof err === "string") {
      return err;
    }
    const isPromiseRejection = err && "promise" in err && "reason" in err;
    const prefix = isPromiseRejection ? "UnhandledPromiseRejection: " : "";
    if (isPromiseRejection) {
      err = err.reason;
    }
    if (err instanceof Error && err.stack) {
      if (err.message && !err.stack.includes(err.message)) {
        return `${prefix}${err.message}
${err.stack}`;
      }
      return `${prefix}${err.stack}`;
    }
    if (typeof err === "object" && err !== null) {
      try {
        return prefix + JSON.stringify(err);
      } catch (err2) {
        return prefix + String(err2);
      }
    }
    return prefix + String(err);
  }).filter(Boolean);
  if (data.length > 0) {
    sendError(JSON.stringify(Object.assign({
      type: "error",
      data
    }, errorExtra)));
  }
}
function setSendError(value, extra = {}) {
  sendError = value;
  Object.assign(errorExtra, extra);
  if (value != null && errorQueue.size > 0) {
    const errors = Array.from(errorQueue);
    errorQueue.clear();
    sendErrorMessages(errors);
  }
}
function initOnError() {
  function onError2(error) {
    try {
      if (typeof PromiseRejectionEvent !== "undefined" && error instanceof PromiseRejectionEvent && error.reason instanceof Error && error.reason.message && error.reason.message.includes(`Cannot create property 'errMsg' on string 'taskId`)) {
        return;
      }
      if (true) {
        originalConsole.error(error);
      }
      sendErrorMessages([error]);
    } catch (err) {
      originalConsole.error(err);
    }
  }
  if (typeof index.onError === "function") {
    index.onError(onError2);
  }
  if (typeof index.onUnhandledRejection === "function") {
    index.onUnhandledRejection(onError2);
  }
  return function offError2() {
    if (typeof index.offError === "function") {
      index.offError(onError2);
    }
    if (typeof index.offUnhandledRejection === "function") {
      index.offUnhandledRejection(onError2);
    }
  };
}
function formatMessage(type, args) {
  try {
    return {
      type,
      args: formatArgs(args)
    };
  } catch (e2) {
  }
  return {
    type,
    args: []
  };
}
function formatArgs(args) {
  return args.map((arg) => formatArg(arg));
}
function formatArg(arg, depth = 0) {
  if (depth >= 7) {
    return {
      type: "object",
      value: "[Maximum depth reached]"
    };
  }
  const type = typeof arg;
  switch (type) {
    case "string":
      return formatString(arg);
    case "number":
      return formatNumber(arg);
    case "boolean":
      return formatBoolean(arg);
    case "object":
      try {
        return formatObject(arg, depth);
      } catch (e2) {
        return {
          type: "object",
          value: {
            properties: []
          }
        };
      }
    case "undefined":
      return formatUndefined();
    case "function":
      return formatFunction(arg);
    case "symbol": {
      return formatSymbol(arg);
    }
    case "bigint":
      return formatBigInt(arg);
  }
}
function formatFunction(value) {
  return {
    type: "function",
    value: `function ${value.name}() {}`
  };
}
function formatUndefined() {
  return {
    type: "undefined"
  };
}
function formatBoolean(value) {
  return {
    type: "boolean",
    value: String(value)
  };
}
function formatNumber(value) {
  return {
    type: "number",
    value: String(value)
  };
}
function formatBigInt(value) {
  return {
    type: "bigint",
    value: String(value)
  };
}
function formatString(value) {
  return {
    type: "string",
    value
  };
}
function formatSymbol(value) {
  return {
    type: "symbol",
    value: value.description
  };
}
function formatObject(value, depth) {
  if (value === null) {
    return {
      type: "null"
    };
  }
  {
    if (isComponentPublicInstance(value)) {
      return formatComponentPublicInstance(value, depth);
    }
    if (isComponentInternalInstance(value)) {
      return formatComponentInternalInstance(value, depth);
    }
    if (isUniElement(value)) {
      return formatUniElement(value, depth);
    }
    if (isCSSStyleDeclaration(value)) {
      return formatCSSStyleDeclaration(value, depth);
    }
  }
  if (Array.isArray(value)) {
    return {
      type: "object",
      subType: "array",
      value: {
        properties: value.map((v2, i2) => formatArrayElement(v2, i2, depth + 1))
      }
    };
  }
  if (value instanceof Set) {
    return {
      type: "object",
      subType: "set",
      className: "Set",
      description: `Set(${value.size})`,
      value: {
        entries: Array.from(value).map((v2) => formatSetEntry(v2, depth + 1))
      }
    };
  }
  if (value instanceof Map) {
    return {
      type: "object",
      subType: "map",
      className: "Map",
      description: `Map(${value.size})`,
      value: {
        entries: Array.from(value.entries()).map((v2) => formatMapEntry(v2, depth + 1))
      }
    };
  }
  if (value instanceof Promise) {
    return {
      type: "object",
      subType: "promise",
      value: {
        properties: []
      }
    };
  }
  if (value instanceof RegExp) {
    return {
      type: "object",
      subType: "regexp",
      value: String(value),
      className: "Regexp"
    };
  }
  if (value instanceof Date) {
    return {
      type: "object",
      subType: "date",
      value: String(value),
      className: "Date"
    };
  }
  if (value instanceof Error) {
    return {
      type: "object",
      subType: "error",
      value: value.message || String(value),
      className: value.name || "Error"
    };
  }
  let className = void 0;
  {
    const constructor = value.constructor;
    if (constructor) {
      if (constructor.get$UTSMetadata$) {
        className = constructor.get$UTSMetadata$().name;
      }
    }
  }
  let entries = Object.entries(value);
  if (isHarmonyBuilderParams(value)) {
    entries = entries.filter(([key]) => key !== "modifier" && key !== "nodeContent");
  }
  return {
    type: "object",
    className,
    value: {
      properties: entries.map((entry) => formatObjectProperty(entry[0], entry[1], depth + 1))
    }
  };
}
function isHarmonyBuilderParams(value) {
  return value.modifier && value.modifier._attribute && value.nodeContent;
}
function isComponentPublicInstance(value) {
  return value.$ && isComponentInternalInstance(value.$);
}
function isComponentInternalInstance(value) {
  return value.type && value.uid != null && value.appContext;
}
function formatComponentPublicInstance(value, depth) {
  return {
    type: "object",
    className: "ComponentPublicInstance",
    value: {
      properties: Object.entries(value.$.type).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function formatComponentInternalInstance(value, depth) {
  return {
    type: "object",
    className: "ComponentInternalInstance",
    value: {
      properties: Object.entries(value.type).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function isUniElement(value) {
  return value.style && value.tagName != null && value.nodeName != null;
}
function formatUniElement(value, depth) {
  return {
    type: "object",
    // 非 x 没有 UniElement 的概念
    // className: 'UniElement',
    value: {
      properties: Object.entries(value).filter(([name]) => [
        "id",
        "tagName",
        "nodeName",
        "dataset",
        "offsetTop",
        "offsetLeft",
        "style"
      ].includes(name)).map(([name, value2]) => formatObjectProperty(name, value2, depth + 1))
    }
  };
}
function isCSSStyleDeclaration(value) {
  return typeof value.getPropertyValue === "function" && typeof value.setProperty === "function" && value.$styles;
}
function formatCSSStyleDeclaration(style, depth) {
  return {
    type: "object",
    value: {
      properties: Object.entries(style.$styles).map(([name, value]) => formatObjectProperty(name, value, depth + 1))
    }
  };
}
function formatObjectProperty(name, value, depth) {
  const result = formatArg(value, depth);
  result.name = name;
  return result;
}
function formatArrayElement(value, index2, depth) {
  const result = formatArg(value, depth);
  result.name = `${index2}`;
  return result;
}
function formatSetEntry(value, depth) {
  return {
    value: formatArg(value, depth)
  };
}
function formatMapEntry(value, depth) {
  return {
    key: formatArg(value[0], depth),
    value: formatArg(value[1], depth)
  };
}
let sendConsole = null;
const messageQueue = [];
const messageExtra = {};
const EXCEPTION_BEGIN_MARK = "---BEGIN:EXCEPTION---";
const EXCEPTION_END_MARK = "---END:EXCEPTION---";
function sendConsoleMessages(messages) {
  if (sendConsole == null) {
    messageQueue.push(...messages);
    return;
  }
  sendConsole(JSON.stringify(Object.assign({
    type: "console",
    data: messages
  }, messageExtra)));
}
function setSendConsole(value, extra = {}) {
  sendConsole = value;
  Object.assign(messageExtra, extra);
  if (value != null && messageQueue.length > 0) {
    const messages = messageQueue.slice();
    messageQueue.length = 0;
    sendConsoleMessages(messages);
  }
}
const atFileRegex = /^\s*at\s+[\w/./-]+:\d+$/;
function rewriteConsole() {
  function wrapConsole(type) {
    return function(...args) {
      const originalArgs = [...args];
      if (originalArgs.length) {
        const maybeAtFile = originalArgs[originalArgs.length - 1];
        if (typeof maybeAtFile === "string" && atFileRegex.test(maybeAtFile)) {
          originalArgs.pop();
        }
      }
      {
        originalConsole[type](...originalArgs);
      }
      if (type === "error" && args.length === 1) {
        const arg = args[0];
        if (typeof arg === "string" && arg.startsWith(EXCEPTION_BEGIN_MARK)) {
          const startIndex = EXCEPTION_BEGIN_MARK.length;
          const endIndex = arg.length - EXCEPTION_END_MARK.length;
          sendErrorMessages([arg.slice(startIndex, endIndex)]);
          return;
        } else if (arg instanceof Error) {
          sendErrorMessages([arg]);
          return;
        }
      }
      sendConsoleMessages([formatMessage(type, args)]);
    };
  }
  if (isConsoleWritable()) {
    CONSOLE_TYPES.forEach((type) => {
      console[type] = wrapConsole(type);
    });
    return function restoreConsole() {
      CONSOLE_TYPES.forEach((type) => {
        console[type] = originalConsole[type];
      });
    };
  } else {
    {
      if (typeof index !== "undefined" && index.__f__) {
        const oldLog = index.__f__;
        if (oldLog) {
          index.__f__ = function(...args) {
            const [type, filename, ...rest] = args;
            oldLog(type, "", ...rest);
            sendConsoleMessages([formatMessage(type, [...rest, filename])]);
          };
          return function restoreConsole() {
            index.__f__ = oldLog;
          };
        }
      }
    }
  }
  return function restoreConsole() {
  };
}
function isConsoleWritable() {
  const value = console.log;
  const sym = Symbol();
  try {
    console.log = sym;
  } catch (ex) {
    return false;
  }
  const isWritable = console.log === sym;
  console.log = value;
  return isWritable;
}
function initRuntimeSocketService() {
  const hosts = "192.168.1.29,127.0.0.1";
  const port = "8090";
  const id = "mp-weixin_UCCpxd";
  const lazy = typeof swan !== "undefined";
  let restoreError = lazy ? () => {
  } : initOnError();
  let restoreConsole = lazy ? () => {
  } : rewriteConsole();
  return Promise.resolve().then(() => {
    if (lazy) {
      restoreError = initOnError();
      restoreConsole = rewriteConsole();
    }
    return initRuntimeSocket(hosts, port, id).then((socket) => {
      if (!socket) {
        restoreError();
        restoreConsole();
        originalConsole.error(wrapError("开发模式下日志通道建立 socket 连接失败。"));
        {
          originalConsole.error(wrapError("小程序平台，请勾选不校验合法域名配置。"));
        }
        originalConsole.error(wrapError("如果是运行到真机，请确认手机与电脑处于同一网络。"));
        return false;
      }
      {
        initMiniProgramGlobalFlag();
      }
      socket.onClose(() => {
        {
          originalConsole.error(wrapError("开发模式下日志通道 socket 连接关闭，请在 HBuilderX 中重新运行。"));
        }
        restoreError();
        restoreConsole();
      });
      setSendConsole((data) => {
        socket.send({
          data
        });
      });
      setSendError((data) => {
        socket.send({
          data
        });
      });
      return true;
    });
  });
}
const ERROR_CHAR = "‌";
function wrapError(error) {
  return `${ERROR_CHAR}${error}${ERROR_CHAR}`;
}
function initMiniProgramGlobalFlag() {
  if (typeof wx$1 !== "undefined") {
    wx$1.__uni_console__ = true;
  } else if (typeof my !== "undefined") {
    my.__uni_console__ = true;
  } else if (typeof tt !== "undefined") {
    tt.__uni_console__ = true;
  } else if (typeof swan !== "undefined") {
    swan.__uni_console__ = true;
  } else if (typeof qq !== "undefined") {
    qq.__uni_console__ = true;
  } else if (typeof ks !== "undefined") {
    ks.__uni_console__ = true;
  } else if (typeof jd !== "undefined") {
    jd.__uni_console__ = true;
  } else if (typeof xhs !== "undefined") {
    xhs.__uni_console__ = true;
  } else if (typeof has !== "undefined") {
    has.__uni_console__ = true;
  } else if (typeof qa !== "undefined") {
    qa.__uni_console__ = true;
  }
}
initRuntimeSocketService();
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function arrayPop(array) {
  if (array.length === 0) {
    return null;
  }
  return array.pop();
}
function arrayShift(array) {
  if (array.length === 0) {
    return null;
  }
  return array.shift();
}
function arrayFind(array, predicate) {
  const index2 = array.findIndex(predicate);
  if (index2 < 0) {
    return null;
  }
  return array[index2];
}
function arrayFindLast(array, predicate) {
  const index2 = array.findLastIndex(predicate);
  if (index2 < 0) {
    return null;
  }
  return array[index2];
}
function arrayAt(array, index2) {
  if (index2 < -array.length || index2 >= array.length) {
    return null;
  }
  return array.at(index2);
}
var IDENTIFIER;
(function(IDENTIFIER2) {
  IDENTIFIER2["UTSJSONObject"] = "UTSJSONObject";
  IDENTIFIER2["JSON"] = "JSON";
  IDENTIFIER2["UTS"] = "UTS";
  IDENTIFIER2["DEFINE_COMPONENT"] = "defineComponent";
  IDENTIFIER2["VUE"] = "vue";
  IDENTIFIER2["GLOBAL_THIS"] = "globalThis";
  IDENTIFIER2["UTS_TYPE"] = "UTSType";
  IDENTIFIER2["UTS_METADATA"] = "$UTSMetadata$";
  IDENTIFIER2["TEMP_UTS_METADATA"] = "$TempUTSMetadata$";
  IDENTIFIER2["JSON_FIELD"] = "JSON_FIELD";
})(IDENTIFIER || (IDENTIFIER = {}));
var UTS_CLASS_METADATA_KIND;
(function(UTS_CLASS_METADATA_KIND2) {
  UTS_CLASS_METADATA_KIND2[UTS_CLASS_METADATA_KIND2["CLASS"] = 0] = "CLASS";
  UTS_CLASS_METADATA_KIND2[UTS_CLASS_METADATA_KIND2["INTERFACE"] = 1] = "INTERFACE";
  UTS_CLASS_METADATA_KIND2[UTS_CLASS_METADATA_KIND2["TYPE"] = 2] = "TYPE";
})(UTS_CLASS_METADATA_KIND || (UTS_CLASS_METADATA_KIND = {}));
function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}
function isPlainObject(val) {
  if (val == null || typeof val !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(val);
  return proto === Object.prototype || proto === null;
}
class UTSError extends Error {
  constructor(message) {
    super(message);
  }
}
function isUTSMetadata(metadata) {
  return !!(metadata && metadata.kind in UTS_CLASS_METADATA_KIND && metadata.interfaces);
}
function isNativeType(proto) {
  return !proto || proto === Object.prototype;
}
const utsMetadataKey = IDENTIFIER.UTS_METADATA;
function getParentTypeList(type) {
  const metadata = utsMetadataKey in type ? type[utsMetadataKey] : {};
  let interfaces = [];
  if (!isUTSMetadata(metadata)) {
    interfaces = [];
  } else {
    interfaces = metadata.interfaces || [];
  }
  const proto = Object.getPrototypeOf(type);
  if (!isNativeType(proto)) {
    interfaces.push(proto.constructor);
  }
  return interfaces;
}
function isImplementationOf(leftType, rightType, visited = []) {
  if (isNativeType(leftType)) {
    return false;
  }
  if (leftType === rightType) {
    return true;
  }
  visited.push(leftType);
  const parentTypeList = getParentTypeList(leftType);
  return parentTypeList.some((parentType) => {
    if (visited.includes(parentType)) {
      return false;
    }
    return isImplementationOf(parentType, rightType, visited);
  });
}
function isInstanceOf(value, type) {
  if (type === UTSValueIterable) {
    return value && value[Symbol.iterator];
  }
  const isNativeInstanceofType = value instanceof type;
  if (isNativeInstanceofType || typeof value !== "object" || value === null) {
    return isNativeInstanceofType;
  }
  const proto = Object.getPrototypeOf(value).constructor;
  return isImplementationOf(proto, type);
}
function isBaseType(type) {
  return type === Number || type === String || type === Boolean;
}
function isUnknownType(type) {
  return type === "Unknown";
}
function isAnyType(type) {
  return type === "Any";
}
function isUTSType(type) {
  return type && type.prototype && type.prototype instanceof UTSType;
}
function normalizeGenericValue(value, genericType, isJSONParse = false) {
  return value == null ? null : isBaseType(genericType) || isUnknownType(genericType) || isAnyType(genericType) ? value : genericType === Array ? new Array(...value) : new genericType(value, void 0, isJSONParse);
}
class UTSType {
  static get$UTSMetadata$(...args) {
    return {
      name: "",
      kind: UTS_CLASS_METADATA_KIND.TYPE,
      interfaces: [],
      fields: {}
    };
  }
  get $UTSMetadata$() {
    return UTSType.get$UTSMetadata$();
  }
  // TODO 缓存withGenerics结果
  static withGenerics(parent, generics, isJSONParse = false) {
    if (isJSONParse) {
      const illegalGeneric = generics.find((item) => !(item === Array || isBaseType(item) || isUnknownType(item) || isAnyType(item) || item === UTSJSONObject || item.prototype && item.prototype instanceof UTSType));
      if (illegalGeneric) {
        throw new Error("Generic is not UTSType or Array or UTSJSONObject or base type, generic: " + illegalGeneric);
      }
    }
    if (parent === Array) {
      return class UTSArray extends UTSType {
        constructor(options, isJSONParse2 = false) {
          if (!Array.isArray(options)) {
            throw new UTSError(`Failed to contruct type, ${options} is not an array`);
          }
          super();
          return options.map((item) => {
            return normalizeGenericValue(item, generics[0], isJSONParse2);
          });
        }
      };
    } else if (parent === Map || parent === WeakMap) {
      return class UTSMap extends UTSType {
        constructor(options, isJSONParse2 = false) {
          if (options == null || typeof options !== "object") {
            throw new UTSError(`Failed to contruct type, ${options} is not an object`);
          }
          super();
          const obj = new parent();
          for (const key in options) {
            obj.set(normalizeGenericValue(key, generics[0], isJSONParse2), normalizeGenericValue(options[key], generics[1], isJSONParse2));
          }
          return obj;
        }
      };
    } else if (isUTSType(parent)) {
      return class VirtualClassWithGenerics extends parent {
        static get$UTSMetadata$() {
          return parent.get$UTSMetadata$(...generics);
        }
        constructor(options, metadata = VirtualClassWithGenerics.get$UTSMetadata$(), isJSONParse2 = false) {
          super(options, metadata, isJSONParse2);
        }
      };
    } else {
      return parent;
    }
  }
  constructor() {
  }
  static initProps(options, metadata, isJSONParse = false) {
    const obj = {};
    if (!metadata.fields) {
      return obj;
    }
    for (const key in metadata.fields) {
      const { type, optional, jsonField } = metadata.fields[key];
      const realKey = isJSONParse ? jsonField || key : key;
      if (options[realKey] == null) {
        if (optional) {
          obj[key] = null;
          continue;
        } else {
          throw new UTSError(`Failed to contruct type, missing required property: ${key}`);
        }
      }
      if (isUTSType(type)) {
        obj[key] = isJSONParse ? (
          // @ts-ignore
          new type(options[realKey], void 0, isJSONParse)
        ) : options[realKey];
      } else if (type === Array) {
        if (!Array.isArray(options[realKey])) {
          throw new UTSError(`Failed to contruct type, property ${key} is not an array`);
        }
        obj[key] = options[realKey];
      } else {
        obj[key] = options[realKey];
      }
    }
    return obj;
  }
}
const OriginalJSON = JSON;
function createUTSJSONObject(obj) {
  const result = new UTSJSONObject({});
  for (const key in obj) {
    const value = obj[key];
    if (isPlainObject(value)) {
      result[key] = createUTSJSONObject(value);
    } else if (getType(value) === "array") {
      result[key] = value.map((item) => {
        if (isPlainObject(item)) {
          return createUTSJSONObject(item);
        } else {
          return item;
        }
      });
    } else {
      result[key] = value;
    }
  }
  return result;
}
function parseObjectOrArray(object, utsType) {
  const objectType = getType(object);
  if (object === null || objectType !== "object" && objectType !== "array") {
    return object;
  }
  if (utsType && utsType !== UTSJSONObject) {
    try {
      return new utsType(object, void 0, true);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  if (objectType === "array") {
    return object.map((value) => {
      return parseObjectOrArray(value);
    });
  } else if (objectType === "object") {
    return createUTSJSONObject(object);
  }
  return object;
}
const UTSJSON = {
  parse: (text, reviver, utsType) => {
    if (reviver && (isUTSType(reviver) || reviver === UTSJSONObject)) {
      utsType = reviver;
      reviver = void 0;
    }
    try {
      const parseResult = OriginalJSON.parse(text, reviver);
      return parseObjectOrArray(parseResult, utsType);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  parseArray(text, utsType) {
    try {
      const parseResult = OriginalJSON.parse(text);
      if (Array.isArray(parseResult)) {
        return parseObjectOrArray(parseResult, utsType ? UTSType.withGenerics(Array, [utsType], true) : void 0);
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  parseObject(text, utsType) {
    try {
      const parseResult = OriginalJSON.parse(text);
      if (Array.isArray(parseResult)) {
        return null;
      }
      return parseObjectOrArray(parseResult, utsType);
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  stringify: (value) => {
    return OriginalJSON.stringify(value);
  }
};
function mapGet(map, key) {
  if (!map.has(key)) {
    return null;
  }
  return map.get(key);
}
function stringCodePointAt(str, pos) {
  if (pos < 0 || pos >= str.length) {
    return null;
  }
  return str.codePointAt(pos);
}
function stringAt(str, pos) {
  if (pos < -str.length || pos >= str.length) {
    return null;
  }
  return str.at(pos);
}
function weakMapGet(map, key) {
  if (!map.has(key)) {
    return null;
  }
  return map.get(key);
}
const UTS$1 = {
  arrayAt,
  arrayFind,
  arrayFindLast,
  arrayPop,
  arrayShift,
  isInstanceOf,
  UTSType,
  mapGet,
  stringAt,
  stringCodePointAt,
  weakMapGet,
  JSON: UTSJSON
};
let UniError$1 = class UniError2 extends Error {
  constructor(errSubject, errCode, errMsg) {
    let options = {};
    const argsLength = Array.from(arguments).length;
    switch (argsLength) {
      case 0:
        errSubject = "";
        errMsg = "";
        errCode = 0;
        break;
      case 1:
        errMsg = errSubject;
        errSubject = "";
        errCode = 0;
        break;
      case 2:
        errMsg = errSubject;
        options = errCode;
        errCode = options.errCode || 0;
        errSubject = options.errSubject || "";
        break;
    }
    super(errMsg);
    this.name = "UniError";
    this.errSubject = errSubject;
    this.errCode = errCode;
    this.errMsg = errMsg;
    if (options.data) {
      this.data = options.data;
    }
    if (options.cause) {
      this.cause = options.cause;
    }
  }
  set errMsg(msg) {
    this.message = msg;
  }
  get errMsg() {
    return this.message;
  }
  toString() {
    return this.errMsg;
  }
  toJSON() {
    return {
      errSubject: this.errSubject,
      errCode: this.errCode,
      errMsg: this.errMsg,
      data: this.data,
      cause: this.cause && typeof this.cause.toJSON === "function" ? this.cause.toJSON() : this.cause
    };
  }
};
function initUTSJSONObjectProperties(obj) {
  const propertyList = [
    "_resolveKeyPath",
    "_getValue",
    "toJSON",
    "get",
    "set",
    "getAny",
    "getString",
    "getNumber",
    "getBoolean",
    "getJSON",
    "getArray",
    "toMap",
    "forEach"
  ];
  const propertyDescriptorMap = {};
  for (let i2 = 0; i2 < propertyList.length; i2++) {
    const property = propertyList[i2];
    propertyDescriptorMap[property] = {
      enumerable: false,
      value: obj[property]
    };
  }
  Object.defineProperties(obj, propertyDescriptorMap);
}
function getRealDefaultValue(defaultValue) {
  return defaultValue === void 0 ? null : defaultValue;
}
let UTSJSONObject$1 = class UTSJSONObject2 {
  static keys(obj) {
    return Object.keys(obj);
  }
  static assign(target, ...sources) {
    for (let i2 = 0; i2 < sources.length; i2++) {
      const source = sources[i2];
      for (let key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  constructor(content = {}) {
    if (content instanceof Map) {
      content.forEach((value, key) => {
        this[key] = value;
      });
    } else {
      for (const key in content) {
        if (Object.prototype.hasOwnProperty.call(content, key)) {
          this[key] = content[key];
        }
      }
    }
    initUTSJSONObjectProperties(this);
  }
  _resolveKeyPath(keyPath) {
    let token = "";
    const keyPathArr = [];
    let inOpenParentheses = false;
    for (let i2 = 0; i2 < keyPath.length; i2++) {
      const word = keyPath[i2];
      switch (word) {
        case ".":
          if (token.length > 0) {
            keyPathArr.push(token);
            token = "";
          }
          break;
        case "[": {
          inOpenParentheses = true;
          if (token.length > 0) {
            keyPathArr.push(token);
            token = "";
          }
          break;
        }
        case "]":
          if (inOpenParentheses) {
            if (token.length > 0) {
              const tokenFirstChar = token[0];
              const tokenLastChar = token[token.length - 1];
              if (tokenFirstChar === '"' && tokenLastChar === '"' || tokenFirstChar === "'" && tokenLastChar === "'" || tokenFirstChar === "`" && tokenLastChar === "`") {
                if (token.length > 2) {
                  token = token.slice(1, -1);
                } else {
                  return [];
                }
              } else if (!/^\d+$/.test(token)) {
                return [];
              }
              keyPathArr.push(token);
              token = "";
            } else {
              return [];
            }
            inOpenParentheses = false;
          } else {
            return [];
          }
          break;
        default:
          token += word;
          break;
      }
      if (i2 === keyPath.length - 1) {
        if (token.length > 0) {
          keyPathArr.push(token);
          token = "";
        }
      }
    }
    return keyPathArr;
  }
  _getValue(keyPath, defaultValue) {
    const keyPathArr = this._resolveKeyPath(keyPath);
    const realDefaultValue = getRealDefaultValue(defaultValue);
    if (keyPathArr.length === 0) {
      return realDefaultValue;
    }
    let value = this;
    for (let i2 = 0; i2 < keyPathArr.length; i2++) {
      const key = keyPathArr[i2];
      if (value instanceof Object) {
        if (key in value) {
          value = value[key];
        } else {
          return realDefaultValue;
        }
      } else {
        return realDefaultValue;
      }
    }
    return value;
  }
  get(key) {
    return this._getValue(key);
  }
  set(key, value) {
    this[key] = value;
  }
  getAny(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    return this._getValue(key, realDefaultValue);
  }
  getString(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    const value = this._getValue(key, realDefaultValue);
    if (typeof value === "string") {
      return value;
    } else {
      return realDefaultValue;
    }
  }
  getNumber(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    const value = this._getValue(key, realDefaultValue);
    if (typeof value === "number") {
      return value;
    } else {
      return realDefaultValue;
    }
  }
  getBoolean(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    const boolean = this._getValue(key, realDefaultValue);
    if (typeof boolean === "boolean") {
      return boolean;
    } else {
      return realDefaultValue;
    }
  }
  getJSON(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    let value = this._getValue(key, realDefaultValue);
    if (value instanceof Object) {
      return value;
    } else {
      return realDefaultValue;
    }
  }
  getArray(key, defaultValue) {
    const realDefaultValue = getRealDefaultValue(defaultValue);
    let value = this._getValue(key, realDefaultValue);
    if (value instanceof Array) {
      return value;
    } else {
      return realDefaultValue;
    }
  }
  toMap() {
    let map = /* @__PURE__ */ new Map();
    for (let key in this) {
      map.set(key, this[key]);
    }
    return map;
  }
  forEach(callback) {
    for (let key in this) {
      callback(this[key], key);
    }
  }
};
let UTSValueIterable$1 = class UTSValueIterable2 {
};
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  function g2() {
    return this;
  }
  if (typeof g2() !== "undefined") {
    return g2();
  }
  return function() {
    return new Function("return this")();
  }();
}
const realGlobal = getGlobal();
realGlobal.UTSJSONObject = UTSJSONObject$1;
realGlobal.UniError = UniError$1;
realGlobal.UTS = UTS$1;
realGlobal.UTSValueIterable = UTSValueIterable$1;
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      {
        const { $templateUniElementRefs } = instance;
        if ($templateUniElementRefs && $templateUniElementRefs.length) {
          $templateUniElementRefs.forEach((templateRef) => {
            if (isString(templateRef.r)) {
              $refs[templateRef.r] = templateRef.v;
            }
          });
        }
      }
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function getLocaleLanguage() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  {
    Object.defineProperties(ctx, {
      // only id
      [VIRTUAL_HOST_ID]: {
        get() {
          const id = this.$scope.data[VIRTUAL_HOST_ID];
          return id === void 0 ? "" : id;
        }
      }
    });
  }
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
  {
    onUpdated(() => {
      pruneUniElements(instance);
    }, instance);
    onUnmounted(() => {
      destroyUniElements(instance);
    }, instance);
  }
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance;
      {
        this.vm = this.$vm;
      }
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope && ctx.$callHook) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const onErrorHandlers = wx.$onErrorHandlers;
  if (onErrorHandlers) {
    onErrorHandlers.forEach((fn) => {
      injectHook(ON_ERROR, fn, internalInstance);
    });
    onErrorHandlers.length = 0;
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(getLocaleLanguage());
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    let observerSlots = function(newVal) {
      const $slots = /* @__PURE__ */ Object.create(null);
      newVal && newVal.forEach((slotName) => {
        $slots[slotName] = true;
      });
      this.setData({
        $slots
      });
    };
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: []
    };
    {
      properties.uS.observer = observerSlots;
    }
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties[VIRTUAL_HOST_STYLE] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_CLASS] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_HIDDEN] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_ID] = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$1(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject$1(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(resolvePropValue(properties.uP))) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$1(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = resolvePropValue(properties[name]);
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function resolvePropValue(prop) {
  return prop;
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(resolvePropValue(up), this.$vm.$);
    } else if (resolvePropValue(this.properties.uT) === "m") {
      updateMiniProgramComponentProperties(resolvePropValue(up), this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, isPageInProject, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (!isPageInProject) {
    options.virtualHost = true;
  }
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    {
      const rootElement = vueComponentOptions.rootElement;
      if (rootElement) {
        registerCustomElement(rootElement.name, rootElement.class);
      }
    }
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    isPageInProject: true,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    {
      this.options = new UTSJSONObject(query || {});
    }
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [
      customizeEvent(event),
      ...args
    ]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      {
        this.vm = this.$vm;
      }
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var gtpushMin = { exports: {} };
/*! For license information please see gtpush-min.js.LICENSE.txt */
(function(module2, exports2) {
  (function t2(e2, r2) {
    module2.exports = r2();
  })(self, () => (() => {
    var t2 = { 4736: (t22, e22, r22) => {
      t22 = r22.nmd(t22);
      var i22;
      var n2 = function(t3) {
        var e3 = 1e7, r3 = 7, i3 = 9007199254740992, s2 = d2(i3), a2 = "0123456789abcdefghijklmnopqrstuvwxyz";
        var o2 = "function" === typeof BigInt;
        function u2(t4, e4, r4, i4) {
          if ("undefined" === typeof t4)
            return u2[0];
          if ("undefined" !== typeof e4)
            return 10 === +e4 && !r4 ? st2(t4) : X2(t4, e4, r4, i4);
          return st2(t4);
        }
        function c2(t4, e4) {
          this.value = t4;
          this.sign = e4;
          this.isSmall = false;
        }
        c2.prototype = Object.create(u2.prototype);
        function l2(t4) {
          this.value = t4;
          this.sign = t4 < 0;
          this.isSmall = true;
        }
        l2.prototype = Object.create(u2.prototype);
        function f2(t4) {
          this.value = t4;
        }
        f2.prototype = Object.create(u2.prototype);
        function h2(t4) {
          return -i3 < t4 && t4 < i3;
        }
        function d2(t4) {
          if (t4 < 1e7)
            return [t4];
          if (t4 < 1e14)
            return [t4 % 1e7, Math.floor(t4 / 1e7)];
          return [t4 % 1e7, Math.floor(t4 / 1e7) % 1e7, Math.floor(t4 / 1e14)];
        }
        function v2(t4) {
          p2(t4);
          var r4 = t4.length;
          if (r4 < 4 && N2(t4, s2) < 0)
            switch (r4) {
              case 0:
                return 0;
              case 1:
                return t4[0];
              case 2:
                return t4[0] + t4[1] * e3;
              default:
                return t4[0] + (t4[1] + t4[2] * e3) * e3;
            }
          return t4;
        }
        function p2(t4) {
          var e4 = t4.length;
          while (0 === t4[--e4])
            ;
          t4.length = e4 + 1;
        }
        function g2(t4) {
          var e4 = new Array(t4);
          var r4 = -1;
          while (++r4 < t4)
            e4[r4] = 0;
          return e4;
        }
        function y2(t4) {
          if (t4 > 0)
            return Math.floor(t4);
          return Math.ceil(t4);
        }
        function m2(t4, r4) {
          var i4 = t4.length, n22 = r4.length, s22 = new Array(i4), a22 = 0, o22 = e3, u22, c22;
          for (c22 = 0; c22 < n22; c22++) {
            u22 = t4[c22] + r4[c22] + a22;
            a22 = u22 >= o22 ? 1 : 0;
            s22[c22] = u22 - a22 * o22;
          }
          while (c22 < i4) {
            u22 = t4[c22] + a22;
            a22 = u22 === o22 ? 1 : 0;
            s22[c22++] = u22 - a22 * o22;
          }
          if (a22 > 0)
            s22.push(a22);
          return s22;
        }
        function w2(t4, e4) {
          if (t4.length >= e4.length)
            return m2(t4, e4);
          return m2(e4, t4);
        }
        function S2(t4, r4) {
          var i4 = t4.length, n22 = new Array(i4), s22 = e3, a22, o22;
          for (o22 = 0; o22 < i4; o22++) {
            a22 = t4[o22] - s22 + r4;
            r4 = Math.floor(a22 / s22);
            n22[o22] = a22 - r4 * s22;
            r4 += 1;
          }
          while (r4 > 0) {
            n22[o22++] = r4 % s22;
            r4 = Math.floor(r4 / s22);
          }
          return n22;
        }
        c2.prototype.add = function(t4) {
          var e4 = st2(t4);
          if (this.sign !== e4.sign)
            return this.subtract(e4.negate());
          var r4 = this.value, i4 = e4.value;
          if (e4.isSmall)
            return new c2(S2(r4, Math.abs(i4)), this.sign);
          return new c2(w2(r4, i4), this.sign);
        };
        c2.prototype.plus = c2.prototype.add;
        l2.prototype.add = function(t4) {
          var e4 = st2(t4);
          var r4 = this.value;
          if (r4 < 0 !== e4.sign)
            return this.subtract(e4.negate());
          var i4 = e4.value;
          if (e4.isSmall) {
            if (h2(r4 + i4))
              return new l2(r4 + i4);
            i4 = d2(Math.abs(i4));
          }
          return new c2(S2(i4, Math.abs(r4)), r4 < 0);
        };
        l2.prototype.plus = l2.prototype.add;
        f2.prototype.add = function(t4) {
          return new f2(this.value + st2(t4).value);
        };
        f2.prototype.plus = f2.prototype.add;
        function _2(t4, r4) {
          var i4 = t4.length, n22 = r4.length, s22 = new Array(i4), a22 = 0, o22 = e3, u22, c22;
          for (u22 = 0; u22 < n22; u22++) {
            c22 = t4[u22] - a22 - r4[u22];
            if (c22 < 0) {
              c22 += o22;
              a22 = 1;
            } else
              a22 = 0;
            s22[u22] = c22;
          }
          for (u22 = n22; u22 < i4; u22++) {
            c22 = t4[u22] - a22;
            if (c22 < 0)
              c22 += o22;
            else {
              s22[u22++] = c22;
              break;
            }
            s22[u22] = c22;
          }
          for (; u22 < i4; u22++)
            s22[u22] = t4[u22];
          p2(s22);
          return s22;
        }
        function b2(t4, e4, r4) {
          var i4;
          if (N2(t4, e4) >= 0)
            i4 = _2(t4, e4);
          else {
            i4 = _2(e4, t4);
            r4 = !r4;
          }
          i4 = v2(i4);
          if ("number" === typeof i4) {
            if (r4)
              i4 = -i4;
            return new l2(i4);
          }
          return new c2(i4, r4);
        }
        function E2(t4, r4, i4) {
          var n22 = t4.length, s22 = new Array(n22), a22 = -r4, o22 = e3, u22, f22;
          for (u22 = 0; u22 < n22; u22++) {
            f22 = t4[u22] + a22;
            a22 = Math.floor(f22 / o22);
            f22 %= o22;
            s22[u22] = f22 < 0 ? f22 + o22 : f22;
          }
          s22 = v2(s22);
          if ("number" === typeof s22) {
            if (i4)
              s22 = -s22;
            return new l2(s22);
          }
          return new c2(s22, i4);
        }
        c2.prototype.subtract = function(t4) {
          var e4 = st2(t4);
          if (this.sign !== e4.sign)
            return this.add(e4.negate());
          var r4 = this.value, i4 = e4.value;
          if (e4.isSmall)
            return E2(r4, Math.abs(i4), this.sign);
          return b2(r4, i4, this.sign);
        };
        c2.prototype.minus = c2.prototype.subtract;
        l2.prototype.subtract = function(t4) {
          var e4 = st2(t4);
          var r4 = this.value;
          if (r4 < 0 !== e4.sign)
            return this.add(e4.negate());
          var i4 = e4.value;
          if (e4.isSmall)
            return new l2(r4 - i4);
          return E2(i4, Math.abs(r4), r4 >= 0);
        };
        l2.prototype.minus = l2.prototype.subtract;
        f2.prototype.subtract = function(t4) {
          return new f2(this.value - st2(t4).value);
        };
        f2.prototype.minus = f2.prototype.subtract;
        c2.prototype.negate = function() {
          return new c2(this.value, !this.sign);
        };
        l2.prototype.negate = function() {
          var t4 = this.sign;
          var e4 = new l2(-this.value);
          e4.sign = !t4;
          return e4;
        };
        f2.prototype.negate = function() {
          return new f2(-this.value);
        };
        c2.prototype.abs = function() {
          return new c2(this.value, false);
        };
        l2.prototype.abs = function() {
          return new l2(Math.abs(this.value));
        };
        f2.prototype.abs = function() {
          return new f2(this.value >= 0 ? this.value : -this.value);
        };
        function D2(t4, r4) {
          var i4 = t4.length, n22 = r4.length, s22 = i4 + n22, a22 = g2(s22), o22 = e3, u22, c22, l22, f22, h22;
          for (l22 = 0; l22 < i4; ++l22) {
            f22 = t4[l22];
            for (var d22 = 0; d22 < n22; ++d22) {
              h22 = r4[d22];
              u22 = f22 * h22 + a22[l22 + d22];
              c22 = Math.floor(u22 / o22);
              a22[l22 + d22] = u22 - c22 * o22;
              a22[l22 + d22 + 1] += c22;
            }
          }
          p2(a22);
          return a22;
        }
        function M2(t4, r4) {
          var i4 = t4.length, n22 = new Array(i4), s22 = e3, a22 = 0, o22, u22;
          for (u22 = 0; u22 < i4; u22++) {
            o22 = t4[u22] * r4 + a22;
            a22 = Math.floor(o22 / s22);
            n22[u22] = o22 - a22 * s22;
          }
          while (a22 > 0) {
            n22[u22++] = a22 % s22;
            a22 = Math.floor(a22 / s22);
          }
          return n22;
        }
        function T2(t4, e4) {
          var r4 = [];
          while (e4-- > 0)
            r4.push(0);
          return r4.concat(t4);
        }
        function I2(t4, e4) {
          var r4 = Math.max(t4.length, e4.length);
          if (r4 <= 30)
            return D2(t4, e4);
          r4 = Math.ceil(r4 / 2);
          var i4 = t4.slice(r4), n22 = t4.slice(0, r4), s22 = e4.slice(r4), a22 = e4.slice(0, r4);
          var o22 = I2(n22, a22), u22 = I2(i4, s22), c22 = I2(w2(n22, i4), w2(a22, s22));
          var l22 = w2(w2(o22, T2(_2(_2(c22, o22), u22), r4)), T2(u22, 2 * r4));
          p2(l22);
          return l22;
        }
        function A2(t4, e4) {
          return -0.012 * t4 - 0.012 * e4 + 15e-6 * t4 * e4 > 0;
        }
        c2.prototype.multiply = function(t4) {
          var r4 = st2(t4), i4 = this.value, n22 = r4.value, s22 = this.sign !== r4.sign, a22;
          if (r4.isSmall) {
            if (0 === n22)
              return u2[0];
            if (1 === n22)
              return this;
            if (-1 === n22)
              return this.negate();
            a22 = Math.abs(n22);
            if (a22 < e3)
              return new c2(M2(i4, a22), s22);
            n22 = d2(a22);
          }
          if (A2(i4.length, n22.length))
            return new c2(I2(i4, n22), s22);
          return new c2(D2(i4, n22), s22);
        };
        c2.prototype.times = c2.prototype.multiply;
        function x(t4, r4, i4) {
          if (t4 < e3)
            return new c2(M2(r4, t4), i4);
          return new c2(D2(r4, d2(t4)), i4);
        }
        l2.prototype._multiplyBySmall = function(t4) {
          if (h2(t4.value * this.value))
            return new l2(t4.value * this.value);
          return x(Math.abs(t4.value), d2(Math.abs(this.value)), this.sign !== t4.sign);
        };
        c2.prototype._multiplyBySmall = function(t4) {
          if (0 === t4.value)
            return u2[0];
          if (1 === t4.value)
            return this;
          if (-1 === t4.value)
            return this.negate();
          return x(Math.abs(t4.value), this.value, this.sign !== t4.sign);
        };
        l2.prototype.multiply = function(t4) {
          return st2(t4)._multiplyBySmall(this);
        };
        l2.prototype.times = l2.prototype.multiply;
        f2.prototype.multiply = function(t4) {
          return new f2(this.value * st2(t4).value);
        };
        f2.prototype.times = f2.prototype.multiply;
        function R2(t4) {
          var r4 = t4.length, i4 = g2(r4 + r4), n22 = e3, s22, a22, o22, u22, c22;
          for (o22 = 0; o22 < r4; o22++) {
            u22 = t4[o22];
            a22 = 0 - u22 * u22;
            for (var l22 = o22; l22 < r4; l22++) {
              c22 = t4[l22];
              s22 = 2 * (u22 * c22) + i4[o22 + l22] + a22;
              a22 = Math.floor(s22 / n22);
              i4[o22 + l22] = s22 - a22 * n22;
            }
            i4[o22 + r4] = a22;
          }
          p2(i4);
          return i4;
        }
        c2.prototype.square = function() {
          return new c2(R2(this.value), false);
        };
        l2.prototype.square = function() {
          var t4 = this.value * this.value;
          if (h2(t4))
            return new l2(t4);
          return new c2(R2(d2(Math.abs(this.value))), false);
        };
        f2.prototype.square = function(t4) {
          return new f2(this.value * this.value);
        };
        function B2(t4, r4) {
          var i4 = t4.length, n22 = r4.length, s22 = e3, a22 = g2(r4.length), o22 = r4[n22 - 1], u22 = Math.ceil(s22 / (2 * o22)), c22 = M2(t4, u22), l22 = M2(r4, u22), f22, h22, d22, p22, y22, m22, w22;
          if (c22.length <= i4)
            c22.push(0);
          l22.push(0);
          o22 = l22[n22 - 1];
          for (h22 = i4 - n22; h22 >= 0; h22--) {
            f22 = s22 - 1;
            if (c22[h22 + n22] !== o22)
              f22 = Math.floor((c22[h22 + n22] * s22 + c22[h22 + n22 - 1]) / o22);
            d22 = 0;
            p22 = 0;
            m22 = l22.length;
            for (y22 = 0; y22 < m22; y22++) {
              d22 += f22 * l22[y22];
              w22 = Math.floor(d22 / s22);
              p22 += c22[h22 + y22] - (d22 - w22 * s22);
              d22 = w22;
              if (p22 < 0) {
                c22[h22 + y22] = p22 + s22;
                p22 = -1;
              } else {
                c22[h22 + y22] = p22;
                p22 = 0;
              }
            }
            while (0 !== p22) {
              f22 -= 1;
              d22 = 0;
              for (y22 = 0; y22 < m22; y22++) {
                d22 += c22[h22 + y22] - s22 + l22[y22];
                if (d22 < 0) {
                  c22[h22 + y22] = d22 + s22;
                  d22 = 0;
                } else {
                  c22[h22 + y22] = d22;
                  d22 = 1;
                }
              }
              p22 += d22;
            }
            a22[h22] = f22;
          }
          c22 = k(c22, u22)[0];
          return [v2(a22), v2(c22)];
        }
        function O2(t4, r4) {
          var i4 = t4.length, n22 = r4.length, s22 = [], a22 = [], o22 = e3, u22, c22, l22, f22, h22;
          while (i4) {
            a22.unshift(t4[--i4]);
            p2(a22);
            if (N2(a22, r4) < 0) {
              s22.push(0);
              continue;
            }
            c22 = a22.length;
            l22 = a22[c22 - 1] * o22 + a22[c22 - 2];
            f22 = r4[n22 - 1] * o22 + r4[n22 - 2];
            if (c22 > n22)
              l22 = (l22 + 1) * o22;
            u22 = Math.ceil(l22 / f22);
            do {
              h22 = M2(r4, u22);
              if (N2(h22, a22) <= 0)
                break;
              u22--;
            } while (u22);
            s22.push(u22);
            a22 = _2(a22, h22);
          }
          s22.reverse();
          return [v2(s22), v2(a22)];
        }
        function k(t4, r4) {
          var i4 = t4.length, n22 = g2(i4), s22 = e3, a22, o22, u22, c22;
          u22 = 0;
          for (a22 = i4 - 1; a22 >= 0; --a22) {
            c22 = u22 * s22 + t4[a22];
            o22 = y2(c22 / r4);
            u22 = c22 - o22 * r4;
            n22[a22] = 0 | o22;
          }
          return [n22, 0 | u22];
        }
        function C2(t4, r4) {
          var i4, n22 = st2(r4);
          if (o2)
            return [new f2(t4.value / n22.value), new f2(t4.value % n22.value)];
          var s22 = t4.value, a22 = n22.value;
          var h22;
          if (0 === a22)
            throw new Error("Cannot divide by zero");
          if (t4.isSmall) {
            if (n22.isSmall)
              return [new l2(y2(s22 / a22)), new l2(s22 % a22)];
            return [u2[0], t4];
          }
          if (n22.isSmall) {
            if (1 === a22)
              return [t4, u2[0]];
            if (-1 == a22)
              return [t4.negate(), u2[0]];
            var p22 = Math.abs(a22);
            if (p22 < e3) {
              i4 = k(s22, p22);
              h22 = v2(i4[0]);
              var g22 = i4[1];
              if (t4.sign)
                g22 = -g22;
              if ("number" === typeof h22) {
                if (t4.sign !== n22.sign)
                  h22 = -h22;
                return [new l2(h22), new l2(g22)];
              }
              return [new c2(h22, t4.sign !== n22.sign), new l2(g22)];
            }
            a22 = d2(p22);
          }
          var m22 = N2(s22, a22);
          if (-1 === m22)
            return [u2[0], t4];
          if (0 === m22)
            return [u2[t4.sign === n22.sign ? 1 : -1], u2[0]];
          if (s22.length + a22.length <= 200)
            i4 = B2(s22, a22);
          else
            i4 = O2(s22, a22);
          h22 = i4[0];
          var w22 = t4.sign !== n22.sign, S22 = i4[1], _22 = t4.sign;
          if ("number" === typeof h22) {
            if (w22)
              h22 = -h22;
            h22 = new l2(h22);
          } else
            h22 = new c2(h22, w22);
          if ("number" === typeof S22) {
            if (_22)
              S22 = -S22;
            S22 = new l2(S22);
          } else
            S22 = new c2(S22, _22);
          return [h22, S22];
        }
        c2.prototype.divmod = function(t4) {
          var e4 = C2(this, t4);
          return { quotient: e4[0], remainder: e4[1] };
        };
        f2.prototype.divmod = l2.prototype.divmod = c2.prototype.divmod;
        c2.prototype.divide = function(t4) {
          return C2(this, t4)[0];
        };
        f2.prototype.over = f2.prototype.divide = function(t4) {
          return new f2(this.value / st2(t4).value);
        };
        l2.prototype.over = l2.prototype.divide = c2.prototype.over = c2.prototype.divide;
        c2.prototype.mod = function(t4) {
          return C2(this, t4)[1];
        };
        f2.prototype.mod = f2.prototype.remainder = function(t4) {
          return new f2(this.value % st2(t4).value);
        };
        l2.prototype.remainder = l2.prototype.mod = c2.prototype.remainder = c2.prototype.mod;
        c2.prototype.pow = function(t4) {
          var e4 = st2(t4), r4 = this.value, i4 = e4.value, n22, s22, a22;
          if (0 === i4)
            return u2[1];
          if (0 === r4)
            return u2[0];
          if (1 === r4)
            return u2[1];
          if (-1 === r4)
            return e4.isEven() ? u2[1] : u2[-1];
          if (e4.sign)
            return u2[0];
          if (!e4.isSmall)
            throw new Error("The exponent " + e4.toString() + " is too large.");
          if (this.isSmall) {
            if (h2(n22 = Math.pow(r4, i4)))
              return new l2(y2(n22));
          }
          s22 = this;
          a22 = u2[1];
          while (true) {
            if (i4 & true) {
              a22 = a22.times(s22);
              --i4;
            }
            if (0 === i4)
              break;
            i4 /= 2;
            s22 = s22.square();
          }
          return a22;
        };
        l2.prototype.pow = c2.prototype.pow;
        f2.prototype.pow = function(t4) {
          var e4 = st2(t4);
          var r4 = this.value, i4 = e4.value;
          var n22 = BigInt(0), s22 = BigInt(1), a22 = BigInt(2);
          if (i4 === n22)
            return u2[1];
          if (r4 === n22)
            return u2[0];
          if (r4 === s22)
            return u2[1];
          if (r4 === BigInt(-1))
            return e4.isEven() ? u2[1] : u2[-1];
          if (e4.isNegative())
            return new f2(n22);
          var o22 = this;
          var c22 = u2[1];
          while (true) {
            if ((i4 & s22) === s22) {
              c22 = c22.times(o22);
              --i4;
            }
            if (i4 === n22)
              break;
            i4 /= a22;
            o22 = o22.square();
          }
          return c22;
        };
        c2.prototype.modPow = function(t4, e4) {
          t4 = st2(t4);
          e4 = st2(e4);
          if (e4.isZero())
            throw new Error("Cannot take modPow with modulus 0");
          var r4 = u2[1], i4 = this.mod(e4);
          if (t4.isNegative()) {
            t4 = t4.multiply(u2[-1]);
            i4 = i4.modInv(e4);
          }
          while (t4.isPositive()) {
            if (i4.isZero())
              return u2[0];
            if (t4.isOdd())
              r4 = r4.multiply(i4).mod(e4);
            t4 = t4.divide(2);
            i4 = i4.square().mod(e4);
          }
          return r4;
        };
        f2.prototype.modPow = l2.prototype.modPow = c2.prototype.modPow;
        function N2(t4, e4) {
          if (t4.length !== e4.length)
            return t4.length > e4.length ? 1 : -1;
          for (var r4 = t4.length - 1; r4 >= 0; r4--)
            if (t4[r4] !== e4[r4])
              return t4[r4] > e4[r4] ? 1 : -1;
          return 0;
        }
        c2.prototype.compareAbs = function(t4) {
          var e4 = st2(t4), r4 = this.value, i4 = e4.value;
          if (e4.isSmall)
            return 1;
          return N2(r4, i4);
        };
        l2.prototype.compareAbs = function(t4) {
          var e4 = st2(t4), r4 = Math.abs(this.value), i4 = e4.value;
          if (e4.isSmall) {
            i4 = Math.abs(i4);
            return r4 === i4 ? 0 : r4 > i4 ? 1 : -1;
          }
          return -1;
        };
        f2.prototype.compareAbs = function(t4) {
          var e4 = this.value;
          var r4 = st2(t4).value;
          e4 = e4 >= 0 ? e4 : -e4;
          r4 = r4 >= 0 ? r4 : -r4;
          return e4 === r4 ? 0 : e4 > r4 ? 1 : -1;
        };
        c2.prototype.compare = function(t4) {
          if (t4 === 1 / 0)
            return -1;
          if (t4 === -1 / 0)
            return 1;
          var e4 = st2(t4), r4 = this.value, i4 = e4.value;
          if (this.sign !== e4.sign)
            return e4.sign ? 1 : -1;
          if (e4.isSmall)
            return this.sign ? -1 : 1;
          return N2(r4, i4) * (this.sign ? -1 : 1);
        };
        c2.prototype.compareTo = c2.prototype.compare;
        l2.prototype.compare = function(t4) {
          if (t4 === 1 / 0)
            return -1;
          if (t4 === -1 / 0)
            return 1;
          var e4 = st2(t4), r4 = this.value, i4 = e4.value;
          if (e4.isSmall)
            return r4 == i4 ? 0 : r4 > i4 ? 1 : -1;
          if (r4 < 0 !== e4.sign)
            return r4 < 0 ? -1 : 1;
          return r4 < 0 ? 1 : -1;
        };
        l2.prototype.compareTo = l2.prototype.compare;
        f2.prototype.compare = function(t4) {
          if (t4 === 1 / 0)
            return -1;
          if (t4 === -1 / 0)
            return 1;
          var e4 = this.value;
          var r4 = st2(t4).value;
          return e4 === r4 ? 0 : e4 > r4 ? 1 : -1;
        };
        f2.prototype.compareTo = f2.prototype.compare;
        c2.prototype.equals = function(t4) {
          return 0 === this.compare(t4);
        };
        f2.prototype.eq = f2.prototype.equals = l2.prototype.eq = l2.prototype.equals = c2.prototype.eq = c2.prototype.equals;
        c2.prototype.notEquals = function(t4) {
          return 0 !== this.compare(t4);
        };
        f2.prototype.neq = f2.prototype.notEquals = l2.prototype.neq = l2.prototype.notEquals = c2.prototype.neq = c2.prototype.notEquals;
        c2.prototype.greater = function(t4) {
          return this.compare(t4) > 0;
        };
        f2.prototype.gt = f2.prototype.greater = l2.prototype.gt = l2.prototype.greater = c2.prototype.gt = c2.prototype.greater;
        c2.prototype.lesser = function(t4) {
          return this.compare(t4) < 0;
        };
        f2.prototype.lt = f2.prototype.lesser = l2.prototype.lt = l2.prototype.lesser = c2.prototype.lt = c2.prototype.lesser;
        c2.prototype.greaterOrEquals = function(t4) {
          return this.compare(t4) >= 0;
        };
        f2.prototype.geq = f2.prototype.greaterOrEquals = l2.prototype.geq = l2.prototype.greaterOrEquals = c2.prototype.geq = c2.prototype.greaterOrEquals;
        c2.prototype.lesserOrEquals = function(t4) {
          return this.compare(t4) <= 0;
        };
        f2.prototype.leq = f2.prototype.lesserOrEquals = l2.prototype.leq = l2.prototype.lesserOrEquals = c2.prototype.leq = c2.prototype.lesserOrEquals;
        c2.prototype.isEven = function() {
          return 0 === (1 & this.value[0]);
        };
        l2.prototype.isEven = function() {
          return 0 === (1 & this.value);
        };
        f2.prototype.isEven = function() {
          return (this.value & BigInt(1)) === BigInt(0);
        };
        c2.prototype.isOdd = function() {
          return 1 === (1 & this.value[0]);
        };
        l2.prototype.isOdd = function() {
          return 1 === (1 & this.value);
        };
        f2.prototype.isOdd = function() {
          return (this.value & BigInt(1)) === BigInt(1);
        };
        c2.prototype.isPositive = function() {
          return !this.sign;
        };
        l2.prototype.isPositive = function() {
          return this.value > 0;
        };
        f2.prototype.isPositive = l2.prototype.isPositive;
        c2.prototype.isNegative = function() {
          return this.sign;
        };
        l2.prototype.isNegative = function() {
          return this.value < 0;
        };
        f2.prototype.isNegative = l2.prototype.isNegative;
        c2.prototype.isUnit = function() {
          return false;
        };
        l2.prototype.isUnit = function() {
          return 1 === Math.abs(this.value);
        };
        f2.prototype.isUnit = function() {
          return this.abs().value === BigInt(1);
        };
        c2.prototype.isZero = function() {
          return false;
        };
        l2.prototype.isZero = function() {
          return 0 === this.value;
        };
        f2.prototype.isZero = function() {
          return this.value === BigInt(0);
        };
        c2.prototype.isDivisibleBy = function(t4) {
          var e4 = st2(t4);
          if (e4.isZero())
            return false;
          if (e4.isUnit())
            return true;
          if (0 === e4.compareAbs(2))
            return this.isEven();
          return this.mod(e4).isZero();
        };
        f2.prototype.isDivisibleBy = l2.prototype.isDivisibleBy = c2.prototype.isDivisibleBy;
        function P2(t4) {
          var e4 = t4.abs();
          if (e4.isUnit())
            return false;
          if (e4.equals(2) || e4.equals(3) || e4.equals(5))
            return true;
          if (e4.isEven() || e4.isDivisibleBy(3) || e4.isDivisibleBy(5))
            return false;
          if (e4.lesser(49))
            return true;
        }
        function V2(t4, e4) {
          var r4 = t4.prev(), i4 = r4, s22 = 0, a22, u22, c22;
          while (i4.isEven())
            i4 = i4.divide(2), s22++;
          t:
            for (u22 = 0; u22 < e4.length; u22++) {
              if (t4.lesser(e4[u22]))
                continue;
              c22 = n2(e4[u22]).modPow(i4, t4);
              if (c22.isUnit() || c22.equals(r4))
                continue;
              for (a22 = s22 - 1; 0 != a22; a22--) {
                c22 = c22.square().mod(t4);
                if (c22.isUnit())
                  return false;
                if (c22.equals(r4))
                  continue t;
              }
              return false;
            }
          return true;
        }
        c2.prototype.isPrime = function(e4) {
          var r4 = P2(this);
          if (r4 !== t3)
            return r4;
          var i4 = this.abs();
          var s22 = i4.bitLength();
          if (s22 <= 64)
            return V2(i4, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
          var a22 = Math.log(2) * s22.toJSNumber();
          var o22 = Math.ceil(true === e4 ? 2 * Math.pow(a22, 2) : a22);
          for (var u22 = [], c22 = 0; c22 < o22; c22++)
            u22.push(n2(c22 + 2));
          return V2(i4, u22);
        };
        f2.prototype.isPrime = l2.prototype.isPrime = c2.prototype.isPrime;
        c2.prototype.isProbablePrime = function(e4, r4) {
          var i4 = P2(this);
          if (i4 !== t3)
            return i4;
          var s22 = this.abs();
          var a22 = e4 === t3 ? 5 : e4;
          for (var o22 = [], u22 = 0; u22 < a22; u22++)
            o22.push(n2.randBetween(2, s22.minus(2), r4));
          return V2(s22, o22);
        };
        f2.prototype.isProbablePrime = l2.prototype.isProbablePrime = c2.prototype.isProbablePrime;
        c2.prototype.modInv = function(t4) {
          var e4 = n2.zero, r4 = n2.one, i4 = st2(t4), s22 = this.abs(), a22, o22, u22;
          while (!s22.isZero()) {
            a22 = i4.divide(s22);
            o22 = e4;
            u22 = i4;
            e4 = r4;
            i4 = s22;
            r4 = o22.subtract(a22.multiply(r4));
            s22 = u22.subtract(a22.multiply(s22));
          }
          if (!i4.isUnit())
            throw new Error(this.toString() + " and " + t4.toString() + " are not co-prime");
          if (-1 === e4.compare(0))
            e4 = e4.add(t4);
          if (this.isNegative())
            return e4.negate();
          return e4;
        };
        f2.prototype.modInv = l2.prototype.modInv = c2.prototype.modInv;
        c2.prototype.next = function() {
          var t4 = this.value;
          if (this.sign)
            return E2(t4, 1, this.sign);
          return new c2(S2(t4, 1), this.sign);
        };
        l2.prototype.next = function() {
          var t4 = this.value;
          if (t4 + 1 < i3)
            return new l2(t4 + 1);
          return new c2(s2, false);
        };
        f2.prototype.next = function() {
          return new f2(this.value + BigInt(1));
        };
        c2.prototype.prev = function() {
          var t4 = this.value;
          if (this.sign)
            return new c2(S2(t4, 1), true);
          return E2(t4, 1, this.sign);
        };
        l2.prototype.prev = function() {
          var t4 = this.value;
          if (t4 - 1 > -i3)
            return new l2(t4 - 1);
          return new c2(s2, true);
        };
        f2.prototype.prev = function() {
          return new f2(this.value - BigInt(1));
        };
        var L2 = [1];
        while (2 * L2[L2.length - 1] <= e3)
          L2.push(2 * L2[L2.length - 1]);
        var H2 = L2.length, U = L2[H2 - 1];
        function K2(t4) {
          return Math.abs(t4) <= e3;
        }
        c2.prototype.shiftLeft = function(t4) {
          var e4 = st2(t4).toJSNumber();
          if (!K2(e4))
            throw new Error(String(e4) + " is too large for shifting.");
          if (e4 < 0)
            return this.shiftRight(-e4);
          var r4 = this;
          if (r4.isZero())
            return r4;
          while (e4 >= H2) {
            r4 = r4.multiply(U);
            e4 -= H2 - 1;
          }
          return r4.multiply(L2[e4]);
        };
        f2.prototype.shiftLeft = l2.prototype.shiftLeft = c2.prototype.shiftLeft;
        c2.prototype.shiftRight = function(t4) {
          var e4;
          var r4 = st2(t4).toJSNumber();
          if (!K2(r4))
            throw new Error(String(r4) + " is too large for shifting.");
          if (r4 < 0)
            return this.shiftLeft(-r4);
          var i4 = this;
          while (r4 >= H2) {
            if (i4.isZero() || i4.isNegative() && i4.isUnit())
              return i4;
            e4 = C2(i4, U);
            i4 = e4[1].isNegative() ? e4[0].prev() : e4[0];
            r4 -= H2 - 1;
          }
          e4 = C2(i4, L2[r4]);
          return e4[1].isNegative() ? e4[0].prev() : e4[0];
        };
        f2.prototype.shiftRight = l2.prototype.shiftRight = c2.prototype.shiftRight;
        function j2(t4, e4, r4) {
          e4 = st2(e4);
          var i4 = t4.isNegative(), s22 = e4.isNegative();
          var a22 = i4 ? t4.not() : t4, o22 = s22 ? e4.not() : e4;
          var u22 = 0, c22 = 0;
          var l22 = null, f22 = null;
          var h22 = [];
          while (!a22.isZero() || !o22.isZero()) {
            l22 = C2(a22, U);
            u22 = l22[1].toJSNumber();
            if (i4)
              u22 = U - 1 - u22;
            f22 = C2(o22, U);
            c22 = f22[1].toJSNumber();
            if (s22)
              c22 = U - 1 - c22;
            a22 = l22[0];
            o22 = f22[0];
            h22.push(r4(u22, c22));
          }
          var d22 = 0 !== r4(i4 ? 1 : 0, s22 ? 1 : 0) ? n2(-1) : n2(0);
          for (var v22 = h22.length - 1; v22 >= 0; v22 -= 1)
            d22 = d22.multiply(U).add(n2(h22[v22]));
          return d22;
        }
        c2.prototype.not = function() {
          return this.negate().prev();
        };
        f2.prototype.not = l2.prototype.not = c2.prototype.not;
        c2.prototype.and = function(t4) {
          return j2(this, t4, function(t5, e4) {
            return t5 & e4;
          });
        };
        f2.prototype.and = l2.prototype.and = c2.prototype.and;
        c2.prototype.or = function(t4) {
          return j2(this, t4, function(t5, e4) {
            return t5 | e4;
          });
        };
        f2.prototype.or = l2.prototype.or = c2.prototype.or;
        c2.prototype.xor = function(t4) {
          return j2(this, t4, function(t5, e4) {
            return t5 ^ e4;
          });
        };
        f2.prototype.xor = l2.prototype.xor = c2.prototype.xor;
        var q2 = 1 << 30, F2 = (e3 & -e3) * (e3 & -e3) | q2;
        function z2(t4) {
          var r4 = t4.value, i4 = "number" === typeof r4 ? r4 | q2 : "bigint" === typeof r4 ? r4 | BigInt(q2) : r4[0] + r4[1] * e3 | F2;
          return i4 & -i4;
        }
        function G2(t4, e4) {
          if (e4.compareTo(t4) <= 0) {
            var r4 = G2(t4, e4.square(e4));
            var i4 = r4.p;
            var s22 = r4.e;
            var a22 = i4.multiply(e4);
            return a22.compareTo(t4) <= 0 ? { p: a22, e: 2 * s22 + 1 } : { p: i4, e: 2 * s22 };
          }
          return { p: n2(1), e: 0 };
        }
        c2.prototype.bitLength = function() {
          var t4 = this;
          if (t4.compareTo(n2(0)) < 0)
            t4 = t4.negate().subtract(n2(1));
          if (0 === t4.compareTo(n2(0)))
            return n2(0);
          return n2(G2(t4, n2(2)).e).add(n2(1));
        };
        f2.prototype.bitLength = l2.prototype.bitLength = c2.prototype.bitLength;
        function Y2(t4, e4) {
          t4 = st2(t4);
          e4 = st2(e4);
          return t4.greater(e4) ? t4 : e4;
        }
        function W2(t4, e4) {
          t4 = st2(t4);
          e4 = st2(e4);
          return t4.lesser(e4) ? t4 : e4;
        }
        function J2(t4, e4) {
          t4 = st2(t4).abs();
          e4 = st2(e4).abs();
          if (t4.equals(e4))
            return t4;
          if (t4.isZero())
            return e4;
          if (e4.isZero())
            return t4;
          var r4 = u2[1], i4, n22;
          while (t4.isEven() && e4.isEven()) {
            i4 = W2(z2(t4), z2(e4));
            t4 = t4.divide(i4);
            e4 = e4.divide(i4);
            r4 = r4.multiply(i4);
          }
          while (t4.isEven())
            t4 = t4.divide(z2(t4));
          do {
            while (e4.isEven())
              e4 = e4.divide(z2(e4));
            if (t4.greater(e4)) {
              n22 = e4;
              e4 = t4;
              t4 = n22;
            }
            e4 = e4.subtract(t4);
          } while (!e4.isZero());
          return r4.isUnit() ? t4 : t4.multiply(r4);
        }
        function Z2(t4, e4) {
          t4 = st2(t4).abs();
          e4 = st2(e4).abs();
          return t4.divide(J2(t4, e4)).multiply(e4);
        }
        function $2(t4, r4, i4) {
          t4 = st2(t4);
          r4 = st2(r4);
          var n22 = i4 || Math.random;
          var s22 = W2(t4, r4), a22 = Y2(t4, r4);
          var o22 = a22.subtract(s22).add(1);
          if (o22.isSmall)
            return s22.add(Math.floor(n22() * o22));
          var c22 = et2(o22, e3).value;
          var l22 = [], f22 = true;
          for (var h22 = 0; h22 < c22.length; h22++) {
            var d22 = f22 ? c22[h22] + (h22 + 1 < c22.length ? c22[h22 + 1] / e3 : 0) : e3;
            var v22 = y2(n22() * d22);
            l22.push(v22);
            if (v22 < c22[h22])
              f22 = false;
          }
          return s22.add(u2.fromArray(l22, e3, false));
        }
        var X2 = function(t4, e4, r4, i4) {
          r4 = r4 || a2;
          t4 = String(t4);
          if (!i4) {
            t4 = t4.toLowerCase();
            r4 = r4.toLowerCase();
          }
          var n22 = t4.length;
          var s22;
          var o22 = Math.abs(e4);
          var u22 = {};
          for (s22 = 0; s22 < r4.length; s22++)
            u22[r4[s22]] = s22;
          for (s22 = 0; s22 < n22; s22++) {
            var c22 = t4[s22];
            if ("-" === c22)
              continue;
            if (c22 in u22) {
              if (u22[c22] >= o22) {
                if ("1" === c22 && 1 === o22)
                  continue;
                throw new Error(c22 + " is not a valid digit in base " + e4 + ".");
              }
            }
          }
          e4 = st2(e4);
          var l22 = [];
          var f22 = "-" === t4[0];
          for (s22 = f22 ? 1 : 0; s22 < t4.length; s22++) {
            var c22 = t4[s22];
            if (c22 in u22)
              l22.push(st2(u22[c22]));
            else if ("<" === c22) {
              var h22 = s22;
              do {
                s22++;
              } while (">" !== t4[s22] && s22 < t4.length);
              l22.push(st2(t4.slice(h22 + 1, s22)));
            } else
              throw new Error(c22 + " is not a valid character");
          }
          return Q2(l22, e4, f22);
        };
        function Q2(t4, e4, r4) {
          var i4 = u2[0], n22 = u2[1], s22;
          for (s22 = t4.length - 1; s22 >= 0; s22--) {
            i4 = i4.add(t4[s22].times(n22));
            n22 = n22.times(e4);
          }
          return r4 ? i4.negate() : i4;
        }
        function tt2(t4, e4) {
          e4 = e4 || a2;
          if (t4 < e4.length)
            return e4[t4];
          return "<" + t4 + ">";
        }
        function et2(t4, e4) {
          e4 = n2(e4);
          if (e4.isZero()) {
            if (t4.isZero())
              return { value: [0], isNegative: false };
            throw new Error("Cannot convert nonzero numbers to base 0.");
          }
          if (e4.equals(-1)) {
            if (t4.isZero())
              return { value: [0], isNegative: false };
            if (t4.isNegative())
              return { value: [].concat.apply([], Array.apply(null, Array(-t4.toJSNumber())).map(Array.prototype.valueOf, [1, 0])), isNegative: false };
            var r4 = Array.apply(null, Array(t4.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
            r4.unshift([1]);
            return { value: [].concat.apply([], r4), isNegative: false };
          }
          var i4 = false;
          if (t4.isNegative() && e4.isPositive()) {
            i4 = true;
            t4 = t4.abs();
          }
          if (e4.isUnit()) {
            if (t4.isZero())
              return { value: [0], isNegative: false };
            return { value: Array.apply(null, Array(t4.toJSNumber())).map(Number.prototype.valueOf, 1), isNegative: i4 };
          }
          var s22 = [];
          var a22 = t4, o22;
          while (a22.isNegative() || a22.compareAbs(e4) >= 0) {
            o22 = a22.divmod(e4);
            a22 = o22.quotient;
            var u22 = o22.remainder;
            if (u22.isNegative()) {
              u22 = e4.minus(u22).abs();
              a22 = a22.next();
            }
            s22.push(u22.toJSNumber());
          }
          s22.push(a22.toJSNumber());
          return { value: s22.reverse(), isNegative: i4 };
        }
        function rt2(t4, e4, r4) {
          var i4 = et2(t4, e4);
          return (i4.isNegative ? "-" : "") + i4.value.map(function(t5) {
            return tt2(t5, r4);
          }).join("");
        }
        c2.prototype.toArray = function(t4) {
          return et2(this, t4);
        };
        l2.prototype.toArray = function(t4) {
          return et2(this, t4);
        };
        f2.prototype.toArray = function(t4) {
          return et2(this, t4);
        };
        c2.prototype.toString = function(e4, r4) {
          if (e4 === t3)
            e4 = 10;
          if (10 !== e4)
            return rt2(this, e4, r4);
          var i4 = this.value, n22 = i4.length, s22 = String(i4[--n22]), a22 = "0000000", o22;
          while (--n22 >= 0) {
            o22 = String(i4[n22]);
            s22 += a22.slice(o22.length) + o22;
          }
          var u22 = this.sign ? "-" : "";
          return u22 + s22;
        };
        l2.prototype.toString = function(e4, r4) {
          if (e4 === t3)
            e4 = 10;
          if (10 != e4)
            return rt2(this, e4, r4);
          return String(this.value);
        };
        f2.prototype.toString = l2.prototype.toString;
        f2.prototype.toJSON = c2.prototype.toJSON = l2.prototype.toJSON = function() {
          return this.toString();
        };
        c2.prototype.valueOf = function() {
          return parseInt(this.toString(), 10);
        };
        c2.prototype.toJSNumber = c2.prototype.valueOf;
        l2.prototype.valueOf = function() {
          return this.value;
        };
        l2.prototype.toJSNumber = l2.prototype.valueOf;
        f2.prototype.valueOf = f2.prototype.toJSNumber = function() {
          return parseInt(this.toString(), 10);
        };
        function it2(t4) {
          if (h2(+t4)) {
            var e4 = +t4;
            if (e4 === y2(e4))
              return o2 ? new f2(BigInt(e4)) : new l2(e4);
            throw new Error("Invalid integer: " + t4);
          }
          var i4 = "-" === t4[0];
          if (i4)
            t4 = t4.slice(1);
          var n22 = t4.split(/e/i);
          if (n22.length > 2)
            throw new Error("Invalid integer: " + n22.join("e"));
          if (2 === n22.length) {
            var s22 = n22[1];
            if ("+" === s22[0])
              s22 = s22.slice(1);
            s22 = +s22;
            if (s22 !== y2(s22) || !h2(s22))
              throw new Error("Invalid integer: " + s22 + " is not a valid exponent.");
            var a22 = n22[0];
            var u22 = a22.indexOf(".");
            if (u22 >= 0) {
              s22 -= a22.length - u22 - 1;
              a22 = a22.slice(0, u22) + a22.slice(u22 + 1);
            }
            if (s22 < 0)
              throw new Error("Cannot include negative exponent part for integers");
            a22 += new Array(s22 + 1).join("0");
            t4 = a22;
          }
          var d22 = /^([0-9][0-9]*)$/.test(t4);
          if (!d22)
            throw new Error("Invalid integer: " + t4);
          if (o2)
            return new f2(BigInt(i4 ? "-" + t4 : t4));
          var v22 = [], g22 = t4.length, m22 = r3, w22 = g22 - m22;
          while (g22 > 0) {
            v22.push(+t4.slice(w22, g22));
            w22 -= m22;
            if (w22 < 0)
              w22 = 0;
            g22 -= m22;
          }
          p2(v22);
          return new c2(v22, i4);
        }
        function nt2(t4) {
          if (o2)
            return new f2(BigInt(t4));
          if (h2(t4)) {
            if (t4 !== y2(t4))
              throw new Error(t4 + " is not an integer.");
            return new l2(t4);
          }
          return it2(t4.toString());
        }
        function st2(t4) {
          if ("number" === typeof t4)
            return nt2(t4);
          if ("string" === typeof t4)
            return it2(t4);
          if ("bigint" === typeof t4)
            return new f2(t4);
          return t4;
        }
        for (var at2 = 0; at2 < 1e3; at2++) {
          u2[at2] = st2(at2);
          if (at2 > 0)
            u2[-at2] = st2(-at2);
        }
        u2.one = u2[1];
        u2.zero = u2[0];
        u2.minusOne = u2[-1];
        u2.max = Y2;
        u2.min = W2;
        u2.gcd = J2;
        u2.lcm = Z2;
        u2.isInstance = function(t4) {
          return t4 instanceof c2 || t4 instanceof l2 || t4 instanceof f2;
        };
        u2.randBetween = $2;
        u2.fromArray = function(t4, e4, r4) {
          return Q2(t4.map(st2), st2(e4 || 10), r4);
        };
        return u2;
      }();
      if (t22.hasOwnProperty("exports"))
        t22.exports = n2;
      i22 = (function() {
        return n2;
      }).call(e22, r22, e22, t22), void 0 !== i22 && (t22.exports = i22);
    }, 452: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.BlockCipher;
          var n2 = e3.algo;
          var s2 = [];
          var a2 = [];
          var o2 = [];
          var u2 = [];
          var c2 = [];
          var l2 = [];
          var f2 = [];
          var h2 = [];
          var d2 = [];
          var v2 = [];
          (function() {
            var t4 = [];
            for (var e4 = 0; e4 < 256; e4++)
              if (e4 < 128)
                t4[e4] = e4 << 1;
              else
                t4[e4] = e4 << 1 ^ 283;
            var r4 = 0;
            var i3 = 0;
            for (var e4 = 0; e4 < 256; e4++) {
              var n22 = i3 ^ i3 << 1 ^ i3 << 2 ^ i3 << 3 ^ i3 << 4;
              n22 = n22 >>> 8 ^ 255 & n22 ^ 99;
              s2[r4] = n22;
              a2[n22] = r4;
              var p22 = t4[r4];
              var g22 = t4[p22];
              var y2 = t4[g22];
              var m2 = 257 * t4[n22] ^ 16843008 * n22;
              o2[r4] = m2 << 24 | m2 >>> 8;
              u2[r4] = m2 << 16 | m2 >>> 16;
              c2[r4] = m2 << 8 | m2 >>> 24;
              l2[r4] = m2;
              var m2 = 16843009 * y2 ^ 65537 * g22 ^ 257 * p22 ^ 16843008 * r4;
              f2[n22] = m2 << 24 | m2 >>> 8;
              h2[n22] = m2 << 16 | m2 >>> 16;
              d2[n22] = m2 << 8 | m2 >>> 24;
              v2[n22] = m2;
              if (!r4)
                r4 = i3 = 1;
              else {
                r4 = p22 ^ t4[t4[t4[y2 ^ p22]]];
                i3 ^= t4[t4[i3]];
              }
            }
          })();
          var p2 = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var g2 = n2.AES = i22.extend({ _doReset: function() {
            var t4;
            if (this._nRounds && this._keyPriorReset === this._key)
              return;
            var e4 = this._keyPriorReset = this._key;
            var r4 = e4.words;
            var i3 = e4.sigBytes / 4;
            var n22 = this._nRounds = i3 + 6;
            var a22 = 4 * (n22 + 1);
            var o22 = this._keySchedule = [];
            for (var u22 = 0; u22 < a22; u22++)
              if (u22 < i3)
                o22[u22] = r4[u22];
              else {
                t4 = o22[u22 - 1];
                if (!(u22 % i3)) {
                  t4 = t4 << 8 | t4 >>> 24;
                  t4 = s2[t4 >>> 24] << 24 | s2[t4 >>> 16 & 255] << 16 | s2[t4 >>> 8 & 255] << 8 | s2[255 & t4];
                  t4 ^= p2[u22 / i3 | 0] << 24;
                } else if (i3 > 6 && u22 % i3 == 4)
                  t4 = s2[t4 >>> 24] << 24 | s2[t4 >>> 16 & 255] << 16 | s2[t4 >>> 8 & 255] << 8 | s2[255 & t4];
                o22[u22] = o22[u22 - i3] ^ t4;
              }
            var c22 = this._invKeySchedule = [];
            for (var l22 = 0; l22 < a22; l22++) {
              var u22 = a22 - l22;
              if (l22 % 4)
                var t4 = o22[u22];
              else
                var t4 = o22[u22 - 4];
              if (l22 < 4 || u22 <= 4)
                c22[l22] = t4;
              else
                c22[l22] = f2[s2[t4 >>> 24]] ^ h2[s2[t4 >>> 16 & 255]] ^ d2[s2[t4 >>> 8 & 255]] ^ v2[s2[255 & t4]];
            }
          }, encryptBlock: function(t4, e4) {
            this._doCryptBlock(t4, e4, this._keySchedule, o2, u2, c2, l2, s2);
          }, decryptBlock: function(t4, e4) {
            var r4 = t4[e4 + 1];
            t4[e4 + 1] = t4[e4 + 3];
            t4[e4 + 3] = r4;
            this._doCryptBlock(t4, e4, this._invKeySchedule, f2, h2, d2, v2, a2);
            var r4 = t4[e4 + 1];
            t4[e4 + 1] = t4[e4 + 3];
            t4[e4 + 3] = r4;
          }, _doCryptBlock: function(t4, e4, r4, i3, n22, s22, a22, o22) {
            var u22 = this._nRounds;
            var c22 = t4[e4] ^ r4[0];
            var l22 = t4[e4 + 1] ^ r4[1];
            var f22 = t4[e4 + 2] ^ r4[2];
            var h22 = t4[e4 + 3] ^ r4[3];
            var d22 = 4;
            for (var v22 = 1; v22 < u22; v22++) {
              var p22 = i3[c22 >>> 24] ^ n22[l22 >>> 16 & 255] ^ s22[f22 >>> 8 & 255] ^ a22[255 & h22] ^ r4[d22++];
              var g22 = i3[l22 >>> 24] ^ n22[f22 >>> 16 & 255] ^ s22[h22 >>> 8 & 255] ^ a22[255 & c22] ^ r4[d22++];
              var y2 = i3[f22 >>> 24] ^ n22[h22 >>> 16 & 255] ^ s22[c22 >>> 8 & 255] ^ a22[255 & l22] ^ r4[d22++];
              var m2 = i3[h22 >>> 24] ^ n22[c22 >>> 16 & 255] ^ s22[l22 >>> 8 & 255] ^ a22[255 & f22] ^ r4[d22++];
              c22 = p22;
              l22 = g22;
              f22 = y2;
              h22 = m2;
            }
            var p22 = (o22[c22 >>> 24] << 24 | o22[l22 >>> 16 & 255] << 16 | o22[f22 >>> 8 & 255] << 8 | o22[255 & h22]) ^ r4[d22++];
            var g22 = (o22[l22 >>> 24] << 24 | o22[f22 >>> 16 & 255] << 16 | o22[h22 >>> 8 & 255] << 8 | o22[255 & c22]) ^ r4[d22++];
            var y2 = (o22[f22 >>> 24] << 24 | o22[h22 >>> 16 & 255] << 16 | o22[c22 >>> 8 & 255] << 8 | o22[255 & l22]) ^ r4[d22++];
            var m2 = (o22[h22 >>> 24] << 24 | o22[c22 >>> 16 & 255] << 16 | o22[l22 >>> 8 & 255] << 8 | o22[255 & f22]) ^ r4[d22++];
            t4[e4] = p22;
            t4[e4 + 1] = g22;
            t4[e4 + 2] = y2;
            t4[e4 + 3] = m2;
          }, keySize: 256 / 32 });
          e3.AES = i22._createHelper(g2);
        })();
        return t3.AES;
      });
    }, 5109: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(888));
      })(this, function(t3) {
        t3.lib.Cipher || function(e3) {
          var r3 = t3;
          var i22 = r3.lib;
          var n2 = i22.Base;
          var s2 = i22.WordArray;
          var a2 = i22.BufferedBlockAlgorithm;
          var o2 = r3.enc;
          o2.Utf8;
          var c2 = o2.Base64;
          var l2 = r3.algo;
          var f2 = l2.EvpKDF;
          var h2 = i22.Cipher = a2.extend({ cfg: n2.extend(), createEncryptor: function(t4, e4) {
            return this.create(this._ENC_XFORM_MODE, t4, e4);
          }, createDecryptor: function(t4, e4) {
            return this.create(this._DEC_XFORM_MODE, t4, e4);
          }, init: function(t4, e4, r4) {
            this.cfg = this.cfg.extend(r4);
            this._xformMode = t4;
            this._key = e4;
            this.reset();
          }, reset: function() {
            a2.reset.call(this);
            this._doReset();
          }, process: function(t4) {
            this._append(t4);
            return this._process();
          }, finalize: function(t4) {
            if (t4)
              this._append(t4);
            var e4 = this._doFinalize();
            return e4;
          }, keySize: 128 / 32, ivSize: 128 / 32, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: /* @__PURE__ */ function() {
            function t4(t5) {
              if ("string" == typeof t5)
                return T2;
              else
                return E2;
            }
            return function(e4) {
              return { encrypt: function(r4, i3, n22) {
                return t4(i3).encrypt(e4, r4, i3, n22);
              }, decrypt: function(r4, i3, n22) {
                return t4(i3).decrypt(e4, r4, i3, n22);
              } };
            };
          }() });
          i22.StreamCipher = h2.extend({ _doFinalize: function() {
            var t4 = this._process(true);
            return t4;
          }, blockSize: 1 });
          var v2 = r3.mode = {};
          var p2 = i22.BlockCipherMode = n2.extend({ createEncryptor: function(t4, e4) {
            return this.Encryptor.create(t4, e4);
          }, createDecryptor: function(t4, e4) {
            return this.Decryptor.create(t4, e4);
          }, init: function(t4, e4) {
            this._cipher = t4;
            this._iv = e4;
          } });
          var g2 = v2.CBC = function() {
            var t4 = p2.extend();
            t4.Encryptor = t4.extend({ processBlock: function(t5, e4) {
              var i3 = this._cipher;
              var n22 = i3.blockSize;
              r4.call(this, t5, e4, n22);
              i3.encryptBlock(t5, e4);
              this._prevBlock = t5.slice(e4, e4 + n22);
            } });
            t4.Decryptor = t4.extend({ processBlock: function(t5, e4) {
              var i3 = this._cipher;
              var n22 = i3.blockSize;
              var s22 = t5.slice(e4, e4 + n22);
              i3.decryptBlock(t5, e4);
              r4.call(this, t5, e4, n22);
              this._prevBlock = s22;
            } });
            function r4(t5, r5, i3) {
              var n22;
              var s22 = this._iv;
              if (s22) {
                n22 = s22;
                this._iv = e3;
              } else
                n22 = this._prevBlock;
              for (var a22 = 0; a22 < i3; a22++)
                t5[r5 + a22] ^= n22[a22];
            }
            return t4;
          }();
          var y2 = r3.pad = {};
          var m2 = y2.Pkcs7 = { pad: function(t4, e4) {
            var r4 = 4 * e4;
            var i3 = r4 - t4.sigBytes % r4;
            var n22 = i3 << 24 | i3 << 16 | i3 << 8 | i3;
            var a22 = [];
            for (var o22 = 0; o22 < i3; o22 += 4)
              a22.push(n22);
            var u2 = s2.create(a22, i3);
            t4.concat(u2);
          }, unpad: function(t4) {
            var e4 = 255 & t4.words[t4.sigBytes - 1 >>> 2];
            t4.sigBytes -= e4;
          } };
          i22.BlockCipher = h2.extend({ cfg: h2.cfg.extend({ mode: g2, padding: m2 }), reset: function() {
            var t4;
            h2.reset.call(this);
            var e4 = this.cfg;
            var r4 = e4.iv;
            var i3 = e4.mode;
            if (this._xformMode == this._ENC_XFORM_MODE)
              t4 = i3.createEncryptor;
            else {
              t4 = i3.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == t4)
              this._mode.init(this, r4 && r4.words);
            else {
              this._mode = t4.call(i3, this, r4 && r4.words);
              this._mode.__creator = t4;
            }
          }, _doProcessBlock: function(t4, e4) {
            this._mode.processBlock(t4, e4);
          }, _doFinalize: function() {
            var t4;
            var e4 = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              e4.pad(this._data, this.blockSize);
              t4 = this._process(true);
            } else {
              t4 = this._process(true);
              e4.unpad(t4);
            }
            return t4;
          }, blockSize: 128 / 32 });
          var S2 = i22.CipherParams = n2.extend({ init: function(t4) {
            this.mixIn(t4);
          }, toString: function(t4) {
            return (t4 || this.formatter).stringify(this);
          } });
          var _2 = r3.format = {};
          var b2 = _2.OpenSSL = { stringify: function(t4) {
            var e4;
            var r4 = t4.ciphertext;
            var i3 = t4.salt;
            if (i3)
              e4 = s2.create([1398893684, 1701076831]).concat(i3).concat(r4);
            else
              e4 = r4;
            return e4.toString(c2);
          }, parse: function(t4) {
            var e4;
            var r4 = c2.parse(t4);
            var i3 = r4.words;
            if (1398893684 == i3[0] && 1701076831 == i3[1]) {
              e4 = s2.create(i3.slice(2, 4));
              i3.splice(0, 4);
              r4.sigBytes -= 16;
            }
            return S2.create({ ciphertext: r4, salt: e4 });
          } };
          var E2 = i22.SerializableCipher = n2.extend({ cfg: n2.extend({ format: b2 }), encrypt: function(t4, e4, r4, i3) {
            i3 = this.cfg.extend(i3);
            var n22 = t4.createEncryptor(r4, i3);
            var s22 = n22.finalize(e4);
            var a22 = n22.cfg;
            return S2.create({ ciphertext: s22, key: r4, iv: a22.iv, algorithm: t4, mode: a22.mode, padding: a22.padding, blockSize: t4.blockSize, formatter: i3.format });
          }, decrypt: function(t4, e4, r4, i3) {
            i3 = this.cfg.extend(i3);
            e4 = this._parse(e4, i3.format);
            var n22 = t4.createDecryptor(r4, i3).finalize(e4.ciphertext);
            return n22;
          }, _parse: function(t4, e4) {
            if ("string" == typeof t4)
              return e4.parse(t4, this);
            else
              return t4;
          } });
          var D2 = r3.kdf = {};
          var M2 = D2.OpenSSL = { execute: function(t4, e4, r4, i3) {
            if (!i3)
              i3 = s2.random(64 / 8);
            var n22 = f2.create({ keySize: e4 + r4 }).compute(t4, i3);
            var a22 = s2.create(n22.words.slice(e4), 4 * r4);
            n22.sigBytes = 4 * e4;
            return S2.create({ key: n22, iv: a22, salt: i3 });
          } };
          var T2 = i22.PasswordBasedCipher = E2.extend({ cfg: E2.cfg.extend({ kdf: M2 }), encrypt: function(t4, e4, r4, i3) {
            i3 = this.cfg.extend(i3);
            var n22 = i3.kdf.execute(r4, t4.keySize, t4.ivSize);
            i3.iv = n22.iv;
            var s22 = E2.encrypt.call(this, t4, e4, n22.key, i3);
            s22.mixIn(n22);
            return s22;
          }, decrypt: function(t4, e4, r4, i3) {
            i3 = this.cfg.extend(i3);
            e4 = this._parse(e4, i3.format);
            var n22 = i3.kdf.execute(r4, t4.keySize, t4.ivSize, e4.salt);
            i3.iv = n22.iv;
            var s22 = E2.decrypt.call(this, t4, e4, n22.key, i3);
            return s22;
          } });
        }();
      });
    }, 8249: function(t22, e22, r22) {
      (function(r3, i22) {
        t22.exports = i22();
      })(this, function() {
        var t3 = t3 || function(t4, e3) {
          var i22;
          if ("undefined" !== typeof window && window.crypto)
            i22 = window.crypto;
          if ("undefined" !== typeof self && self.crypto)
            i22 = self.crypto;
          if ("undefined" !== typeof globalThis && globalThis.crypto)
            i22 = globalThis.crypto;
          if (!i22 && "undefined" !== typeof window && window.msCrypto)
            i22 = window.msCrypto;
          if (!i22 && "undefined" !== typeof r22.g && r22.g.crypto)
            i22 = r22.g.crypto;
          if (!i22 && true)
            try {
              i22 = r22(2480);
            } catch (t5) {
            }
          var n2 = function() {
            if (i22) {
              if ("function" === typeof i22.getRandomValues)
                try {
                  return i22.getRandomValues(new Uint32Array(1))[0];
                } catch (t5) {
                }
              if ("function" === typeof i22.randomBytes)
                try {
                  return i22.randomBytes(4).readInt32LE();
                } catch (t5) {
                }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var s2 = Object.create || /* @__PURE__ */ function() {
            function t5() {
            }
            return function(e4) {
              var r3;
              t5.prototype = e4;
              r3 = new t5();
              t5.prototype = null;
              return r3;
            };
          }();
          var a2 = {};
          var o2 = a2.lib = {};
          var u2 = o2.Base = /* @__PURE__ */ function() {
            return { extend: function(t5) {
              var e4 = s2(this);
              if (t5)
                e4.mixIn(t5);
              if (!e4.hasOwnProperty("init") || this.init === e4.init)
                e4.init = function() {
                  e4.$super.init.apply(this, arguments);
                };
              e4.init.prototype = e4;
              e4.$super = this;
              return e4;
            }, create: function() {
              var t5 = this.extend();
              t5.init.apply(t5, arguments);
              return t5;
            }, init: function() {
            }, mixIn: function(t5) {
              for (var e4 in t5)
                if (t5.hasOwnProperty(e4))
                  this[e4] = t5[e4];
              if (t5.hasOwnProperty("toString"))
                this.toString = t5.toString;
            }, clone: function() {
              return this.init.prototype.extend(this);
            } };
          }();
          var c2 = o2.WordArray = u2.extend({ init: function(t5, r3) {
            t5 = this.words = t5 || [];
            if (r3 != e3)
              this.sigBytes = r3;
            else
              this.sigBytes = 4 * t5.length;
          }, toString: function(t5) {
            return (t5 || f2).stringify(this);
          }, concat: function(t5) {
            var e4 = this.words;
            var r3 = t5.words;
            var i3 = this.sigBytes;
            var n22 = t5.sigBytes;
            this.clamp();
            if (i3 % 4)
              for (var s22 = 0; s22 < n22; s22++) {
                var a22 = r3[s22 >>> 2] >>> 24 - s22 % 4 * 8 & 255;
                e4[i3 + s22 >>> 2] |= a22 << 24 - (i3 + s22) % 4 * 8;
              }
            else
              for (var o22 = 0; o22 < n22; o22 += 4)
                e4[i3 + o22 >>> 2] = r3[o22 >>> 2];
            this.sigBytes += n22;
            return this;
          }, clamp: function() {
            var e4 = this.words;
            var r3 = this.sigBytes;
            e4[r3 >>> 2] &= 4294967295 << 32 - r3 % 4 * 8;
            e4.length = t4.ceil(r3 / 4);
          }, clone: function() {
            var t5 = u2.clone.call(this);
            t5.words = this.words.slice(0);
            return t5;
          }, random: function(t5) {
            var e4 = [];
            for (var r3 = 0; r3 < t5; r3 += 4)
              e4.push(n2());
            return new c2.init(e4, t5);
          } });
          var l2 = a2.enc = {};
          var f2 = l2.Hex = { stringify: function(t5) {
            var e4 = t5.words;
            var r3 = t5.sigBytes;
            var i3 = [];
            for (var n22 = 0; n22 < r3; n22++) {
              var s22 = e4[n22 >>> 2] >>> 24 - n22 % 4 * 8 & 255;
              i3.push((s22 >>> 4).toString(16));
              i3.push((15 & s22).toString(16));
            }
            return i3.join("");
          }, parse: function(t5) {
            var e4 = t5.length;
            var r3 = [];
            for (var i3 = 0; i3 < e4; i3 += 2)
              r3[i3 >>> 3] |= parseInt(t5.substr(i3, 2), 16) << 24 - i3 % 8 * 4;
            return new c2.init(r3, e4 / 2);
          } };
          var h2 = l2.Latin1 = { stringify: function(t5) {
            var e4 = t5.words;
            var r3 = t5.sigBytes;
            var i3 = [];
            for (var n22 = 0; n22 < r3; n22++) {
              var s22 = e4[n22 >>> 2] >>> 24 - n22 % 4 * 8 & 255;
              i3.push(String.fromCharCode(s22));
            }
            return i3.join("");
          }, parse: function(t5) {
            var e4 = t5.length;
            var r3 = [];
            for (var i3 = 0; i3 < e4; i3++)
              r3[i3 >>> 2] |= (255 & t5.charCodeAt(i3)) << 24 - i3 % 4 * 8;
            return new c2.init(r3, e4);
          } };
          var d2 = l2.Utf8 = { stringify: function(t5) {
            try {
              return decodeURIComponent(escape(h2.stringify(t5)));
            } catch (t6) {
              throw new Error("Malformed UTF-8 data");
            }
          }, parse: function(t5) {
            return h2.parse(unescape(encodeURIComponent(t5)));
          } };
          var v2 = o2.BufferedBlockAlgorithm = u2.extend({ reset: function() {
            this._data = new c2.init();
            this._nDataBytes = 0;
          }, _append: function(t5) {
            if ("string" == typeof t5)
              t5 = d2.parse(t5);
            this._data.concat(t5);
            this._nDataBytes += t5.sigBytes;
          }, _process: function(e4) {
            var r3;
            var i3 = this._data;
            var n22 = i3.words;
            var s22 = i3.sigBytes;
            var a22 = this.blockSize;
            var o22 = 4 * a22;
            var u22 = s22 / o22;
            if (e4)
              u22 = t4.ceil(u22);
            else
              u22 = t4.max((0 | u22) - this._minBufferSize, 0);
            var l22 = u22 * a22;
            var f22 = t4.min(4 * l22, s22);
            if (l22) {
              for (var h22 = 0; h22 < l22; h22 += a22)
                this._doProcessBlock(n22, h22);
              r3 = n22.splice(0, l22);
              i3.sigBytes -= f22;
            }
            return new c2.init(r3, f22);
          }, clone: function() {
            var t5 = u2.clone.call(this);
            t5._data = this._data.clone();
            return t5;
          }, _minBufferSize: 0 });
          o2.Hasher = v2.extend({ cfg: u2.extend(), init: function(t5) {
            this.cfg = this.cfg.extend(t5);
            this.reset();
          }, reset: function() {
            v2.reset.call(this);
            this._doReset();
          }, update: function(t5) {
            this._append(t5);
            this._process();
            return this;
          }, finalize: function(t5) {
            if (t5)
              this._append(t5);
            var e4 = this._doFinalize();
            return e4;
          }, blockSize: 512 / 32, _createHelper: function(t5) {
            return function(e4, r3) {
              return new t5.init(r3).finalize(e4);
            };
          }, _createHmacHelper: function(t5) {
            return function(e4, r3) {
              return new g2.HMAC.init(t5, r3).finalize(e4);
            };
          } });
          var g2 = a2.algo = {};
          return a2;
        }(Math);
        return t3;
      });
    }, 8269: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.WordArray;
          var n2 = e3.enc;
          n2.Base64 = { stringify: function(t4) {
            var e4 = t4.words;
            var r4 = t4.sigBytes;
            var i3 = this._map;
            t4.clamp();
            var n22 = [];
            for (var s2 = 0; s2 < r4; s2 += 3) {
              var a22 = e4[s2 >>> 2] >>> 24 - s2 % 4 * 8 & 255;
              var o2 = e4[s2 + 1 >>> 2] >>> 24 - (s2 + 1) % 4 * 8 & 255;
              var u2 = e4[s2 + 2 >>> 2] >>> 24 - (s2 + 2) % 4 * 8 & 255;
              var c2 = a22 << 16 | o2 << 8 | u2;
              for (var l2 = 0; l2 < 4 && s2 + 0.75 * l2 < r4; l2++)
                n22.push(i3.charAt(c2 >>> 6 * (3 - l2) & 63));
            }
            var f2 = i3.charAt(64);
            if (f2)
              while (n22.length % 4)
                n22.push(f2);
            return n22.join("");
          }, parse: function(t4) {
            var e4 = t4.length;
            var r4 = this._map;
            var i3 = this._reverseMap;
            if (!i3) {
              i3 = this._reverseMap = [];
              for (var n22 = 0; n22 < r4.length; n22++)
                i3[r4.charCodeAt(n22)] = n22;
            }
            var s2 = r4.charAt(64);
            if (s2) {
              var o2 = t4.indexOf(s2);
              if (-1 !== o2)
                e4 = o2;
            }
            return a2(t4, e4, i3);
          }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
          function a2(t4, e4, r4) {
            var n22 = [];
            var s2 = 0;
            for (var a22 = 0; a22 < e4; a22++)
              if (a22 % 4) {
                var o2 = r4[t4.charCodeAt(a22 - 1)] << a22 % 4 * 2;
                var u2 = r4[t4.charCodeAt(a22)] >>> 6 - a22 % 4 * 2;
                var c2 = o2 | u2;
                n22[s2 >>> 2] |= c2 << 24 - s2 % 4 * 8;
                s2++;
              }
            return i22.create(n22, s2);
          }
        })();
        return t3.enc.Base64;
      });
    }, 3786: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.WordArray;
          var n2 = e3.enc;
          n2.Base64url = { stringify: function(t4, e4 = true) {
            var r4 = t4.words;
            var i3 = t4.sigBytes;
            var n22 = e4 ? this._safe_map : this._map;
            t4.clamp();
            var s2 = [];
            for (var a22 = 0; a22 < i3; a22 += 3) {
              var o2 = r4[a22 >>> 2] >>> 24 - a22 % 4 * 8 & 255;
              var u2 = r4[a22 + 1 >>> 2] >>> 24 - (a22 + 1) % 4 * 8 & 255;
              var c2 = r4[a22 + 2 >>> 2] >>> 24 - (a22 + 2) % 4 * 8 & 255;
              var l2 = o2 << 16 | u2 << 8 | c2;
              for (var f2 = 0; f2 < 4 && a22 + 0.75 * f2 < i3; f2++)
                s2.push(n22.charAt(l2 >>> 6 * (3 - f2) & 63));
            }
            var h2 = n22.charAt(64);
            if (h2)
              while (s2.length % 4)
                s2.push(h2);
            return s2.join("");
          }, parse: function(t4, e4 = true) {
            var r4 = t4.length;
            var i3 = e4 ? this._safe_map : this._map;
            var n22 = this._reverseMap;
            if (!n22) {
              n22 = this._reverseMap = [];
              for (var s2 = 0; s2 < i3.length; s2++)
                n22[i3.charCodeAt(s2)] = s2;
            }
            var o2 = i3.charAt(64);
            if (o2) {
              var u2 = t4.indexOf(o2);
              if (-1 !== u2)
                r4 = u2;
            }
            return a2(t4, r4, n22);
          }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" };
          function a2(t4, e4, r4) {
            var n22 = [];
            var s2 = 0;
            for (var a22 = 0; a22 < e4; a22++)
              if (a22 % 4) {
                var o2 = r4[t4.charCodeAt(a22 - 1)] << a22 % 4 * 2;
                var u2 = r4[t4.charCodeAt(a22)] >>> 6 - a22 % 4 * 2;
                var c2 = o2 | u2;
                n22[s2 >>> 2] |= c2 << 24 - s2 % 4 * 8;
                s2++;
              }
            return i22.create(n22, s2);
          }
        })();
        return t3.enc.Base64url;
      });
    }, 298: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.WordArray;
          var n2 = e3.enc;
          n2.Utf16 = n2.Utf16BE = { stringify: function(t4) {
            var e4 = t4.words;
            var r4 = t4.sigBytes;
            var i3 = [];
            for (var n22 = 0; n22 < r4; n22 += 2) {
              var s2 = e4[n22 >>> 2] >>> 16 - n22 % 4 * 8 & 65535;
              i3.push(String.fromCharCode(s2));
            }
            return i3.join("");
          }, parse: function(t4) {
            var e4 = t4.length;
            var r4 = [];
            for (var n22 = 0; n22 < e4; n22++)
              r4[n22 >>> 1] |= t4.charCodeAt(n22) << 16 - n22 % 2 * 16;
            return i22.create(r4, 2 * e4);
          } };
          n2.Utf16LE = { stringify: function(t4) {
            var e4 = t4.words;
            var r4 = t4.sigBytes;
            var i3 = [];
            for (var n22 = 0; n22 < r4; n22 += 2) {
              var s2 = a2(e4[n22 >>> 2] >>> 16 - n22 % 4 * 8 & 65535);
              i3.push(String.fromCharCode(s2));
            }
            return i3.join("");
          }, parse: function(t4) {
            var e4 = t4.length;
            var r4 = [];
            for (var n22 = 0; n22 < e4; n22++)
              r4[n22 >>> 1] |= a2(t4.charCodeAt(n22) << 16 - n22 % 2 * 16);
            return i22.create(r4, 2 * e4);
          } };
          function a2(t4) {
            return t4 << 8 & 4278255360 | t4 >>> 8 & 16711935;
          }
        })();
        return t3.enc.Utf16;
      });
    }, 888: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(2783), r22(9824));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.Base;
          var n2 = r3.WordArray;
          var s2 = e3.algo;
          var a2 = s2.MD5;
          var o2 = s2.EvpKDF = i22.extend({ cfg: i22.extend({ keySize: 128 / 32, hasher: a2, iterations: 1 }), init: function(t4) {
            this.cfg = this.cfg.extend(t4);
          }, compute: function(t4, e4) {
            var r4;
            var i3 = this.cfg;
            var s22 = i3.hasher.create();
            var a22 = n2.create();
            var o22 = a22.words;
            var u2 = i3.keySize;
            var c2 = i3.iterations;
            while (o22.length < u2) {
              if (r4)
                s22.update(r4);
              r4 = s22.update(t4).finalize(e4);
              s22.reset();
              for (var l2 = 1; l2 < c2; l2++) {
                r4 = s22.finalize(r4);
                s22.reset();
              }
              a22.concat(r4);
            }
            a22.sigBytes = 4 * u2;
            return a22;
          } });
          e3.EvpKDF = function(t4, e4, r4) {
            return o2.create(r4).compute(t4, e4);
          };
        })();
        return t3.EvpKDF;
      });
    }, 2209: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        (function(e3) {
          var r3 = t3;
          var i22 = r3.lib;
          var n2 = i22.CipherParams;
          var s2 = r3.enc;
          var a2 = s2.Hex;
          var o2 = r3.format;
          o2.Hex = { stringify: function(t4) {
            return t4.ciphertext.toString(a2);
          }, parse: function(t4) {
            var e4 = a2.parse(t4);
            return n2.create({ ciphertext: e4 });
          } };
        })();
        return t3.format.Hex;
      });
    }, 9824: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.Base;
          var n2 = e3.enc;
          var s2 = n2.Utf8;
          var a2 = e3.algo;
          a2.HMAC = i22.extend({ init: function(t4, e4) {
            t4 = this._hasher = new t4.init();
            if ("string" == typeof e4)
              e4 = s2.parse(e4);
            var r4 = t4.blockSize;
            var i3 = 4 * r4;
            if (e4.sigBytes > i3)
              e4 = t4.finalize(e4);
            e4.clamp();
            var n22 = this._oKey = e4.clone();
            var a22 = this._iKey = e4.clone();
            var o2 = n22.words;
            var u2 = a22.words;
            for (var c2 = 0; c2 < r4; c2++) {
              o2[c2] ^= 1549556828;
              u2[c2] ^= 909522486;
            }
            n22.sigBytes = a22.sigBytes = i3;
            this.reset();
          }, reset: function() {
            var t4 = this._hasher;
            t4.reset();
            t4.update(this._iKey);
          }, update: function(t4) {
            this._hasher.update(t4);
            return this;
          }, finalize: function(t4) {
            var e4 = this._hasher;
            var r4 = e4.finalize(t4);
            e4.reset();
            var i3 = e4.finalize(this._oKey.clone().concat(r4));
            return i3;
          } });
        })();
      });
    }, 1354: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(4938), r22(4433), r22(298), r22(8269), r22(3786), r22(8214), r22(2783), r22(2153), r22(7792), r22(34), r22(7460), r22(3327), r22(706), r22(9824), r22(2112), r22(888), r22(5109), r22(8568), r22(4242), r22(9968), r22(7660), r22(1148), r22(3615), r22(2807), r22(1077), r22(6475), r22(6991), r22(2209), r22(452), r22(4253), r22(1857), r22(4454), r22(3974));
      })(this, function(t3) {
        return t3;
      });
    }, 4433: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function() {
          if ("function" != typeof ArrayBuffer)
            return;
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.WordArray;
          var n2 = i22.init;
          var s2 = i22.init = function(t4) {
            if (t4 instanceof ArrayBuffer)
              t4 = new Uint8Array(t4);
            if (t4 instanceof Int8Array || "undefined" !== typeof Uint8ClampedArray && t4 instanceof Uint8ClampedArray || t4 instanceof Int16Array || t4 instanceof Uint16Array || t4 instanceof Int32Array || t4 instanceof Uint32Array || t4 instanceof Float32Array || t4 instanceof Float64Array)
              t4 = new Uint8Array(t4.buffer, t4.byteOffset, t4.byteLength);
            if (t4 instanceof Uint8Array) {
              var e4 = t4.byteLength;
              var r4 = [];
              for (var i3 = 0; i3 < e4; i3++)
                r4[i3 >>> 2] |= t4[i3] << 24 - i3 % 4 * 8;
              n2.call(this, r4, e4);
            } else
              n2.apply(this, arguments);
          };
          s2.prototype = i22;
        })();
        return t3.lib.WordArray;
      });
    }, 8214: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function(e3) {
          var r3 = t3;
          var i22 = r3.lib;
          var n2 = i22.WordArray;
          var s2 = i22.Hasher;
          var a2 = r3.algo;
          var o2 = [];
          (function() {
            for (var t4 = 0; t4 < 64; t4++)
              o2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
          })();
          var u2 = a2.MD5 = s2.extend({ _doReset: function() {
            this._hash = new n2.init([1732584193, 4023233417, 2562383102, 271733878]);
          }, _doProcessBlock: function(t4, e4) {
            for (var r4 = 0; r4 < 16; r4++) {
              var i3 = e4 + r4;
              var n22 = t4[i3];
              t4[i3] = 16711935 & (n22 << 8 | n22 >>> 24) | 4278255360 & (n22 << 24 | n22 >>> 8);
            }
            var s22 = this._hash.words;
            var a22 = t4[e4 + 0];
            var u22 = t4[e4 + 1];
            var d2 = t4[e4 + 2];
            var v2 = t4[e4 + 3];
            var p2 = t4[e4 + 4];
            var g2 = t4[e4 + 5];
            var y2 = t4[e4 + 6];
            var m2 = t4[e4 + 7];
            var w2 = t4[e4 + 8];
            var S2 = t4[e4 + 9];
            var _2 = t4[e4 + 10];
            var b2 = t4[e4 + 11];
            var E2 = t4[e4 + 12];
            var D2 = t4[e4 + 13];
            var M2 = t4[e4 + 14];
            var T2 = t4[e4 + 15];
            var I2 = s22[0];
            var A2 = s22[1];
            var x = s22[2];
            var R2 = s22[3];
            I2 = c2(I2, A2, x, R2, a22, 7, o2[0]);
            R2 = c2(R2, I2, A2, x, u22, 12, o2[1]);
            x = c2(x, R2, I2, A2, d2, 17, o2[2]);
            A2 = c2(A2, x, R2, I2, v2, 22, o2[3]);
            I2 = c2(I2, A2, x, R2, p2, 7, o2[4]);
            R2 = c2(R2, I2, A2, x, g2, 12, o2[5]);
            x = c2(x, R2, I2, A2, y2, 17, o2[6]);
            A2 = c2(A2, x, R2, I2, m2, 22, o2[7]);
            I2 = c2(I2, A2, x, R2, w2, 7, o2[8]);
            R2 = c2(R2, I2, A2, x, S2, 12, o2[9]);
            x = c2(x, R2, I2, A2, _2, 17, o2[10]);
            A2 = c2(A2, x, R2, I2, b2, 22, o2[11]);
            I2 = c2(I2, A2, x, R2, E2, 7, o2[12]);
            R2 = c2(R2, I2, A2, x, D2, 12, o2[13]);
            x = c2(x, R2, I2, A2, M2, 17, o2[14]);
            A2 = c2(A2, x, R2, I2, T2, 22, o2[15]);
            I2 = l2(I2, A2, x, R2, u22, 5, o2[16]);
            R2 = l2(R2, I2, A2, x, y2, 9, o2[17]);
            x = l2(x, R2, I2, A2, b2, 14, o2[18]);
            A2 = l2(A2, x, R2, I2, a22, 20, o2[19]);
            I2 = l2(I2, A2, x, R2, g2, 5, o2[20]);
            R2 = l2(R2, I2, A2, x, _2, 9, o2[21]);
            x = l2(x, R2, I2, A2, T2, 14, o2[22]);
            A2 = l2(A2, x, R2, I2, p2, 20, o2[23]);
            I2 = l2(I2, A2, x, R2, S2, 5, o2[24]);
            R2 = l2(R2, I2, A2, x, M2, 9, o2[25]);
            x = l2(x, R2, I2, A2, v2, 14, o2[26]);
            A2 = l2(A2, x, R2, I2, w2, 20, o2[27]);
            I2 = l2(I2, A2, x, R2, D2, 5, o2[28]);
            R2 = l2(R2, I2, A2, x, d2, 9, o2[29]);
            x = l2(x, R2, I2, A2, m2, 14, o2[30]);
            A2 = l2(A2, x, R2, I2, E2, 20, o2[31]);
            I2 = f2(I2, A2, x, R2, g2, 4, o2[32]);
            R2 = f2(R2, I2, A2, x, w2, 11, o2[33]);
            x = f2(x, R2, I2, A2, b2, 16, o2[34]);
            A2 = f2(A2, x, R2, I2, M2, 23, o2[35]);
            I2 = f2(I2, A2, x, R2, u22, 4, o2[36]);
            R2 = f2(R2, I2, A2, x, p2, 11, o2[37]);
            x = f2(x, R2, I2, A2, m2, 16, o2[38]);
            A2 = f2(A2, x, R2, I2, _2, 23, o2[39]);
            I2 = f2(I2, A2, x, R2, D2, 4, o2[40]);
            R2 = f2(R2, I2, A2, x, a22, 11, o2[41]);
            x = f2(x, R2, I2, A2, v2, 16, o2[42]);
            A2 = f2(A2, x, R2, I2, y2, 23, o2[43]);
            I2 = f2(I2, A2, x, R2, S2, 4, o2[44]);
            R2 = f2(R2, I2, A2, x, E2, 11, o2[45]);
            x = f2(x, R2, I2, A2, T2, 16, o2[46]);
            A2 = f2(A2, x, R2, I2, d2, 23, o2[47]);
            I2 = h2(I2, A2, x, R2, a22, 6, o2[48]);
            R2 = h2(R2, I2, A2, x, m2, 10, o2[49]);
            x = h2(x, R2, I2, A2, M2, 15, o2[50]);
            A2 = h2(A2, x, R2, I2, g2, 21, o2[51]);
            I2 = h2(I2, A2, x, R2, E2, 6, o2[52]);
            R2 = h2(R2, I2, A2, x, v2, 10, o2[53]);
            x = h2(x, R2, I2, A2, _2, 15, o2[54]);
            A2 = h2(A2, x, R2, I2, u22, 21, o2[55]);
            I2 = h2(I2, A2, x, R2, w2, 6, o2[56]);
            R2 = h2(R2, I2, A2, x, T2, 10, o2[57]);
            x = h2(x, R2, I2, A2, y2, 15, o2[58]);
            A2 = h2(A2, x, R2, I2, D2, 21, o2[59]);
            I2 = h2(I2, A2, x, R2, p2, 6, o2[60]);
            R2 = h2(R2, I2, A2, x, b2, 10, o2[61]);
            x = h2(x, R2, I2, A2, d2, 15, o2[62]);
            A2 = h2(A2, x, R2, I2, S2, 21, o2[63]);
            s22[0] = s22[0] + I2 | 0;
            s22[1] = s22[1] + A2 | 0;
            s22[2] = s22[2] + x | 0;
            s22[3] = s22[3] + R2 | 0;
          }, _doFinalize: function() {
            var t4 = this._data;
            var r4 = t4.words;
            var i3 = 8 * this._nDataBytes;
            var n22 = 8 * t4.sigBytes;
            r4[n22 >>> 5] |= 128 << 24 - n22 % 32;
            var s22 = e3.floor(i3 / 4294967296);
            var a22 = i3;
            r4[(n22 + 64 >>> 9 << 4) + 15] = 16711935 & (s22 << 8 | s22 >>> 24) | 4278255360 & (s22 << 24 | s22 >>> 8);
            r4[(n22 + 64 >>> 9 << 4) + 14] = 16711935 & (a22 << 8 | a22 >>> 24) | 4278255360 & (a22 << 24 | a22 >>> 8);
            t4.sigBytes = 4 * (r4.length + 1);
            this._process();
            var o22 = this._hash;
            var u22 = o22.words;
            for (var c22 = 0; c22 < 4; c22++) {
              var l22 = u22[c22];
              u22[c22] = 16711935 & (l22 << 8 | l22 >>> 24) | 4278255360 & (l22 << 24 | l22 >>> 8);
            }
            return o22;
          }, clone: function() {
            var t4 = s2.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          } });
          function c2(t4, e4, r4, i3, n22, s22, a22) {
            var o22 = t4 + (e4 & r4 | ~e4 & i3) + n22 + a22;
            return (o22 << s22 | o22 >>> 32 - s22) + e4;
          }
          function l2(t4, e4, r4, i3, n22, s22, a22) {
            var o22 = t4 + (e4 & i3 | r4 & ~i3) + n22 + a22;
            return (o22 << s22 | o22 >>> 32 - s22) + e4;
          }
          function f2(t4, e4, r4, i3, n22, s22, a22) {
            var o22 = t4 + (e4 ^ r4 ^ i3) + n22 + a22;
            return (o22 << s22 | o22 >>> 32 - s22) + e4;
          }
          function h2(t4, e4, r4, i3, n22, s22, a22) {
            var o22 = t4 + (r4 ^ (e4 | ~i3)) + n22 + a22;
            return (o22 << s22 | o22 >>> 32 - s22) + e4;
          }
          r3.MD5 = s2._createHelper(u2);
          r3.HmacMD5 = s2._createHmacHelper(u2);
        })(Math);
        return t3.MD5;
      });
    }, 8568: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.mode.CFB = function() {
          var e3 = t3.lib.BlockCipherMode.extend();
          e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
            var i22 = this._cipher;
            var n2 = i22.blockSize;
            r3.call(this, t4, e4, n2, i22);
            this._prevBlock = t4.slice(e4, e4 + n2);
          } });
          e3.Decryptor = e3.extend({ processBlock: function(t4, e4) {
            var i22 = this._cipher;
            var n2 = i22.blockSize;
            var s2 = t4.slice(e4, e4 + n2);
            r3.call(this, t4, e4, n2, i22);
            this._prevBlock = s2;
          } });
          function r3(t4, e4, r4, i22) {
            var n2;
            var s2 = this._iv;
            if (s2) {
              n2 = s2.slice(0);
              this._iv = void 0;
            } else
              n2 = this._prevBlock;
            i22.encryptBlock(n2, 0);
            for (var a2 = 0; a2 < r4; a2++)
              t4[e4 + a2] ^= n2[a2];
          }
          return e3;
        }();
        return t3.mode.CFB;
      });
    }, 9968: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.mode.CTRGladman = function() {
          var e3 = t3.lib.BlockCipherMode.extend();
          function r3(t4) {
            if (255 === (t4 >> 24 & 255)) {
              var e4 = t4 >> 16 & 255;
              var r4 = t4 >> 8 & 255;
              var i3 = 255 & t4;
              if (255 === e4) {
                e4 = 0;
                if (255 === r4) {
                  r4 = 0;
                  if (255 === i3)
                    i3 = 0;
                  else
                    ++i3;
                } else
                  ++r4;
              } else
                ++e4;
              t4 = 0;
              t4 += e4 << 16;
              t4 += r4 << 8;
              t4 += i3;
            } else
              t4 += 1 << 24;
            return t4;
          }
          function i22(t4) {
            if (0 === (t4[0] = r3(t4[0])))
              t4[1] = r3(t4[1]);
            return t4;
          }
          var n2 = e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
            var r4 = this._cipher;
            var n22 = r4.blockSize;
            var s2 = this._iv;
            var a2 = this._counter;
            if (s2) {
              a2 = this._counter = s2.slice(0);
              this._iv = void 0;
            }
            i22(a2);
            var o2 = a2.slice(0);
            r4.encryptBlock(o2, 0);
            for (var u2 = 0; u2 < n22; u2++)
              t4[e4 + u2] ^= o2[u2];
          } });
          e3.Decryptor = n2;
          return e3;
        }();
        return t3.mode.CTRGladman;
      });
    }, 4242: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.mode.CTR = function() {
          var e3 = t3.lib.BlockCipherMode.extend();
          var r3 = e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
            var r4 = this._cipher;
            var i22 = r4.blockSize;
            var n2 = this._iv;
            var s2 = this._counter;
            if (n2) {
              s2 = this._counter = n2.slice(0);
              this._iv = void 0;
            }
            var a2 = s2.slice(0);
            r4.encryptBlock(a2, 0);
            s2[i22 - 1] = s2[i22 - 1] + 1 | 0;
            for (var o2 = 0; o2 < i22; o2++)
              t4[e4 + o2] ^= a2[o2];
          } });
          e3.Decryptor = r3;
          return e3;
        }();
        return t3.mode.CTR;
      });
    }, 1148: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.mode.ECB = function() {
          var e3 = t3.lib.BlockCipherMode.extend();
          e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
            this._cipher.encryptBlock(t4, e4);
          } });
          e3.Decryptor = e3.extend({ processBlock: function(t4, e4) {
            this._cipher.decryptBlock(t4, e4);
          } });
          return e3;
        }();
        return t3.mode.ECB;
      });
    }, 7660: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.mode.OFB = function() {
          var e3 = t3.lib.BlockCipherMode.extend();
          var r3 = e3.Encryptor = e3.extend({ processBlock: function(t4, e4) {
            var r4 = this._cipher;
            var i22 = r4.blockSize;
            var n2 = this._iv;
            var s2 = this._keystream;
            if (n2) {
              s2 = this._keystream = n2.slice(0);
              this._iv = void 0;
            }
            r4.encryptBlock(s2, 0);
            for (var a2 = 0; a2 < i22; a2++)
              t4[e4 + a2] ^= s2[a2];
          } });
          e3.Decryptor = r3;
          return e3;
        }();
        return t3.mode.OFB;
      });
    }, 3615: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.pad.AnsiX923 = { pad: function(t4, e3) {
          var r3 = t4.sigBytes;
          var i22 = 4 * e3;
          var n2 = i22 - r3 % i22;
          var s2 = r3 + n2 - 1;
          t4.clamp();
          t4.words[s2 >>> 2] |= n2 << 24 - s2 % 4 * 8;
          t4.sigBytes += n2;
        }, unpad: function(t4) {
          var e3 = 255 & t4.words[t4.sigBytes - 1 >>> 2];
          t4.sigBytes -= e3;
        } };
        return t3.pad.Ansix923;
      });
    }, 2807: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.pad.Iso10126 = { pad: function(e3, r3) {
          var i22 = 4 * r3;
          var n2 = i22 - e3.sigBytes % i22;
          e3.concat(t3.lib.WordArray.random(n2 - 1)).concat(t3.lib.WordArray.create([n2 << 24], 1));
        }, unpad: function(t4) {
          var e3 = 255 & t4.words[t4.sigBytes - 1 >>> 2];
          t4.sigBytes -= e3;
        } };
        return t3.pad.Iso10126;
      });
    }, 1077: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.pad.Iso97971 = { pad: function(e3, r3) {
          e3.concat(t3.lib.WordArray.create([2147483648], 1));
          t3.pad.ZeroPadding.pad(e3, r3);
        }, unpad: function(e3) {
          t3.pad.ZeroPadding.unpad(e3);
          e3.sigBytes--;
        } };
        return t3.pad.Iso97971;
      });
    }, 6991: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.pad.NoPadding = { pad: function() {
        }, unpad: function() {
        } };
        return t3.pad.NoPadding;
      });
    }, 6475: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(5109));
      })(this, function(t3) {
        t3.pad.ZeroPadding = { pad: function(t4, e3) {
          var r3 = 4 * e3;
          t4.clamp();
          t4.sigBytes += r3 - (t4.sigBytes % r3 || r3);
        }, unpad: function(t4) {
          var e3 = t4.words;
          var r3 = t4.sigBytes - 1;
          for (var r3 = t4.sigBytes - 1; r3 >= 0; r3--)
            if (e3[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255) {
              t4.sigBytes = r3 + 1;
              break;
            }
        } };
        return t3.pad.ZeroPadding;
      });
    }, 2112: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(2783), r22(9824));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.Base;
          var n2 = r3.WordArray;
          var s2 = e3.algo;
          var a2 = s2.SHA1;
          var o2 = s2.HMAC;
          var u2 = s2.PBKDF2 = i22.extend({ cfg: i22.extend({ keySize: 128 / 32, hasher: a2, iterations: 1 }), init: function(t4) {
            this.cfg = this.cfg.extend(t4);
          }, compute: function(t4, e4) {
            var r4 = this.cfg;
            var i3 = o2.create(r4.hasher, t4);
            var s22 = n2.create();
            var a22 = n2.create([1]);
            var u22 = s22.words;
            var c2 = a22.words;
            var l2 = r4.keySize;
            var f2 = r4.iterations;
            while (u22.length < l2) {
              var h2 = i3.update(e4).finalize(a22);
              i3.reset();
              var d2 = h2.words;
              var v2 = d2.length;
              var p2 = h2;
              for (var g2 = 1; g2 < f2; g2++) {
                p2 = i3.finalize(p2);
                i3.reset();
                var y2 = p2.words;
                for (var m2 = 0; m2 < v2; m2++)
                  d2[m2] ^= y2[m2];
              }
              s22.concat(h2);
              c2[0]++;
            }
            s22.sigBytes = 4 * l2;
            return s22;
          } });
          e3.PBKDF2 = function(t4, e4, r4) {
            return u2.create(r4).compute(t4, e4);
          };
        })();
        return t3.PBKDF2;
      });
    }, 3974: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.StreamCipher;
          var n2 = e3.algo;
          var s2 = [];
          var a2 = [];
          var o2 = [];
          var u2 = n2.RabbitLegacy = i22.extend({ _doReset: function() {
            var t4 = this._key.words;
            var e4 = this.cfg.iv;
            var r4 = this._X = [t4[0], t4[3] << 16 | t4[2] >>> 16, t4[1], t4[0] << 16 | t4[3] >>> 16, t4[2], t4[1] << 16 | t4[0] >>> 16, t4[3], t4[2] << 16 | t4[1] >>> 16];
            var i3 = this._C = [t4[2] << 16 | t4[2] >>> 16, 4294901760 & t4[0] | 65535 & t4[1], t4[3] << 16 | t4[3] >>> 16, 4294901760 & t4[1] | 65535 & t4[2], t4[0] << 16 | t4[0] >>> 16, 4294901760 & t4[2] | 65535 & t4[3], t4[1] << 16 | t4[1] >>> 16, 4294901760 & t4[3] | 65535 & t4[0]];
            this._b = 0;
            for (var n22 = 0; n22 < 4; n22++)
              c2.call(this);
            for (var n22 = 0; n22 < 8; n22++)
              i3[n22] ^= r4[n22 + 4 & 7];
            if (e4) {
              var s22 = e4.words;
              var a22 = s22[0];
              var o22 = s22[1];
              var u22 = 16711935 & (a22 << 8 | a22 >>> 24) | 4278255360 & (a22 << 24 | a22 >>> 8);
              var l2 = 16711935 & (o22 << 8 | o22 >>> 24) | 4278255360 & (o22 << 24 | o22 >>> 8);
              var f2 = u22 >>> 16 | 4294901760 & l2;
              var h2 = l2 << 16 | 65535 & u22;
              i3[0] ^= u22;
              i3[1] ^= f2;
              i3[2] ^= l2;
              i3[3] ^= h2;
              i3[4] ^= u22;
              i3[5] ^= f2;
              i3[6] ^= l2;
              i3[7] ^= h2;
              for (var n22 = 0; n22 < 4; n22++)
                c2.call(this);
            }
          }, _doProcessBlock: function(t4, e4) {
            var r4 = this._X;
            c2.call(this);
            s2[0] = r4[0] ^ r4[5] >>> 16 ^ r4[3] << 16;
            s2[1] = r4[2] ^ r4[7] >>> 16 ^ r4[5] << 16;
            s2[2] = r4[4] ^ r4[1] >>> 16 ^ r4[7] << 16;
            s2[3] = r4[6] ^ r4[3] >>> 16 ^ r4[1] << 16;
            for (var i3 = 0; i3 < 4; i3++) {
              s2[i3] = 16711935 & (s2[i3] << 8 | s2[i3] >>> 24) | 4278255360 & (s2[i3] << 24 | s2[i3] >>> 8);
              t4[e4 + i3] ^= s2[i3];
            }
          }, blockSize: 128 / 32, ivSize: 64 / 32 });
          function c2() {
            var t4 = this._X;
            var e4 = this._C;
            for (var r4 = 0; r4 < 8; r4++)
              a2[r4] = e4[r4];
            e4[0] = e4[0] + 1295307597 + this._b | 0;
            e4[1] = e4[1] + 3545052371 + (e4[0] >>> 0 < a2[0] >>> 0 ? 1 : 0) | 0;
            e4[2] = e4[2] + 886263092 + (e4[1] >>> 0 < a2[1] >>> 0 ? 1 : 0) | 0;
            e4[3] = e4[3] + 1295307597 + (e4[2] >>> 0 < a2[2] >>> 0 ? 1 : 0) | 0;
            e4[4] = e4[4] + 3545052371 + (e4[3] >>> 0 < a2[3] >>> 0 ? 1 : 0) | 0;
            e4[5] = e4[5] + 886263092 + (e4[4] >>> 0 < a2[4] >>> 0 ? 1 : 0) | 0;
            e4[6] = e4[6] + 1295307597 + (e4[5] >>> 0 < a2[5] >>> 0 ? 1 : 0) | 0;
            e4[7] = e4[7] + 3545052371 + (e4[6] >>> 0 < a2[6] >>> 0 ? 1 : 0) | 0;
            this._b = e4[7] >>> 0 < a2[7] >>> 0 ? 1 : 0;
            for (var r4 = 0; r4 < 8; r4++) {
              var i3 = t4[r4] + e4[r4];
              var n22 = 65535 & i3;
              var s22 = i3 >>> 16;
              var u22 = ((n22 * n22 >>> 17) + n22 * s22 >>> 15) + s22 * s22;
              var c22 = ((4294901760 & i3) * i3 | 0) + ((65535 & i3) * i3 | 0);
              o2[r4] = u22 ^ c22;
            }
            t4[0] = o2[0] + (o2[7] << 16 | o2[7] >>> 16) + (o2[6] << 16 | o2[6] >>> 16) | 0;
            t4[1] = o2[1] + (o2[0] << 8 | o2[0] >>> 24) + o2[7] | 0;
            t4[2] = o2[2] + (o2[1] << 16 | o2[1] >>> 16) + (o2[0] << 16 | o2[0] >>> 16) | 0;
            t4[3] = o2[3] + (o2[2] << 8 | o2[2] >>> 24) + o2[1] | 0;
            t4[4] = o2[4] + (o2[3] << 16 | o2[3] >>> 16) + (o2[2] << 16 | o2[2] >>> 16) | 0;
            t4[5] = o2[5] + (o2[4] << 8 | o2[4] >>> 24) + o2[3] | 0;
            t4[6] = o2[6] + (o2[5] << 16 | o2[5] >>> 16) + (o2[4] << 16 | o2[4] >>> 16) | 0;
            t4[7] = o2[7] + (o2[6] << 8 | o2[6] >>> 24) + o2[5] | 0;
          }
          e3.RabbitLegacy = i22._createHelper(u2);
        })();
        return t3.RabbitLegacy;
      });
    }, 4454: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.StreamCipher;
          var n2 = e3.algo;
          var s2 = [];
          var a2 = [];
          var o2 = [];
          var u2 = n2.Rabbit = i22.extend({ _doReset: function() {
            var t4 = this._key.words;
            var e4 = this.cfg.iv;
            for (var r4 = 0; r4 < 4; r4++)
              t4[r4] = 16711935 & (t4[r4] << 8 | t4[r4] >>> 24) | 4278255360 & (t4[r4] << 24 | t4[r4] >>> 8);
            var i3 = this._X = [t4[0], t4[3] << 16 | t4[2] >>> 16, t4[1], t4[0] << 16 | t4[3] >>> 16, t4[2], t4[1] << 16 | t4[0] >>> 16, t4[3], t4[2] << 16 | t4[1] >>> 16];
            var n22 = this._C = [t4[2] << 16 | t4[2] >>> 16, 4294901760 & t4[0] | 65535 & t4[1], t4[3] << 16 | t4[3] >>> 16, 4294901760 & t4[1] | 65535 & t4[2], t4[0] << 16 | t4[0] >>> 16, 4294901760 & t4[2] | 65535 & t4[3], t4[1] << 16 | t4[1] >>> 16, 4294901760 & t4[3] | 65535 & t4[0]];
            this._b = 0;
            for (var r4 = 0; r4 < 4; r4++)
              c2.call(this);
            for (var r4 = 0; r4 < 8; r4++)
              n22[r4] ^= i3[r4 + 4 & 7];
            if (e4) {
              var s22 = e4.words;
              var a22 = s22[0];
              var o22 = s22[1];
              var u22 = 16711935 & (a22 << 8 | a22 >>> 24) | 4278255360 & (a22 << 24 | a22 >>> 8);
              var l2 = 16711935 & (o22 << 8 | o22 >>> 24) | 4278255360 & (o22 << 24 | o22 >>> 8);
              var f2 = u22 >>> 16 | 4294901760 & l2;
              var h2 = l2 << 16 | 65535 & u22;
              n22[0] ^= u22;
              n22[1] ^= f2;
              n22[2] ^= l2;
              n22[3] ^= h2;
              n22[4] ^= u22;
              n22[5] ^= f2;
              n22[6] ^= l2;
              n22[7] ^= h2;
              for (var r4 = 0; r4 < 4; r4++)
                c2.call(this);
            }
          }, _doProcessBlock: function(t4, e4) {
            var r4 = this._X;
            c2.call(this);
            s2[0] = r4[0] ^ r4[5] >>> 16 ^ r4[3] << 16;
            s2[1] = r4[2] ^ r4[7] >>> 16 ^ r4[5] << 16;
            s2[2] = r4[4] ^ r4[1] >>> 16 ^ r4[7] << 16;
            s2[3] = r4[6] ^ r4[3] >>> 16 ^ r4[1] << 16;
            for (var i3 = 0; i3 < 4; i3++) {
              s2[i3] = 16711935 & (s2[i3] << 8 | s2[i3] >>> 24) | 4278255360 & (s2[i3] << 24 | s2[i3] >>> 8);
              t4[e4 + i3] ^= s2[i3];
            }
          }, blockSize: 128 / 32, ivSize: 64 / 32 });
          function c2() {
            var t4 = this._X;
            var e4 = this._C;
            for (var r4 = 0; r4 < 8; r4++)
              a2[r4] = e4[r4];
            e4[0] = e4[0] + 1295307597 + this._b | 0;
            e4[1] = e4[1] + 3545052371 + (e4[0] >>> 0 < a2[0] >>> 0 ? 1 : 0) | 0;
            e4[2] = e4[2] + 886263092 + (e4[1] >>> 0 < a2[1] >>> 0 ? 1 : 0) | 0;
            e4[3] = e4[3] + 1295307597 + (e4[2] >>> 0 < a2[2] >>> 0 ? 1 : 0) | 0;
            e4[4] = e4[4] + 3545052371 + (e4[3] >>> 0 < a2[3] >>> 0 ? 1 : 0) | 0;
            e4[5] = e4[5] + 886263092 + (e4[4] >>> 0 < a2[4] >>> 0 ? 1 : 0) | 0;
            e4[6] = e4[6] + 1295307597 + (e4[5] >>> 0 < a2[5] >>> 0 ? 1 : 0) | 0;
            e4[7] = e4[7] + 3545052371 + (e4[6] >>> 0 < a2[6] >>> 0 ? 1 : 0) | 0;
            this._b = e4[7] >>> 0 < a2[7] >>> 0 ? 1 : 0;
            for (var r4 = 0; r4 < 8; r4++) {
              var i3 = t4[r4] + e4[r4];
              var n22 = 65535 & i3;
              var s22 = i3 >>> 16;
              var u22 = ((n22 * n22 >>> 17) + n22 * s22 >>> 15) + s22 * s22;
              var c22 = ((4294901760 & i3) * i3 | 0) + ((65535 & i3) * i3 | 0);
              o2[r4] = u22 ^ c22;
            }
            t4[0] = o2[0] + (o2[7] << 16 | o2[7] >>> 16) + (o2[6] << 16 | o2[6] >>> 16) | 0;
            t4[1] = o2[1] + (o2[0] << 8 | o2[0] >>> 24) + o2[7] | 0;
            t4[2] = o2[2] + (o2[1] << 16 | o2[1] >>> 16) + (o2[0] << 16 | o2[0] >>> 16) | 0;
            t4[3] = o2[3] + (o2[2] << 8 | o2[2] >>> 24) + o2[1] | 0;
            t4[4] = o2[4] + (o2[3] << 16 | o2[3] >>> 16) + (o2[2] << 16 | o2[2] >>> 16) | 0;
            t4[5] = o2[5] + (o2[4] << 8 | o2[4] >>> 24) + o2[3] | 0;
            t4[6] = o2[6] + (o2[5] << 16 | o2[5] >>> 16) + (o2[4] << 16 | o2[4] >>> 16) | 0;
            t4[7] = o2[7] + (o2[6] << 8 | o2[6] >>> 24) + o2[5] | 0;
          }
          e3.Rabbit = i22._createHelper(u2);
        })();
        return t3.Rabbit;
      });
    }, 1857: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.StreamCipher;
          var n2 = e3.algo;
          var s2 = n2.RC4 = i22.extend({ _doReset: function() {
            var t4 = this._key;
            var e4 = t4.words;
            var r4 = t4.sigBytes;
            var i3 = this._S = [];
            for (var n22 = 0; n22 < 256; n22++)
              i3[n22] = n22;
            for (var n22 = 0, s22 = 0; n22 < 256; n22++) {
              var a22 = n22 % r4;
              var o22 = e4[a22 >>> 2] >>> 24 - a22 % 4 * 8 & 255;
              s22 = (s22 + i3[n22] + o22) % 256;
              var u2 = i3[n22];
              i3[n22] = i3[s22];
              i3[s22] = u2;
            }
            this._i = this._j = 0;
          }, _doProcessBlock: function(t4, e4) {
            t4[e4] ^= a2.call(this);
          }, keySize: 256 / 32, ivSize: 0 });
          function a2() {
            var t4 = this._S;
            var e4 = this._i;
            var r4 = this._j;
            var i3 = 0;
            for (var n22 = 0; n22 < 4; n22++) {
              e4 = (e4 + 1) % 256;
              r4 = (r4 + t4[e4]) % 256;
              var s22 = t4[e4];
              t4[e4] = t4[r4];
              t4[r4] = s22;
              i3 |= t4[(t4[e4] + t4[r4]) % 256] << 24 - 8 * n22;
            }
            this._i = e4;
            this._j = r4;
            return i3;
          }
          e3.RC4 = i22._createHelper(s2);
          var o2 = n2.RC4Drop = s2.extend({ cfg: s2.cfg.extend({ drop: 192 }), _doReset: function() {
            s2._doReset.call(this);
            for (var t4 = this.cfg.drop; t4 > 0; t4--)
              a2.call(this);
          } });
          e3.RC4Drop = i22._createHelper(o2);
        })();
        return t3.RC4;
      });
    }, 706: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function(e3) {
          var r3 = t3;
          var i22 = r3.lib;
          var n2 = i22.WordArray;
          var s2 = i22.Hasher;
          var a2 = r3.algo;
          var o2 = n2.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
          var u2 = n2.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
          var c2 = n2.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
          var l2 = n2.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
          var f2 = n2.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var h2 = n2.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var d2 = a2.RIPEMD160 = s2.extend({ _doReset: function() {
            this._hash = n2.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          }, _doProcessBlock: function(t4, e4) {
            for (var r4 = 0; r4 < 16; r4++) {
              var i3 = e4 + r4;
              var n22 = t4[i3];
              t4[i3] = 16711935 & (n22 << 8 | n22 >>> 24) | 4278255360 & (n22 << 24 | n22 >>> 8);
            }
            var s22 = this._hash.words;
            var a22 = f2.words;
            var d22 = h2.words;
            var S2 = o2.words;
            var _2 = u2.words;
            var b2 = c2.words;
            var E2 = l2.words;
            var D2, M2, T2, I2, A2;
            var x, R2, B2, O2, k;
            x = D2 = s22[0];
            R2 = M2 = s22[1];
            B2 = T2 = s22[2];
            O2 = I2 = s22[3];
            k = A2 = s22[4];
            var C2;
            for (var r4 = 0; r4 < 80; r4 += 1) {
              C2 = D2 + t4[e4 + S2[r4]] | 0;
              if (r4 < 16)
                C2 += v2(M2, T2, I2) + a22[0];
              else if (r4 < 32)
                C2 += p2(M2, T2, I2) + a22[1];
              else if (r4 < 48)
                C2 += g2(M2, T2, I2) + a22[2];
              else if (r4 < 64)
                C2 += y2(M2, T2, I2) + a22[3];
              else
                C2 += m2(M2, T2, I2) + a22[4];
              C2 |= 0;
              C2 = w2(C2, b2[r4]);
              C2 = C2 + A2 | 0;
              D2 = A2;
              A2 = I2;
              I2 = w2(T2, 10);
              T2 = M2;
              M2 = C2;
              C2 = x + t4[e4 + _2[r4]] | 0;
              if (r4 < 16)
                C2 += m2(R2, B2, O2) + d22[0];
              else if (r4 < 32)
                C2 += y2(R2, B2, O2) + d22[1];
              else if (r4 < 48)
                C2 += g2(R2, B2, O2) + d22[2];
              else if (r4 < 64)
                C2 += p2(R2, B2, O2) + d22[3];
              else
                C2 += v2(R2, B2, O2) + d22[4];
              C2 |= 0;
              C2 = w2(C2, E2[r4]);
              C2 = C2 + k | 0;
              x = k;
              k = O2;
              O2 = w2(B2, 10);
              B2 = R2;
              R2 = C2;
            }
            C2 = s22[1] + T2 + O2 | 0;
            s22[1] = s22[2] + I2 + k | 0;
            s22[2] = s22[3] + A2 + x | 0;
            s22[3] = s22[4] + D2 + R2 | 0;
            s22[4] = s22[0] + M2 + B2 | 0;
            s22[0] = C2;
          }, _doFinalize: function() {
            var t4 = this._data;
            var e4 = t4.words;
            var r4 = 8 * this._nDataBytes;
            var i3 = 8 * t4.sigBytes;
            e4[i3 >>> 5] |= 128 << 24 - i3 % 32;
            e4[(i3 + 64 >>> 9 << 4) + 14] = 16711935 & (r4 << 8 | r4 >>> 24) | 4278255360 & (r4 << 24 | r4 >>> 8);
            t4.sigBytes = 4 * (e4.length + 1);
            this._process();
            var n22 = this._hash;
            var s22 = n22.words;
            for (var a22 = 0; a22 < 5; a22++) {
              var o22 = s22[a22];
              s22[a22] = 16711935 & (o22 << 8 | o22 >>> 24) | 4278255360 & (o22 << 24 | o22 >>> 8);
            }
            return n22;
          }, clone: function() {
            var t4 = s2.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          } });
          function v2(t4, e4, r4) {
            return t4 ^ e4 ^ r4;
          }
          function p2(t4, e4, r4) {
            return t4 & e4 | ~t4 & r4;
          }
          function g2(t4, e4, r4) {
            return (t4 | ~e4) ^ r4;
          }
          function y2(t4, e4, r4) {
            return t4 & r4 | e4 & ~r4;
          }
          function m2(t4, e4, r4) {
            return t4 ^ (e4 | ~r4);
          }
          function w2(t4, e4) {
            return t4 << e4 | t4 >>> 32 - e4;
          }
          r3.RIPEMD160 = s2._createHelper(d2);
          r3.HmacRIPEMD160 = s2._createHmacHelper(d2);
        })();
        return t3.RIPEMD160;
      });
    }, 2783: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.WordArray;
          var n2 = r3.Hasher;
          var s2 = e3.algo;
          var a2 = [];
          var o2 = s2.SHA1 = n2.extend({ _doReset: function() {
            this._hash = new i22.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          }, _doProcessBlock: function(t4, e4) {
            var r4 = this._hash.words;
            var i3 = r4[0];
            var n22 = r4[1];
            var s22 = r4[2];
            var o22 = r4[3];
            var u2 = r4[4];
            for (var c2 = 0; c2 < 80; c2++) {
              if (c2 < 16)
                a2[c2] = 0 | t4[e4 + c2];
              else {
                var l2 = a2[c2 - 3] ^ a2[c2 - 8] ^ a2[c2 - 14] ^ a2[c2 - 16];
                a2[c2] = l2 << 1 | l2 >>> 31;
              }
              var f2 = (i3 << 5 | i3 >>> 27) + u2 + a2[c2];
              if (c2 < 20)
                f2 += (n22 & s22 | ~n22 & o22) + 1518500249;
              else if (c2 < 40)
                f2 += (n22 ^ s22 ^ o22) + 1859775393;
              else if (c2 < 60)
                f2 += (n22 & s22 | n22 & o22 | s22 & o22) - 1894007588;
              else
                f2 += (n22 ^ s22 ^ o22) - 899497514;
              u2 = o22;
              o22 = s22;
              s22 = n22 << 30 | n22 >>> 2;
              n22 = i3;
              i3 = f2;
            }
            r4[0] = r4[0] + i3 | 0;
            r4[1] = r4[1] + n22 | 0;
            r4[2] = r4[2] + s22 | 0;
            r4[3] = r4[3] + o22 | 0;
            r4[4] = r4[4] + u2 | 0;
          }, _doFinalize: function() {
            var t4 = this._data;
            var e4 = t4.words;
            var r4 = 8 * this._nDataBytes;
            var i3 = 8 * t4.sigBytes;
            e4[i3 >>> 5] |= 128 << 24 - i3 % 32;
            e4[(i3 + 64 >>> 9 << 4) + 14] = Math.floor(r4 / 4294967296);
            e4[(i3 + 64 >>> 9 << 4) + 15] = r4;
            t4.sigBytes = 4 * e4.length;
            this._process();
            return this._hash;
          }, clone: function() {
            var t4 = n2.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          } });
          e3.SHA1 = n2._createHelper(o2);
          e3.HmacSHA1 = n2._createHmacHelper(o2);
        })();
        return t3.SHA1;
      });
    }, 7792: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(2153));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.WordArray;
          var n2 = e3.algo;
          var s2 = n2.SHA256;
          var a2 = n2.SHA224 = s2.extend({ _doReset: function() {
            this._hash = new i22.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
          }, _doFinalize: function() {
            var t4 = s2._doFinalize.call(this);
            t4.sigBytes -= 4;
            return t4;
          } });
          e3.SHA224 = s2._createHelper(a2);
          e3.HmacSHA224 = s2._createHmacHelper(a2);
        })();
        return t3.SHA224;
      });
    }, 2153: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function(e3) {
          var r3 = t3;
          var i22 = r3.lib;
          var n2 = i22.WordArray;
          var s2 = i22.Hasher;
          var a2 = r3.algo;
          var o2 = [];
          var u2 = [];
          (function() {
            function t4(t5) {
              var r5 = e3.sqrt(t5);
              for (var i4 = 2; i4 <= r5; i4++)
                if (!(t5 % i4))
                  return false;
              return true;
            }
            function r4(t5) {
              return 4294967296 * (t5 - (0 | t5)) | 0;
            }
            var i3 = 2;
            var n22 = 0;
            while (n22 < 64) {
              if (t4(i3)) {
                if (n22 < 8)
                  o2[n22] = r4(e3.pow(i3, 1 / 2));
                u2[n22] = r4(e3.pow(i3, 1 / 3));
                n22++;
              }
              i3++;
            }
          })();
          var c2 = [];
          var l2 = a2.SHA256 = s2.extend({ _doReset: function() {
            this._hash = new n2.init(o2.slice(0));
          }, _doProcessBlock: function(t4, e4) {
            var r4 = this._hash.words;
            var i3 = r4[0];
            var n22 = r4[1];
            var s22 = r4[2];
            var a22 = r4[3];
            var o22 = r4[4];
            var l22 = r4[5];
            var f2 = r4[6];
            var h2 = r4[7];
            for (var d2 = 0; d2 < 64; d2++) {
              if (d2 < 16)
                c2[d2] = 0 | t4[e4 + d2];
              else {
                var v2 = c2[d2 - 15];
                var p2 = (v2 << 25 | v2 >>> 7) ^ (v2 << 14 | v2 >>> 18) ^ v2 >>> 3;
                var g2 = c2[d2 - 2];
                var y2 = (g2 << 15 | g2 >>> 17) ^ (g2 << 13 | g2 >>> 19) ^ g2 >>> 10;
                c2[d2] = p2 + c2[d2 - 7] + y2 + c2[d2 - 16];
              }
              var m2 = o22 & l22 ^ ~o22 & f2;
              var w2 = i3 & n22 ^ i3 & s22 ^ n22 & s22;
              var S2 = (i3 << 30 | i3 >>> 2) ^ (i3 << 19 | i3 >>> 13) ^ (i3 << 10 | i3 >>> 22);
              var _2 = (o22 << 26 | o22 >>> 6) ^ (o22 << 21 | o22 >>> 11) ^ (o22 << 7 | o22 >>> 25);
              var b2 = h2 + _2 + m2 + u2[d2] + c2[d2];
              var E2 = S2 + w2;
              h2 = f2;
              f2 = l22;
              l22 = o22;
              o22 = a22 + b2 | 0;
              a22 = s22;
              s22 = n22;
              n22 = i3;
              i3 = b2 + E2 | 0;
            }
            r4[0] = r4[0] + i3 | 0;
            r4[1] = r4[1] + n22 | 0;
            r4[2] = r4[2] + s22 | 0;
            r4[3] = r4[3] + a22 | 0;
            r4[4] = r4[4] + o22 | 0;
            r4[5] = r4[5] + l22 | 0;
            r4[6] = r4[6] + f2 | 0;
            r4[7] = r4[7] + h2 | 0;
          }, _doFinalize: function() {
            var t4 = this._data;
            var r4 = t4.words;
            var i3 = 8 * this._nDataBytes;
            var n22 = 8 * t4.sigBytes;
            r4[n22 >>> 5] |= 128 << 24 - n22 % 32;
            r4[(n22 + 64 >>> 9 << 4) + 14] = e3.floor(i3 / 4294967296);
            r4[(n22 + 64 >>> 9 << 4) + 15] = i3;
            t4.sigBytes = 4 * r4.length;
            this._process();
            return this._hash;
          }, clone: function() {
            var t4 = s2.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          } });
          r3.SHA256 = s2._createHelper(l2);
          r3.HmacSHA256 = s2._createHmacHelper(l2);
        })(Math);
        return t3.SHA256;
      });
    }, 3327: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(4938));
      })(this, function(t3) {
        (function(e3) {
          var r3 = t3;
          var i22 = r3.lib;
          var n2 = i22.WordArray;
          var s2 = i22.Hasher;
          var a2 = r3.x64;
          var o2 = a2.Word;
          var u2 = r3.algo;
          var c2 = [];
          var l2 = [];
          var f2 = [];
          (function() {
            var t4 = 1, e4 = 0;
            for (var r4 = 0; r4 < 24; r4++) {
              c2[t4 + 5 * e4] = (r4 + 1) * (r4 + 2) / 2 % 64;
              var i3 = e4 % 5;
              var n22 = (2 * t4 + 3 * e4) % 5;
              t4 = i3;
              e4 = n22;
            }
            for (var t4 = 0; t4 < 5; t4++)
              for (var e4 = 0; e4 < 5; e4++)
                l2[t4 + 5 * e4] = e4 + (2 * t4 + 3 * e4) % 5 * 5;
            var s22 = 1;
            for (var a22 = 0; a22 < 24; a22++) {
              var u22 = 0;
              var h22 = 0;
              for (var d22 = 0; d22 < 7; d22++) {
                if (1 & s22) {
                  var v2 = (1 << d22) - 1;
                  if (v2 < 32)
                    h22 ^= 1 << v2;
                  else
                    u22 ^= 1 << v2 - 32;
                }
                if (128 & s22)
                  s22 = s22 << 1 ^ 113;
                else
                  s22 <<= 1;
              }
              f2[a22] = o2.create(u22, h22);
            }
          })();
          var h2 = [];
          (function() {
            for (var t4 = 0; t4 < 25; t4++)
              h2[t4] = o2.create();
          })();
          var d2 = u2.SHA3 = s2.extend({ cfg: s2.cfg.extend({ outputLength: 512 }), _doReset: function() {
            var t4 = this._state = [];
            for (var e4 = 0; e4 < 25; e4++)
              t4[e4] = new o2.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          }, _doProcessBlock: function(t4, e4) {
            var r4 = this._state;
            var i3 = this.blockSize / 2;
            for (var n22 = 0; n22 < i3; n22++) {
              var s22 = t4[e4 + 2 * n22];
              var a22 = t4[e4 + 2 * n22 + 1];
              s22 = 16711935 & (s22 << 8 | s22 >>> 24) | 4278255360 & (s22 << 24 | s22 >>> 8);
              a22 = 16711935 & (a22 << 8 | a22 >>> 24) | 4278255360 & (a22 << 24 | a22 >>> 8);
              var o22 = r4[n22];
              o22.high ^= a22;
              o22.low ^= s22;
            }
            for (var u22 = 0; u22 < 24; u22++) {
              for (var d22 = 0; d22 < 5; d22++) {
                var v2 = 0, p2 = 0;
                for (var g2 = 0; g2 < 5; g2++) {
                  var o22 = r4[d22 + 5 * g2];
                  v2 ^= o22.high;
                  p2 ^= o22.low;
                }
                var y2 = h2[d22];
                y2.high = v2;
                y2.low = p2;
              }
              for (var d22 = 0; d22 < 5; d22++) {
                var m2 = h2[(d22 + 4) % 5];
                var w2 = h2[(d22 + 1) % 5];
                var S2 = w2.high;
                var _2 = w2.low;
                var v2 = m2.high ^ (S2 << 1 | _2 >>> 31);
                var p2 = m2.low ^ (_2 << 1 | S2 >>> 31);
                for (var g2 = 0; g2 < 5; g2++) {
                  var o22 = r4[d22 + 5 * g2];
                  o22.high ^= v2;
                  o22.low ^= p2;
                }
              }
              for (var b2 = 1; b2 < 25; b2++) {
                var v2;
                var p2;
                var o22 = r4[b2];
                var E2 = o22.high;
                var D2 = o22.low;
                var M2 = c2[b2];
                if (M2 < 32) {
                  v2 = E2 << M2 | D2 >>> 32 - M2;
                  p2 = D2 << M2 | E2 >>> 32 - M2;
                } else {
                  v2 = D2 << M2 - 32 | E2 >>> 64 - M2;
                  p2 = E2 << M2 - 32 | D2 >>> 64 - M2;
                }
                var T2 = h2[l2[b2]];
                T2.high = v2;
                T2.low = p2;
              }
              var I2 = h2[0];
              var A2 = r4[0];
              I2.high = A2.high;
              I2.low = A2.low;
              for (var d22 = 0; d22 < 5; d22++)
                for (var g2 = 0; g2 < 5; g2++) {
                  var b2 = d22 + 5 * g2;
                  var o22 = r4[b2];
                  var x = h2[b2];
                  var R2 = h2[(d22 + 1) % 5 + 5 * g2];
                  var B2 = h2[(d22 + 2) % 5 + 5 * g2];
                  o22.high = x.high ^ ~R2.high & B2.high;
                  o22.low = x.low ^ ~R2.low & B2.low;
                }
              var o22 = r4[0];
              var O2 = f2[u22];
              o22.high ^= O2.high;
              o22.low ^= O2.low;
            }
          }, _doFinalize: function() {
            var t4 = this._data;
            var r4 = t4.words;
            8 * this._nDataBytes;
            var s22 = 8 * t4.sigBytes;
            var a22 = 32 * this.blockSize;
            r4[s22 >>> 5] |= 1 << 24 - s22 % 32;
            r4[(e3.ceil((s22 + 1) / a22) * a22 >>> 5) - 1] |= 128;
            t4.sigBytes = 4 * r4.length;
            this._process();
            var o22 = this._state;
            var u22 = this.cfg.outputLength / 8;
            var c22 = u22 / 8;
            var l22 = [];
            for (var f22 = 0; f22 < c22; f22++) {
              var h22 = o22[f22];
              var d22 = h22.high;
              var v2 = h22.low;
              d22 = 16711935 & (d22 << 8 | d22 >>> 24) | 4278255360 & (d22 << 24 | d22 >>> 8);
              v2 = 16711935 & (v2 << 8 | v2 >>> 24) | 4278255360 & (v2 << 24 | v2 >>> 8);
              l22.push(v2);
              l22.push(d22);
            }
            return new n2.init(l22, u22);
          }, clone: function() {
            var t4 = s2.clone.call(this);
            var e4 = t4._state = this._state.slice(0);
            for (var r4 = 0; r4 < 25; r4++)
              e4[r4] = e4[r4].clone();
            return t4;
          } });
          r3.SHA3 = s2._createHelper(d2);
          r3.HmacSHA3 = s2._createHmacHelper(d2);
        })(Math);
        return t3.SHA3;
      });
    }, 7460: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(4938), r22(34));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.x64;
          var i22 = r3.Word;
          var n2 = r3.WordArray;
          var s2 = e3.algo;
          var a2 = s2.SHA512;
          var o2 = s2.SHA384 = a2.extend({ _doReset: function() {
            this._hash = new n2.init([new i22.init(3418070365, 3238371032), new i22.init(1654270250, 914150663), new i22.init(2438529370, 812702999), new i22.init(355462360, 4144912697), new i22.init(1731405415, 4290775857), new i22.init(2394180231, 1750603025), new i22.init(3675008525, 1694076839), new i22.init(1203062813, 3204075428)]);
          }, _doFinalize: function() {
            var t4 = a2._doFinalize.call(this);
            t4.sigBytes -= 16;
            return t4;
          } });
          e3.SHA384 = a2._createHelper(o2);
          e3.HmacSHA384 = a2._createHmacHelper(o2);
        })();
        return t3.SHA384;
      });
    }, 34: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(4938));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.Hasher;
          var n2 = e3.x64;
          var s2 = n2.Word;
          var a2 = n2.WordArray;
          var o2 = e3.algo;
          function u2() {
            return s2.create.apply(s2, arguments);
          }
          var c2 = [u2(1116352408, 3609767458), u2(1899447441, 602891725), u2(3049323471, 3964484399), u2(3921009573, 2173295548), u2(961987163, 4081628472), u2(1508970993, 3053834265), u2(2453635748, 2937671579), u2(2870763221, 3664609560), u2(3624381080, 2734883394), u2(310598401, 1164996542), u2(607225278, 1323610764), u2(1426881987, 3590304994), u2(1925078388, 4068182383), u2(2162078206, 991336113), u2(2614888103, 633803317), u2(3248222580, 3479774868), u2(3835390401, 2666613458), u2(4022224774, 944711139), u2(264347078, 2341262773), u2(604807628, 2007800933), u2(770255983, 1495990901), u2(1249150122, 1856431235), u2(1555081692, 3175218132), u2(1996064986, 2198950837), u2(2554220882, 3999719339), u2(2821834349, 766784016), u2(2952996808, 2566594879), u2(3210313671, 3203337956), u2(3336571891, 1034457026), u2(3584528711, 2466948901), u2(113926993, 3758326383), u2(338241895, 168717936), u2(666307205, 1188179964), u2(773529912, 1546045734), u2(1294757372, 1522805485), u2(1396182291, 2643833823), u2(1695183700, 2343527390), u2(1986661051, 1014477480), u2(2177026350, 1206759142), u2(2456956037, 344077627), u2(2730485921, 1290863460), u2(2820302411, 3158454273), u2(3259730800, 3505952657), u2(3345764771, 106217008), u2(3516065817, 3606008344), u2(3600352804, 1432725776), u2(4094571909, 1467031594), u2(275423344, 851169720), u2(430227734, 3100823752), u2(506948616, 1363258195), u2(659060556, 3750685593), u2(883997877, 3785050280), u2(958139571, 3318307427), u2(1322822218, 3812723403), u2(1537002063, 2003034995), u2(1747873779, 3602036899), u2(1955562222, 1575990012), u2(2024104815, 1125592928), u2(2227730452, 2716904306), u2(2361852424, 442776044), u2(2428436474, 593698344), u2(2756734187, 3733110249), u2(3204031479, 2999351573), u2(3329325298, 3815920427), u2(3391569614, 3928383900), u2(3515267271, 566280711), u2(3940187606, 3454069534), u2(4118630271, 4000239992), u2(116418474, 1914138554), u2(174292421, 2731055270), u2(289380356, 3203993006), u2(460393269, 320620315), u2(685471733, 587496836), u2(852142971, 1086792851), u2(1017036298, 365543100), u2(1126000580, 2618297676), u2(1288033470, 3409855158), u2(1501505948, 4234509866), u2(1607167915, 987167468), u2(1816402316, 1246189591)];
          var l2 = [];
          (function() {
            for (var t4 = 0; t4 < 80; t4++)
              l2[t4] = u2();
          })();
          var f2 = o2.SHA512 = i22.extend({ _doReset: function() {
            this._hash = new a2.init([new s2.init(1779033703, 4089235720), new s2.init(3144134277, 2227873595), new s2.init(1013904242, 4271175723), new s2.init(2773480762, 1595750129), new s2.init(1359893119, 2917565137), new s2.init(2600822924, 725511199), new s2.init(528734635, 4215389547), new s2.init(1541459225, 327033209)]);
          }, _doProcessBlock: function(t4, e4) {
            var r4 = this._hash.words;
            var i3 = r4[0];
            var n22 = r4[1];
            var s22 = r4[2];
            var a22 = r4[3];
            var o22 = r4[4];
            var u22 = r4[5];
            var f22 = r4[6];
            var h2 = r4[7];
            var d2 = i3.high;
            var v2 = i3.low;
            var p2 = n22.high;
            var g2 = n22.low;
            var y2 = s22.high;
            var m2 = s22.low;
            var w2 = a22.high;
            var S2 = a22.low;
            var _2 = o22.high;
            var b2 = o22.low;
            var E2 = u22.high;
            var D2 = u22.low;
            var M2 = f22.high;
            var T2 = f22.low;
            var I2 = h2.high;
            var A2 = h2.low;
            var x = d2;
            var R2 = v2;
            var B2 = p2;
            var O2 = g2;
            var k = y2;
            var C2 = m2;
            var N2 = w2;
            var P2 = S2;
            var V2 = _2;
            var L2 = b2;
            var H2 = E2;
            var U = D2;
            var K2 = M2;
            var j2 = T2;
            var q2 = I2;
            var F2 = A2;
            for (var z2 = 0; z2 < 80; z2++) {
              var G2;
              var Y2;
              var W2 = l2[z2];
              if (z2 < 16) {
                Y2 = W2.high = 0 | t4[e4 + 2 * z2];
                G2 = W2.low = 0 | t4[e4 + 2 * z2 + 1];
              } else {
                var J2 = l2[z2 - 15];
                var Z2 = J2.high;
                var $2 = J2.low;
                var X2 = (Z2 >>> 1 | $2 << 31) ^ (Z2 >>> 8 | $2 << 24) ^ Z2 >>> 7;
                var Q2 = ($2 >>> 1 | Z2 << 31) ^ ($2 >>> 8 | Z2 << 24) ^ ($2 >>> 7 | Z2 << 25);
                var tt2 = l2[z2 - 2];
                var et2 = tt2.high;
                var rt2 = tt2.low;
                var it2 = (et2 >>> 19 | rt2 << 13) ^ (et2 << 3 | rt2 >>> 29) ^ et2 >>> 6;
                var nt2 = (rt2 >>> 19 | et2 << 13) ^ (rt2 << 3 | et2 >>> 29) ^ (rt2 >>> 6 | et2 << 26);
                var st2 = l2[z2 - 7];
                var at2 = st2.high;
                var ot2 = st2.low;
                var ut2 = l2[z2 - 16];
                var ct2 = ut2.high;
                var lt2 = ut2.low;
                G2 = Q2 + ot2;
                Y2 = X2 + at2 + (G2 >>> 0 < Q2 >>> 0 ? 1 : 0);
                G2 += nt2;
                Y2 = Y2 + it2 + (G2 >>> 0 < nt2 >>> 0 ? 1 : 0);
                G2 += lt2;
                Y2 = Y2 + ct2 + (G2 >>> 0 < lt2 >>> 0 ? 1 : 0);
                W2.high = Y2;
                W2.low = G2;
              }
              var ft2 = V2 & H2 ^ ~V2 & K2;
              var ht2 = L2 & U ^ ~L2 & j2;
              var dt2 = x & B2 ^ x & k ^ B2 & k;
              var vt2 = R2 & O2 ^ R2 & C2 ^ O2 & C2;
              var pt2 = (x >>> 28 | R2 << 4) ^ (x << 30 | R2 >>> 2) ^ (x << 25 | R2 >>> 7);
              var gt2 = (R2 >>> 28 | x << 4) ^ (R2 << 30 | x >>> 2) ^ (R2 << 25 | x >>> 7);
              var yt2 = (V2 >>> 14 | L2 << 18) ^ (V2 >>> 18 | L2 << 14) ^ (V2 << 23 | L2 >>> 9);
              var mt2 = (L2 >>> 14 | V2 << 18) ^ (L2 >>> 18 | V2 << 14) ^ (L2 << 23 | V2 >>> 9);
              var wt2 = c2[z2];
              var St2 = wt2.high;
              var _t2 = wt2.low;
              var bt2 = F2 + mt2;
              var Et2 = q2 + yt2 + (bt2 >>> 0 < F2 >>> 0 ? 1 : 0);
              var bt2 = bt2 + ht2;
              var Et2 = Et2 + ft2 + (bt2 >>> 0 < ht2 >>> 0 ? 1 : 0);
              var bt2 = bt2 + _t2;
              var Et2 = Et2 + St2 + (bt2 >>> 0 < _t2 >>> 0 ? 1 : 0);
              var bt2 = bt2 + G2;
              var Et2 = Et2 + Y2 + (bt2 >>> 0 < G2 >>> 0 ? 1 : 0);
              var Dt2 = gt2 + vt2;
              var Mt2 = pt2 + dt2 + (Dt2 >>> 0 < gt2 >>> 0 ? 1 : 0);
              q2 = K2;
              F2 = j2;
              K2 = H2;
              j2 = U;
              H2 = V2;
              U = L2;
              L2 = P2 + bt2 | 0;
              V2 = N2 + Et2 + (L2 >>> 0 < P2 >>> 0 ? 1 : 0) | 0;
              N2 = k;
              P2 = C2;
              k = B2;
              C2 = O2;
              B2 = x;
              O2 = R2;
              R2 = bt2 + Dt2 | 0;
              x = Et2 + Mt2 + (R2 >>> 0 < bt2 >>> 0 ? 1 : 0) | 0;
            }
            v2 = i3.low = v2 + R2;
            i3.high = d2 + x + (v2 >>> 0 < R2 >>> 0 ? 1 : 0);
            g2 = n22.low = g2 + O2;
            n22.high = p2 + B2 + (g2 >>> 0 < O2 >>> 0 ? 1 : 0);
            m2 = s22.low = m2 + C2;
            s22.high = y2 + k + (m2 >>> 0 < C2 >>> 0 ? 1 : 0);
            S2 = a22.low = S2 + P2;
            a22.high = w2 + N2 + (S2 >>> 0 < P2 >>> 0 ? 1 : 0);
            b2 = o22.low = b2 + L2;
            o22.high = _2 + V2 + (b2 >>> 0 < L2 >>> 0 ? 1 : 0);
            D2 = u22.low = D2 + U;
            u22.high = E2 + H2 + (D2 >>> 0 < U >>> 0 ? 1 : 0);
            T2 = f22.low = T2 + j2;
            f22.high = M2 + K2 + (T2 >>> 0 < j2 >>> 0 ? 1 : 0);
            A2 = h2.low = A2 + F2;
            h2.high = I2 + q2 + (A2 >>> 0 < F2 >>> 0 ? 1 : 0);
          }, _doFinalize: function() {
            var t4 = this._data;
            var e4 = t4.words;
            var r4 = 8 * this._nDataBytes;
            var i3 = 8 * t4.sigBytes;
            e4[i3 >>> 5] |= 128 << 24 - i3 % 32;
            e4[(i3 + 128 >>> 10 << 5) + 30] = Math.floor(r4 / 4294967296);
            e4[(i3 + 128 >>> 10 << 5) + 31] = r4;
            t4.sigBytes = 4 * e4.length;
            this._process();
            var n22 = this._hash.toX32();
            return n22;
          }, clone: function() {
            var t4 = i22.clone.call(this);
            t4._hash = this._hash.clone();
            return t4;
          }, blockSize: 1024 / 32 });
          e3.SHA512 = i22._createHelper(f2);
          e3.HmacSHA512 = i22._createHmacHelper(f2);
        })();
        return t3.SHA512;
      });
    }, 4253: function(t22, e22, r22) {
      (function(i22, n2, s2) {
        t22.exports = n2(r22(8249), r22(8269), r22(8214), r22(888), r22(5109));
      })(this, function(t3) {
        (function() {
          var e3 = t3;
          var r3 = e3.lib;
          var i22 = r3.WordArray;
          var n2 = r3.BlockCipher;
          var s2 = e3.algo;
          var a2 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
          var o2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
          var u2 = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var c2 = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }];
          var l2 = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679];
          var f2 = s2.DES = n2.extend({ _doReset: function() {
            var t4 = this._key;
            var e4 = t4.words;
            var r4 = [];
            for (var i3 = 0; i3 < 56; i3++) {
              var n22 = a2[i3] - 1;
              r4[i3] = e4[n22 >>> 5] >>> 31 - n22 % 32 & 1;
            }
            var s22 = this._subKeys = [];
            for (var c22 = 0; c22 < 16; c22++) {
              var l22 = s22[c22] = [];
              var f22 = u2[c22];
              for (var i3 = 0; i3 < 24; i3++) {
                l22[i3 / 6 | 0] |= r4[(o2[i3] - 1 + f22) % 28] << 31 - i3 % 6;
                l22[4 + (i3 / 6 | 0)] |= r4[28 + (o2[i3 + 24] - 1 + f22) % 28] << 31 - i3 % 6;
              }
              l22[0] = l22[0] << 1 | l22[0] >>> 31;
              for (var i3 = 1; i3 < 7; i3++)
                l22[i3] = l22[i3] >>> 4 * (i3 - 1) + 3;
              l22[7] = l22[7] << 5 | l22[7] >>> 27;
            }
            var h22 = this._invSubKeys = [];
            for (var i3 = 0; i3 < 16; i3++)
              h22[i3] = s22[15 - i3];
          }, encryptBlock: function(t4, e4) {
            this._doCryptBlock(t4, e4, this._subKeys);
          }, decryptBlock: function(t4, e4) {
            this._doCryptBlock(t4, e4, this._invSubKeys);
          }, _doCryptBlock: function(t4, e4, r4) {
            this._lBlock = t4[e4];
            this._rBlock = t4[e4 + 1];
            h2.call(this, 4, 252645135);
            h2.call(this, 16, 65535);
            d2.call(this, 2, 858993459);
            d2.call(this, 8, 16711935);
            h2.call(this, 1, 1431655765);
            for (var i3 = 0; i3 < 16; i3++) {
              var n22 = r4[i3];
              var s22 = this._lBlock;
              var a22 = this._rBlock;
              var o22 = 0;
              for (var u22 = 0; u22 < 8; u22++)
                o22 |= c2[u22][((a22 ^ n22[u22]) & l2[u22]) >>> 0];
              this._lBlock = a22;
              this._rBlock = s22 ^ o22;
            }
            var f22 = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = f22;
            h2.call(this, 1, 1431655765);
            d2.call(this, 8, 16711935);
            d2.call(this, 2, 858993459);
            h2.call(this, 16, 65535);
            h2.call(this, 4, 252645135);
            t4[e4] = this._lBlock;
            t4[e4 + 1] = this._rBlock;
          }, keySize: 64 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
          function h2(t4, e4) {
            var r4 = (this._lBlock >>> t4 ^ this._rBlock) & e4;
            this._rBlock ^= r4;
            this._lBlock ^= r4 << t4;
          }
          function d2(t4, e4) {
            var r4 = (this._rBlock >>> t4 ^ this._lBlock) & e4;
            this._lBlock ^= r4;
            this._rBlock ^= r4 << t4;
          }
          e3.DES = n2._createHelper(f2);
          var v2 = s2.TripleDES = n2.extend({ _doReset: function() {
            var t4 = this._key;
            var e4 = t4.words;
            if (2 !== e4.length && 4 !== e4.length && e4.length < 6)
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var r4 = e4.slice(0, 2);
            var n22 = e4.length < 4 ? e4.slice(0, 2) : e4.slice(2, 4);
            var s22 = e4.length < 6 ? e4.slice(0, 2) : e4.slice(4, 6);
            this._des1 = f2.createEncryptor(i22.create(r4));
            this._des2 = f2.createEncryptor(i22.create(n22));
            this._des3 = f2.createEncryptor(i22.create(s22));
          }, encryptBlock: function(t4, e4) {
            this._des1.encryptBlock(t4, e4);
            this._des2.decryptBlock(t4, e4);
            this._des3.encryptBlock(t4, e4);
          }, decryptBlock: function(t4, e4) {
            this._des3.decryptBlock(t4, e4);
            this._des2.encryptBlock(t4, e4);
            this._des1.decryptBlock(t4, e4);
          }, keySize: 192 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
          e3.TripleDES = n2._createHelper(v2);
        })();
        return t3.TripleDES;
      });
    }, 4938: function(t22, e22, r22) {
      (function(i22, n2) {
        t22.exports = n2(r22(8249));
      })(this, function(t3) {
        (function(e3) {
          var r3 = t3;
          var i22 = r3.lib;
          var n2 = i22.Base;
          var s2 = i22.WordArray;
          var a2 = r3.x64 = {};
          a2.Word = n2.extend({ init: function(t4, e4) {
            this.high = t4;
            this.low = e4;
          } });
          a2.WordArray = n2.extend({ init: function(t4, r4) {
            t4 = this.words = t4 || [];
            if (r4 != e3)
              this.sigBytes = r4;
            else
              this.sigBytes = 8 * t4.length;
          }, toX32: function() {
            var t4 = this.words;
            var e4 = t4.length;
            var r4 = [];
            for (var i3 = 0; i3 < e4; i3++) {
              var n22 = t4[i3];
              r4.push(n22.high);
              r4.push(n22.low);
            }
            return s2.create(r4, this.sigBytes);
          }, clone: function() {
            var t4 = n2.clone.call(this);
            var e4 = t4.words = this.words.slice(0);
            var r4 = e4.length;
            for (var i3 = 0; i3 < r4; i3++)
              e4[i3] = e4[i3].clone();
            return t4;
          } });
        })();
        return t3;
      });
    }, 4198: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      e22.ErrorCode = void 0;
      (function(t3) {
        t3[t3["SUCCESS"] = 0] = "SUCCESS";
        t3[t3["CLIENT_ID_NOT_FOUND"] = 1] = "CLIENT_ID_NOT_FOUND";
        t3[t3["OPERATION_TOO_OFTEN"] = 2] = "OPERATION_TOO_OFTEN";
        t3[t3["REPEAT_MESSAGE"] = 3] = "REPEAT_MESSAGE";
        t3[t3["TIME_OUT"] = 4] = "TIME_OUT";
      })(e22.ErrorCode || (e22.ErrorCode = {}));
    }, 9021: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      const n2 = i22(r22(6893));
      const s2 = i22(r22(7555));
      const a2 = i22(r22(6379));
      const o2 = i22(r22(529));
      var u2;
      (function(t3) {
        function e3(t4) {
          o2.default.debugMode = t4;
          o2.default.info(`setDebugMode: ${t4}`);
        }
        t3.setDebugMode = e3;
        function r3(t4) {
          try {
            s2.default.init(t4);
          } catch (t5) {
            o2.default.error(`init error`, t5);
          }
        }
        t3.init = r3;
        function i3(t4) {
          try {
            if (!t4.url)
              throw new Error("invalid url");
            if (!t4.key || !t4.keyId)
              throw new Error("invalid key or keyId");
            a2.default.socketUrl = t4.url;
            a2.default.publicKeyId = t4.keyId;
            a2.default.publicKey = t4.key;
          } catch (t5) {
            o2.default.error(`setSocketServer error`, t5);
          }
        }
        t3.setSocketServer = i3;
        function u22(t4) {
          try {
            s2.default.enableSocket(t4);
          } catch (t5) {
            o2.default.error(`enableSocket error`, t5);
          }
        }
        t3.enableSocket = u22;
        function c2() {
          return n2.default.SDK_VERSION;
        }
        t3.getVersion = c2;
      })(u2 || (u2 = {}));
      t22.exports = u2;
    }, 9478: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(529));
      const s2 = i22(r22(496));
      const a2 = i22(r22(3555));
      const o2 = i22(r22(1929));
      const u2 = i22(r22(4379));
      const c2 = i22(r22(6899));
      const l2 = i22(r22(776));
      const f2 = i22(r22(2002));
      const h2 = i22(r22(5807));
      const d2 = i22(r22(9704));
      const v2 = i22(r22(6545));
      const p2 = i22(r22(3680));
      const g2 = i22(r22(7706));
      const y2 = i22(r22(4486));
      const m2 = i22(r22(5867));
      const w2 = i22(r22(7006));
      var S2;
      (function(t3) {
        let e3;
        let r3;
        let i3;
        function S22() {
          let t4;
          try {
            if ("undefined" != typeof index) {
              e3 = new v2.default();
              r3 = new p2.default();
              i3 = new g2.default();
            } else if ("undefined" != typeof tt) {
              e3 = new f2.default();
              r3 = new h2.default();
              i3 = new d2.default();
            } else if ("undefined" != typeof my) {
              e3 = new s2.default();
              r3 = new a2.default();
              i3 = new o2.default();
            } else if ("undefined" != typeof wx$1) {
              e3 = new y2.default();
              r3 = new m2.default();
              i3 = new w2.default();
            } else if ("undefined" != typeof window) {
              e3 = new u2.default();
              r3 = new c2.default();
              i3 = new l2.default();
            }
          } catch (e4) {
            n2.default.error(`init am error: ${e4}`);
            t4 = e4;
          }
          if (!e3 || !r3 || !i3) {
            if ("undefined" != typeof window) {
              e3 = new u2.default();
              r3 = new c2.default();
              i3 = new l2.default();
            }
          }
          if (!e3 || !r3 || !i3)
            throw new Error(`init am error: no api impl found, ${t4}`);
        }
        function _2() {
          if (!e3)
            S22();
          return e3;
        }
        t3.getDevice = _2;
        function b2() {
          if (!r3)
            S22();
          return r3;
        }
        t3.getStorage = b2;
        function E2() {
          if (!i3)
            S22();
          return i3;
        }
        t3.getWebSocket = E2;
      })(S2 || (S2 = {}));
      e22["default"] = S2;
    }, 4685: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(9478));
      var s2;
      (function(t3) {
        function e3() {
          return n2.default.getDevice().os();
        }
        t3.os = e3;
        function r3() {
          return n2.default.getDevice().osVersion();
        }
        t3.osVersion = r3;
        function i3() {
          return n2.default.getDevice().model();
        }
        t3.model = i3;
        function s22() {
          return n2.default.getDevice().brand();
        }
        t3.brand = s22;
        function a2() {
          return n2.default.getDevice().platform();
        }
        t3.platform = a2;
        function o2() {
          return n2.default.getDevice().platformVersion();
        }
        t3.platformVersion = o2;
        function u2() {
          return n2.default.getDevice().platformId();
        }
        t3.platformId = u2;
        function c2() {
          return n2.default.getDevice().language();
        }
        t3.language = c2;
        function l2() {
          let t4 = n2.default.getDevice().userAgent;
          if (t4)
            return t4();
          return "";
        }
        t3.userAgent = l2;
        function f2(t4) {
          n2.default.getDevice().getNetworkType(t4);
        }
        t3.getNetworkType = f2;
        function h2(t4) {
          n2.default.getDevice().onNetworkStatusChange(t4);
        }
        t3.onNetworkStatusChange = h2;
      })(s2 || (s2 = {}));
      e22["default"] = s2;
    }, 7002: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(6379));
      const s2 = i22(r22(1386));
      const a2 = i22(r22(4054));
      const o2 = r22(2918);
      const u2 = i22(r22(7167));
      const c2 = i22(r22(529));
      const l2 = i22(r22(9478));
      const f2 = i22(r22(8506));
      var h2;
      (function(t3) {
        let e3;
        let r3 = false;
        let i3 = false;
        let h22 = false;
        let d2 = [];
        const v2 = 10;
        let p2 = 0;
        t3.allowReconnect = true;
        function g2() {
          return r3 && i3;
        }
        t3.isAvailable = g2;
        function y2(e4) {
          let r4 = (/* @__PURE__ */ new Date()).getTime();
          if (r4 - p2 < 1e3) {
            c2.default.warn(`enableSocket ${e4} fail: this function can only be called once a second`);
            return;
          }
          p2 = r4;
          t3.allowReconnect = e4;
          if (e4)
            t3.reconnect(10);
          else
            t3.close(`enableSocket ${e4}`);
        }
        t3.enableSocket = y2;
        function m2(e4 = 0) {
          if (!t3.allowReconnect)
            return;
          if (!_2())
            return;
          setTimeout(function() {
            w2();
          }, e4);
        }
        t3.reconnect = m2;
        function w2() {
          t3.allowReconnect = true;
          if (!_2())
            return;
          if (!b2())
            return;
          h22 = true;
          let r4 = n2.default.socketUrl;
          try {
            let t4 = f2.default.getSync(f2.default.KEY_REDIRECT_SERVER, "");
            if (t4) {
              let e4 = o2.RedirectServerData.parse(t4);
              let i4 = e4.addressList[0].split(",");
              let n22 = i4[0];
              let s22 = Number(i4[1]);
              let a22 = (/* @__PURE__ */ new Date()).getTime();
              if (a22 - e4.time < 1e3 * s22)
                r4 = n22;
            }
          } catch (t4) {
          }
          e3 = l2.default.getWebSocket().connect({ url: r4, success: function() {
            i3 = true;
            S2();
          }, fail: function() {
            i3 = false;
            M2();
            m2(100);
          } });
          e3.onOpen(T2);
          e3.onClose(x);
          e3.onError(A2);
          e3.onMessage(I2);
        }
        t3.connect = w2;
        function S2() {
          if (i3 && r3) {
            h22 = false;
            s2.default.create().send();
            u2.default.getInstance().start();
          }
        }
        function _2() {
          if (!n2.default.networkConnected) {
            c2.default.error(`connect failed, network is not available`);
            return false;
          }
          if (h22) {
            c2.default.warn(`connecting`);
            return false;
          }
          if (g2()) {
            c2.default.warn(`already connected`);
            return false;
          }
          return true;
        }
        function b2() {
          var t4 = d2.length;
          let e4 = (/* @__PURE__ */ new Date()).getTime();
          if (t4 > 0) {
            for (var r4 = t4 - 1; r4 >= 0; r4--)
              if (e4 - d2[r4] > 5e3) {
                d2.splice(0, r4 + 1);
                break;
              }
          }
          t4 = d2.length;
          d2.push(e4);
          if (t4 >= v2) {
            c2.default.error("connect failed, connection limit reached");
            return false;
          }
          return true;
        }
        function E2(t4 = "") {
          null === e3 || void 0 === e3 || e3.close({ code: 1e3, reason: t4, success: function(t5) {
          }, fail: function(t5) {
          } });
          M2();
        }
        t3.close = E2;
        function D2(t4) {
          if (r3 && r3)
            null === e3 || void 0 === e3 || e3.send({ data: t4, success: function(t5) {
            }, fail: function(t5) {
            } });
          else
            throw new Error(`socket not connect`);
        }
        t3.send = D2;
        function M2(t4) {
          var e4;
          i3 = false;
          r3 = false;
          h22 = false;
          u2.default.getInstance().cancel();
          if (n2.default.online) {
            n2.default.online = false;
            null === (e4 = n2.default.onlineState) || void 0 === e4 || e4.call(n2.default.onlineState, { online: n2.default.online });
          }
        }
        let T2 = function(t4) {
          r3 = true;
          S2();
        };
        let I2 = function(t4) {
          try {
            t4.data;
            u2.default.getInstance().refresh();
            a2.default.receiveMessage(t4.data);
          } catch (t5) {
          }
        };
        let A2 = function(t4) {
          E2(`socket error`);
        };
        let x = function(t4) {
          M2();
        };
      })(h2 || (h2 = {}));
      e22["default"] = h2;
    }, 8506: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(9478));
      var s2;
      (function(t3) {
        t3.KEY_APPID = "getui_appid";
        t3.KEY_CID = "getui_cid";
        t3.KEY_SESSION = "getui_session";
        t3.KEY_REGID = "getui_regid";
        t3.KEY_SOCKET_URL = "getui_socket_url";
        t3.KEY_DEVICE_ID = "getui_deviceid";
        t3.KEY_ADD_PHONE_INFO_TIME = "getui_api_time";
        t3.KEY_BIND_ALIAS_TIME = "getui_ba_time";
        t3.KEY_SET_TAG_TIME = "getui_st_time";
        t3.KEY_REDIRECT_SERVER = "getui_redirect_server";
        t3.KEY_LAST_CONNECT_TIME = "getui_last_connect_time";
        function e3(t4) {
          n2.default.getStorage().set(t4);
        }
        t3.set = e3;
        function r3(t4, e4) {
          n2.default.getStorage().setSync(t4, e4);
        }
        t3.setSync = r3;
        function i3(t4) {
          n2.default.getStorage().get(t4);
        }
        t3.get = i3;
        function s22(t4, e4) {
          let r4 = n2.default.getStorage().getSync(t4);
          return r4 ? r4 : e4;
        }
        t3.getSync = s22;
      })(s2 || (s2 = {}));
      e22["default"] = s2;
    }, 496: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      const n2 = i22(r22(3854));
      class s2 {
        constructor() {
          this.systemInfo = my.getSystemInfoSync();
        }
        os() {
          return n2.default.getStr(this.systemInfo, "platform");
        }
        osVersion() {
          return n2.default.getStr(this.systemInfo, "system");
        }
        model() {
          return n2.default.getStr(this.systemInfo, "model");
        }
        brand() {
          return n2.default.getStr(this.systemInfo, "brand");
        }
        platform() {
          return "MP-ALIPAY";
        }
        platformVersion() {
          return n2.default.getStr(this.systemInfo, "app") + " " + n2.default.getStr(this.systemInfo, "version");
        }
        platformId() {
          return my.getAppIdSync();
        }
        language() {
          return n2.default.getStr(this.systemInfo, "language");
        }
        getNetworkType(t3) {
          my.getNetworkType({ success: (e3) => {
            var r3;
            null === (r3 = t3.success) || void 0 === r3 || r3.call(t3.success, { networkType: e3.networkType });
          }, fail: () => {
            var e3;
            null === (e3 = t3.fail) || void 0 === e3 || e3.call(t3.fail, "");
          } });
        }
        onNetworkStatusChange(t3) {
          my.onNetworkStatusChange(t3);
        }
      }
      t22.exports = s2;
    }, 3555: (t22) => {
      class e22 {
        set(t3) {
          my.setStorage({ key: t3.key, data: t3.data, success: t3.success, fail: t3.fail });
        }
        setSync(t3, e3) {
          my.setStorageSync({ key: t3, data: e3 });
        }
        get(t3) {
          my.getStorage({ key: t3.key, success: t3.success, fail: t3.fail, complete: t3.complete });
        }
        getSync(t3) {
          return my.getStorageSync({ key: t3 }).data;
        }
      }
      t22.exports = e22;
    }, 1929: (t22) => {
      class e22 {
        connect(t3) {
          my.connectSocket({ url: t3.url, header: t3.header, method: t3.method, success: t3.success, fail: t3.fail, complete: t3.complete });
          return { onOpen: my.onSocketOpen, send: my.sendSocketMessage, onMessage: (t4) => {
            my.onSocketMessage.call(my.onSocketMessage, (e3) => {
              t4.call(t4, { data: e3 ? e3.data : "" });
            });
          }, onError: my.onSocketError, onClose: my.onSocketClose, close: my.closeSocket };
        }
      }
      t22.exports = e22;
    }, 4379: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        os() {
          let t3 = window.navigator.userAgent.toLowerCase();
          if (t3.indexOf("android") > 0 || t3.indexOf("adr") > 0)
            return "android";
          if (!!t3.match(/\(i[^;]+;( u;)? cpu.+mac os x/))
            return "ios";
          if (t3.indexOf("windows") > 0 || t3.indexOf("win32") > 0 || t3.indexOf("win64") > 0)
            return "windows";
          if (t3.indexOf("macintosh") > 0 || t3.indexOf("mac os") > 0)
            return "mac os";
          if (t3.indexOf("linux") > 0)
            return "linux";
          if (t3.indexOf("unix") > 0)
            return "linux";
          return "other";
        }
        osVersion() {
          let t3 = window.navigator.userAgent.toLowerCase();
          let e3 = t3.substring(t3.indexOf(";") + 1).trim();
          if (e3.indexOf(";") > 0)
            return e3.substring(0, e3.indexOf(";")).trim();
          return e3.substring(0, e3.indexOf(")")).trim();
        }
        model() {
          return "";
        }
        brand() {
          return "";
        }
        platform() {
          return "H5";
        }
        platformVersion() {
          return "";
        }
        platformId() {
          return "";
        }
        language() {
          return window.navigator.language;
        }
        userAgent() {
          return window.navigator.userAgent;
        }
        getNetworkType(t3) {
          var e3;
          null === (e3 = t3.success) || void 0 === e3 || e3.call(t3.success, { networkType: window.navigator.onLine ? "unknown" : "none" });
        }
        onNetworkStatusChange(t3) {
        }
      }
      e22["default"] = r22;
    }, 6899: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        set(t3) {
          var e3;
          window.localStorage.setItem(t3.key, t3.data);
          null === (e3 = t3.success) || void 0 === e3 || e3.call(t3.success, "");
        }
        setSync(t3, e3) {
          window.localStorage.setItem(t3, e3);
        }
        get(t3) {
          var e3;
          let r3 = window.localStorage.getItem(t3.key);
          null === (e3 = t3.success) || void 0 === e3 || e3.call(t3.success, r3);
        }
        getSync(t3) {
          return window.localStorage.getItem(t3);
        }
      }
      e22["default"] = r22;
    }, 776: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        connect(t3) {
          let e3 = new WebSocket(t3.url);
          return { send: (t4) => {
            var r3, i22;
            try {
              e3.send(t4.data);
              null === (r3 = t4.success) || void 0 === r3 || r3.call(t4.success, { errMsg: "" });
            } catch (e4) {
              null === (i22 = t4.fail) || void 0 === i22 || i22.call(t4.fail, { errMsg: e4 + "" });
            }
          }, close: (t4) => {
            var r3, i22;
            try {
              e3.close(t4.code, t4.reason);
              null === (r3 = t4.success) || void 0 === r3 || r3.call(t4.success, { errMsg: "" });
            } catch (e4) {
              null === (i22 = t4.fail) || void 0 === i22 || i22.call(t4.fail, { errMsg: e4 + "" });
            }
          }, onOpen: (r3) => {
            e3.onopen = (e4) => {
              var i22;
              null === (i22 = t3.success) || void 0 === i22 || i22.call(t3.success, "");
              r3({ header: "" });
            };
          }, onError: (r3) => {
            e3.onerror = (e4) => {
              var i22;
              null === (i22 = t3.fail) || void 0 === i22 || i22.call(t3.fail, "");
              r3({ errMsg: "" });
            };
          }, onMessage: (t4) => {
            e3.onmessage = (e4) => {
              t4({ data: e4.data });
            };
          }, onClose: (t4) => {
            e3.onclose = (e4) => {
              t4(e4);
            };
          } };
        }
      }
      e22["default"] = r22;
    }, 2002: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(3854));
      class s2 {
        constructor() {
          this.systemInfo = tt.getSystemInfoSync();
        }
        os() {
          return n2.default.getStr(this.systemInfo, "platform");
        }
        osVersion() {
          return n2.default.getStr(this.systemInfo, "system");
        }
        model() {
          return n2.default.getStr(this.systemInfo, "model");
        }
        brand() {
          return n2.default.getStr(this.systemInfo, "brand");
        }
        platform() {
          return "MP-TOUTIAO";
        }
        platformVersion() {
          return n2.default.getStr(this.systemInfo, "appName") + " " + n2.default.getStr(this.systemInfo, "version");
        }
        language() {
          return "";
        }
        platformId() {
          return "";
        }
        getNetworkType(t3) {
          tt.getNetworkType(t3);
        }
        onNetworkStatusChange(t3) {
          tt.onNetworkStatusChange(t3);
        }
      }
      e22["default"] = s2;
    }, 5807: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        set(t3) {
          tt.setStorage(t3);
        }
        setSync(t3, e3) {
          tt.setStorageSync(t3, e3);
        }
        get(t3) {
          tt.getStorage(t3);
        }
        getSync(t3) {
          return tt.getStorageSync(t3);
        }
      }
      e22["default"] = r22;
    }, 9704: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        connect(t3) {
          let e3 = tt.connectSocket({ url: t3.url, header: t3.header, protocols: t3.protocols, success: t3.success, fail: t3.fail, complete: t3.complete });
          return { onOpen: e3.onOpen, send: e3.send, onMessage: e3.onMessage, onError: e3.onError, onClose: e3.onClose, close: e3.close };
        }
      }
      e22["default"] = r22;
    }, 6545: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(3854));
      class s2 {
        constructor() {
          try {
            this.systemInfo = index.getSystemInfoSync();
            this.accountInfo = index.getAccountInfoSync();
          } catch (t3) {
          }
        }
        os() {
          return n2.default.getStr(this.systemInfo, "platform");
        }
        model() {
          return n2.default.getStr(this.systemInfo, "model");
        }
        brand() {
          return n2.default.getStr(this.systemInfo, "brand");
        }
        osVersion() {
          return n2.default.getStr(this.systemInfo, "system");
        }
        platform() {
          let t3 = "";
          t3 = "MP-WEIXIN";
          return t3;
        }
        platformVersion() {
          return this.systemInfo ? this.systemInfo.version : "";
        }
        platformId() {
          return this.accountInfo ? this.accountInfo.miniProgram.appId : "";
        }
        language() {
          var t3;
          return (null === (t3 = this.systemInfo) || void 0 === t3 ? void 0 : t3.language) ? this.systemInfo.language : "";
        }
        userAgent() {
          return window ? window.navigator.userAgent : "";
        }
        getNetworkType(t3) {
          index.getNetworkType(t3);
        }
        onNetworkStatusChange(t3) {
          index.onNetworkStatusChange(t3);
        }
      }
      e22["default"] = s2;
    }, 3680: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        set(t3) {
          index.setStorage(t3);
        }
        setSync(t3, e3) {
          index.setStorageSync(t3, e3);
        }
        get(t3) {
          index.getStorage(t3);
        }
        getSync(t3) {
          return index.getStorageSync(t3);
        }
      }
      e22["default"] = r22;
    }, 7706: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        connect(t3) {
          let e3 = index.connectSocket(t3);
          return { send: (t4) => {
            null === e3 || void 0 === e3 || e3.send(t4);
          }, close: (t4) => {
            null === e3 || void 0 === e3 || e3.close(t4);
          }, onOpen: (t4) => {
            null === e3 || void 0 === e3 || e3.onOpen(t4);
          }, onError: (t4) => {
            null === e3 || void 0 === e3 || e3.onError(t4);
          }, onMessage: (t4) => {
            null === e3 || void 0 === e3 || e3.onMessage(t4);
          }, onClose: (t4) => {
            null === e3 || void 0 === e3 || e3.onClose(t4);
          } };
        }
      }
      e22["default"] = r22;
    }, 4486: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(3854));
      class s2 {
        constructor() {
          this.systemInfo = wx$1.getSystemInfoSync();
        }
        os() {
          return n2.default.getStr(this.systemInfo, "platform");
        }
        osVersion() {
          return n2.default.getStr(this.systemInfo, "system");
        }
        model() {
          return n2.default.getStr(this.systemInfo, "model");
        }
        brand() {
          return n2.default.getStr(this.systemInfo, "brand");
        }
        platform() {
          return "MP-WEIXIN";
        }
        platformVersion() {
          return n2.default.getStr(this.systemInfo, "version");
        }
        language() {
          return n2.default.getStr(this.systemInfo, "language");
        }
        platformId() {
          if (wx$1.canIUse("getAccountInfoSync"))
            return wx$1.getAccountInfoSync().miniProgram.appId;
          return "";
        }
        getNetworkType(t3) {
          wx$1.getNetworkType({ success: (e3) => {
            var r3;
            null === (r3 = t3.success) || void 0 === r3 || r3.call(t3.success, { networkType: e3.networkType });
          }, fail: t3.fail });
        }
        onNetworkStatusChange(t3) {
          wx$1.onNetworkStatusChange(t3);
        }
      }
      e22["default"] = s2;
    }, 5867: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        set(t3) {
          wx$1.setStorage(t3);
        }
        setSync(t3, e3) {
          wx$1.setStorageSync(t3, e3);
        }
        get(t3) {
          wx$1.getStorage(t3);
        }
        getSync(t3) {
          return wx$1.getStorageSync(t3);
        }
      }
      e22["default"] = r22;
    }, 7006: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        connect(t3) {
          let e3 = wx$1.connectSocket({ url: t3.url, header: t3.header, protocols: t3.protocols, success: t3.success, fail: t3.fail, complete: t3.complete });
          return { onOpen: e3.onOpen, send: e3.send, onMessage: e3.onMessage, onError: e3.onError, onClose: e3.onClose, close: e3.close };
        }
      }
      e22["default"] = r22;
    }, 6893: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      var r22;
      (function(t3) {
        t3.SDK_VERSION = "GTMP-2.0.4.dcloud";
        t3.DEFAULT_SOCKET_URL = "wss://wshzn.gepush.com:5223/nws";
        t3.SOCKET_PROTOCOL_VERSION = "1.0";
        t3.SERVER_PUBLIC_KEY = "MHwwDQYJKoZIhvcNAQEBBQADawAwaAJhAJp1rROuvBF7sBSnvLaesj2iFhMcY8aXyLvpnNLKs2wjL3JmEnyr++SlVa35liUlzi83tnAFkn3A9GB7pHBNzawyUkBh8WUhq5bnFIkk2RaDa6+5MpG84DEv52p7RR+aWwIDAQAB";
        t3.SERVER_PUBLIC_KEY_ID = "69d747c4b9f641baf4004be4297e9f3b";
        t3.ID_U_2_G = true;
      })(r22 || (r22 = {}));
      e22["default"] = r22;
    }, 7555: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(7002));
      const s2 = i22(r22(529));
      const a2 = i22(r22(6379));
      class o2 {
        static init(t3) {
          var e3;
          if (this.inited)
            return;
          try {
            this.checkAppid(t3.appid);
            this.inited = true;
            s2.default.info(`init: appid=${t3.appid}`);
            a2.default.init(t3);
            n2.default.connect();
          } catch (r3) {
            this.inited = false;
            null === (e3 = t3.onError) || void 0 === e3 || e3.call(t3.onError, { error: r3 });
            throw r3;
          }
        }
        static enableSocket(t3) {
          this.checkInit();
          n2.default.enableSocket(t3);
        }
        static checkInit() {
          if (!this.inited)
            throw new Error(`not init, please invoke init method firstly`);
        }
        static checkAppid(t3) {
          if (null == t3 || void 0 == t3 || "" == t3.trim())
            throw new Error(`invalid appid ${t3}`);
        }
      }
      o2.inited = false;
      e22["default"] = o2;
    }, 6379: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(6667));
      const s2 = i22(r22(8506));
      const a2 = i22(r22(6893));
      const o2 = i22(r22(7002));
      const u2 = i22(r22(529));
      const c2 = i22(r22(4685));
      const l2 = i22(r22(2323));
      class f2 {
        static init(t3) {
          var e3;
          if (a2.default.ID_U_2_G)
            this.appid = l2.default.to_getui(t3.appid);
          else
            this.appid = t3.appid;
          this.onError = t3.onError;
          this.onClientId = t3.onClientId;
          this.onlineState = t3.onlineState;
          this.onPushMsg = t3.onPushMsg;
          if (this.appid != s2.default.getSync(s2.default.KEY_APPID, this.appid)) {
            u2.default.info("appid changed, clear session and cid");
            s2.default.setSync(s2.default.KEY_CID, "");
            s2.default.setSync(s2.default.KEY_SESSION, "");
          }
          s2.default.setSync(s2.default.KEY_APPID, this.appid);
          this.cid = s2.default.getSync(s2.default.KEY_CID, this.cid);
          if (this.cid)
            null === (e3 = this.onClientId) || void 0 === e3 || e3.call(this.onClientId, { cid: f2.cid });
          this.session = s2.default.getSync(s2.default.KEY_SESSION, this.session);
          this.deviceId = s2.default.getSync(s2.default.KEY_DEVICE_ID, this.deviceId);
          this.regId = s2.default.getSync(s2.default.KEY_REGID, this.regId);
          if (!this.regId) {
            this.regId = this.createRegId();
            s2.default.set({ key: s2.default.KEY_REGID, data: this.regId });
          }
          this.socketUrl = s2.default.getSync(s2.default.KEY_SOCKET_URL, this.socketUrl);
          let r3 = this;
          c2.default.getNetworkType({ success: (t4) => {
            r3.networkType = t4.networkType;
            r3.networkConnected = "none" != r3.networkType && "" != r3.networkType;
          } });
          c2.default.onNetworkStatusChange((t4) => {
            r3.networkConnected = t4.isConnected;
            r3.networkType = t4.networkType;
            if (r3.networkConnected)
              o2.default.reconnect(100);
          });
        }
        static createRegId() {
          return `M-V${n2.default.md5Hex(this.getUuid())}-${(/* @__PURE__ */ new Date()).getTime()}`;
        }
        static getUuid() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t3) {
            let e3 = 16 * Math.random() | 0, r3 = "x" === t3 ? e3 : 3 & e3 | 8;
            return r3.toString(16);
          });
        }
      }
      f2.appid = "";
      f2.cid = "";
      f2.regId = "";
      f2.session = "";
      f2.deviceId = "";
      f2.packetId = 1;
      f2.online = false;
      f2.socketUrl = a2.default.DEFAULT_SOCKET_URL;
      f2.publicKeyId = a2.default.SERVER_PUBLIC_KEY_ID;
      f2.publicKey = a2.default.SERVER_PUBLIC_KEY;
      f2.lastAliasTime = 0;
      f2.networkConnected = true;
      f2.networkType = "none";
      e22["default"] = f2;
    }, 9586: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n2, s2;
      Object.defineProperty(e22, "__esModule", { value: true });
      const a2 = i22(r22(661));
      const o2 = r22(4198);
      const u2 = i22(r22(6379));
      class c2 extends a2.default {
        constructor() {
          super(...arguments);
          this.actionMsgData = new l2();
        }
        static initActionMsg(t3, ...e3) {
          super.initMsg(t3);
          t3.command = a2.default.Command.CLIENT_MSG;
          t3.data = t3.actionMsgData = l2.create();
          return t3;
        }
        static parseActionMsg(t3, e3) {
          super.parseMsg(t3, e3);
          t3.actionMsgData = l2.parse(t3.data);
          return t3;
        }
        send() {
          setTimeout(() => {
            var t3;
            if (c2.waitingLoginMsgMap.has(this.actionMsgData.msgId) || c2.waitingResponseMsgMap.has(this.actionMsgData.msgId)) {
              c2.waitingLoginMsgMap.delete(this.actionMsgData.msgId);
              c2.waitingResponseMsgMap.delete(this.actionMsgData.msgId);
              null === (t3 = this.callback) || void 0 === t3 || t3.call(this.callback, { resultCode: o2.ErrorCode.TIME_OUT, message: "waiting time out" });
            }
          }, 1e4);
          if (!u2.default.online) {
            c2.waitingLoginMsgMap.set(this.actionMsgData.msgId, this);
            return;
          }
          if (this.actionMsgData.msgAction != c2.ClientAction.RECEIVED)
            c2.waitingResponseMsgMap.set(this.actionMsgData.msgId, this);
          super.send();
        }
        receive() {
        }
        static sendWaitingMessages() {
          let t3 = this.waitingLoginMsgMap.keys();
          let e3;
          while (e3 = t3.next(), !e3.done) {
            let t4 = this.waitingLoginMsgMap.get(e3.value);
            this.waitingLoginMsgMap.delete(e3.value);
            null === t4 || void 0 === t4 || t4.send();
          }
        }
        static getWaitingResponseMessage(t3) {
          return c2.waitingResponseMsgMap.get(t3);
        }
        static removeWaitingResponseMessage(t3) {
          let e3 = c2.waitingResponseMsgMap.get(t3);
          if (e3)
            c2.waitingResponseMsgMap.delete(t3);
          return e3;
        }
      }
      c2.ServerAction = (n2 = class {
      }, n2.PUSH_MESSAGE = "pushmessage", n2.REDIRECT_SERVER = "redirect_server", n2.ADD_PHONE_INFO_RESULT = "addphoneinfo", n2.SET_MODE_RESULT = "set_mode_result", n2.SET_TAG_RESULT = "settag_result", n2.BIND_ALIAS_RESULT = "response_bind", n2.UNBIND_ALIAS_RESULT = "response_unbind", n2.FEED_BACK_RESULT = "pushmessage_feedback", n2.RECEIVED = "received", n2);
      c2.ClientAction = (s2 = class {
      }, s2.ADD_PHONE_INFO = "addphoneinfo", s2.SET_MODE = "set_mode", s2.FEED_BACK = "pushmessage_feedback", s2.SET_TAGS = "set_tag", s2.BIND_ALIAS = "bind_alias", s2.UNBIND_ALIAS = "unbind_alias", s2.RECEIVED = "received", s2);
      c2.waitingLoginMsgMap = /* @__PURE__ */ new Map();
      c2.waitingResponseMsgMap = /* @__PURE__ */ new Map();
      class l2 {
        constructor() {
          this.appId = "";
          this.cid = "";
          this.msgId = "";
          this.msgAction = "";
          this.msgData = "";
          this.msgExtraData = "";
        }
        static create() {
          let t3 = new l2();
          t3.appId = u2.default.appid;
          t3.cid = u2.default.cid;
          t3.msgId = (2147483647 & (/* @__PURE__ */ new Date()).getTime()).toString();
          return t3;
        }
        static parse(t3) {
          let e3 = new l2();
          let r3 = JSON.parse(t3);
          e3.appId = r3.appId;
          e3.cid = r3.cid;
          e3.msgId = r3.msgId;
          e3.msgAction = r3.msgAction;
          e3.msgData = r3.msgData;
          e3.msgExtraData = r3.msgExtraData;
          return e3;
        }
      }
      e22["default"] = c2;
    }, 4516: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(4685));
      const s2 = i22(r22(8506));
      const a2 = i22(r22(6893));
      const o2 = r22(4198);
      const u2 = i22(r22(9586));
      const c2 = i22(r22(6379));
      class l2 extends u2.default {
        constructor() {
          super(...arguments);
          this.addPhoneInfoData = new f2();
        }
        static create() {
          let t3 = new l2();
          super.initActionMsg(t3);
          t3.callback = (e3) => {
            if (e3.resultCode != o2.ErrorCode.SUCCESS && e3.resultCode != o2.ErrorCode.REPEAT_MESSAGE)
              setTimeout(function() {
                t3.send();
              }, 30 * 1e3);
            else
              s2.default.set({ key: s2.default.KEY_ADD_PHONE_INFO_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
          };
          t3.actionMsgData.msgAction = u2.default.ClientAction.ADD_PHONE_INFO;
          t3.addPhoneInfoData = f2.create();
          t3.actionMsgData.msgData = JSON.stringify(t3.addPhoneInfoData);
          return t3;
        }
        send() {
          let t3 = (/* @__PURE__ */ new Date()).getTime();
          let e3 = s2.default.getSync(s2.default.KEY_ADD_PHONE_INFO_TIME, 0);
          if (t3 - e3 < 24 * 60 * 60 * 1e3)
            return;
          super.send();
        }
      }
      class f2 {
        constructor() {
          this.model = "";
          this.brand = "";
          this.system_version = "";
          this.version = "";
          this.deviceid = "";
          this.type = "";
        }
        static create() {
          let t3 = new f2();
          t3.model = n2.default.model();
          t3.brand = n2.default.brand();
          t3.system_version = n2.default.osVersion();
          t3.version = a2.default.SDK_VERSION;
          t3.device_token = "";
          t3.imei = "";
          t3.oaid = "";
          t3.mac = "";
          t3.idfa = "";
          t3.type = "MINIPROGRAM";
          t3.deviceid = `${t3.type}-${c2.default.deviceId}`;
          t3.extra = { os: n2.default.os(), platform: n2.default.platform(), platformVersion: n2.default.platformVersion(), platformId: n2.default.platformId(), language: n2.default.language(), userAgent: n2.default.userAgent() };
          return t3;
        }
      }
      e22["default"] = l2;
    }, 8723: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n2, s2;
      Object.defineProperty(e22, "__esModule", { value: true });
      const a2 = i22(r22(6379));
      const o2 = r22(4198);
      const u2 = i22(r22(9586));
      class c2 extends u2.default {
        constructor() {
          super(...arguments);
          this.feedbackData = new l2();
        }
        static create(t3, e3) {
          let r3 = new c2();
          super.initActionMsg(r3);
          r3.callback = (t4) => {
            if (t4.resultCode != o2.ErrorCode.SUCCESS && t4.resultCode != o2.ErrorCode.REPEAT_MESSAGE)
              setTimeout(function() {
                r3.send();
              }, 30 * 1e3);
          };
          r3.feedbackData = l2.create(t3, e3);
          r3.actionMsgData.msgAction = u2.default.ClientAction.FEED_BACK;
          r3.actionMsgData.msgData = JSON.stringify(r3.feedbackData);
          return r3;
        }
        send() {
          super.send();
        }
      }
      c2.ActionId = (n2 = class {
      }, n2.RECEIVE = "0", n2.MP_RECEIVE = "210000", n2.WEB_RECEIVE = "220000", n2.BEGIN = "1", n2);
      c2.RESULT = (s2 = class {
      }, s2.OK = "ok", s2);
      class l2 {
        constructor() {
          this.messageid = "";
          this.appkey = "";
          this.appid = "";
          this.taskid = "";
          this.actionid = "";
          this.result = "";
          this.timestamp = "";
        }
        static create(t3, e3) {
          let r3 = new l2();
          r3.messageid = t3.pushMessageData.messageid;
          r3.appkey = t3.pushMessageData.appKey;
          r3.appid = a2.default.appid;
          r3.taskid = t3.pushMessageData.taskId;
          r3.actionid = e3;
          r3.result = c2.RESULT.OK;
          r3.timestamp = (/* @__PURE__ */ new Date()).getTime().toString();
          return r3;
        }
      }
      e22["default"] = c2;
    }, 6362: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(661));
      class s2 extends n2.default {
        static create() {
          let t3 = new s2();
          super.initMsg(t3);
          t3.command = n2.default.Command.HEART_BEAT;
          return t3;
        }
      }
      e22["default"] = s2;
    }, 1386: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(6667));
      const s2 = i22(r22(6379));
      const a2 = i22(r22(661));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.keyNegotiateData = new u2();
        }
        static create() {
          let t3 = new o2();
          super.initMsg(t3);
          t3.command = a2.default.Command.KEY_NEGOTIATE;
          n2.default.resetKey();
          t3.data = t3.keyNegotiateData = u2.create();
          return t3;
        }
        send() {
          super.send();
        }
      }
      class u2 {
        constructor() {
          this.appId = "";
          this.rsaPublicKeyId = "";
          this.algorithm = "";
          this.secretKey = "";
          this.iv = "";
        }
        static create() {
          let t3 = new u2();
          t3.appId = s2.default.appid;
          t3.rsaPublicKeyId = s2.default.publicKeyId;
          t3.algorithm = "AES";
          t3.secretKey = n2.default.getEncryptedSecretKey();
          t3.iv = n2.default.getEncryptedIV();
          return t3;
        }
      }
      e22["default"] = o2;
    }, 1280: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(661));
      const s2 = i22(r22(6667));
      const a2 = i22(r22(8858));
      const o2 = i22(r22(529));
      const u2 = i22(r22(6379));
      class c2 extends n2.default {
        constructor() {
          super(...arguments);
          this.keyNegotiateResultData = new l2();
        }
        static parse(t3) {
          let e3 = new c2();
          super.parseMsg(e3, t3);
          e3.keyNegotiateResultData = l2.parse(e3.data);
          return e3;
        }
        receive() {
          var t3, e3;
          if (0 != this.keyNegotiateResultData.errorCode) {
            o2.default.error(`key negotiate fail: ${this.data}`);
            null === (t3 = u2.default.onError) || void 0 === t3 || t3.call(u2.default.onError, { error: `key negotiate fail: ${this.data}` });
            return;
          }
          let r3 = this.keyNegotiateResultData.encryptType.split("/");
          if (!s2.default.algorithmMap.has(r3[0].trim().toLowerCase()) || !s2.default.modeMap.has(r3[1].trim().toLowerCase()) || !s2.default.paddingMap.has(r3[2].trim().toLowerCase())) {
            o2.default.error(`key negotiate fail: ${this.data}`);
            null === (e3 = u2.default.onError) || void 0 === e3 || e3.call(u2.default.onError, { error: `key negotiate fail: ${this.data}` });
            return;
          }
          s2.default.setEncryptParams(r3[0].trim().toLowerCase(), r3[1].trim().toLowerCase(), r3[2].trim().toLowerCase());
          a2.default.create().send();
        }
      }
      class l2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
          this.encryptType = "";
        }
        static parse(t3) {
          let e3 = new l2();
          let r3 = JSON.parse(t3);
          e3.errorCode = r3.errorCode;
          e3.errorMsg = r3.errorMsg;
          e3.encryptType = r3.encryptType;
          return e3;
        }
      }
      e22["default"] = c2;
    }, 8858: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(6379));
      const s2 = i22(r22(6667));
      const a2 = i22(r22(661));
      const o2 = i22(r22(4534));
      class u2 extends a2.default {
        constructor() {
          super(...arguments);
          this.loginData = new c2();
        }
        static create() {
          let t3 = new u2();
          super.initMsg(t3);
          t3.command = a2.default.Command.LOGIN;
          t3.data = t3.loginData = c2.create();
          return t3;
        }
        send() {
          if (!this.loginData.session || n2.default.cid != s2.default.md5Hex(this.loginData.session)) {
            o2.default.create().send();
            return;
          }
          super.send();
        }
      }
      class c2 {
        constructor() {
          this.appId = "";
          this.session = "";
        }
        static create() {
          let t3 = new c2();
          t3.appId = n2.default.appid;
          t3.session = n2.default.session;
          return t3;
        }
      }
      e22["default"] = u2;
    }, 1606: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(8506));
      const s2 = i22(r22(661));
      const a2 = i22(r22(6379));
      const o2 = i22(r22(9586));
      const u2 = i22(r22(4516));
      const c2 = i22(r22(8858));
      class l2 extends s2.default {
        constructor() {
          super(...arguments);
          this.loginResultData = new f2();
        }
        static parse(t3) {
          let e3 = new l2();
          super.parseMsg(e3, t3);
          e3.loginResultData = f2.parse(e3.data);
          return e3;
        }
        receive() {
          var t3;
          if (0 != this.loginResultData.errorCode) {
            this.data;
            a2.default.session = a2.default.cid = "";
            n2.default.setSync(n2.default.KEY_CID, "");
            n2.default.setSync(n2.default.KEY_SESSION, "");
            c2.default.create().send();
            return;
          }
          if (!a2.default.online) {
            a2.default.online = true;
            null === (t3 = a2.default.onlineState) || void 0 === t3 || t3.call(a2.default.onlineState, { online: a2.default.online });
          }
          o2.default.sendWaitingMessages();
          u2.default.create().send();
        }
      }
      class f2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
          this.session = "";
        }
        static parse(t3) {
          let e3 = new f2();
          let r3 = JSON.parse(t3);
          e3.errorCode = r3.errorCode;
          e3.errorMsg = r3.errorMsg;
          e3.session = r3.session;
          return e3;
        }
      }
      e22["default"] = l2;
    }, 661: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n2;
      Object.defineProperty(e22, "__esModule", { value: true });
      const s2 = i22(r22(9593));
      const a2 = i22(r22(7002));
      const o2 = i22(r22(6893));
      const u2 = i22(r22(6379));
      class c2 {
        constructor() {
          this.version = "";
          this.command = 0;
          this.packetId = 0;
          this.timeStamp = 0;
          this.data = "";
          this.signature = "";
        }
        static initMsg(t3, ...e3) {
          t3.version = o2.default.SOCKET_PROTOCOL_VERSION;
          t3.command = 0;
          t3.timeStamp = (/* @__PURE__ */ new Date()).getTime();
          return t3;
        }
        static parseMsg(t3, e3) {
          let r3 = JSON.parse(e3);
          t3.version = r3.version;
          t3.command = r3.command;
          t3.packetId = r3.packetId;
          t3.timeStamp = r3.timeStamp;
          t3.data = r3.data;
          t3.signature = r3.signature;
          return t3;
        }
        stringify() {
          return JSON.stringify(this, ["version", "command", "packetId", "timeStamp", "data", "signature"]);
        }
        send() {
          if (!a2.default.isAvailable())
            return;
          this.packetId = u2.default.packetId++;
          if (this.temp)
            this.data = this.temp;
          else
            this.temp = this.data;
          this.data = JSON.stringify(this.data);
          this.stringify();
          if (this.command != c2.Command.HEART_BEAT) {
            s2.default.sign(this);
            if (this.data && this.command != c2.Command.KEY_NEGOTIATE)
              s2.default.encrypt(this);
          }
          a2.default.send(this.stringify());
        }
      }
      c2.Command = (n2 = class {
      }, n2.HEART_BEAT = 0, n2.KEY_NEGOTIATE = 1, n2.KEY_NEGOTIATE_RESULT = 16, n2.REGISTER = 2, n2.REGISTER_RESULT = 32, n2.LOGIN = 3, n2.LOGIN_RESULT = 48, n2.LOGOUT = 4, n2.LOGOUT_RESULT = 64, n2.CLIENT_MSG = 5, n2.SERVER_MSG = 80, n2.SERVER_CLOSE = 96, n2.REDIRECT_SERVER = 112, n2);
      e22["default"] = c2;
    }, 9593: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(6667));
      var s2;
      (function(t3) {
        function e3(t4) {
          t4.data = n2.default.encrypt(t4.data);
        }
        t3.encrypt = e3;
        function r3(t4) {
          t4.data = n2.default.decrypt(t4.data);
        }
        t3.decrypt = r3;
        function i3(t4) {
          t4.signature = n2.default.sha256(`${t4.timeStamp}${t4.packetId}${t4.command}${t4.data}`);
        }
        t3.sign = i3;
        function s22(t4) {
          let e4 = n2.default.sha256(`${t4.timeStamp}${t4.packetId}${t4.command}${t4.data}`);
          if (t4.signature != e4)
            throw new Error(`msg signature vierfy failed`);
        }
        t3.verify = s22;
      })(s2 || (s2 = {}));
      e22["default"] = s2;
    }, 4054: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(1280));
      const s2 = i22(r22(1606));
      const a2 = i22(r22(661));
      const o2 = i22(r22(1277));
      const u2 = i22(r22(910));
      const c2 = i22(r22(9538));
      const l2 = i22(r22(9479));
      const f2 = i22(r22(6755));
      const h2 = i22(r22(2918));
      const d2 = i22(r22(9586));
      const v2 = i22(r22(9510));
      const p2 = i22(r22(4626));
      const g2 = i22(r22(7562));
      const y2 = i22(r22(9593));
      const m2 = i22(r22(9586));
      const w2 = i22(r22(9519));
      const S2 = i22(r22(8947));
      class _2 {
        static receiveMessage(t3) {
          let e3 = a2.default.parseMsg(new a2.default(), t3);
          if (e3.command == a2.default.Command.HEART_BEAT)
            return;
          if (e3.command != a2.default.Command.KEY_NEGOTIATE_RESULT && e3.command != a2.default.Command.SERVER_CLOSE && e3.command != a2.default.Command.REDIRECT_SERVER)
            y2.default.decrypt(e3);
          if (e3.command != a2.default.Command.SERVER_CLOSE && e3.command != a2.default.Command.REDIRECT_SERVER)
            y2.default.verify(e3);
          switch (e3.command) {
            case a2.default.Command.KEY_NEGOTIATE_RESULT:
              n2.default.parse(e3.stringify()).receive();
              break;
            case a2.default.Command.REGISTER_RESULT:
              o2.default.parse(e3.stringify()).receive();
              break;
            case a2.default.Command.LOGIN_RESULT:
              s2.default.parse(e3.stringify()).receive();
              break;
            case a2.default.Command.SERVER_MSG:
              this.receiveActionMsg(e3.stringify());
              break;
            case a2.default.Command.SERVER_CLOSE:
              S2.default.parse(e3.stringify()).receive();
              break;
            case a2.default.Command.REDIRECT_SERVER:
              h2.default.parse(e3.stringify()).receive();
              break;
          }
        }
        static receiveActionMsg(t3) {
          let e3 = m2.default.parseActionMsg(new m2.default(), t3);
          if (e3.actionMsgData.msgAction != d2.default.ServerAction.RECEIVED && e3.actionMsgData.msgAction != d2.default.ServerAction.REDIRECT_SERVER) {
            let t4 = JSON.parse(e3.actionMsgData.msgData);
            w2.default.create(t4.id).send();
          }
          switch (e3.actionMsgData.msgAction) {
            case d2.default.ServerAction.PUSH_MESSAGE:
              f2.default.parse(t3).receive();
              break;
            case d2.default.ServerAction.ADD_PHONE_INFO_RESULT:
              u2.default.parse(t3).receive();
              break;
            case d2.default.ServerAction.SET_MODE_RESULT:
              v2.default.parse(t3).receive();
              break;
            case d2.default.ServerAction.SET_TAG_RESULT:
              p2.default.parse(t3).receive();
              break;
            case d2.default.ServerAction.BIND_ALIAS_RESULT:
              c2.default.parse(t3).receive();
              break;
            case d2.default.ServerAction.UNBIND_ALIAS_RESULT:
              g2.default.parse(t3).receive();
              break;
            case d2.default.ServerAction.FEED_BACK_RESULT:
              l2.default.parse(t3).receive();
              break;
            case d2.default.ServerAction.RECEIVED:
              w2.default.parse(t3).receive();
              break;
          }
        }
      }
      e22["default"] = _2;
    }, 9519: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = r22(4198);
      const s2 = i22(r22(6379));
      const a2 = i22(r22(9586));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.receivedData = new u2();
        }
        static create(t3) {
          let e3 = new o2();
          super.initActionMsg(e3);
          e3.callback = (t4) => {
            if (t4.resultCode != n2.ErrorCode.SUCCESS && t4.resultCode != n2.ErrorCode.REPEAT_MESSAGE)
              setTimeout(function() {
                e3.send();
              }, 3 * 1e3);
          };
          e3.actionMsgData.msgAction = a2.default.ClientAction.RECEIVED;
          e3.receivedData = u2.create(t3);
          e3.actionMsgData.msgData = JSON.stringify(e3.receivedData);
          return e3;
        }
        static parse(t3) {
          let e3 = new o2();
          super.parseActionMsg(e3, t3);
          e3.receivedData = u2.parse(e3.data);
          return e3;
        }
        receive() {
          var t3;
          let e3 = a2.default.getWaitingResponseMessage(this.actionMsgData.msgId);
          if (e3 && e3.actionMsgData.msgAction == a2.default.ClientAction.ADD_PHONE_INFO || e3 && e3.actionMsgData.msgAction == a2.default.ClientAction.FEED_BACK) {
            a2.default.removeWaitingResponseMessage(e3.actionMsgData.msgId);
            null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: n2.ErrorCode.SUCCESS, message: "received" });
          }
        }
        send() {
          super.send();
        }
      }
      class u2 {
        constructor() {
          this.msgId = "";
          this.cid = "";
        }
        static create(t3) {
          let e3 = new u2();
          e3.cid = s2.default.cid;
          e3.msgId = t3;
          return e3;
        }
        static parse(t3) {
          let e3 = new u2();
          let r3 = JSON.parse(t3);
          e3.cid = r3.cid;
          e3.msgId = r3.msgId;
          return e3;
        }
      }
      e22["default"] = o2;
    }, 2918: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      e22.RedirectServerData = void 0;
      const n2 = i22(r22(7002));
      const s2 = i22(r22(8506));
      const a2 = i22(r22(661));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.redirectServerData = new u2();
        }
        static parse(t3) {
          let e3 = new o2();
          super.parseMsg(e3, t3);
          e3.redirectServerData = u2.parse(e3.data);
          return e3;
        }
        receive() {
          this.redirectServerData;
          s2.default.setSync(s2.default.KEY_REDIRECT_SERVER, JSON.stringify(this.redirectServerData));
          n2.default.close("redirect server");
          n2.default.reconnect(this.redirectServerData.delay);
        }
      }
      class u2 {
        constructor() {
          this.addressList = [];
          this.delay = 0;
          this.loc = "";
          this.conf = "";
          this.time = 0;
        }
        static parse(t3) {
          let e3 = new u2();
          let r3 = JSON.parse(t3);
          e3.addressList = r3.addressList;
          e3.delay = r3.delay;
          e3.loc = r3.loc;
          e3.conf = r3.conf;
          e3.time = r3.time ? r3.time : (/* @__PURE__ */ new Date()).getTime();
          return e3;
        }
      }
      e22.RedirectServerData = u2;
      e22["default"] = o2;
    }, 4534: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(6379));
      const s2 = i22(r22(661));
      class a2 extends s2.default {
        constructor() {
          super(...arguments);
          this.registerData = new o2();
        }
        static create() {
          let t3 = new a2();
          super.initMsg(t3);
          t3.command = s2.default.Command.REGISTER;
          t3.data = t3.registerData = o2.create();
          return t3;
        }
        send() {
          super.send();
        }
      }
      class o2 {
        constructor() {
          this.appId = "";
          this.regId = "";
        }
        static create() {
          let t3 = new o2();
          t3.appId = n2.default.appid;
          t3.regId = n2.default.regId;
          return t3;
        }
      }
      e22["default"] = a2;
    }, 1277: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(661));
      const s2 = i22(r22(8506));
      const a2 = i22(r22(6379));
      const o2 = i22(r22(8858));
      const u2 = i22(r22(529));
      class c2 extends n2.default {
        constructor() {
          super(...arguments);
          this.registerResultData = new l2();
        }
        static parse(t3) {
          let e3 = new c2();
          super.parseMsg(e3, t3);
          e3.registerResultData = l2.parse(e3.data);
          return e3;
        }
        receive() {
          var t3, e3;
          if (0 != this.registerResultData.errorCode || !this.registerResultData.cid || !this.registerResultData.session) {
            u2.default.error(`register fail: ${this.data}`);
            null === (t3 = a2.default.onError) || void 0 === t3 || t3.call(a2.default.onError, { error: `register fail: ${this.data}` });
            return;
          }
          if (a2.default.cid != this.registerResultData.cid)
            s2.default.setSync(s2.default.KEY_ADD_PHONE_INFO_TIME, 0);
          a2.default.cid = this.registerResultData.cid;
          null === (e3 = a2.default.onClientId) || void 0 === e3 || e3.call(a2.default.onClientId, { cid: a2.default.cid });
          s2.default.set({ key: s2.default.KEY_CID, data: a2.default.cid });
          a2.default.session = this.registerResultData.session;
          s2.default.set({ key: s2.default.KEY_SESSION, data: a2.default.session });
          a2.default.deviceId = this.registerResultData.deviceId;
          s2.default.set({ key: s2.default.KEY_DEVICE_ID, data: a2.default.deviceId });
          o2.default.create().send();
        }
      }
      class l2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
          this.cid = "";
          this.session = "";
          this.deviceId = "";
          this.regId = "";
        }
        static parse(t3) {
          let e3 = new l2();
          let r3 = JSON.parse(t3);
          e3.errorCode = r3.errorCode;
          e3.errorMsg = r3.errorMsg;
          e3.cid = r3.cid;
          e3.session = r3.session;
          e3.deviceId = r3.deviceId;
          e3.regId = r3.regId;
          return e3;
        }
      }
      e22["default"] = c2;
    }, 8947: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(7002));
      const s2 = i22(r22(529));
      const a2 = i22(r22(661));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.serverCloseData = new u2();
        }
        static parse(t3) {
          let e3 = new o2();
          super.parseMsg(e3, t3);
          e3.serverCloseData = u2.parse(e3.data);
          return e3;
        }
        receive() {
          JSON.stringify(this.serverCloseData);
          let t3 = `server close ${this.serverCloseData.code}`;
          if (20 == this.serverCloseData.code || 23 == this.serverCloseData.code || 24 == this.serverCloseData.code) {
            n2.default.allowReconnect = false;
            n2.default.close(t3);
          } else if (21 == this.serverCloseData.code)
            this.safeClose21(t3);
          else {
            n2.default.allowReconnect = true;
            n2.default.close(t3);
            n2.default.reconnect(10);
          }
        }
        safeClose21(t3) {
          try {
            if ("undefined" != typeof document) {
              if (document.hasFocus() && "visible" == document.visibilityState) {
                n2.default.allowReconnect = true;
                n2.default.close(t3);
                n2.default.reconnect(10);
                return;
              }
            }
            n2.default.allowReconnect = false;
            n2.default.close(t3);
          } catch (e3) {
            s2.default.error(`ServerClose t1`, e3);
            n2.default.allowReconnect = false;
            n2.default.close(`${t3} error`);
          }
        }
      }
      class u2 {
        constructor() {
          this.code = -1;
          this.msg = "";
        }
        static parse(t3) {
          let e3 = new u2();
          let r3 = JSON.parse(t3);
          e3.code = r3.code;
          e3.msg = r3.msg;
          return e3;
        }
      }
      e22["default"] = o2;
    }, 910: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(8506));
      const s2 = i22(r22(9586));
      class a2 extends s2.default {
        constructor() {
          super(...arguments);
          this.addPhoneInfoResultData = new o2();
        }
        static parse(t3) {
          let e3 = new a2();
          super.parseActionMsg(e3, t3);
          e3.addPhoneInfoResultData = o2.parse(e3.actionMsgData.msgData);
          return e3;
        }
        receive() {
          var t3;
          this.addPhoneInfoResultData;
          let e3 = s2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e3)
            null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.addPhoneInfoResultData.errorCode, message: this.addPhoneInfoResultData.errorMsg });
          n2.default.set({ key: n2.default.KEY_ADD_PHONE_INFO_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
        }
      }
      class o2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e3 = new o2();
          let r3 = JSON.parse(t3);
          e3.errorCode = r3.errorCode;
          e3.errorMsg = r3.errorMsg;
          return e3;
        }
      }
      e22["default"] = a2;
    }, 9538: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(8506));
      const s2 = i22(r22(529));
      const a2 = i22(r22(9586));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.bindAliasResultData = new u2();
        }
        static parse(t3) {
          let e3 = new o2();
          super.parseActionMsg(e3, t3);
          e3.bindAliasResultData = u2.parse(e3.actionMsgData.msgData);
          return e3;
        }
        receive() {
          var t3;
          s2.default.info(`bind alias result`, this.bindAliasResultData);
          let e3 = a2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e3)
            null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.bindAliasResultData.errorCode, message: this.bindAliasResultData.errorMsg });
          n2.default.set({ key: n2.default.KEY_BIND_ALIAS_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
        }
      }
      class u2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e3 = new u2();
          let r3 = JSON.parse(t3);
          e3.errorCode = r3.errorCode;
          e3.errorMsg = r3.errorMsg;
          return e3;
        }
      }
      e22["default"] = o2;
    }, 9479: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = r22(4198);
      const s2 = i22(r22(9586));
      class a2 extends s2.default {
        constructor() {
          super(...arguments);
          this.feedbackResultData = new o2();
        }
        static parse(t3) {
          let e3 = new a2();
          super.parseActionMsg(e3, t3);
          e3.feedbackResultData = o2.parse(e3.actionMsgData.msgData);
          return e3;
        }
        receive() {
          var t3;
          this.feedbackResultData;
          let e3 = s2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e3)
            null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: n2.ErrorCode.SUCCESS, message: "received" });
        }
      }
      class o2 {
        constructor() {
          this.actionId = "";
          this.taskId = "";
          this.result = "";
        }
        static parse(t3) {
          let e3 = new o2();
          let r3 = JSON.parse(t3);
          e3.actionId = r3.actionId;
          e3.taskId = r3.taskId;
          e3.result = r3.result;
          return e3;
        }
      }
      e22["default"] = a2;
    }, 6755: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n2;
      Object.defineProperty(e22, "__esModule", { value: true });
      const s2 = i22(r22(6379));
      const a2 = i22(r22(9586));
      const o2 = i22(r22(8723));
      class u2 extends a2.default {
        constructor() {
          super(...arguments);
          this.pushMessageData = new c2();
        }
        static parse(t3) {
          let e3 = new u2();
          super.parseActionMsg(e3, t3);
          e3.pushMessageData = c2.parse(e3.actionMsgData.msgData);
          return e3;
        }
        receive() {
          var t3;
          this.pushMessageData;
          if (this.pushMessageData.appId != s2.default.appid || !this.pushMessageData.messageid || !this.pushMessageData.taskId)
            this.stringify();
          o2.default.create(this, o2.default.ActionId.RECEIVE).send();
          o2.default.create(this, o2.default.ActionId.MP_RECEIVE).send();
          if (this.actionMsgData.msgExtraData && s2.default.onPushMsg)
            null === (t3 = s2.default.onPushMsg) || void 0 === t3 || t3.call(s2.default.onPushMsg, { message: this.actionMsgData.msgExtraData });
        }
      }
      class c2 {
        constructor() {
          this.id = "";
          this.appKey = "";
          this.appId = "";
          this.messageid = "";
          this.taskId = "";
          this.actionChain = [];
          this.cdnType = "";
        }
        static parse(t3) {
          let e3 = new c2();
          let r3 = JSON.parse(t3);
          e3.id = r3.id;
          e3.appKey = r3.appKey;
          e3.appId = r3.appId;
          e3.messageid = r3.messageid;
          e3.taskId = r3.taskId;
          e3.actionChain = r3.actionChain;
          e3.cdnType = r3.cdnType;
          return e3;
        }
      }
      n2 = class {
      }, n2.GO_TO = "goto", n2.TRANSMIT = "transmit";
      e22["default"] = u2;
    }, 9510: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(9586));
      class s2 extends n2.default {
        constructor() {
          super(...arguments);
          this.setModeResultData = new a2();
        }
        static parse(t3) {
          let e3 = new s2();
          super.parseActionMsg(e3, t3);
          e3.setModeResultData = a2.parse(e3.actionMsgData.msgData);
          return e3;
        }
        receive() {
          var t3;
          this.setModeResultData;
          let e3 = n2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e3)
            null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.setModeResultData.errorCode, message: this.setModeResultData.errorMsg });
        }
      }
      class a2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e3 = new a2();
          let r3 = JSON.parse(t3);
          e3.errorCode = r3.errorCode;
          e3.errorMsg = r3.errorMsg;
          return e3;
        }
      }
      e22["default"] = s2;
    }, 4626: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(8506));
      const s2 = i22(r22(529));
      const a2 = i22(r22(9586));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.setTagResultData = new u2();
        }
        static parse(t3) {
          let e3 = new o2();
          super.parseActionMsg(e3, t3);
          e3.setTagResultData = u2.parse(e3.actionMsgData.msgData);
          return e3;
        }
        receive() {
          var t3;
          s2.default.info(`set tag result`, this.setTagResultData);
          let e3 = a2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e3)
            null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.setTagResultData.errorCode, message: this.setTagResultData.errorMsg });
          n2.default.set({ key: n2.default.KEY_SET_TAG_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
        }
      }
      class u2 {
        constructor() {
          this.errorCode = 0;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e3 = new u2();
          let r3 = JSON.parse(t3);
          e3.errorCode = r3.errorCode;
          e3.errorMsg = r3.errorMsg;
          return e3;
        }
      }
      e22["default"] = o2;
    }, 7562: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(8506));
      const s2 = i22(r22(529));
      const a2 = i22(r22(9586));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.unbindAliasResultData = new u2();
        }
        static parse(t3) {
          let e3 = new o2();
          super.parseActionMsg(e3, t3);
          e3.unbindAliasResultData = u2.parse(e3.actionMsgData.msgData);
          return e3;
        }
        receive() {
          var t3;
          s2.default.info(`unbind alias result`, this.unbindAliasResultData);
          let e3 = a2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e3)
            null === (t3 = e3.callback) || void 0 === t3 || t3.call(e3.callback, { resultCode: this.unbindAliasResultData.errorCode, message: this.unbindAliasResultData.errorMsg });
          n2.default.set({ key: n2.default.KEY_BIND_ALIAS_TIME, data: (/* @__PURE__ */ new Date()).getTime() });
        }
      }
      class u2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t3) {
          let e3 = new u2();
          let r3 = JSON.parse(t3);
          e3.errorCode = r3.errorCode;
          e3.errorMsg = r3.errorMsg;
          return e3;
        }
      }
      e22["default"] = o2;
    }, 8227: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        constructor(t3) {
          this.delay = 10;
          this.delay = t3;
        }
        start() {
          this.cancel();
          let t3 = this;
          this.timer = setInterval(function() {
            t3.run();
          }, this.delay);
        }
        cancel() {
          if (this.timer)
            clearInterval(this.timer);
        }
      }
      e22["default"] = r22;
    }, 7167: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      var n2;
      Object.defineProperty(e22, "__esModule", { value: true });
      const s2 = i22(r22(6362));
      const a2 = i22(r22(8227));
      class o2 extends a2.default {
        static getInstance() {
          return o2.InstanceHolder.instance;
        }
        run() {
          s2.default.create().send();
        }
        refresh() {
          this.delay = 60 * 1e3;
          this.start();
        }
      }
      o2.INTERVAL = 60 * 1e3;
      o2.InstanceHolder = (n2 = class {
      }, n2.instance = new o2(o2.INTERVAL), n2);
      e22["default"] = o2;
    }, 2323: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(4736));
      const s2 = i22(r22(6667));
      var a2;
      (function(t3) {
        let e3 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let r3 = (0, n2.default)("9223372036854775808");
        function i3(t4) {
          let e4 = a22(t4);
          let r4 = o2(e4);
          let i4 = r4[1];
          let n22 = r4[0];
          return u2(i4) + u2(n22);
        }
        t3.to_getui = i3;
        function a22(t4) {
          let e4 = s2.default.md5Hex(t4);
          let r4 = c2(e4);
          r4[6] &= 15;
          r4[6] |= 48;
          r4[8] &= 63;
          r4[8] |= 128;
          return r4;
        }
        function o2(t4) {
          let e4 = (0, n2.default)(0);
          let r4 = (0, n2.default)(0);
          for (let r5 = 0; r5 < 8; r5++)
            e4 = e4.multiply(256).plus((0, n2.default)(255 & t4[r5]));
          for (let e5 = 8; e5 < 16; e5++)
            r4 = r4.multiply(256).plus((0, n2.default)(255 & t4[e5]));
          return [e4, r4];
        }
        function u2(t4) {
          if (t4 >= r3)
            t4 = r3.multiply(2).minus(t4);
          let i4 = "";
          for (; t4 > (0, n2.default)(0); t4 = t4.divide(62))
            i4 += e3.charAt(Number(t4.divmod(62).remainder));
          return i4;
        }
        function c2(t4) {
          let e4 = t4.length;
          if (e4 % 2 != 0)
            return [];
          let r4 = new Array();
          for (let i4 = 0; i4 < e4; i4 += 2)
            r4.push(parseInt(t4.substring(i4, i4 + 2), 16));
          return r4;
        }
      })(a2 || (a2 = {}));
      e22["default"] = a2;
    }, 6667: function(t22, e22, r22) {
      var i22 = this && this.__importDefault || function(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      };
      Object.defineProperty(e22, "__esModule", { value: true });
      const n2 = i22(r22(2620));
      const s2 = i22(r22(1354));
      const a2 = i22(r22(6379));
      var o2;
      (function(t3) {
        let e3;
        let r3;
        let i3;
        let o22;
        let u2 = new n2.default();
        let c2 = s2.default.mode.CBC;
        let l2 = s2.default.pad.Pkcs7;
        let f2 = s2.default.AES;
        t3.algorithmMap = /* @__PURE__ */ new Map([["aes", s2.default.AES]]);
        t3.modeMap = /* @__PURE__ */ new Map([["cbc", s2.default.mode.CBC], ["cfb", s2.default.mode.CFB], ["cfb128", s2.default.mode.CFB], ["ecb", s2.default.mode.ECB], ["ofb", s2.default.mode.OFB]]);
        t3.paddingMap = /* @__PURE__ */ new Map([["nopadding", s2.default.pad.NoPadding], ["pkcs7", s2.default.pad.Pkcs7]]);
        function h2() {
          e3 = s2.default.MD5((/* @__PURE__ */ new Date()).getTime().toString());
          r3 = s2.default.MD5(e3);
          u2.setPublicKey(a2.default.publicKey);
          e3.toString(s2.default.enc.Hex);
          r3.toString(s2.default.enc.Hex);
          i3 = u2.encrypt(e3.toString(s2.default.enc.Hex));
          o22 = u2.encrypt(r3.toString(s2.default.enc.Hex));
        }
        t3.resetKey = h2;
        function d2(e4, r4, i4) {
          f2 = t3.algorithmMap.get(e4);
          c2 = t3.modeMap.get(r4);
          l2 = t3.paddingMap.get(i4);
        }
        t3.setEncryptParams = d2;
        function v2(t4) {
          return f2.encrypt(t4, e3, { iv: r3, mode: c2, padding: l2 }).toString();
        }
        t3.encrypt = v2;
        function p2(t4) {
          return f2.decrypt(t4, e3, { iv: r3, mode: c2, padding: l2 }).toString(s2.default.enc.Utf8);
        }
        t3.decrypt = p2;
        function g2(t4) {
          return s2.default.SHA256(t4).toString(s2.default.enc.Base64);
        }
        t3.sha256 = g2;
        function y2(t4) {
          return s2.default.MD5(t4).toString(s2.default.enc.Hex);
        }
        t3.md5Hex = y2;
        function m2() {
          return i3 ? i3 : "";
        }
        t3.getEncryptedSecretKey = m2;
        function w2() {
          return o22 ? o22 : "";
        }
        t3.getEncryptedIV = w2;
      })(o2 || (o2 = {}));
      e22["default"] = o2;
    }, 529: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        static info(...t3) {
          if (this.debugMode)
            console.info(`[GtPush]`, t3);
        }
        static warn(...t3) {
          console.warn(`[GtPush]`, t3);
        }
        static error(...t3) {
          console.error(`[GtPush]`, t3);
        }
      }
      r22.debugMode = false;
      e22["default"] = r22;
    }, 3854: (t22, e22) => {
      Object.defineProperty(e22, "__esModule", { value: true });
      class r22 {
        static getStr(t3, e3) {
          try {
            if (!t3 || void 0 === t3[e3])
              return "";
            return t3[e3];
          } catch (t4) {
          }
          return "";
        }
      }
      e22["default"] = r22;
    }, 2620: (t22, e22, r22) => {
      r22.r(e22);
      r22.d(e22, { JSEncrypt: () => wt2, default: () => St2 });
      var i22 = "0123456789abcdefghijklmnopqrstuvwxyz";
      function n2(t3) {
        return i22.charAt(t3);
      }
      function s2(t3, e3) {
        return t3 & e3;
      }
      function a2(t3, e3) {
        return t3 | e3;
      }
      function o2(t3, e3) {
        return t3 ^ e3;
      }
      function u2(t3, e3) {
        return t3 & ~e3;
      }
      function c2(t3) {
        if (0 == t3)
          return -1;
        var e3 = 0;
        if (0 == (65535 & t3)) {
          t3 >>= 16;
          e3 += 16;
        }
        if (0 == (255 & t3)) {
          t3 >>= 8;
          e3 += 8;
        }
        if (0 == (15 & t3)) {
          t3 >>= 4;
          e3 += 4;
        }
        if (0 == (3 & t3)) {
          t3 >>= 2;
          e3 += 2;
        }
        if (0 == (1 & t3))
          ++e3;
        return e3;
      }
      function l2(t3) {
        var e3 = 0;
        while (0 != t3) {
          t3 &= t3 - 1;
          ++e3;
        }
        return e3;
      }
      var f2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var h2 = "=";
      function d2(t3) {
        var e3;
        var r3;
        var i3 = "";
        for (e3 = 0; e3 + 3 <= t3.length; e3 += 3) {
          r3 = parseInt(t3.substring(e3, e3 + 3), 16);
          i3 += f2.charAt(r3 >> 6) + f2.charAt(63 & r3);
        }
        if (e3 + 1 == t3.length) {
          r3 = parseInt(t3.substring(e3, e3 + 1), 16);
          i3 += f2.charAt(r3 << 2);
        } else if (e3 + 2 == t3.length) {
          r3 = parseInt(t3.substring(e3, e3 + 2), 16);
          i3 += f2.charAt(r3 >> 2) + f2.charAt((3 & r3) << 4);
        }
        while ((3 & i3.length) > 0)
          i3 += h2;
        return i3;
      }
      function v2(t3) {
        var e3 = "";
        var r3;
        var i3 = 0;
        var s22 = 0;
        for (r3 = 0; r3 < t3.length; ++r3) {
          if (t3.charAt(r3) == h2)
            break;
          var a22 = f2.indexOf(t3.charAt(r3));
          if (a22 < 0)
            continue;
          if (0 == i3) {
            e3 += n2(a22 >> 2);
            s22 = 3 & a22;
            i3 = 1;
          } else if (1 == i3) {
            e3 += n2(s22 << 2 | a22 >> 4);
            s22 = 15 & a22;
            i3 = 2;
          } else if (2 == i3) {
            e3 += n2(s22);
            e3 += n2(a22 >> 2);
            s22 = 3 & a22;
            i3 = 3;
          } else {
            e3 += n2(s22 << 2 | a22 >> 4);
            e3 += n2(15 & a22);
            i3 = 0;
          }
        }
        if (1 == i3)
          e3 += n2(s22 << 2);
        return e3;
      }
      var g2;
      var y2 = { decode: function(t3) {
        var e3;
        if (void 0 === g2) {
          var r3 = "0123456789ABCDEF";
          var i3 = " \f\n\r	 \u2028\u2029";
          g2 = {};
          for (e3 = 0; e3 < 16; ++e3)
            g2[r3.charAt(e3)] = e3;
          r3 = r3.toLowerCase();
          for (e3 = 10; e3 < 16; ++e3)
            g2[r3.charAt(e3)] = e3;
          for (e3 = 0; e3 < i3.length; ++e3)
            g2[i3.charAt(e3)] = -1;
        }
        var n22 = [];
        var s22 = 0;
        var a22 = 0;
        for (e3 = 0; e3 < t3.length; ++e3) {
          var o22 = t3.charAt(e3);
          if ("=" == o22)
            break;
          o22 = g2[o22];
          if (-1 == o22)
            continue;
          if (void 0 === o22)
            throw new Error("Illegal character at offset " + e3);
          s22 |= o22;
          if (++a22 >= 2) {
            n22[n22.length] = s22;
            s22 = 0;
            a22 = 0;
          } else
            s22 <<= 4;
        }
        if (a22)
          throw new Error("Hex encoding incomplete: 4 bits missing");
        return n22;
      } };
      var m2;
      var w2 = { decode: function(t3) {
        var e3;
        if (void 0 === m2) {
          var r3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var i3 = "= \f\n\r	 \u2028\u2029";
          m2 = /* @__PURE__ */ Object.create(null);
          for (e3 = 0; e3 < 64; ++e3)
            m2[r3.charAt(e3)] = e3;
          m2["-"] = 62;
          m2["_"] = 63;
          for (e3 = 0; e3 < i3.length; ++e3)
            m2[i3.charAt(e3)] = -1;
        }
        var n22 = [];
        var s22 = 0;
        var a22 = 0;
        for (e3 = 0; e3 < t3.length; ++e3) {
          var o22 = t3.charAt(e3);
          if ("=" == o22)
            break;
          o22 = m2[o22];
          if (-1 == o22)
            continue;
          if (void 0 === o22)
            throw new Error("Illegal character at offset " + e3);
          s22 |= o22;
          if (++a22 >= 4) {
            n22[n22.length] = s22 >> 16;
            n22[n22.length] = s22 >> 8 & 255;
            n22[n22.length] = 255 & s22;
            s22 = 0;
            a22 = 0;
          } else
            s22 <<= 6;
        }
        switch (a22) {
          case 1:
            throw new Error("Base64 encoding incomplete: at least 2 bits missing");
          case 2:
            n22[n22.length] = s22 >> 10;
            break;
          case 3:
            n22[n22.length] = s22 >> 16;
            n22[n22.length] = s22 >> 8 & 255;
            break;
        }
        return n22;
      }, re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, unarmor: function(t3) {
        var e3 = w2.re.exec(t3);
        if (e3)
          if (e3[1])
            t3 = e3[1];
          else if (e3[2])
            t3 = e3[2];
          else
            throw new Error("RegExp out of sync");
        return w2.decode(t3);
      } };
      var S2 = 1e13;
      var _2 = function() {
        function t3(t4) {
          this.buf = [+t4 || 0];
        }
        t3.prototype.mulAdd = function(t4, e3) {
          var r3 = this.buf;
          var i3 = r3.length;
          var n22;
          var s22;
          for (n22 = 0; n22 < i3; ++n22) {
            s22 = r3[n22] * t4 + e3;
            if (s22 < S2)
              e3 = 0;
            else {
              e3 = 0 | s22 / S2;
              s22 -= e3 * S2;
            }
            r3[n22] = s22;
          }
          if (e3 > 0)
            r3[n22] = e3;
        };
        t3.prototype.sub = function(t4) {
          var e3 = this.buf;
          var r3 = e3.length;
          var i3;
          var n22;
          for (i3 = 0; i3 < r3; ++i3) {
            n22 = e3[i3] - t4;
            if (n22 < 0) {
              n22 += S2;
              t4 = 1;
            } else
              t4 = 0;
            e3[i3] = n22;
          }
          while (0 === e3[e3.length - 1])
            e3.pop();
        };
        t3.prototype.toString = function(t4) {
          if (10 != (t4 || 10))
            throw new Error("only base 10 is supported");
          var e3 = this.buf;
          var r3 = e3[e3.length - 1].toString();
          for (var i3 = e3.length - 2; i3 >= 0; --i3)
            r3 += (S2 + e3[i3]).toString().substring(1);
          return r3;
        };
        t3.prototype.valueOf = function() {
          var t4 = this.buf;
          var e3 = 0;
          for (var r3 = t4.length - 1; r3 >= 0; --r3)
            e3 = e3 * S2 + t4[r3];
          return e3;
        };
        t3.prototype.simplify = function() {
          var t4 = this.buf;
          return 1 == t4.length ? t4[0] : this;
        };
        return t3;
      }();
      var b2 = "…";
      var E2 = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
      var D2 = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
      function M2(t3, e3) {
        if (t3.length > e3)
          t3 = t3.substring(0, e3) + b2;
        return t3;
      }
      var T2 = function() {
        function t3(e3, r3) {
          this.hexDigits = "0123456789ABCDEF";
          if (e3 instanceof t3) {
            this.enc = e3.enc;
            this.pos = e3.pos;
          } else {
            this.enc = e3;
            this.pos = r3;
          }
        }
        t3.prototype.get = function(t4) {
          if (void 0 === t4)
            t4 = this.pos++;
          if (t4 >= this.enc.length)
            throw new Error("Requesting byte offset " + t4 + " on a stream of length " + this.enc.length);
          return "string" === typeof this.enc ? this.enc.charCodeAt(t4) : this.enc[t4];
        };
        t3.prototype.hexByte = function(t4) {
          return this.hexDigits.charAt(t4 >> 4 & 15) + this.hexDigits.charAt(15 & t4);
        };
        t3.prototype.hexDump = function(t4, e3, r3) {
          var i3 = "";
          for (var n22 = t4; n22 < e3; ++n22) {
            i3 += this.hexByte(this.get(n22));
            if (true !== r3)
              switch (15 & n22) {
                case 7:
                  i3 += "  ";
                  break;
                case 15:
                  i3 += "\n";
                  break;
                default:
                  i3 += " ";
              }
          }
          return i3;
        };
        t3.prototype.isASCII = function(t4, e3) {
          for (var r3 = t4; r3 < e3; ++r3) {
            var i3 = this.get(r3);
            if (i3 < 32 || i3 > 176)
              return false;
          }
          return true;
        };
        t3.prototype.parseStringISO = function(t4, e3) {
          var r3 = "";
          for (var i3 = t4; i3 < e3; ++i3)
            r3 += String.fromCharCode(this.get(i3));
          return r3;
        };
        t3.prototype.parseStringUTF = function(t4, e3) {
          var r3 = "";
          for (var i3 = t4; i3 < e3; ) {
            var n22 = this.get(i3++);
            if (n22 < 128)
              r3 += String.fromCharCode(n22);
            else if (n22 > 191 && n22 < 224)
              r3 += String.fromCharCode((31 & n22) << 6 | 63 & this.get(i3++));
            else
              r3 += String.fromCharCode((15 & n22) << 12 | (63 & this.get(i3++)) << 6 | 63 & this.get(i3++));
          }
          return r3;
        };
        t3.prototype.parseStringBMP = function(t4, e3) {
          var r3 = "";
          var i3;
          var n22;
          for (var s22 = t4; s22 < e3; ) {
            i3 = this.get(s22++);
            n22 = this.get(s22++);
            r3 += String.fromCharCode(i3 << 8 | n22);
          }
          return r3;
        };
        t3.prototype.parseTime = function(t4, e3, r3) {
          var i3 = this.parseStringISO(t4, e3);
          var n22 = (r3 ? E2 : D2).exec(i3);
          if (!n22)
            return "Unrecognized time: " + i3;
          if (r3) {
            n22[1] = +n22[1];
            n22[1] += +n22[1] < 70 ? 2e3 : 1900;
          }
          i3 = n22[1] + "-" + n22[2] + "-" + n22[3] + " " + n22[4];
          if (n22[5]) {
            i3 += ":" + n22[5];
            if (n22[6]) {
              i3 += ":" + n22[6];
              if (n22[7])
                i3 += "." + n22[7];
            }
          }
          if (n22[8]) {
            i3 += " UTC";
            if ("Z" != n22[8]) {
              i3 += n22[8];
              if (n22[9])
                i3 += ":" + n22[9];
            }
          }
          return i3;
        };
        t3.prototype.parseInteger = function(t4, e3) {
          var r3 = this.get(t4);
          var i3 = r3 > 127;
          var n22 = i3 ? 255 : 0;
          var s22;
          var a22 = "";
          while (r3 == n22 && ++t4 < e3)
            r3 = this.get(t4);
          s22 = e3 - t4;
          if (0 === s22)
            return i3 ? -1 : 0;
          if (s22 > 4) {
            a22 = r3;
            s22 <<= 3;
            while (0 == (128 & (+a22 ^ n22))) {
              a22 = +a22 << 1;
              --s22;
            }
            a22 = "(" + s22 + " bit)\n";
          }
          if (i3)
            r3 -= 256;
          var o22 = new _2(r3);
          for (var u22 = t4 + 1; u22 < e3; ++u22)
            o22.mulAdd(256, this.get(u22));
          return a22 + o22.toString();
        };
        t3.prototype.parseBitString = function(t4, e3, r3) {
          var i3 = this.get(t4);
          var n22 = (e3 - t4 - 1 << 3) - i3;
          var s22 = "(" + n22 + " bit)\n";
          var a22 = "";
          for (var o22 = t4 + 1; o22 < e3; ++o22) {
            var u22 = this.get(o22);
            var c22 = o22 == e3 - 1 ? i3 : 0;
            for (var l22 = 7; l22 >= c22; --l22)
              a22 += u22 >> l22 & 1 ? "1" : "0";
            if (a22.length > r3)
              return s22 + M2(a22, r3);
          }
          return s22 + a22;
        };
        t3.prototype.parseOctetString = function(t4, e3, r3) {
          if (this.isASCII(t4, e3))
            return M2(this.parseStringISO(t4, e3), r3);
          var i3 = e3 - t4;
          var n22 = "(" + i3 + " byte)\n";
          r3 /= 2;
          if (i3 > r3)
            e3 = t4 + r3;
          for (var s22 = t4; s22 < e3; ++s22)
            n22 += this.hexByte(this.get(s22));
          if (i3 > r3)
            n22 += b2;
          return n22;
        };
        t3.prototype.parseOID = function(t4, e3, r3) {
          var i3 = "";
          var n22 = new _2();
          var s22 = 0;
          for (var a22 = t4; a22 < e3; ++a22) {
            var o22 = this.get(a22);
            n22.mulAdd(128, 127 & o22);
            s22 += 7;
            if (!(128 & o22)) {
              if ("" === i3) {
                n22 = n22.simplify();
                if (n22 instanceof _2) {
                  n22.sub(80);
                  i3 = "2." + n22.toString();
                } else {
                  var u22 = n22 < 80 ? n22 < 40 ? 0 : 1 : 2;
                  i3 = u22 + "." + (n22 - 40 * u22);
                }
              } else
                i3 += "." + n22.toString();
              if (i3.length > r3)
                return M2(i3, r3);
              n22 = new _2();
              s22 = 0;
            }
          }
          if (s22 > 0)
            i3 += ".incomplete";
          return i3;
        };
        return t3;
      }();
      var I2 = function() {
        function t3(t4, e3, r3, i3, n22) {
          if (!(i3 instanceof A2))
            throw new Error("Invalid tag value.");
          this.stream = t4;
          this.header = e3;
          this.length = r3;
          this.tag = i3;
          this.sub = n22;
        }
        t3.prototype.typeName = function() {
          switch (this.tag.tagClass) {
            case 0:
              switch (this.tag.tagNumber) {
                case 0:
                  return "EOC";
                case 1:
                  return "BOOLEAN";
                case 2:
                  return "INTEGER";
                case 3:
                  return "BIT_STRING";
                case 4:
                  return "OCTET_STRING";
                case 5:
                  return "NULL";
                case 6:
                  return "OBJECT_IDENTIFIER";
                case 7:
                  return "ObjectDescriptor";
                case 8:
                  return "EXTERNAL";
                case 9:
                  return "REAL";
                case 10:
                  return "ENUMERATED";
                case 11:
                  return "EMBEDDED_PDV";
                case 12:
                  return "UTF8String";
                case 16:
                  return "SEQUENCE";
                case 17:
                  return "SET";
                case 18:
                  return "NumericString";
                case 19:
                  return "PrintableString";
                case 20:
                  return "TeletexString";
                case 21:
                  return "VideotexString";
                case 22:
                  return "IA5String";
                case 23:
                  return "UTCTime";
                case 24:
                  return "GeneralizedTime";
                case 25:
                  return "GraphicString";
                case 26:
                  return "VisibleString";
                case 27:
                  return "GeneralString";
                case 28:
                  return "UniversalString";
                case 30:
                  return "BMPString";
              }
              return "Universal_" + this.tag.tagNumber.toString();
            case 1:
              return "Application_" + this.tag.tagNumber.toString();
            case 2:
              return "[" + this.tag.tagNumber.toString() + "]";
            case 3:
              return "Private_" + this.tag.tagNumber.toString();
          }
        };
        t3.prototype.content = function(t4) {
          if (void 0 === this.tag)
            return null;
          if (void 0 === t4)
            t4 = 1 / 0;
          var e3 = this.posContent();
          var r3 = Math.abs(this.length);
          if (!this.tag.isUniversal()) {
            if (null !== this.sub)
              return "(" + this.sub.length + " elem)";
            return this.stream.parseOctetString(e3, e3 + r3, t4);
          }
          switch (this.tag.tagNumber) {
            case 1:
              return 0 === this.stream.get(e3) ? "false" : "true";
            case 2:
              return this.stream.parseInteger(e3, e3 + r3);
            case 3:
              return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e3, e3 + r3, t4);
            case 4:
              return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e3, e3 + r3, t4);
            case 6:
              return this.stream.parseOID(e3, e3 + r3, t4);
            case 16:
            case 17:
              if (null !== this.sub)
                return "(" + this.sub.length + " elem)";
              else
                return "(no elem)";
            case 12:
              return M2(this.stream.parseStringUTF(e3, e3 + r3), t4);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
              return M2(this.stream.parseStringISO(e3, e3 + r3), t4);
            case 30:
              return M2(this.stream.parseStringBMP(e3, e3 + r3), t4);
            case 23:
            case 24:
              return this.stream.parseTime(e3, e3 + r3, 23 == this.tag.tagNumber);
          }
          return null;
        };
        t3.prototype.toString = function() {
          return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]";
        };
        t3.prototype.toPrettyString = function(t4) {
          if (void 0 === t4)
            t4 = "";
          var e3 = t4 + this.typeName() + " @" + this.stream.pos;
          if (this.length >= 0)
            e3 += "+";
          e3 += this.length;
          if (this.tag.tagConstructed)
            e3 += " (constructed)";
          else if (this.tag.isUniversal() && (3 == this.tag.tagNumber || 4 == this.tag.tagNumber) && null !== this.sub)
            e3 += " (encapsulates)";
          e3 += "\n";
          if (null !== this.sub) {
            t4 += "  ";
            for (var r3 = 0, i3 = this.sub.length; r3 < i3; ++r3)
              e3 += this.sub[r3].toPrettyString(t4);
          }
          return e3;
        };
        t3.prototype.posStart = function() {
          return this.stream.pos;
        };
        t3.prototype.posContent = function() {
          return this.stream.pos + this.header;
        };
        t3.prototype.posEnd = function() {
          return this.stream.pos + this.header + Math.abs(this.length);
        };
        t3.prototype.toHexString = function() {
          return this.stream.hexDump(this.posStart(), this.posEnd(), true);
        };
        t3.decodeLength = function(t4) {
          var e3 = t4.get();
          var r3 = 127 & e3;
          if (r3 == e3)
            return r3;
          if (r3 > 6)
            throw new Error("Length over 48 bits not supported at position " + (t4.pos - 1));
          if (0 === r3)
            return null;
          e3 = 0;
          for (var i3 = 0; i3 < r3; ++i3)
            e3 = 256 * e3 + t4.get();
          return e3;
        };
        t3.prototype.getHexStringValue = function() {
          var t4 = this.toHexString();
          var e3 = 2 * this.header;
          var r3 = 2 * this.length;
          return t4.substr(e3, r3);
        };
        t3.decode = function(e3) {
          var r3;
          if (!(e3 instanceof T2))
            r3 = new T2(e3, 0);
          else
            r3 = e3;
          var i3 = new T2(r3);
          var n22 = new A2(r3);
          var s22 = t3.decodeLength(r3);
          var a22 = r3.pos;
          var o22 = a22 - i3.pos;
          var u22 = null;
          var c22 = function() {
            var e4 = [];
            if (null !== s22) {
              var i4 = a22 + s22;
              while (r3.pos < i4)
                e4[e4.length] = t3.decode(r3);
              if (r3.pos != i4)
                throw new Error("Content size is not correct for container starting at offset " + a22);
            } else
              try {
                for (; ; ) {
                  var n3 = t3.decode(r3);
                  if (n3.tag.isEOC())
                    break;
                  e4[e4.length] = n3;
                }
                s22 = a22 - r3.pos;
              } catch (t4) {
                throw new Error("Exception while decoding undefined length content: " + t4);
              }
            return e4;
          };
          if (n22.tagConstructed)
            u22 = c22();
          else if (n22.isUniversal() && (3 == n22.tagNumber || 4 == n22.tagNumber))
            try {
              if (3 == n22.tagNumber) {
                if (0 != r3.get())
                  throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
              }
              u22 = c22();
              for (var l22 = 0; l22 < u22.length; ++l22)
                if (u22[l22].tag.isEOC())
                  throw new Error("EOC is not supposed to be actual content.");
            } catch (t4) {
              u22 = null;
            }
          if (null === u22) {
            if (null === s22)
              throw new Error("We can't skip over an invalid tag with undefined length at offset " + a22);
            r3.pos = a22 + Math.abs(s22);
          }
          return new t3(i3, o22, s22, n22, u22);
        };
        return t3;
      }();
      var A2 = function() {
        function t3(t4) {
          var e3 = t4.get();
          this.tagClass = e3 >> 6;
          this.tagConstructed = 0 !== (32 & e3);
          this.tagNumber = 31 & e3;
          if (31 == this.tagNumber) {
            var r3 = new _2();
            do {
              e3 = t4.get();
              r3.mulAdd(128, 127 & e3);
            } while (128 & e3);
            this.tagNumber = r3.simplify();
          }
        }
        t3.prototype.isUniversal = function() {
          return 0 === this.tagClass;
        };
        t3.prototype.isEOC = function() {
          return 0 === this.tagClass && 0 === this.tagNumber;
        };
        return t3;
      }();
      var x;
      var R2 = 244837814094590;
      var B2 = 15715070 == (16777215 & R2);
      var O2 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
      var k = (1 << 26) / O2[O2.length - 1];
      var C2 = function() {
        function t3(t4, e3, r3) {
          if (null != t4)
            if ("number" == typeof t4)
              this.fromNumber(t4, e3, r3);
            else if (null == e3 && "string" != typeof t4)
              this.fromString(t4, 256);
            else
              this.fromString(t4, e3);
        }
        t3.prototype.toString = function(t4) {
          if (this.s < 0)
            return "-" + this.negate().toString(t4);
          var e3;
          if (16 == t4)
            e3 = 4;
          else if (8 == t4)
            e3 = 3;
          else if (2 == t4)
            e3 = 1;
          else if (32 == t4)
            e3 = 5;
          else if (4 == t4)
            e3 = 2;
          else
            return this.toRadix(t4);
          var r3 = (1 << e3) - 1;
          var i3;
          var s22 = false;
          var a22 = "";
          var o22 = this.t;
          var u22 = this.DB - o22 * this.DB % e3;
          if (o22-- > 0) {
            if (u22 < this.DB && (i3 = this[o22] >> u22) > 0) {
              s22 = true;
              a22 = n2(i3);
            }
            while (o22 >= 0) {
              if (u22 < e3) {
                i3 = (this[o22] & (1 << u22) - 1) << e3 - u22;
                i3 |= this[--o22] >> (u22 += this.DB - e3);
              } else {
                i3 = this[o22] >> (u22 -= e3) & r3;
                if (u22 <= 0) {
                  u22 += this.DB;
                  --o22;
                }
              }
              if (i3 > 0)
                s22 = true;
              if (s22)
                a22 += n2(i3);
            }
          }
          return s22 ? a22 : "0";
        };
        t3.prototype.negate = function() {
          var e3 = H2();
          t3.ZERO.subTo(this, e3);
          return e3;
        };
        t3.prototype.abs = function() {
          return this.s < 0 ? this.negate() : this;
        };
        t3.prototype.compareTo = function(t4) {
          var e3 = this.s - t4.s;
          if (0 != e3)
            return e3;
          var r3 = this.t;
          e3 = r3 - t4.t;
          if (0 != e3)
            return this.s < 0 ? -e3 : e3;
          while (--r3 >= 0)
            if (0 != (e3 = this[r3] - t4[r3]))
              return e3;
          return 0;
        };
        t3.prototype.bitLength = function() {
          if (this.t <= 0)
            return 0;
          return this.DB * (this.t - 1) + W2(this[this.t - 1] ^ this.s & this.DM);
        };
        t3.prototype.mod = function(e3) {
          var r3 = H2();
          this.abs().divRemTo(e3, null, r3);
          if (this.s < 0 && r3.compareTo(t3.ZERO) > 0)
            e3.subTo(r3, r3);
          return r3;
        };
        t3.prototype.modPowInt = function(t4, e3) {
          var r3;
          if (t4 < 256 || e3.isEven())
            r3 = new P2(e3);
          else
            r3 = new V2(e3);
          return this.exp(t4, r3);
        };
        t3.prototype.clone = function() {
          var t4 = H2();
          this.copyTo(t4);
          return t4;
        };
        t3.prototype.intValue = function() {
          if (this.s < 0) {
            if (1 == this.t)
              return this[0] - this.DV;
            else if (0 == this.t)
              return -1;
          } else if (1 == this.t)
            return this[0];
          else if (0 == this.t)
            return 0;
          return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
        };
        t3.prototype.byteValue = function() {
          return 0 == this.t ? this.s : this[0] << 24 >> 24;
        };
        t3.prototype.shortValue = function() {
          return 0 == this.t ? this.s : this[0] << 16 >> 16;
        };
        t3.prototype.signum = function() {
          if (this.s < 0)
            return -1;
          else if (this.t <= 0 || 1 == this.t && this[0] <= 0)
            return 0;
          else
            return 1;
        };
        t3.prototype.toByteArray = function() {
          var t4 = this.t;
          var e3 = [];
          e3[0] = this.s;
          var r3 = this.DB - t4 * this.DB % 8;
          var i3;
          var n22 = 0;
          if (t4-- > 0) {
            if (r3 < this.DB && (i3 = this[t4] >> r3) != (this.s & this.DM) >> r3)
              e3[n22++] = i3 | this.s << this.DB - r3;
            while (t4 >= 0) {
              if (r3 < 8) {
                i3 = (this[t4] & (1 << r3) - 1) << 8 - r3;
                i3 |= this[--t4] >> (r3 += this.DB - 8);
              } else {
                i3 = this[t4] >> (r3 -= 8) & 255;
                if (r3 <= 0) {
                  r3 += this.DB;
                  --t4;
                }
              }
              if (0 != (128 & i3))
                i3 |= -256;
              if (0 == n22 && (128 & this.s) != (128 & i3))
                ++n22;
              if (n22 > 0 || i3 != this.s)
                e3[n22++] = i3;
            }
          }
          return e3;
        };
        t3.prototype.equals = function(t4) {
          return 0 == this.compareTo(t4);
        };
        t3.prototype.min = function(t4) {
          return this.compareTo(t4) < 0 ? this : t4;
        };
        t3.prototype.max = function(t4) {
          return this.compareTo(t4) > 0 ? this : t4;
        };
        t3.prototype.and = function(t4) {
          var e3 = H2();
          this.bitwiseTo(t4, s2, e3);
          return e3;
        };
        t3.prototype.or = function(t4) {
          var e3 = H2();
          this.bitwiseTo(t4, a2, e3);
          return e3;
        };
        t3.prototype.xor = function(t4) {
          var e3 = H2();
          this.bitwiseTo(t4, o2, e3);
          return e3;
        };
        t3.prototype.andNot = function(t4) {
          var e3 = H2();
          this.bitwiseTo(t4, u2, e3);
          return e3;
        };
        t3.prototype.not = function() {
          var t4 = H2();
          for (var e3 = 0; e3 < this.t; ++e3)
            t4[e3] = this.DM & ~this[e3];
          t4.t = this.t;
          t4.s = ~this.s;
          return t4;
        };
        t3.prototype.shiftLeft = function(t4) {
          var e3 = H2();
          if (t4 < 0)
            this.rShiftTo(-t4, e3);
          else
            this.lShiftTo(t4, e3);
          return e3;
        };
        t3.prototype.shiftRight = function(t4) {
          var e3 = H2();
          if (t4 < 0)
            this.lShiftTo(-t4, e3);
          else
            this.rShiftTo(t4, e3);
          return e3;
        };
        t3.prototype.getLowestSetBit = function() {
          for (var t4 = 0; t4 < this.t; ++t4)
            if (0 != this[t4])
              return t4 * this.DB + c2(this[t4]);
          if (this.s < 0)
            return this.t * this.DB;
          return -1;
        };
        t3.prototype.bitCount = function() {
          var t4 = 0;
          var e3 = this.s & this.DM;
          for (var r3 = 0; r3 < this.t; ++r3)
            t4 += l2(this[r3] ^ e3);
          return t4;
        };
        t3.prototype.testBit = function(t4) {
          var e3 = Math.floor(t4 / this.DB);
          if (e3 >= this.t)
            return 0 != this.s;
          return 0 != (this[e3] & 1 << t4 % this.DB);
        };
        t3.prototype.setBit = function(t4) {
          return this.changeBit(t4, a2);
        };
        t3.prototype.clearBit = function(t4) {
          return this.changeBit(t4, u2);
        };
        t3.prototype.flipBit = function(t4) {
          return this.changeBit(t4, o2);
        };
        t3.prototype.add = function(t4) {
          var e3 = H2();
          this.addTo(t4, e3);
          return e3;
        };
        t3.prototype.subtract = function(t4) {
          var e3 = H2();
          this.subTo(t4, e3);
          return e3;
        };
        t3.prototype.multiply = function(t4) {
          var e3 = H2();
          this.multiplyTo(t4, e3);
          return e3;
        };
        t3.prototype.divide = function(t4) {
          var e3 = H2();
          this.divRemTo(t4, e3, null);
          return e3;
        };
        t3.prototype.remainder = function(t4) {
          var e3 = H2();
          this.divRemTo(t4, null, e3);
          return e3;
        };
        t3.prototype.divideAndRemainder = function(t4) {
          var e3 = H2();
          var r3 = H2();
          this.divRemTo(t4, e3, r3);
          return [e3, r3];
        };
        t3.prototype.modPow = function(t4, e3) {
          var r3 = t4.bitLength();
          var i3;
          var n22 = Y2(1);
          var s22;
          if (r3 <= 0)
            return n22;
          else if (r3 < 18)
            i3 = 1;
          else if (r3 < 48)
            i3 = 3;
          else if (r3 < 144)
            i3 = 4;
          else if (r3 < 768)
            i3 = 5;
          else
            i3 = 6;
          if (r3 < 8)
            s22 = new P2(e3);
          else if (e3.isEven())
            s22 = new L2(e3);
          else
            s22 = new V2(e3);
          var a22 = [];
          var o22 = 3;
          var u22 = i3 - 1;
          var c22 = (1 << i3) - 1;
          a22[1] = s22.convert(this);
          if (i3 > 1) {
            var l22 = H2();
            s22.sqrTo(a22[1], l22);
            while (o22 <= c22) {
              a22[o22] = H2();
              s22.mulTo(l22, a22[o22 - 2], a22[o22]);
              o22 += 2;
            }
          }
          var f22 = t4.t - 1;
          var h22;
          var d22 = true;
          var v22 = H2();
          var p2;
          r3 = W2(t4[f22]) - 1;
          while (f22 >= 0) {
            if (r3 >= u22)
              h22 = t4[f22] >> r3 - u22 & c22;
            else {
              h22 = (t4[f22] & (1 << r3 + 1) - 1) << u22 - r3;
              if (f22 > 0)
                h22 |= t4[f22 - 1] >> this.DB + r3 - u22;
            }
            o22 = i3;
            while (0 == (1 & h22)) {
              h22 >>= 1;
              --o22;
            }
            if ((r3 -= o22) < 0) {
              r3 += this.DB;
              --f22;
            }
            if (d22) {
              a22[h22].copyTo(n22);
              d22 = false;
            } else {
              while (o22 > 1) {
                s22.sqrTo(n22, v22);
                s22.sqrTo(v22, n22);
                o22 -= 2;
              }
              if (o22 > 0)
                s22.sqrTo(n22, v22);
              else {
                p2 = n22;
                n22 = v22;
                v22 = p2;
              }
              s22.mulTo(v22, a22[h22], n22);
            }
            while (f22 >= 0 && 0 == (t4[f22] & 1 << r3)) {
              s22.sqrTo(n22, v22);
              p2 = n22;
              n22 = v22;
              v22 = p2;
              if (--r3 < 0) {
                r3 = this.DB - 1;
                --f22;
              }
            }
          }
          return s22.revert(n22);
        };
        t3.prototype.modInverse = function(e3) {
          var r3 = e3.isEven();
          if (this.isEven() && r3 || 0 == e3.signum())
            return t3.ZERO;
          var i3 = e3.clone();
          var n22 = this.clone();
          var s22 = Y2(1);
          var a22 = Y2(0);
          var o22 = Y2(0);
          var u22 = Y2(1);
          while (0 != i3.signum()) {
            while (i3.isEven()) {
              i3.rShiftTo(1, i3);
              if (r3) {
                if (!s22.isEven() || !a22.isEven()) {
                  s22.addTo(this, s22);
                  a22.subTo(e3, a22);
                }
                s22.rShiftTo(1, s22);
              } else if (!a22.isEven())
                a22.subTo(e3, a22);
              a22.rShiftTo(1, a22);
            }
            while (n22.isEven()) {
              n22.rShiftTo(1, n22);
              if (r3) {
                if (!o22.isEven() || !u22.isEven()) {
                  o22.addTo(this, o22);
                  u22.subTo(e3, u22);
                }
                o22.rShiftTo(1, o22);
              } else if (!u22.isEven())
                u22.subTo(e3, u22);
              u22.rShiftTo(1, u22);
            }
            if (i3.compareTo(n22) >= 0) {
              i3.subTo(n22, i3);
              if (r3)
                s22.subTo(o22, s22);
              a22.subTo(u22, a22);
            } else {
              n22.subTo(i3, n22);
              if (r3)
                o22.subTo(s22, o22);
              u22.subTo(a22, u22);
            }
          }
          if (0 != n22.compareTo(t3.ONE))
            return t3.ZERO;
          if (u22.compareTo(e3) >= 0)
            return u22.subtract(e3);
          if (u22.signum() < 0)
            u22.addTo(e3, u22);
          else
            return u22;
          if (u22.signum() < 0)
            return u22.add(e3);
          else
            return u22;
        };
        t3.prototype.pow = function(t4) {
          return this.exp(t4, new N2());
        };
        t3.prototype.gcd = function(t4) {
          var e3 = this.s < 0 ? this.negate() : this.clone();
          var r3 = t4.s < 0 ? t4.negate() : t4.clone();
          if (e3.compareTo(r3) < 0) {
            var i3 = e3;
            e3 = r3;
            r3 = i3;
          }
          var n22 = e3.getLowestSetBit();
          var s22 = r3.getLowestSetBit();
          if (s22 < 0)
            return e3;
          if (n22 < s22)
            s22 = n22;
          if (s22 > 0) {
            e3.rShiftTo(s22, e3);
            r3.rShiftTo(s22, r3);
          }
          while (e3.signum() > 0) {
            if ((n22 = e3.getLowestSetBit()) > 0)
              e3.rShiftTo(n22, e3);
            if ((n22 = r3.getLowestSetBit()) > 0)
              r3.rShiftTo(n22, r3);
            if (e3.compareTo(r3) >= 0) {
              e3.subTo(r3, e3);
              e3.rShiftTo(1, e3);
            } else {
              r3.subTo(e3, r3);
              r3.rShiftTo(1, r3);
            }
          }
          if (s22 > 0)
            r3.lShiftTo(s22, r3);
          return r3;
        };
        t3.prototype.isProbablePrime = function(t4) {
          var e3;
          var r3 = this.abs();
          if (1 == r3.t && r3[0] <= O2[O2.length - 1]) {
            for (e3 = 0; e3 < O2.length; ++e3)
              if (r3[0] == O2[e3])
                return true;
            return false;
          }
          if (r3.isEven())
            return false;
          e3 = 1;
          while (e3 < O2.length) {
            var i3 = O2[e3];
            var n22 = e3 + 1;
            while (n22 < O2.length && i3 < k)
              i3 *= O2[n22++];
            i3 = r3.modInt(i3);
            while (e3 < n22)
              if (i3 % O2[e3++] == 0)
                return false;
          }
          return r3.millerRabin(t4);
        };
        t3.prototype.copyTo = function(t4) {
          for (var e3 = this.t - 1; e3 >= 0; --e3)
            t4[e3] = this[e3];
          t4.t = this.t;
          t4.s = this.s;
        };
        t3.prototype.fromInt = function(t4) {
          this.t = 1;
          this.s = t4 < 0 ? -1 : 0;
          if (t4 > 0)
            this[0] = t4;
          else if (t4 < -1)
            this[0] = t4 + this.DV;
          else
            this.t = 0;
        };
        t3.prototype.fromString = function(e3, r3) {
          var i3;
          if (16 == r3)
            i3 = 4;
          else if (8 == r3)
            i3 = 3;
          else if (256 == r3)
            i3 = 8;
          else if (2 == r3)
            i3 = 1;
          else if (32 == r3)
            i3 = 5;
          else if (4 == r3)
            i3 = 2;
          else {
            this.fromRadix(e3, r3);
            return;
          }
          this.t = 0;
          this.s = 0;
          var n22 = e3.length;
          var s22 = false;
          var a22 = 0;
          while (--n22 >= 0) {
            var o22 = 8 == i3 ? 255 & +e3[n22] : G2(e3, n22);
            if (o22 < 0) {
              if ("-" == e3.charAt(n22))
                s22 = true;
              continue;
            }
            s22 = false;
            if (0 == a22)
              this[this.t++] = o22;
            else if (a22 + i3 > this.DB) {
              this[this.t - 1] |= (o22 & (1 << this.DB - a22) - 1) << a22;
              this[this.t++] = o22 >> this.DB - a22;
            } else
              this[this.t - 1] |= o22 << a22;
            a22 += i3;
            if (a22 >= this.DB)
              a22 -= this.DB;
          }
          if (8 == i3 && 0 != (128 & +e3[0])) {
            this.s = -1;
            if (a22 > 0)
              this[this.t - 1] |= (1 << this.DB - a22) - 1 << a22;
          }
          this.clamp();
          if (s22)
            t3.ZERO.subTo(this, this);
        };
        t3.prototype.clamp = function() {
          var t4 = this.s & this.DM;
          while (this.t > 0 && this[this.t - 1] == t4)
            --this.t;
        };
        t3.prototype.dlShiftTo = function(t4, e3) {
          var r3;
          for (r3 = this.t - 1; r3 >= 0; --r3)
            e3[r3 + t4] = this[r3];
          for (r3 = t4 - 1; r3 >= 0; --r3)
            e3[r3] = 0;
          e3.t = this.t + t4;
          e3.s = this.s;
        };
        t3.prototype.drShiftTo = function(t4, e3) {
          for (var r3 = t4; r3 < this.t; ++r3)
            e3[r3 - t4] = this[r3];
          e3.t = Math.max(this.t - t4, 0);
          e3.s = this.s;
        };
        t3.prototype.lShiftTo = function(t4, e3) {
          var r3 = t4 % this.DB;
          var i3 = this.DB - r3;
          var n22 = (1 << i3) - 1;
          var s22 = Math.floor(t4 / this.DB);
          var a22 = this.s << r3 & this.DM;
          for (var o22 = this.t - 1; o22 >= 0; --o22) {
            e3[o22 + s22 + 1] = this[o22] >> i3 | a22;
            a22 = (this[o22] & n22) << r3;
          }
          for (var o22 = s22 - 1; o22 >= 0; --o22)
            e3[o22] = 0;
          e3[s22] = a22;
          e3.t = this.t + s22 + 1;
          e3.s = this.s;
          e3.clamp();
        };
        t3.prototype.rShiftTo = function(t4, e3) {
          e3.s = this.s;
          var r3 = Math.floor(t4 / this.DB);
          if (r3 >= this.t) {
            e3.t = 0;
            return;
          }
          var i3 = t4 % this.DB;
          var n22 = this.DB - i3;
          var s22 = (1 << i3) - 1;
          e3[0] = this[r3] >> i3;
          for (var a22 = r3 + 1; a22 < this.t; ++a22) {
            e3[a22 - r3 - 1] |= (this[a22] & s22) << n22;
            e3[a22 - r3] = this[a22] >> i3;
          }
          if (i3 > 0)
            e3[this.t - r3 - 1] |= (this.s & s22) << n22;
          e3.t = this.t - r3;
          e3.clamp();
        };
        t3.prototype.subTo = function(t4, e3) {
          var r3 = 0;
          var i3 = 0;
          var n22 = Math.min(t4.t, this.t);
          while (r3 < n22) {
            i3 += this[r3] - t4[r3];
            e3[r3++] = i3 & this.DM;
            i3 >>= this.DB;
          }
          if (t4.t < this.t) {
            i3 -= t4.s;
            while (r3 < this.t) {
              i3 += this[r3];
              e3[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            i3 += this.s;
          } else {
            i3 += this.s;
            while (r3 < t4.t) {
              i3 -= t4[r3];
              e3[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            i3 -= t4.s;
          }
          e3.s = i3 < 0 ? -1 : 0;
          if (i3 < -1)
            e3[r3++] = this.DV + i3;
          else if (i3 > 0)
            e3[r3++] = i3;
          e3.t = r3;
          e3.clamp();
        };
        t3.prototype.multiplyTo = function(e3, r3) {
          var i3 = this.abs();
          var n22 = e3.abs();
          var s22 = i3.t;
          r3.t = s22 + n22.t;
          while (--s22 >= 0)
            r3[s22] = 0;
          for (s22 = 0; s22 < n22.t; ++s22)
            r3[s22 + i3.t] = i3.am(0, n22[s22], r3, s22, 0, i3.t);
          r3.s = 0;
          r3.clamp();
          if (this.s != e3.s)
            t3.ZERO.subTo(r3, r3);
        };
        t3.prototype.squareTo = function(t4) {
          var e3 = this.abs();
          var r3 = t4.t = 2 * e3.t;
          while (--r3 >= 0)
            t4[r3] = 0;
          for (r3 = 0; r3 < e3.t - 1; ++r3) {
            var i3 = e3.am(r3, e3[r3], t4, 2 * r3, 0, 1);
            if ((t4[r3 + e3.t] += e3.am(r3 + 1, 2 * e3[r3], t4, 2 * r3 + 1, i3, e3.t - r3 - 1)) >= e3.DV) {
              t4[r3 + e3.t] -= e3.DV;
              t4[r3 + e3.t + 1] = 1;
            }
          }
          if (t4.t > 0)
            t4[t4.t - 1] += e3.am(r3, e3[r3], t4, 2 * r3, 0, 1);
          t4.s = 0;
          t4.clamp();
        };
        t3.prototype.divRemTo = function(e3, r3, i3) {
          var n22 = e3.abs();
          if (n22.t <= 0)
            return;
          var s22 = this.abs();
          if (s22.t < n22.t) {
            if (null != r3)
              r3.fromInt(0);
            if (null != i3)
              this.copyTo(i3);
            return;
          }
          if (null == i3)
            i3 = H2();
          var a22 = H2();
          var o22 = this.s;
          var u22 = e3.s;
          var c22 = this.DB - W2(n22[n22.t - 1]);
          if (c22 > 0) {
            n22.lShiftTo(c22, a22);
            s22.lShiftTo(c22, i3);
          } else {
            n22.copyTo(a22);
            s22.copyTo(i3);
          }
          var l22 = a22.t;
          var f22 = a22[l22 - 1];
          if (0 == f22)
            return;
          var h22 = f22 * (1 << this.F1) + (l22 > 1 ? a22[l22 - 2] >> this.F2 : 0);
          var d22 = this.FV / h22;
          var v22 = (1 << this.F1) / h22;
          var p2 = 1 << this.F2;
          var g22 = i3.t;
          var y22 = g22 - l22;
          var m22 = null == r3 ? H2() : r3;
          a22.dlShiftTo(y22, m22);
          if (i3.compareTo(m22) >= 0) {
            i3[i3.t++] = 1;
            i3.subTo(m22, i3);
          }
          t3.ONE.dlShiftTo(l22, m22);
          m22.subTo(a22, a22);
          while (a22.t < l22)
            a22[a22.t++] = 0;
          while (--y22 >= 0) {
            var w22 = i3[--g22] == f22 ? this.DM : Math.floor(i3[g22] * d22 + (i3[g22 - 1] + p2) * v22);
            if ((i3[g22] += a22.am(0, w22, i3, y22, 0, l22)) < w22) {
              a22.dlShiftTo(y22, m22);
              i3.subTo(m22, i3);
              while (i3[g22] < --w22)
                i3.subTo(m22, i3);
            }
          }
          if (null != r3) {
            i3.drShiftTo(l22, r3);
            if (o22 != u22)
              t3.ZERO.subTo(r3, r3);
          }
          i3.t = l22;
          i3.clamp();
          if (c22 > 0)
            i3.rShiftTo(c22, i3);
          if (o22 < 0)
            t3.ZERO.subTo(i3, i3);
        };
        t3.prototype.invDigit = function() {
          if (this.t < 1)
            return 0;
          var t4 = this[0];
          if (0 == (1 & t4))
            return 0;
          var e3 = 3 & t4;
          e3 = e3 * (2 - (15 & t4) * e3) & 15;
          e3 = e3 * (2 - (255 & t4) * e3) & 255;
          e3 = e3 * (2 - ((65535 & t4) * e3 & 65535)) & 65535;
          e3 = e3 * (2 - t4 * e3 % this.DV) % this.DV;
          return e3 > 0 ? this.DV - e3 : -e3;
        };
        t3.prototype.isEven = function() {
          return 0 == (this.t > 0 ? 1 & this[0] : this.s);
        };
        t3.prototype.exp = function(e3, r3) {
          if (e3 > 4294967295 || e3 < 1)
            return t3.ONE;
          var i3 = H2();
          var n22 = H2();
          var s22 = r3.convert(this);
          var a22 = W2(e3) - 1;
          s22.copyTo(i3);
          while (--a22 >= 0) {
            r3.sqrTo(i3, n22);
            if ((e3 & 1 << a22) > 0)
              r3.mulTo(n22, s22, i3);
            else {
              var o22 = i3;
              i3 = n22;
              n22 = o22;
            }
          }
          return r3.revert(i3);
        };
        t3.prototype.chunkSize = function(t4) {
          return Math.floor(Math.LN2 * this.DB / Math.log(t4));
        };
        t3.prototype.toRadix = function(t4) {
          if (null == t4)
            t4 = 10;
          if (0 == this.signum() || t4 < 2 || t4 > 36)
            return "0";
          var e3 = this.chunkSize(t4);
          var r3 = Math.pow(t4, e3);
          var i3 = Y2(r3);
          var n22 = H2();
          var s22 = H2();
          var a22 = "";
          this.divRemTo(i3, n22, s22);
          while (n22.signum() > 0) {
            a22 = (r3 + s22.intValue()).toString(t4).substr(1) + a22;
            n22.divRemTo(i3, n22, s22);
          }
          return s22.intValue().toString(t4) + a22;
        };
        t3.prototype.fromRadix = function(e3, r3) {
          this.fromInt(0);
          if (null == r3)
            r3 = 10;
          var i3 = this.chunkSize(r3);
          var n22 = Math.pow(r3, i3);
          var s22 = false;
          var a22 = 0;
          var o22 = 0;
          for (var u22 = 0; u22 < e3.length; ++u22) {
            var c22 = G2(e3, u22);
            if (c22 < 0) {
              if ("-" == e3.charAt(u22) && 0 == this.signum())
                s22 = true;
              continue;
            }
            o22 = r3 * o22 + c22;
            if (++a22 >= i3) {
              this.dMultiply(n22);
              this.dAddOffset(o22, 0);
              a22 = 0;
              o22 = 0;
            }
          }
          if (a22 > 0) {
            this.dMultiply(Math.pow(r3, a22));
            this.dAddOffset(o22, 0);
          }
          if (s22)
            t3.ZERO.subTo(this, this);
        };
        t3.prototype.fromNumber = function(e3, r3, i3) {
          if ("number" == typeof r3)
            if (e3 < 2)
              this.fromInt(1);
            else {
              this.fromNumber(e3, i3);
              if (!this.testBit(e3 - 1))
                this.bitwiseTo(t3.ONE.shiftLeft(e3 - 1), a2, this);
              if (this.isEven())
                this.dAddOffset(1, 0);
              while (!this.isProbablePrime(r3)) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > e3)
                  this.subTo(t3.ONE.shiftLeft(e3 - 1), this);
              }
            }
          else {
            var n22 = [];
            var s22 = 7 & e3;
            n22.length = (e3 >> 3) + 1;
            r3.nextBytes(n22);
            if (s22 > 0)
              n22[0] &= (1 << s22) - 1;
            else
              n22[0] = 0;
            this.fromString(n22, 256);
          }
        };
        t3.prototype.bitwiseTo = function(t4, e3, r3) {
          var i3;
          var n22;
          var s22 = Math.min(t4.t, this.t);
          for (i3 = 0; i3 < s22; ++i3)
            r3[i3] = e3(this[i3], t4[i3]);
          if (t4.t < this.t) {
            n22 = t4.s & this.DM;
            for (i3 = s22; i3 < this.t; ++i3)
              r3[i3] = e3(this[i3], n22);
            r3.t = this.t;
          } else {
            n22 = this.s & this.DM;
            for (i3 = s22; i3 < t4.t; ++i3)
              r3[i3] = e3(n22, t4[i3]);
            r3.t = t4.t;
          }
          r3.s = e3(this.s, t4.s);
          r3.clamp();
        };
        t3.prototype.changeBit = function(e3, r3) {
          var i3 = t3.ONE.shiftLeft(e3);
          this.bitwiseTo(i3, r3, i3);
          return i3;
        };
        t3.prototype.addTo = function(t4, e3) {
          var r3 = 0;
          var i3 = 0;
          var n22 = Math.min(t4.t, this.t);
          while (r3 < n22) {
            i3 += this[r3] + t4[r3];
            e3[r3++] = i3 & this.DM;
            i3 >>= this.DB;
          }
          if (t4.t < this.t) {
            i3 += t4.s;
            while (r3 < this.t) {
              i3 += this[r3];
              e3[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            i3 += this.s;
          } else {
            i3 += this.s;
            while (r3 < t4.t) {
              i3 += t4[r3];
              e3[r3++] = i3 & this.DM;
              i3 >>= this.DB;
            }
            i3 += t4.s;
          }
          e3.s = i3 < 0 ? -1 : 0;
          if (i3 > 0)
            e3[r3++] = i3;
          else if (i3 < -1)
            e3[r3++] = this.DV + i3;
          e3.t = r3;
          e3.clamp();
        };
        t3.prototype.dMultiply = function(t4) {
          this[this.t] = this.am(0, t4 - 1, this, 0, 0, this.t);
          ++this.t;
          this.clamp();
        };
        t3.prototype.dAddOffset = function(t4, e3) {
          if (0 == t4)
            return;
          while (this.t <= e3)
            this[this.t++] = 0;
          this[e3] += t4;
          while (this[e3] >= this.DV) {
            this[e3] -= this.DV;
            if (++e3 >= this.t)
              this[this.t++] = 0;
            ++this[e3];
          }
        };
        t3.prototype.multiplyLowerTo = function(t4, e3, r3) {
          var i3 = Math.min(this.t + t4.t, e3);
          r3.s = 0;
          r3.t = i3;
          while (i3 > 0)
            r3[--i3] = 0;
          for (var n22 = r3.t - this.t; i3 < n22; ++i3)
            r3[i3 + this.t] = this.am(0, t4[i3], r3, i3, 0, this.t);
          for (var n22 = Math.min(t4.t, e3); i3 < n22; ++i3)
            this.am(0, t4[i3], r3, i3, 0, e3 - i3);
          r3.clamp();
        };
        t3.prototype.multiplyUpperTo = function(t4, e3, r3) {
          --e3;
          var i3 = r3.t = this.t + t4.t - e3;
          r3.s = 0;
          while (--i3 >= 0)
            r3[i3] = 0;
          for (i3 = Math.max(e3 - this.t, 0); i3 < t4.t; ++i3)
            r3[this.t + i3 - e3] = this.am(e3 - i3, t4[i3], r3, 0, 0, this.t + i3 - e3);
          r3.clamp();
          r3.drShiftTo(1, r3);
        };
        t3.prototype.modInt = function(t4) {
          if (t4 <= 0)
            return 0;
          var e3 = this.DV % t4;
          var r3 = this.s < 0 ? t4 - 1 : 0;
          if (this.t > 0)
            if (0 == e3)
              r3 = this[0] % t4;
            else
              for (var i3 = this.t - 1; i3 >= 0; --i3)
                r3 = (e3 * r3 + this[i3]) % t4;
          return r3;
        };
        t3.prototype.millerRabin = function(e3) {
          var r3 = this.subtract(t3.ONE);
          var i3 = r3.getLowestSetBit();
          if (i3 <= 0)
            return false;
          var n22 = r3.shiftRight(i3);
          e3 = e3 + 1 >> 1;
          if (e3 > O2.length)
            e3 = O2.length;
          var s22 = H2();
          for (var a22 = 0; a22 < e3; ++a22) {
            s22.fromInt(O2[Math.floor(Math.random() * O2.length)]);
            var o22 = s22.modPow(n22, this);
            if (0 != o22.compareTo(t3.ONE) && 0 != o22.compareTo(r3)) {
              var u22 = 1;
              while (u22++ < i3 && 0 != o22.compareTo(r3)) {
                o22 = o22.modPowInt(2, this);
                if (0 == o22.compareTo(t3.ONE))
                  return false;
              }
              if (0 != o22.compareTo(r3))
                return false;
            }
          }
          return true;
        };
        t3.prototype.square = function() {
          var t4 = H2();
          this.squareTo(t4);
          return t4;
        };
        t3.prototype.gcda = function(t4, e3) {
          var r3 = this.s < 0 ? this.negate() : this.clone();
          var i3 = t4.s < 0 ? t4.negate() : t4.clone();
          if (r3.compareTo(i3) < 0) {
            var n22 = r3;
            r3 = i3;
            i3 = n22;
          }
          var s22 = r3.getLowestSetBit();
          var a22 = i3.getLowestSetBit();
          if (a22 < 0) {
            e3(r3);
            return;
          }
          if (s22 < a22)
            a22 = s22;
          if (a22 > 0) {
            r3.rShiftTo(a22, r3);
            i3.rShiftTo(a22, i3);
          }
          var o22 = function() {
            if ((s22 = r3.getLowestSetBit()) > 0)
              r3.rShiftTo(s22, r3);
            if ((s22 = i3.getLowestSetBit()) > 0)
              i3.rShiftTo(s22, i3);
            if (r3.compareTo(i3) >= 0) {
              r3.subTo(i3, r3);
              r3.rShiftTo(1, r3);
            } else {
              i3.subTo(r3, i3);
              i3.rShiftTo(1, i3);
            }
            if (!(r3.signum() > 0)) {
              if (a22 > 0)
                i3.lShiftTo(a22, i3);
              setTimeout(function() {
                e3(i3);
              }, 0);
            } else
              setTimeout(o22, 0);
          };
          setTimeout(o22, 10);
        };
        t3.prototype.fromNumberAsync = function(e3, r3, i3, n22) {
          if ("number" == typeof r3)
            if (e3 < 2)
              this.fromInt(1);
            else {
              this.fromNumber(e3, i3);
              if (!this.testBit(e3 - 1))
                this.bitwiseTo(t3.ONE.shiftLeft(e3 - 1), a2, this);
              if (this.isEven())
                this.dAddOffset(1, 0);
              var s22 = this;
              var o22 = function() {
                s22.dAddOffset(2, 0);
                if (s22.bitLength() > e3)
                  s22.subTo(t3.ONE.shiftLeft(e3 - 1), s22);
                if (s22.isProbablePrime(r3))
                  setTimeout(function() {
                    n22();
                  }, 0);
                else
                  setTimeout(o22, 0);
              };
              setTimeout(o22, 0);
            }
          else {
            var u22 = [];
            var c22 = 7 & e3;
            u22.length = (e3 >> 3) + 1;
            r3.nextBytes(u22);
            if (c22 > 0)
              u22[0] &= (1 << c22) - 1;
            else
              u22[0] = 0;
            this.fromString(u22, 256);
          }
        };
        return t3;
      }();
      var N2 = function() {
        function t3() {
        }
        t3.prototype.convert = function(t4) {
          return t4;
        };
        t3.prototype.revert = function(t4) {
          return t4;
        };
        t3.prototype.mulTo = function(t4, e3, r3) {
          t4.multiplyTo(e3, r3);
        };
        t3.prototype.sqrTo = function(t4, e3) {
          t4.squareTo(e3);
        };
        return t3;
      }();
      var P2 = function() {
        function t3(t4) {
          this.m = t4;
        }
        t3.prototype.convert = function(t4) {
          if (t4.s < 0 || t4.compareTo(this.m) >= 0)
            return t4.mod(this.m);
          else
            return t4;
        };
        t3.prototype.revert = function(t4) {
          return t4;
        };
        t3.prototype.reduce = function(t4) {
          t4.divRemTo(this.m, null, t4);
        };
        t3.prototype.mulTo = function(t4, e3, r3) {
          t4.multiplyTo(e3, r3);
          this.reduce(r3);
        };
        t3.prototype.sqrTo = function(t4, e3) {
          t4.squareTo(e3);
          this.reduce(e3);
        };
        return t3;
      }();
      var V2 = function() {
        function t3(t4) {
          this.m = t4;
          this.mp = t4.invDigit();
          this.mpl = 32767 & this.mp;
          this.mph = this.mp >> 15;
          this.um = (1 << t4.DB - 15) - 1;
          this.mt2 = 2 * t4.t;
        }
        t3.prototype.convert = function(t4) {
          var e3 = H2();
          t4.abs().dlShiftTo(this.m.t, e3);
          e3.divRemTo(this.m, null, e3);
          if (t4.s < 0 && e3.compareTo(C2.ZERO) > 0)
            this.m.subTo(e3, e3);
          return e3;
        };
        t3.prototype.revert = function(t4) {
          var e3 = H2();
          t4.copyTo(e3);
          this.reduce(e3);
          return e3;
        };
        t3.prototype.reduce = function(t4) {
          while (t4.t <= this.mt2)
            t4[t4.t++] = 0;
          for (var e3 = 0; e3 < this.m.t; ++e3) {
            var r3 = 32767 & t4[e3];
            var i3 = r3 * this.mpl + ((r3 * this.mph + (t4[e3] >> 15) * this.mpl & this.um) << 15) & t4.DM;
            r3 = e3 + this.m.t;
            t4[r3] += this.m.am(0, i3, t4, e3, 0, this.m.t);
            while (t4[r3] >= t4.DV) {
              t4[r3] -= t4.DV;
              t4[++r3]++;
            }
          }
          t4.clamp();
          t4.drShiftTo(this.m.t, t4);
          if (t4.compareTo(this.m) >= 0)
            t4.subTo(this.m, t4);
        };
        t3.prototype.mulTo = function(t4, e3, r3) {
          t4.multiplyTo(e3, r3);
          this.reduce(r3);
        };
        t3.prototype.sqrTo = function(t4, e3) {
          t4.squareTo(e3);
          this.reduce(e3);
        };
        return t3;
      }();
      var L2 = function() {
        function t3(t4) {
          this.m = t4;
          this.r2 = H2();
          this.q3 = H2();
          C2.ONE.dlShiftTo(2 * t4.t, this.r2);
          this.mu = this.r2.divide(t4);
        }
        t3.prototype.convert = function(t4) {
          if (t4.s < 0 || t4.t > 2 * this.m.t)
            return t4.mod(this.m);
          else if (t4.compareTo(this.m) < 0)
            return t4;
          else {
            var e3 = H2();
            t4.copyTo(e3);
            this.reduce(e3);
            return e3;
          }
        };
        t3.prototype.revert = function(t4) {
          return t4;
        };
        t3.prototype.reduce = function(t4) {
          t4.drShiftTo(this.m.t - 1, this.r2);
          if (t4.t > this.m.t + 1) {
            t4.t = this.m.t + 1;
            t4.clamp();
          }
          this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
          this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
          while (t4.compareTo(this.r2) < 0)
            t4.dAddOffset(1, this.m.t + 1);
          t4.subTo(this.r2, t4);
          while (t4.compareTo(this.m) >= 0)
            t4.subTo(this.m, t4);
        };
        t3.prototype.mulTo = function(t4, e3, r3) {
          t4.multiplyTo(e3, r3);
          this.reduce(r3);
        };
        t3.prototype.sqrTo = function(t4, e3) {
          t4.squareTo(e3);
          this.reduce(e3);
        };
        return t3;
      }();
      function H2() {
        return new C2(null);
      }
      function U(t3, e3) {
        return new C2(t3, e3);
      }
      var K2 = "undefined" !== typeof navigator;
      if (K2 && B2 && "Microsoft Internet Explorer" == navigator.appName) {
        C2.prototype.am = function t3(e3, r3, i3, n22, s22, a22) {
          var o22 = 32767 & r3;
          var u22 = r3 >> 15;
          while (--a22 >= 0) {
            var c22 = 32767 & this[e3];
            var l22 = this[e3++] >> 15;
            var f22 = u22 * c22 + l22 * o22;
            c22 = o22 * c22 + ((32767 & f22) << 15) + i3[n22] + (1073741823 & s22);
            s22 = (c22 >>> 30) + (f22 >>> 15) + u22 * l22 + (s22 >>> 30);
            i3[n22++] = 1073741823 & c22;
          }
          return s22;
        };
        x = 30;
      } else if (K2 && B2 && "Netscape" != navigator.appName) {
        C2.prototype.am = function t3(e3, r3, i3, n22, s22, a22) {
          while (--a22 >= 0) {
            var o22 = r3 * this[e3++] + i3[n22] + s22;
            s22 = Math.floor(o22 / 67108864);
            i3[n22++] = 67108863 & o22;
          }
          return s22;
        };
        x = 26;
      } else {
        C2.prototype.am = function t3(e3, r3, i3, n22, s22, a22) {
          var o22 = 16383 & r3;
          var u22 = r3 >> 14;
          while (--a22 >= 0) {
            var c22 = 16383 & this[e3];
            var l22 = this[e3++] >> 14;
            var f22 = u22 * c22 + l22 * o22;
            c22 = o22 * c22 + ((16383 & f22) << 14) + i3[n22] + s22;
            s22 = (c22 >> 28) + (f22 >> 14) + u22 * l22;
            i3[n22++] = 268435455 & c22;
          }
          return s22;
        };
        x = 28;
      }
      C2.prototype.DB = x;
      C2.prototype.DM = (1 << x) - 1;
      C2.prototype.DV = 1 << x;
      var j2 = 52;
      C2.prototype.FV = Math.pow(2, j2);
      C2.prototype.F1 = j2 - x;
      C2.prototype.F2 = 2 * x - j2;
      var q2 = [];
      var F2;
      var z2;
      F2 = "0".charCodeAt(0);
      for (z2 = 0; z2 <= 9; ++z2)
        q2[F2++] = z2;
      F2 = "a".charCodeAt(0);
      for (z2 = 10; z2 < 36; ++z2)
        q2[F2++] = z2;
      F2 = "A".charCodeAt(0);
      for (z2 = 10; z2 < 36; ++z2)
        q2[F2++] = z2;
      function G2(t3, e3) {
        var r3 = q2[t3.charCodeAt(e3)];
        return null == r3 ? -1 : r3;
      }
      function Y2(t3) {
        var e3 = H2();
        e3.fromInt(t3);
        return e3;
      }
      function W2(t3) {
        var e3 = 1;
        var r3;
        if (0 != (r3 = t3 >>> 16)) {
          t3 = r3;
          e3 += 16;
        }
        if (0 != (r3 = t3 >> 8)) {
          t3 = r3;
          e3 += 8;
        }
        if (0 != (r3 = t3 >> 4)) {
          t3 = r3;
          e3 += 4;
        }
        if (0 != (r3 = t3 >> 2)) {
          t3 = r3;
          e3 += 2;
        }
        if (0 != (r3 = t3 >> 1)) {
          t3 = r3;
          e3 += 1;
        }
        return e3;
      }
      C2.ZERO = Y2(0);
      C2.ONE = Y2(1);
      var J2 = function() {
        function t3() {
          this.i = 0;
          this.j = 0;
          this.S = [];
        }
        t3.prototype.init = function(t4) {
          var e3;
          var r3;
          var i3;
          for (e3 = 0; e3 < 256; ++e3)
            this.S[e3] = e3;
          r3 = 0;
          for (e3 = 0; e3 < 256; ++e3) {
            r3 = r3 + this.S[e3] + t4[e3 % t4.length] & 255;
            i3 = this.S[e3];
            this.S[e3] = this.S[r3];
            this.S[r3] = i3;
          }
          this.i = 0;
          this.j = 0;
        };
        t3.prototype.next = function() {
          var t4;
          this.i = this.i + 1 & 255;
          this.j = this.j + this.S[this.i] & 255;
          t4 = this.S[this.i];
          this.S[this.i] = this.S[this.j];
          this.S[this.j] = t4;
          return this.S[t4 + this.S[this.i] & 255];
        };
        return t3;
      }();
      function Z2() {
        return new J2();
      }
      var $2 = 256;
      var X2;
      var Q2 = null;
      var tt2;
      if (null == Q2) {
        Q2 = [];
        tt2 = 0;
      }
      function nt2() {
        if (null == X2) {
          X2 = Z2();
          while (tt2 < $2) {
            var t3 = Math.floor(65536 * Math.random());
            Q2[tt2++] = 255 & t3;
          }
          X2.init(Q2);
          for (tt2 = 0; tt2 < Q2.length; ++tt2)
            Q2[tt2] = 0;
          tt2 = 0;
        }
        return X2.next();
      }
      var st2 = function() {
        function t3() {
        }
        t3.prototype.nextBytes = function(t4) {
          for (var e3 = 0; e3 < t4.length; ++e3)
            t4[e3] = nt2();
        };
        return t3;
      }();
      function at2(t3, e3) {
        if (e3 < t3.length + 22) {
          console.error("Message too long for RSA");
          return null;
        }
        var r3 = e3 - t3.length - 6;
        var i3 = "";
        for (var n22 = 0; n22 < r3; n22 += 2)
          i3 += "ff";
        var s22 = "0001" + i3 + "00" + t3;
        return U(s22, 16);
      }
      function ot2(t3, e3) {
        if (e3 < t3.length + 11) {
          console.error("Message too long for RSA");
          return null;
        }
        var r3 = [];
        var i3 = t3.length - 1;
        while (i3 >= 0 && e3 > 0) {
          var n22 = t3.charCodeAt(i3--);
          if (n22 < 128)
            r3[--e3] = n22;
          else if (n22 > 127 && n22 < 2048) {
            r3[--e3] = 63 & n22 | 128;
            r3[--e3] = n22 >> 6 | 192;
          } else {
            r3[--e3] = 63 & n22 | 128;
            r3[--e3] = n22 >> 6 & 63 | 128;
            r3[--e3] = n22 >> 12 | 224;
          }
        }
        r3[--e3] = 0;
        var s22 = new st2();
        var a22 = [];
        while (e3 > 2) {
          a22[0] = 0;
          while (0 == a22[0])
            s22.nextBytes(a22);
          r3[--e3] = a22[0];
        }
        r3[--e3] = 2;
        r3[--e3] = 0;
        return new C2(r3);
      }
      var ut2 = function() {
        function t3() {
          this.n = null;
          this.e = 0;
          this.d = null;
          this.p = null;
          this.q = null;
          this.dmp1 = null;
          this.dmq1 = null;
          this.coeff = null;
        }
        t3.prototype.doPublic = function(t4) {
          return t4.modPowInt(this.e, this.n);
        };
        t3.prototype.doPrivate = function(t4) {
          if (null == this.p || null == this.q)
            return t4.modPow(this.d, this.n);
          var e3 = t4.mod(this.p).modPow(this.dmp1, this.p);
          var r3 = t4.mod(this.q).modPow(this.dmq1, this.q);
          while (e3.compareTo(r3) < 0)
            e3 = e3.add(this.p);
          return e3.subtract(r3).multiply(this.coeff).mod(this.p).multiply(this.q).add(r3);
        };
        t3.prototype.setPublic = function(t4, e3) {
          if (null != t4 && null != e3 && t4.length > 0 && e3.length > 0) {
            this.n = U(t4, 16);
            this.e = parseInt(e3, 16);
          } else
            console.error("Invalid RSA public key");
        };
        t3.prototype.encrypt = function(t4) {
          var e3 = this.n.bitLength() + 7 >> 3;
          var r3 = ot2(t4, e3);
          if (null == r3)
            return null;
          var i3 = this.doPublic(r3);
          if (null == i3)
            return null;
          var n22 = i3.toString(16);
          var s22 = n22.length;
          for (var a22 = 0; a22 < 2 * e3 - s22; a22++)
            n22 = "0" + n22;
          return n22;
        };
        t3.prototype.setPrivate = function(t4, e3, r3) {
          if (null != t4 && null != e3 && t4.length > 0 && e3.length > 0) {
            this.n = U(t4, 16);
            this.e = parseInt(e3, 16);
            this.d = U(r3, 16);
          } else
            console.error("Invalid RSA private key");
        };
        t3.prototype.setPrivateEx = function(t4, e3, r3, i3, n22, s22, a22, o22) {
          if (null != t4 && null != e3 && t4.length > 0 && e3.length > 0) {
            this.n = U(t4, 16);
            this.e = parseInt(e3, 16);
            this.d = U(r3, 16);
            this.p = U(i3, 16);
            this.q = U(n22, 16);
            this.dmp1 = U(s22, 16);
            this.dmq1 = U(a22, 16);
            this.coeff = U(o22, 16);
          } else
            console.error("Invalid RSA private key");
        };
        t3.prototype.generate = function(t4, e3) {
          var r3 = new st2();
          var i3 = t4 >> 1;
          this.e = parseInt(e3, 16);
          var n22 = new C2(e3, 16);
          for (; ; ) {
            for (; ; ) {
              this.p = new C2(t4 - i3, 1, r3);
              if (0 == this.p.subtract(C2.ONE).gcd(n22).compareTo(C2.ONE) && this.p.isProbablePrime(10))
                break;
            }
            for (; ; ) {
              this.q = new C2(i3, 1, r3);
              if (0 == this.q.subtract(C2.ONE).gcd(n22).compareTo(C2.ONE) && this.q.isProbablePrime(10))
                break;
            }
            if (this.p.compareTo(this.q) <= 0) {
              var s22 = this.p;
              this.p = this.q;
              this.q = s22;
            }
            var a22 = this.p.subtract(C2.ONE);
            var o22 = this.q.subtract(C2.ONE);
            var u22 = a22.multiply(o22);
            if (0 == u22.gcd(n22).compareTo(C2.ONE)) {
              this.n = this.p.multiply(this.q);
              this.d = n22.modInverse(u22);
              this.dmp1 = this.d.mod(a22);
              this.dmq1 = this.d.mod(o22);
              this.coeff = this.q.modInverse(this.p);
              break;
            }
          }
        };
        t3.prototype.decrypt = function(t4) {
          var e3 = U(t4, 16);
          var r3 = this.doPrivate(e3);
          if (null == r3)
            return null;
          return ct2(r3, this.n.bitLength() + 7 >> 3);
        };
        t3.prototype.generateAsync = function(t4, e3, r3) {
          var i3 = new st2();
          var n22 = t4 >> 1;
          this.e = parseInt(e3, 16);
          var s22 = new C2(e3, 16);
          var a22 = this;
          var o22 = function() {
            var e4 = function() {
              if (a22.p.compareTo(a22.q) <= 0) {
                var t5 = a22.p;
                a22.p = a22.q;
                a22.q = t5;
              }
              var e5 = a22.p.subtract(C2.ONE);
              var i4 = a22.q.subtract(C2.ONE);
              var n3 = e5.multiply(i4);
              if (0 == n3.gcd(s22).compareTo(C2.ONE)) {
                a22.n = a22.p.multiply(a22.q);
                a22.d = s22.modInverse(n3);
                a22.dmp1 = a22.d.mod(e5);
                a22.dmq1 = a22.d.mod(i4);
                a22.coeff = a22.q.modInverse(a22.p);
                setTimeout(function() {
                  r3();
                }, 0);
              } else
                setTimeout(o22, 0);
            };
            var u22 = function() {
              a22.q = H2();
              a22.q.fromNumberAsync(n22, 1, i3, function() {
                a22.q.subtract(C2.ONE).gcda(s22, function(t5) {
                  if (0 == t5.compareTo(C2.ONE) && a22.q.isProbablePrime(10))
                    setTimeout(e4, 0);
                  else
                    setTimeout(u22, 0);
                });
              });
            };
            var c22 = function() {
              a22.p = H2();
              a22.p.fromNumberAsync(t4 - n22, 1, i3, function() {
                a22.p.subtract(C2.ONE).gcda(s22, function(t5) {
                  if (0 == t5.compareTo(C2.ONE) && a22.p.isProbablePrime(10))
                    setTimeout(u22, 0);
                  else
                    setTimeout(c22, 0);
                });
              });
            };
            setTimeout(c22, 0);
          };
          setTimeout(o22, 0);
        };
        t3.prototype.sign = function(t4, e3, r3) {
          var i3 = ht2(r3);
          var n22 = i3 + e3(t4).toString();
          var s22 = at2(n22, this.n.bitLength() / 4);
          if (null == s22)
            return null;
          var a22 = this.doPrivate(s22);
          if (null == a22)
            return null;
          var o22 = a22.toString(16);
          if (0 == (1 & o22.length))
            return o22;
          else
            return "0" + o22;
        };
        t3.prototype.verify = function(t4, e3, r3) {
          var i3 = U(e3, 16);
          var n22 = this.doPublic(i3);
          if (null == n22)
            return null;
          var s22 = n22.toString(16).replace(/^1f+00/, "");
          var a22 = dt2(s22);
          return a22 == r3(t4).toString();
        };
        t3.prototype.encryptLong = function(t4) {
          var e3 = this;
          var r3 = "";
          var i3 = (this.n.bitLength() + 7 >> 3) - 11;
          var n22 = this.setSplitChn(t4, i3);
          n22.forEach(function(t5) {
            r3 += e3.encrypt(t5);
          });
          return r3;
        };
        t3.prototype.decryptLong = function(t4) {
          var e3 = "";
          var r3 = this.n.bitLength() + 7 >> 3;
          var i3 = 2 * r3;
          if (t4.length > i3) {
            var n22 = t4.match(new RegExp(".{1," + i3 + "}", "g")) || [];
            var s22 = [];
            for (var a22 = 0; a22 < n22.length; a22++) {
              var o22 = U(n22[a22], 16);
              var u22 = this.doPrivate(o22);
              if (null == u22)
                return null;
              s22.push(u22);
            }
            e3 = lt2(s22, r3);
          } else
            e3 = this.decrypt(t4);
          return e3;
        };
        t3.prototype.setSplitChn = function(t4, e3, r3) {
          if (void 0 === r3)
            r3 = [];
          var i3 = t4.split("");
          var n22 = 0;
          for (var s22 = 0; s22 < i3.length; s22++) {
            var a22 = i3[s22].charCodeAt(0);
            if (a22 <= 127)
              n22 += 1;
            else if (a22 <= 2047)
              n22 += 2;
            else if (a22 <= 65535)
              n22 += 3;
            else
              n22 += 4;
            if (n22 > e3) {
              var o22 = t4.substring(0, s22);
              r3.push(o22);
              return this.setSplitChn(t4.substring(s22), e3, r3);
            }
          }
          r3.push(t4);
          return r3;
        };
        return t3;
      }();
      function ct2(t3, e3) {
        var r3 = t3.toByteArray();
        var i3 = 0;
        while (i3 < r3.length && 0 == r3[i3])
          ++i3;
        if (r3.length - i3 != e3 - 1 || 2 != r3[i3])
          return null;
        ++i3;
        while (0 != r3[i3])
          if (++i3 >= r3.length)
            return null;
        var n22 = "";
        while (++i3 < r3.length) {
          var s22 = 255 & r3[i3];
          if (s22 < 128)
            n22 += String.fromCharCode(s22);
          else if (s22 > 191 && s22 < 224) {
            n22 += String.fromCharCode((31 & s22) << 6 | 63 & r3[i3 + 1]);
            ++i3;
          } else {
            n22 += String.fromCharCode((15 & s22) << 12 | (63 & r3[i3 + 1]) << 6 | 63 & r3[i3 + 2]);
            i3 += 2;
          }
        }
        return n22;
      }
      function lt2(t3, e3) {
        var r3 = [];
        for (var i3 = 0; i3 < t3.length; i3++) {
          var n22 = t3[i3];
          var s22 = n22.toByteArray();
          var a22 = 0;
          while (a22 < s22.length && 0 == s22[a22])
            ++a22;
          if (s22.length - a22 != e3 - 1 || 2 != s22[a22])
            return null;
          ++a22;
          while (0 != s22[a22])
            if (++a22 >= s22.length)
              return null;
          r3 = r3.concat(s22.slice(a22 + 1));
        }
        var o22 = r3;
        var u22 = -1;
        var c22 = "";
        while (++u22 < o22.length) {
          var l22 = 255 & o22[u22];
          if (l22 < 128)
            c22 += String.fromCharCode(l22);
          else if (l22 > 191 && l22 < 224) {
            c22 += String.fromCharCode((31 & l22) << 6 | 63 & o22[u22 + 1]);
            ++u22;
          } else {
            c22 += String.fromCharCode((15 & l22) << 12 | (63 & o22[u22 + 1]) << 6 | 63 & o22[u22 + 2]);
            u22 += 2;
          }
        }
        return c22;
      }
      var ft2 = { md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", ripemd160: "3021300906052b2403020105000414" };
      function ht2(t3) {
        return ft2[t3] || "";
      }
      function dt2(t3) {
        for (var e3 in ft2)
          if (ft2.hasOwnProperty(e3)) {
            var r3 = ft2[e3];
            var i3 = r3.length;
            if (t3.substr(0, i3) == r3)
              return t3.substr(i3);
          }
        return t3;
      }
      var vt2 = {};
      vt2.lang = { extend: function(t3, e3, r3) {
        if (!e3 || !t3)
          throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
        var i3 = function() {
        };
        i3.prototype = e3.prototype;
        t3.prototype = new i3();
        t3.prototype.constructor = t3;
        t3.superclass = e3.prototype;
        if (e3.prototype.constructor == Object.prototype.constructor)
          e3.prototype.constructor = e3;
        if (r3) {
          var n22;
          for (n22 in r3)
            t3.prototype[n22] = r3[n22];
          var s22 = function() {
          }, a22 = ["toString", "valueOf"];
          try {
            if (/MSIE/.test(navigator.userAgent))
              s22 = function(t4, e4) {
                for (n22 = 0; n22 < a22.length; n22 += 1) {
                  var r4 = a22[n22], i4 = e4[r4];
                  if ("function" === typeof i4 && i4 != Object.prototype[r4])
                    t4[r4] = i4;
                }
              };
          } catch (t4) {
          }
          s22(t3.prototype, r3);
        }
      } };
      var pt2 = {};
      if ("undefined" == typeof pt2.asn1 || !pt2.asn1)
        pt2.asn1 = {};
      pt2.asn1.ASN1Util = new function() {
        this.integerToByteHex = function(t3) {
          var e3 = t3.toString(16);
          if (e3.length % 2 == 1)
            e3 = "0" + e3;
          return e3;
        };
        this.bigIntToMinTwosComplementsHex = function(t3) {
          var e3 = t3.toString(16);
          if ("-" != e3.substr(0, 1)) {
            if (e3.length % 2 == 1)
              e3 = "0" + e3;
            else if (!e3.match(/^[0-7]/))
              e3 = "00" + e3;
          } else {
            var r3 = e3.substr(1);
            var i3 = r3.length;
            if (i3 % 2 == 1)
              i3 += 1;
            else if (!e3.match(/^[0-7]/))
              i3 += 2;
            var n22 = "";
            for (var s22 = 0; s22 < i3; s22++)
              n22 += "f";
            var a22 = new C2(n22, 16);
            var o22 = a22.xor(t3).add(C2.ONE);
            e3 = o22.toString(16).replace(/^-/, "");
          }
          return e3;
        };
        this.getPEMStringFromHex = function(t3, e3) {
          return hextopem(t3, e3);
        };
        this.newObject = function(t3) {
          var e3 = pt2, r3 = e3.asn1, i3 = r3.DERBoolean, n22 = r3.DERInteger, s22 = r3.DERBitString, a22 = r3.DEROctetString, o22 = r3.DERNull, u22 = r3.DERObjectIdentifier, c22 = r3.DEREnumerated, l22 = r3.DERUTF8String, f22 = r3.DERNumericString, h22 = r3.DERPrintableString, d22 = r3.DERTeletexString, v22 = r3.DERIA5String, p2 = r3.DERUTCTime, g22 = r3.DERGeneralizedTime, y22 = r3.DERSequence, m22 = r3.DERSet, w22 = r3.DERTaggedObject, S22 = r3.ASN1Util.newObject;
          var _22 = Object.keys(t3);
          if (1 != _22.length)
            throw "key of param shall be only one.";
          var b22 = _22[0];
          if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + b22 + ":"))
            throw "undefined key: " + b22;
          if ("bool" == b22)
            return new i3(t3[b22]);
          if ("int" == b22)
            return new n22(t3[b22]);
          if ("bitstr" == b22)
            return new s22(t3[b22]);
          if ("octstr" == b22)
            return new a22(t3[b22]);
          if ("null" == b22)
            return new o22(t3[b22]);
          if ("oid" == b22)
            return new u22(t3[b22]);
          if ("enum" == b22)
            return new c22(t3[b22]);
          if ("utf8str" == b22)
            return new l22(t3[b22]);
          if ("numstr" == b22)
            return new f22(t3[b22]);
          if ("prnstr" == b22)
            return new h22(t3[b22]);
          if ("telstr" == b22)
            return new d22(t3[b22]);
          if ("ia5str" == b22)
            return new v22(t3[b22]);
          if ("utctime" == b22)
            return new p2(t3[b22]);
          if ("gentime" == b22)
            return new g22(t3[b22]);
          if ("seq" == b22) {
            var E22 = t3[b22];
            var D22 = [];
            for (var M22 = 0; M22 < E22.length; M22++) {
              var T22 = S22(E22[M22]);
              D22.push(T22);
            }
            return new y22({ array: D22 });
          }
          if ("set" == b22) {
            var E22 = t3[b22];
            var D22 = [];
            for (var M22 = 0; M22 < E22.length; M22++) {
              var T22 = S22(E22[M22]);
              D22.push(T22);
            }
            return new m22({ array: D22 });
          }
          if ("tag" == b22) {
            var I22 = t3[b22];
            if ("[object Array]" === Object.prototype.toString.call(I22) && 3 == I22.length) {
              var A22 = S22(I22[2]);
              return new w22({ tag: I22[0], explicit: I22[1], obj: A22 });
            } else {
              var x2 = {};
              if (void 0 !== I22.explicit)
                x2.explicit = I22.explicit;
              if (void 0 !== I22.tag)
                x2.tag = I22.tag;
              if (void 0 === I22.obj)
                throw "obj shall be specified for 'tag'.";
              x2.obj = S22(I22.obj);
              return new w22(x2);
            }
          }
        };
        this.jsonToASN1HEX = function(t3) {
          var e3 = this.newObject(t3);
          return e3.getEncodedHex();
        };
      }();
      pt2.asn1.ASN1Util.oidHexToInt = function(t3) {
        var e3 = "";
        var r3 = parseInt(t3.substr(0, 2), 16);
        var i3 = Math.floor(r3 / 40);
        var n22 = r3 % 40;
        var e3 = i3 + "." + n22;
        var s22 = "";
        for (var a22 = 2; a22 < t3.length; a22 += 2) {
          var o22 = parseInt(t3.substr(a22, 2), 16);
          var u22 = ("00000000" + o22.toString(2)).slice(-8);
          s22 += u22.substr(1, 7);
          if ("0" == u22.substr(0, 1)) {
            var c22 = new C2(s22, 2);
            e3 = e3 + "." + c22.toString(10);
            s22 = "";
          }
        }
        return e3;
      };
      pt2.asn1.ASN1Util.oidIntToHex = function(t3) {
        var e3 = function(t4) {
          var e4 = t4.toString(16);
          if (1 == e4.length)
            e4 = "0" + e4;
          return e4;
        };
        var r3 = function(t4) {
          var r4 = "";
          var i4 = new C2(t4, 10);
          var n3 = i4.toString(2);
          var s3 = 7 - n3.length % 7;
          if (7 == s3)
            s3 = 0;
          var a3 = "";
          for (var o22 = 0; o22 < s3; o22++)
            a3 += "0";
          n3 = a3 + n3;
          for (var o22 = 0; o22 < n3.length - 1; o22 += 7) {
            var u22 = n3.substr(o22, 7);
            if (o22 != n3.length - 7)
              u22 = "1" + u22;
            r4 += e3(parseInt(u22, 2));
          }
          return r4;
        };
        if (!t3.match(/^[0-9.]+$/))
          throw "malformed oid string: " + t3;
        var i3 = "";
        var n22 = t3.split(".");
        var s22 = 40 * parseInt(n22[0]) + parseInt(n22[1]);
        i3 += e3(s22);
        n22.splice(0, 2);
        for (var a22 = 0; a22 < n22.length; a22++)
          i3 += r3(n22[a22]);
        return i3;
      };
      pt2.asn1.ASN1Object = function() {
        var n22 = "";
        this.getLengthHexFromValue = function() {
          if ("undefined" == typeof this.hV || null == this.hV)
            throw "this.hV is null or undefined.";
          if (this.hV.length % 2 == 1)
            throw "value hex must be even length: n=" + n22.length + ",v=" + this.hV;
          var t3 = this.hV.length / 2;
          var e3 = t3.toString(16);
          if (e3.length % 2 == 1)
            e3 = "0" + e3;
          if (t3 < 128)
            return e3;
          else {
            var r3 = e3.length / 2;
            if (r3 > 15)
              throw "ASN.1 length too long to represent by 8x: n = " + t3.toString(16);
            var i3 = 128 + r3;
            return i3.toString(16) + e3;
          }
        };
        this.getEncodedHex = function() {
          if (null == this.hTLV || this.isModified) {
            this.hV = this.getFreshValueHex();
            this.hL = this.getLengthHexFromValue();
            this.hTLV = this.hT + this.hL + this.hV;
            this.isModified = false;
          }
          return this.hTLV;
        };
        this.getValueHex = function() {
          this.getEncodedHex();
          return this.hV;
        };
        this.getFreshValueHex = function() {
          return "";
        };
      };
      pt2.asn1.DERAbstractString = function(t3) {
        pt2.asn1.DERAbstractString.superclass.constructor.call(this);
        this.getString = function() {
          return this.s;
        };
        this.setString = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.s = t4;
          this.hV = stohex(this.s);
        };
        this.setStringHex = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = t4;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t3) {
          if ("string" == typeof t3)
            this.setString(t3);
          else if ("undefined" != typeof t3["str"])
            this.setString(t3["str"]);
          else if ("undefined" != typeof t3["hex"])
            this.setStringHex(t3["hex"]);
        }
      };
      vt2.lang.extend(pt2.asn1.DERAbstractString, pt2.asn1.ASN1Object);
      pt2.asn1.DERAbstractTime = function(t3) {
        pt2.asn1.DERAbstractTime.superclass.constructor.call(this);
        this.localDateToUTC = function(t4) {
          utc = t4.getTime() + 6e4 * t4.getTimezoneOffset();
          var e3 = new Date(utc);
          return e3;
        };
        this.formatDate = function(t4, e3, r3) {
          var i3 = this.zeroPadding;
          var n22 = this.localDateToUTC(t4);
          var s22 = String(n22.getFullYear());
          if ("utc" == e3)
            s22 = s22.substr(2, 2);
          var a22 = i3(String(n22.getMonth() + 1), 2);
          var o22 = i3(String(n22.getDate()), 2);
          var u22 = i3(String(n22.getHours()), 2);
          var c22 = i3(String(n22.getMinutes()), 2);
          var l22 = i3(String(n22.getSeconds()), 2);
          var f22 = s22 + a22 + o22 + u22 + c22 + l22;
          if (true === r3) {
            var h22 = n22.getMilliseconds();
            if (0 != h22) {
              var d22 = i3(String(h22), 3);
              d22 = d22.replace(/[0]+$/, "");
              f22 = f22 + "." + d22;
            }
          }
          return f22 + "Z";
        };
        this.zeroPadding = function(t4, e3) {
          if (t4.length >= e3)
            return t4;
          return new Array(e3 - t4.length + 1).join("0") + t4;
        };
        this.getString = function() {
          return this.s;
        };
        this.setString = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.s = t4;
          this.hV = stohex(t4);
        };
        this.setByDateValue = function(t4, e3, r3, i3, n22, s22) {
          var a22 = new Date(Date.UTC(t4, e3 - 1, r3, i3, n22, s22, 0));
          this.setByDate(a22);
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
      };
      vt2.lang.extend(pt2.asn1.DERAbstractTime, pt2.asn1.ASN1Object);
      pt2.asn1.DERAbstractStructured = function(t3) {
        pt2.asn1.DERAbstractString.superclass.constructor.call(this);
        this.setByASN1ObjectArray = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.asn1Array = t4;
        };
        this.appendASN1Object = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.asn1Array.push(t4);
        };
        this.asn1Array = new Array();
        if ("undefined" != typeof t3) {
          if ("undefined" != typeof t3["array"])
            this.asn1Array = t3["array"];
        }
      };
      vt2.lang.extend(pt2.asn1.DERAbstractStructured, pt2.asn1.ASN1Object);
      pt2.asn1.DERBoolean = function() {
        pt2.asn1.DERBoolean.superclass.constructor.call(this);
        this.hT = "01";
        this.hTLV = "0101ff";
      };
      vt2.lang.extend(pt2.asn1.DERBoolean, pt2.asn1.ASN1Object);
      pt2.asn1.DERInteger = function(t3) {
        pt2.asn1.DERInteger.superclass.constructor.call(this);
        this.hT = "02";
        this.setByBigInteger = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = pt2.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t4);
        };
        this.setByInteger = function(t4) {
          var e3 = new C2(String(t4), 10);
          this.setByBigInteger(e3);
        };
        this.setValueHex = function(t4) {
          this.hV = t4;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t3) {
          if ("undefined" != typeof t3["bigint"])
            this.setByBigInteger(t3["bigint"]);
          else if ("undefined" != typeof t3["int"])
            this.setByInteger(t3["int"]);
          else if ("number" == typeof t3)
            this.setByInteger(t3);
          else if ("undefined" != typeof t3["hex"])
            this.setValueHex(t3["hex"]);
        }
      };
      vt2.lang.extend(pt2.asn1.DERInteger, pt2.asn1.ASN1Object);
      pt2.asn1.DERBitString = function(t3) {
        if (void 0 !== t3 && "undefined" !== typeof t3.obj) {
          var e3 = pt2.asn1.ASN1Util.newObject(t3.obj);
          t3.hex = "00" + e3.getEncodedHex();
        }
        pt2.asn1.DERBitString.superclass.constructor.call(this);
        this.hT = "03";
        this.setHexValueIncludingUnusedBits = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = t4;
        };
        this.setUnusedBitsAndHexValue = function(t4, e4) {
          if (t4 < 0 || 7 < t4)
            throw "unused bits shall be from 0 to 7: u = " + t4;
          var r3 = "0" + t4;
          this.hTLV = null;
          this.isModified = true;
          this.hV = r3 + e4;
        };
        this.setByBinaryString = function(t4) {
          t4 = t4.replace(/0+$/, "");
          var e4 = 8 - t4.length % 8;
          if (8 == e4)
            e4 = 0;
          for (var r3 = 0; r3 <= e4; r3++)
            t4 += "0";
          var i3 = "";
          for (var r3 = 0; r3 < t4.length - 1; r3 += 8) {
            var n22 = t4.substr(r3, 8);
            var s22 = parseInt(n22, 2).toString(16);
            if (1 == s22.length)
              s22 = "0" + s22;
            i3 += s22;
          }
          this.hTLV = null;
          this.isModified = true;
          this.hV = "0" + e4 + i3;
        };
        this.setByBooleanArray = function(t4) {
          var e4 = "";
          for (var r3 = 0; r3 < t4.length; r3++)
            if (true == t4[r3])
              e4 += "1";
            else
              e4 += "0";
          this.setByBinaryString(e4);
        };
        this.newFalseArray = function(t4) {
          var e4 = new Array(t4);
          for (var r3 = 0; r3 < t4; r3++)
            e4[r3] = false;
          return e4;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t3) {
          if ("string" == typeof t3 && t3.toLowerCase().match(/^[0-9a-f]+$/))
            this.setHexValueIncludingUnusedBits(t3);
          else if ("undefined" != typeof t3["hex"])
            this.setHexValueIncludingUnusedBits(t3["hex"]);
          else if ("undefined" != typeof t3["bin"])
            this.setByBinaryString(t3["bin"]);
          else if ("undefined" != typeof t3["array"])
            this.setByBooleanArray(t3["array"]);
        }
      };
      vt2.lang.extend(pt2.asn1.DERBitString, pt2.asn1.ASN1Object);
      pt2.asn1.DEROctetString = function(t3) {
        if (void 0 !== t3 && "undefined" !== typeof t3.obj) {
          var e3 = pt2.asn1.ASN1Util.newObject(t3.obj);
          t3.hex = e3.getEncodedHex();
        }
        pt2.asn1.DEROctetString.superclass.constructor.call(this, t3);
        this.hT = "04";
      };
      vt2.lang.extend(pt2.asn1.DEROctetString, pt2.asn1.DERAbstractString);
      pt2.asn1.DERNull = function() {
        pt2.asn1.DERNull.superclass.constructor.call(this);
        this.hT = "05";
        this.hTLV = "0500";
      };
      vt2.lang.extend(pt2.asn1.DERNull, pt2.asn1.ASN1Object);
      pt2.asn1.DERObjectIdentifier = function(t3) {
        var e3 = function(t4) {
          var e4 = t4.toString(16);
          if (1 == e4.length)
            e4 = "0" + e4;
          return e4;
        };
        var r3 = function(t4) {
          var r4 = "";
          var i3 = new C2(t4, 10);
          var n22 = i3.toString(2);
          var s22 = 7 - n22.length % 7;
          if (7 == s22)
            s22 = 0;
          var a22 = "";
          for (var o22 = 0; o22 < s22; o22++)
            a22 += "0";
          n22 = a22 + n22;
          for (var o22 = 0; o22 < n22.length - 1; o22 += 7) {
            var u22 = n22.substr(o22, 7);
            if (o22 != n22.length - 7)
              u22 = "1" + u22;
            r4 += e3(parseInt(u22, 2));
          }
          return r4;
        };
        pt2.asn1.DERObjectIdentifier.superclass.constructor.call(this);
        this.hT = "06";
        this.setValueHex = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = t4;
        };
        this.setValueOidString = function(t4) {
          if (!t4.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t4;
          var i3 = "";
          var n22 = t4.split(".");
          var s22 = 40 * parseInt(n22[0]) + parseInt(n22[1]);
          i3 += e3(s22);
          n22.splice(0, 2);
          for (var a22 = 0; a22 < n22.length; a22++)
            i3 += r3(n22[a22]);
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = i3;
        };
        this.setValueName = function(t4) {
          var e4 = pt2.asn1.x509.OID.name2oid(t4);
          if ("" !== e4)
            this.setValueOidString(e4);
          else
            throw "DERObjectIdentifier oidName undefined: " + t4;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if (void 0 !== t3) {
          if ("string" === typeof t3)
            if (t3.match(/^[0-2].[0-9.]+$/))
              this.setValueOidString(t3);
            else
              this.setValueName(t3);
          else if (void 0 !== t3.oid)
            this.setValueOidString(t3.oid);
          else if (void 0 !== t3.hex)
            this.setValueHex(t3.hex);
          else if (void 0 !== t3.name)
            this.setValueName(t3.name);
        }
      };
      vt2.lang.extend(pt2.asn1.DERObjectIdentifier, pt2.asn1.ASN1Object);
      pt2.asn1.DEREnumerated = function(t3) {
        pt2.asn1.DEREnumerated.superclass.constructor.call(this);
        this.hT = "0a";
        this.setByBigInteger = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = pt2.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t4);
        };
        this.setByInteger = function(t4) {
          var e3 = new C2(String(t4), 10);
          this.setByBigInteger(e3);
        };
        this.setValueHex = function(t4) {
          this.hV = t4;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t3) {
          if ("undefined" != typeof t3["int"])
            this.setByInteger(t3["int"]);
          else if ("number" == typeof t3)
            this.setByInteger(t3);
          else if ("undefined" != typeof t3["hex"])
            this.setValueHex(t3["hex"]);
        }
      };
      vt2.lang.extend(pt2.asn1.DEREnumerated, pt2.asn1.ASN1Object);
      pt2.asn1.DERUTF8String = function(t3) {
        pt2.asn1.DERUTF8String.superclass.constructor.call(this, t3);
        this.hT = "0c";
      };
      vt2.lang.extend(pt2.asn1.DERUTF8String, pt2.asn1.DERAbstractString);
      pt2.asn1.DERNumericString = function(t3) {
        pt2.asn1.DERNumericString.superclass.constructor.call(this, t3);
        this.hT = "12";
      };
      vt2.lang.extend(pt2.asn1.DERNumericString, pt2.asn1.DERAbstractString);
      pt2.asn1.DERPrintableString = function(t3) {
        pt2.asn1.DERPrintableString.superclass.constructor.call(this, t3);
        this.hT = "13";
      };
      vt2.lang.extend(pt2.asn1.DERPrintableString, pt2.asn1.DERAbstractString);
      pt2.asn1.DERTeletexString = function(t3) {
        pt2.asn1.DERTeletexString.superclass.constructor.call(this, t3);
        this.hT = "14";
      };
      vt2.lang.extend(pt2.asn1.DERTeletexString, pt2.asn1.DERAbstractString);
      pt2.asn1.DERIA5String = function(t3) {
        pt2.asn1.DERIA5String.superclass.constructor.call(this, t3);
        this.hT = "16";
      };
      vt2.lang.extend(pt2.asn1.DERIA5String, pt2.asn1.DERAbstractString);
      pt2.asn1.DERUTCTime = function(t3) {
        pt2.asn1.DERUTCTime.superclass.constructor.call(this, t3);
        this.hT = "17";
        this.setByDate = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.date = t4;
          this.s = this.formatDate(this.date, "utc");
          this.hV = stohex(this.s);
        };
        this.getFreshValueHex = function() {
          if ("undefined" == typeof this.date && "undefined" == typeof this.s) {
            this.date = /* @__PURE__ */ new Date();
            this.s = this.formatDate(this.date, "utc");
            this.hV = stohex(this.s);
          }
          return this.hV;
        };
        if (void 0 !== t3) {
          if (void 0 !== t3.str)
            this.setString(t3.str);
          else if ("string" == typeof t3 && t3.match(/^[0-9]{12}Z$/))
            this.setString(t3);
          else if (void 0 !== t3.hex)
            this.setStringHex(t3.hex);
          else if (void 0 !== t3.date)
            this.setByDate(t3.date);
        }
      };
      vt2.lang.extend(pt2.asn1.DERUTCTime, pt2.asn1.DERAbstractTime);
      pt2.asn1.DERGeneralizedTime = function(t3) {
        pt2.asn1.DERGeneralizedTime.superclass.constructor.call(this, t3);
        this.hT = "18";
        this.withMillis = false;
        this.setByDate = function(t4) {
          this.hTLV = null;
          this.isModified = true;
          this.date = t4;
          this.s = this.formatDate(this.date, "gen", this.withMillis);
          this.hV = stohex(this.s);
        };
        this.getFreshValueHex = function() {
          if (void 0 === this.date && void 0 === this.s) {
            this.date = /* @__PURE__ */ new Date();
            this.s = this.formatDate(this.date, "gen", this.withMillis);
            this.hV = stohex(this.s);
          }
          return this.hV;
        };
        if (void 0 !== t3) {
          if (void 0 !== t3.str)
            this.setString(t3.str);
          else if ("string" == typeof t3 && t3.match(/^[0-9]{14}Z$/))
            this.setString(t3);
          else if (void 0 !== t3.hex)
            this.setStringHex(t3.hex);
          else if (void 0 !== t3.date)
            this.setByDate(t3.date);
          if (true === t3.millis)
            this.withMillis = true;
        }
      };
      vt2.lang.extend(pt2.asn1.DERGeneralizedTime, pt2.asn1.DERAbstractTime);
      pt2.asn1.DERSequence = function(t3) {
        pt2.asn1.DERSequence.superclass.constructor.call(this, t3);
        this.hT = "30";
        this.getFreshValueHex = function() {
          var t4 = "";
          for (var e3 = 0; e3 < this.asn1Array.length; e3++) {
            var r3 = this.asn1Array[e3];
            t4 += r3.getEncodedHex();
          }
          this.hV = t4;
          return this.hV;
        };
      };
      vt2.lang.extend(pt2.asn1.DERSequence, pt2.asn1.DERAbstractStructured);
      pt2.asn1.DERSet = function(t3) {
        pt2.asn1.DERSet.superclass.constructor.call(this, t3);
        this.hT = "31";
        this.sortFlag = true;
        this.getFreshValueHex = function() {
          var t4 = new Array();
          for (var e3 = 0; e3 < this.asn1Array.length; e3++) {
            var r3 = this.asn1Array[e3];
            t4.push(r3.getEncodedHex());
          }
          if (true == this.sortFlag)
            t4.sort();
          this.hV = t4.join("");
          return this.hV;
        };
        if ("undefined" != typeof t3) {
          if ("undefined" != typeof t3.sortflag && false == t3.sortflag)
            this.sortFlag = false;
        }
      };
      vt2.lang.extend(pt2.asn1.DERSet, pt2.asn1.DERAbstractStructured);
      pt2.asn1.DERTaggedObject = function(t3) {
        pt2.asn1.DERTaggedObject.superclass.constructor.call(this);
        this.hT = "a0";
        this.hV = "";
        this.isExplicit = true;
        this.asn1Object = null;
        this.setASN1Object = function(t4, e3, r3) {
          this.hT = e3;
          this.isExplicit = t4;
          this.asn1Object = r3;
          if (this.isExplicit) {
            this.hV = this.asn1Object.getEncodedHex();
            this.hTLV = null;
            this.isModified = true;
          } else {
            this.hV = null;
            this.hTLV = r3.getEncodedHex();
            this.hTLV = this.hTLV.replace(/^../, e3);
            this.isModified = false;
          }
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t3) {
          if ("undefined" != typeof t3["tag"])
            this.hT = t3["tag"];
          if ("undefined" != typeof t3["explicit"])
            this.isExplicit = t3["explicit"];
          if ("undefined" != typeof t3["obj"]) {
            this.asn1Object = t3["obj"];
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
          }
        }
      };
      vt2.lang.extend(pt2.asn1.DERTaggedObject, pt2.asn1.ASN1Object);
      var gt2 = /* @__PURE__ */ function() {
        var t3 = function(e3, r3) {
          t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
            t4.__proto__ = e4;
          } || function(t4, e4) {
            for (var r4 in e4)
              if (Object.prototype.hasOwnProperty.call(e4, r4))
                t4[r4] = e4[r4];
          };
          return t3(e3, r3);
        };
        return function(e3, r3) {
          if ("function" !== typeof r3 && null !== r3)
            throw new TypeError("Class extends value " + String(r3) + " is not a constructor or null");
          t3(e3, r3);
          function i3() {
            this.constructor = e3;
          }
          e3.prototype = null === r3 ? Object.create(r3) : (i3.prototype = r3.prototype, new i3());
        };
      }();
      var yt2 = function(t3) {
        gt2(e3, t3);
        function e3(r3) {
          var i3 = t3.call(this) || this;
          if (r3) {
            if ("string" === typeof r3)
              i3.parseKey(r3);
            else if (e3.hasPrivateKeyProperty(r3) || e3.hasPublicKeyProperty(r3))
              i3.parsePropertiesFrom(r3);
          }
          return i3;
        }
        e3.prototype.parseKey = function(t4) {
          try {
            var e4 = 0;
            var r3 = 0;
            var i3 = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
            var n22 = i3.test(t4) ? y2.decode(t4) : w2.unarmor(t4);
            var s22 = I2.decode(n22);
            if (3 === s22.sub.length)
              s22 = s22.sub[2].sub[0];
            if (9 === s22.sub.length) {
              e4 = s22.sub[1].getHexStringValue();
              this.n = U(e4, 16);
              r3 = s22.sub[2].getHexStringValue();
              this.e = parseInt(r3, 16);
              var a22 = s22.sub[3].getHexStringValue();
              this.d = U(a22, 16);
              var o22 = s22.sub[4].getHexStringValue();
              this.p = U(o22, 16);
              var u22 = s22.sub[5].getHexStringValue();
              this.q = U(u22, 16);
              var c22 = s22.sub[6].getHexStringValue();
              this.dmp1 = U(c22, 16);
              var l22 = s22.sub[7].getHexStringValue();
              this.dmq1 = U(l22, 16);
              var f22 = s22.sub[8].getHexStringValue();
              this.coeff = U(f22, 16);
            } else if (2 === s22.sub.length) {
              var h22 = s22.sub[1];
              var d22 = h22.sub[0];
              e4 = d22.sub[0].getHexStringValue();
              this.n = U(e4, 16);
              r3 = d22.sub[1].getHexStringValue();
              this.e = parseInt(r3, 16);
            } else
              return false;
            return true;
          } catch (t5) {
            return false;
          }
        };
        e3.prototype.getPrivateBaseKey = function() {
          var t4 = { array: [new pt2.asn1.DERInteger({ int: 0 }), new pt2.asn1.DERInteger({ bigint: this.n }), new pt2.asn1.DERInteger({ int: this.e }), new pt2.asn1.DERInteger({ bigint: this.d }), new pt2.asn1.DERInteger({ bigint: this.p }), new pt2.asn1.DERInteger({ bigint: this.q }), new pt2.asn1.DERInteger({ bigint: this.dmp1 }), new pt2.asn1.DERInteger({ bigint: this.dmq1 }), new pt2.asn1.DERInteger({ bigint: this.coeff })] };
          var e4 = new pt2.asn1.DERSequence(t4);
          return e4.getEncodedHex();
        };
        e3.prototype.getPrivateBaseKeyB64 = function() {
          return d2(this.getPrivateBaseKey());
        };
        e3.prototype.getPublicBaseKey = function() {
          var t4 = new pt2.asn1.DERSequence({ array: [new pt2.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }), new pt2.asn1.DERNull()] });
          var e4 = new pt2.asn1.DERSequence({ array: [new pt2.asn1.DERInteger({ bigint: this.n }), new pt2.asn1.DERInteger({ int: this.e })] });
          var r3 = new pt2.asn1.DERBitString({ hex: "00" + e4.getEncodedHex() });
          var i3 = new pt2.asn1.DERSequence({ array: [t4, r3] });
          return i3.getEncodedHex();
        };
        e3.prototype.getPublicBaseKeyB64 = function() {
          return d2(this.getPublicBaseKey());
        };
        e3.wordwrap = function(t4, e4) {
          e4 = e4 || 64;
          if (!t4)
            return t4;
          var r3 = "(.{1," + e4 + "})( +|$\n?)|(.{1," + e4 + "})";
          return t4.match(RegExp(r3, "g")).join("\n");
        };
        e3.prototype.getPrivateKey = function() {
          var t4 = "-----BEGIN RSA PRIVATE KEY-----\n";
          t4 += e3.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
          t4 += "-----END RSA PRIVATE KEY-----";
          return t4;
        };
        e3.prototype.getPublicKey = function() {
          var t4 = "-----BEGIN PUBLIC KEY-----\n";
          t4 += e3.wordwrap(this.getPublicBaseKeyB64()) + "\n";
          t4 += "-----END PUBLIC KEY-----";
          return t4;
        };
        e3.hasPublicKeyProperty = function(t4) {
          t4 = t4 || {};
          return t4.hasOwnProperty("n") && t4.hasOwnProperty("e");
        };
        e3.hasPrivateKeyProperty = function(t4) {
          t4 = t4 || {};
          return t4.hasOwnProperty("n") && t4.hasOwnProperty("e") && t4.hasOwnProperty("d") && t4.hasOwnProperty("p") && t4.hasOwnProperty("q") && t4.hasOwnProperty("dmp1") && t4.hasOwnProperty("dmq1") && t4.hasOwnProperty("coeff");
        };
        e3.prototype.parsePropertiesFrom = function(t4) {
          this.n = t4.n;
          this.e = t4.e;
          if (t4.hasOwnProperty("d")) {
            this.d = t4.d;
            this.p = t4.p;
            this.q = t4.q;
            this.dmp1 = t4.dmp1;
            this.dmq1 = t4.dmq1;
            this.coeff = t4.coeff;
          }
        };
        return e3;
      }(ut2);
      const mt2 = { i: "3.2.1" };
      var wt2 = function() {
        function t3(t4) {
          if (void 0 === t4)
            t4 = {};
          t4 = t4 || {};
          this.default_key_size = t4.default_key_size ? parseInt(t4.default_key_size, 10) : 1024;
          this.default_public_exponent = t4.default_public_exponent || "010001";
          this.log = t4.log || false;
          this.key = null;
        }
        t3.prototype.setKey = function(t4) {
          if (this.log && this.key)
            console.warn("A key was already set, overriding existing.");
          this.key = new yt2(t4);
        };
        t3.prototype.setPrivateKey = function(t4) {
          this.setKey(t4);
        };
        t3.prototype.setPublicKey = function(t4) {
          this.setKey(t4);
        };
        t3.prototype.decrypt = function(t4) {
          try {
            return this.getKey().decrypt(t4);
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.encrypt = function(t4) {
          try {
            return this.getKey().encrypt(t4);
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.encryptLong = function(t4) {
          try {
            return d2(this.getKey().encryptLong(t4));
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.decryptLong = function(t4) {
          try {
            return this.getKey().decryptLong(t4);
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.sign = function(t4, e3, r3) {
          try {
            return d2(this.getKey().sign(t4, e3, r3));
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.verify = function(t4, e3, r3) {
          try {
            return this.getKey().verify(t4, v2(e3), r3);
          } catch (t5) {
            return false;
          }
        };
        t3.prototype.getKey = function(t4) {
          if (!this.key) {
            this.key = new yt2();
            if (t4 && "[object Function]" === {}.toString.call(t4)) {
              this.key.generateAsync(this.default_key_size, this.default_public_exponent, t4);
              return;
            }
            this.key.generate(this.default_key_size, this.default_public_exponent);
          }
          return this.key;
        };
        t3.prototype.getPrivateKey = function() {
          return this.getKey().getPrivateKey();
        };
        t3.prototype.getPrivateKeyB64 = function() {
          return this.getKey().getPrivateBaseKeyB64();
        };
        t3.prototype.getPublicKey = function() {
          return this.getKey().getPublicKey();
        };
        t3.prototype.getPublicKeyB64 = function() {
          return this.getKey().getPublicBaseKeyB64();
        };
        t3.version = mt2.i;
        return t3;
      }();
      const St2 = wt2;
    }, 2480: () => {
    } };
    var e2 = {};
    function r2(i22) {
      var n2 = e2[i22];
      if (void 0 !== n2)
        return n2.exports;
      var s2 = e2[i22] = { id: i22, loaded: false, exports: {} };
      t2[i22].call(s2.exports, s2, s2.exports, r2);
      s2.loaded = true;
      return s2.exports;
    }
    (() => {
      r2.d = (t22, e22) => {
        for (var i22 in e22)
          if (r2.o(e22, i22) && !r2.o(t22, i22))
            Object.defineProperty(t22, i22, { enumerable: true, get: e22[i22] });
      };
    })();
    (() => {
      r2.g = function() {
        if ("object" === typeof globalThis)
          return globalThis;
        try {
          return this || new Function("return this")();
        } catch (t22) {
          if ("object" === typeof window)
            return window;
        }
      }();
    })();
    (() => {
      r2.o = (t22, e22) => Object.prototype.hasOwnProperty.call(t22, e22);
    })();
    (() => {
      r2.r = (t22) => {
        if ("undefined" !== typeof Symbol && Symbol.toStringTag)
          Object.defineProperty(t22, Symbol.toStringTag, { value: "Module" });
        Object.defineProperty(t22, "__esModule", { value: true });
      };
    })();
    (() => {
      r2.nmd = (t22) => {
        t22.paths = [];
        if (!t22.children)
          t22.children = [];
        return t22;
      };
    })();
    var i2 = r2(9021);
    return i2;
  })());
})(gtpushMin);
index.invokePushCallback({
  type: "enabled"
});
{
  Promise.resolve().then(() => {
    index.invokePushCallback({
      type: "clientId",
      cid: "",
      errMsg: "manifest.json->appid is required"
    });
  });
}
const leftWindow = new UTSJSONObject({
  path: "windows/left-window.uvue",
  style: new UTSJSONObject({
    width: "350px"
  })
});
const topWindow = new UTSJSONObject({
  path: "windows/top-window.uvue",
  style: new UTSJSONObject({
    height: "60px"
  })
});
const pages = [
  new UTSJSONObject({
    path: "pages/template/food-recipe/food-recipe",
    style: new UTSJSONObject({
      navigationStyle: "custom",
      navigationBarTitleText: "Food Recipe App",
      backgroundColorContent: "#FFFDF9"
    })
  })
];
const globalStyle = new UTSJSONObject({
  pageOrientation: "portrait",
  navigationBarTitleText: "Hello uniapp x",
  navigationBarTextStyle: "black",
  navigationBarBackgroundColor: "#ffffff",
  backgroundColorContent: "#ffffff",
  backgroundColor: "#ffffff",
  backgroundTextStyle: "light"
});
const condition = new UTSJSONObject({
  current: 0,
  list: [
    new UTSJSONObject({
      name: "",
      path: "",
      query: ""
    })
  ]
});
const e = new UTSJSONObject({
  leftWindow,
  topWindow,
  pages,
  globalStyle,
  condition
});
var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
function t(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function n(e2, t2, n2) {
  return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(null == t3 && n2.path);
  } }, n2.exports), n2.exports;
}
var s = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || /* @__PURE__ */ function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c2).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var i3 = 0; i3 < r3; i3++) {
          var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
          t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
        }
      else
        for (i3 = 0; i3 < r3; i3 += 4)
          t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s3 = [], r3 = function(t5) {
        t5 = t5;
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, i3 = 0; i3 < t4; i3 += 4) {
        var a3 = r3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new o2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new o2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(i3));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new o2.init(n4, t4);
    } }, h2 = a2.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u2.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u2.parse(unescape(encodeURIComponent(e4)));
    } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
      this._data = new o2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
      if (c3) {
        for (var h3 = 0; h3 < c3; h3 += i3)
          this._doProcessBlock(s3, h3);
        var l3 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new o2.init(l3, u3);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      l2.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d2.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d2 = s2.algo = {};
    return s2;
  }(Math), n2);
}), r = s, i = (n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c2 = o2.MD5 = i2.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, r3 = e4[s3];
        e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], T2 = e4[t4 + 14], A2 = e4[t4 + 15], P2 = i3[0], C2 = i3[1], x2 = i3[2], O2 = i3[3];
      P2 = u2(P2, C2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, P2, C2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, P2, C2, p2, 17, a2[2]), C2 = u2(C2, x2, O2, P2, f2, 22, a2[3]), P2 = u2(P2, C2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, P2, C2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, P2, C2, y2, 17, a2[6]), C2 = u2(C2, x2, O2, P2, _2, 22, a2[7]), P2 = u2(P2, C2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, P2, C2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, P2, C2, I2, 17, a2[10]), C2 = u2(C2, x2, O2, P2, S2, 22, a2[11]), P2 = u2(P2, C2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, P2, C2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, P2, C2, T2, 17, a2[14]), P2 = h2(P2, C2 = u2(C2, x2, O2, P2, A2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = h2(O2, P2, C2, x2, y2, 9, a2[17]), x2 = h2(x2, O2, P2, C2, S2, 14, a2[18]), C2 = h2(C2, x2, O2, P2, o3, 20, a2[19]), P2 = h2(P2, C2, x2, O2, m2, 5, a2[20]), O2 = h2(O2, P2, C2, x2, I2, 9, a2[21]), x2 = h2(x2, O2, P2, C2, A2, 14, a2[22]), C2 = h2(C2, x2, O2, P2, g2, 20, a2[23]), P2 = h2(P2, C2, x2, O2, v2, 5, a2[24]), O2 = h2(O2, P2, C2, x2, T2, 9, a2[25]), x2 = h2(x2, O2, P2, C2, f2, 14, a2[26]), C2 = h2(C2, x2, O2, P2, w2, 20, a2[27]), P2 = h2(P2, C2, x2, O2, k2, 5, a2[28]), O2 = h2(O2, P2, C2, x2, p2, 9, a2[29]), x2 = h2(x2, O2, P2, C2, _2, 14, a2[30]), P2 = l2(P2, C2 = h2(C2, x2, O2, P2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = l2(O2, P2, C2, x2, w2, 11, a2[33]), x2 = l2(x2, O2, P2, C2, S2, 16, a2[34]), C2 = l2(C2, x2, O2, P2, T2, 23, a2[35]), P2 = l2(P2, C2, x2, O2, c3, 4, a2[36]), O2 = l2(O2, P2, C2, x2, g2, 11, a2[37]), x2 = l2(x2, O2, P2, C2, _2, 16, a2[38]), C2 = l2(C2, x2, O2, P2, I2, 23, a2[39]), P2 = l2(P2, C2, x2, O2, k2, 4, a2[40]), O2 = l2(O2, P2, C2, x2, o3, 11, a2[41]), x2 = l2(x2, O2, P2, C2, f2, 16, a2[42]), C2 = l2(C2, x2, O2, P2, y2, 23, a2[43]), P2 = l2(P2, C2, x2, O2, v2, 4, a2[44]), O2 = l2(O2, P2, C2, x2, b2, 11, a2[45]), x2 = l2(x2, O2, P2, C2, A2, 16, a2[46]), P2 = d2(P2, C2 = l2(C2, x2, O2, P2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, P2, C2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, P2, C2, T2, 15, a2[50]), C2 = d2(C2, x2, O2, P2, m2, 21, a2[51]), P2 = d2(P2, C2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, P2, C2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, P2, C2, I2, 15, a2[54]), C2 = d2(C2, x2, O2, P2, c3, 21, a2[55]), P2 = d2(P2, C2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, P2, C2, x2, A2, 10, a2[57]), x2 = d2(x2, O2, P2, C2, y2, 15, a2[58]), C2 = d2(C2, x2, O2, P2, k2, 21, a2[59]), P2 = d2(P2, C2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, P2, C2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, P2, C2, p2, 15, a2[62]), C2 = d2(C2, x2, O2, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var i3 = e3.floor(s3 / 4294967296), o3 = s3;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var h3 = c3[u3];
        c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function h2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function l2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function d2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, void function() {
    var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
    e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
      e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
      var n3 = e4.blockSize, r2 = 4 * n3;
      t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
      for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
        a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
      i2.sigBytes = o2.sigBytes = r2, this.reset();
    }, reset: function() {
      var e4 = this._hasher;
      e4.reset(), e4.update(this._iKey);
    }, update: function(e4) {
      return this._hasher.update(e4), this;
    }, finalize: function(e4) {
      var t4 = this._hasher, n3 = t4.finalize(e4);
      return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
    } });
  }());
}), n(function(e2, t2) {
  e2.exports = r.HmacMD5;
})), o = n(function(e2, t2) {
  e2.exports = r.enc.Utf8;
}), a = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function() {
    var e3 = n2, t3 = e3.lib.WordArray;
    function s2(e4, n3, s3) {
      for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
        if (o2 % 4) {
          var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
          r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
        }
      return t3.create(r2, i2);
    }
    e3.enc.Base64 = { stringify: function(e4) {
      var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
      e4.clamp();
      for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
        for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
          r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
      var c2 = s3.charAt(64);
      if (c2)
        for (; r2.length % 4; )
          r2.push(c2);
      return r2.join("");
    }, parse: function(e4) {
      var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
      if (!r2) {
        r2 = this._reverseMap = [];
        for (var i2 = 0; i2 < n3.length; i2++)
          r2[n3.charCodeAt(i2)] = i2;
      }
      var o2 = n3.charAt(64);
      if (o2) {
        var a2 = e4.indexOf(o2);
        -1 !== a2 && (t4 = a2);
      }
      return s2(e4, t4, r2);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
  }(), n2.enc.Base64);
});
const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
function f(e2) {
  return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
}
function g(e2) {
  return "object" === f(e2);
}
function m(e2) {
  return "function" == typeof e2;
}
function y(e2) {
  return function() {
    try {
      return e2.apply(e2, arguments);
    } catch (e3) {
      console.error(e3);
    }
  };
}
const _ = "REJECTED", w = "NOT_PENDING";
class v {
  constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
    this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
  }
  get needRetry() {
    if (!this.status)
      return true;
    switch (this.retryRule) {
      case _:
        return this.status === p;
      case w:
        return this.status !== l;
    }
  }
  exec() {
    return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
  }
}
function I(e2) {
  return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
}
const S = true, b = "mp-weixin", T = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), A = b, P = I(""), C = I("[]") || [];
let O = "";
try {
  O = "";
} catch (e2) {
}
let L = {};
function R(e2, t2 = {}) {
  var n2, s2;
  return n2 = L, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (L[e2] = t2), L[e2];
}
const N = ["invoke", "success", "fail", "complete"], D = R("_globalUniCloudInterceptor");
function M(e2, t2) {
  D[e2] || (D[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
    N.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s2 = D[e3][t3];
      s2 || (s2 = D[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
    }(e2, n2, t2[n2]);
  });
}
function q(e2, t2) {
  D[e2] || (D[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
    N.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s2 = D[e3][t3];
      if (!s2)
        return;
      const r2 = s2.indexOf(n3);
      r2 > -1 && s2.splice(r2, 1);
    }(e2, n2, t2[n2]);
  }) : delete D[e2];
}
function K(e2, t2) {
  return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function F(e2, t2) {
  return D[e2] && D[e2][t2] || [];
}
function j(e2) {
  M("callObject", e2);
}
const $ = R("_globalUniCloudListener"), B = "response", W = "needLogin", H = "refreshToken", J = "clientdb", z = "cloudfunction", V = "cloudobject";
function G(e2) {
  return $[e2] || ($[e2] = []), $[e2];
}
function Y(e2, t2) {
  const n2 = G(e2);
  n2.includes(t2) || n2.push(t2);
}
function Q(e2, t2) {
  const n2 = G(e2), s2 = n2.indexOf(t2);
  -1 !== s2 && n2.splice(s2, 1);
}
function X(e2, t2) {
  const n2 = G(e2);
  for (let e3 = 0; e3 < n2.length; e3++) {
    (0, n2[e3])(t2);
  }
}
let Z, ee = false;
function te() {
  return Z || (Z = new Promise((e2) => {
    ee && e2(), function t2() {
      if ("function" == typeof getCurrentPages) {
        const t3 = getCurrentPages();
        t3 && t3[0] && (ee = true, e2());
      }
      ee || setTimeout(() => {
        t2();
      }, 30);
    }();
  }), Z);
}
function ne(e2) {
  const t2 = {};
  for (const n2 in e2) {
    const s2 = e2[n2];
    m(s2) && (t2[n2] = y(s2));
  }
  return t2;
}
class se extends Error {
  constructor(e2) {
    super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
  }
  toJson(e2 = 0) {
    if (!(e2 >= 10))
      return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
  }
}
var re = { request: (e2) => index.request(e2), uploadFile: (e2) => index.uploadFile(e2), setStorageSync: (e2, t2) => index.setStorageSync(e2, t2), getStorageSync: (e2) => index.getStorageSync(e2), removeStorageSync: (e2) => index.removeStorageSync(e2), clearStorageSync: () => index.clearStorageSync(), connectSocket: (e2) => index.connectSocket(e2) };
function ie(e2) {
  return e2 && ie(e2.__v_raw) || e2;
}
function oe() {
  return { token: re.getStorageSync("uni_id_token") || re.getStorageSync("uniIdToken"), tokenExpired: re.getStorageSync("uni_id_token_expired") };
}
function ae({ token: e2, tokenExpired: t2 } = {}) {
  e2 && re.setStorageSync("uni_id_token", e2), t2 && re.setStorageSync("uni_id_token_expired", t2);
}
let ce, ue;
function he() {
  return ce || (ce = index.getSystemInfoSync()), ce;
}
function le() {
  let e2, t2;
  try {
    if (index.getLaunchOptionsSync) {
      if (index.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
        return;
      const { scene: n2, channel: s2 } = index.getLaunchOptionsSync();
      e2 = s2, t2 = n2;
    }
  } catch (e3) {
  }
  return { channel: e2, scene: t2 };
}
let de = {};
function pe() {
  const e2 = index.getLocale && index.getLocale() || "en";
  if (ue)
    return { ...de, ...ue, locale: e2, LOCALE: e2 };
  const t2 = he(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
  for (const e3 in t2)
    Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
  return ue = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...le(), ...t2 }, { ...de, ...ue, locale: e2, LOCALE: e2 };
}
var fe = { sign: function(e2, t2) {
  let n2 = "";
  return Object.keys(e2).sort().forEach(function(t3) {
    e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
  }), n2 = n2.slice(1), i(n2, t2).toString();
}, wrappedRequest: function(e2, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e2, { complete(e3) {
      e3 || (e3 = {});
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400) {
        const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
        return s2(new se({ code: n3, message: r3, requestId: t3 }));
      }
      const r2 = e3.data;
      if (r2.error)
        return s2(new se({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
}, toBase64: function(e2) {
  return a.stringify(o.parse(e2));
} };
var ge = class {
  constructor(e2) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = re, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
      if (!e3.result || !e3.result.accessToken)
        throw new se({ code: "AUTH_FAILED", message: "获取accessToken失败" });
      this.setAccessToken(e3.result.accessToken);
    }), retryRule: w });
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e2) {
    this.accessToken = e2;
  }
  requestWrapped(e2) {
    return fe.wrappedRequest(e2, this.adapter.request);
  }
  requestAuth(e2) {
    return this.requestWrapped(e2);
  }
  request(e2, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
      !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e2);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e2);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e2) {
    const t2 = Object.assign({}, e2);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = fe.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = fe.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    return this._getAccessTokenPromiseHub.exec();
  }
  async authorize() {
    await this.getAccessToken();
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request({ ...this.setupRequest(t2), timeout: e2.timeout });
  }
  getOSSUploadOptionsFromPath(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
    if ("string" !== f(t2))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const o2 = i2 && i2.envType || this.config.envType;
    if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
      throw new se({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
    const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
    if (u2 && (_2["x-oss-security-token"] = u2), y2) {
      const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
      _2.callback = fe.toBase64(e3);
    }
    const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
    if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
      return { success: true, filePath: e2, fileID: c2 };
    if ((await this.reportOSSUpload({ id: g2 })).success)
      return { success: true, filePath: e2, fileID: c2 };
    throw new se({ code: "UPLOAD_FAILED", message: "文件上传失败" });
  }
  getTempFileURL({ fileList: e2 } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e2) && 0 !== e2.length || n2(new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
  async getFileInfo({ fileList: e2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
    return { fileList: (await this.request(this.setupRequest(t2))).result };
  }
};
var me = { init(e2) {
  const t2 = new ge(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const ye = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var _e;
!function(e2) {
  e2.local = "local", e2.none = "none", e2.session = "session";
}(_e || (_e = {}));
var we = function() {
}, ve = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
    !function() {
      function t4(t5) {
        for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
          if (!(t5 % s4))
            return false;
        return true;
      }
      function n3(e4) {
        return 4294967296 * (e4 - (0 | e4)) | 0;
      }
      for (var s3 = 2, r3 = 0; r3 < 64; )
        t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
    }();
    var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
      this._hash = new r2.init(a2.slice(0));
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
        if (p2 < 16)
          u2[p2] = 0 | e4[t4 + p2];
        else {
          var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
          u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
        }
        var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
        d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
      }
      n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
  }(Math), n2.SHA256);
}), Ie = ve, Se = n(function(e2, t2) {
  e2.exports = r.HmacSHA256;
});
const be = () => {
  let e2;
  if (!Promise) {
    e2 = () => {
    }, e2.promise = {};
    const t3 = () => {
      throw new se({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
    };
    return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
  }
  const t2 = new Promise((t3, n2) => {
    e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
  });
  return e2.promise = t2, e2;
};
function ke(e2) {
  return void 0 === e2;
}
function Te(e2) {
  return "[object Null]" === Object.prototype.toString.call(e2);
}
function Ae(e2 = "") {
  return e2.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1");
}
function Pe(e2 = 32) {
  const t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n2 = t2.length;
  let s2 = "";
  for (let r2 = 0; r2 < e2; r2++)
    s2 += t2.charAt(Math.floor(Math.random() * n2));
  return s2;
}
var Ce;
function xe(e2) {
  const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
  var n2;
  for (const e3 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e2) {
  e2.WEB = "web", e2.WX_MP = "wx_mp";
}(Ce || (Ce = {}));
const Oe = { adapter: null, runtime: void 0 }, Ee = ["anonymousUuidKey"];
class Le extends we {
  constructor() {
    super(), Oe.adapter.root.tcbObject || (Oe.adapter.root.tcbObject = {});
  }
  setItem(e2, t2) {
    Oe.adapter.root.tcbObject[e2] = t2;
  }
  getItem(e2) {
    return Oe.adapter.root.tcbObject[e2];
  }
  removeItem(e2) {
    delete Oe.adapter.root.tcbObject[e2];
  }
  clear() {
    delete Oe.adapter.root.tcbObject;
  }
}
function Re(e2, t2) {
  switch (e2) {
    case "local":
      return t2.localStorage || new Le();
    case "none":
      return new Le();
    default:
      return t2.sessionStorage || new Le();
  }
}
class Ue {
  constructor(e2) {
    if (!this._storage) {
      this._persistence = Oe.adapter.primaryStorage || e2.persistence, this._storage = Re(this._persistence, Oe.adapter);
      const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = "device_id", a2 = `token_type_${e2.env}`, c2 = `user_info_${e2.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: c2, deviceIdKey: o2, tokenTypeKey: a2 };
    }
  }
  updatePersistence(e2) {
    if (e2 === this._persistence)
      return;
    const t2 = "local" === this._persistence;
    this._persistence = e2;
    const n2 = Re(e2, Oe.adapter);
    for (const e3 in this.keys) {
      const s2 = this.keys[e3];
      if (t2 && Ee.includes(e3))
        continue;
      const r2 = this._storage.getItem(s2);
      ke(r2) || Te(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e2, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e2, r2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e2, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e2);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e2) {
    this._storage.removeItem(e2);
  }
}
const Ne = {}, De = {};
function Me(e2) {
  return Ne[e2];
}
class qe {
  constructor(e2, t2) {
    this.data = t2 || null, this.name = e2;
  }
}
class Ke extends qe {
  constructor(e2, t2) {
    super("error", { error: e2, data: t2 }), this.error = e2;
  }
}
const Fe = new class {
  constructor() {
    this._listeners = {};
  }
  on(e2, t2) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e2, t2, this._listeners), this;
  }
  off(e2, t2) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s2 = n2[e3].indexOf(t3);
        -1 !== s2 && n2[e3].splice(s2, 1);
      }
    }(e2, t2, this._listeners), this;
  }
  fire(e2, t2) {
    if (e2 instanceof Ke)
      return console.error(e2.error), this;
    const n2 = "string" == typeof e2 ? new qe(e2, t2 || {}) : e2;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e2) {
    return this._listeners[e2] && this._listeners[e2].length > 0;
  }
}();
function je(e2, t2) {
  Fe.on(e2, t2);
}
function $e(e2, t2 = {}) {
  Fe.fire(e2, t2);
}
function Be(e2, t2) {
  Fe.off(e2, t2);
}
const We = "loginStateChanged", He = "loginStateExpire", Je = "loginTypeChanged", ze = "anonymousConverted", Ve = "refreshAccessToken";
var Ge;
!function(e2) {
  e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
}(Ge || (Ge = {}));
class Ye {
  constructor() {
    this._fnPromiseMap = /* @__PURE__ */ new Map();
  }
  async run(e2, t2) {
    let n2 = this._fnPromiseMap.get(e2);
    return n2 || (n2 = new Promise(async (n3, s2) => {
      try {
        await this._runIdlePromise();
        const s3 = t2();
        n3(await s3);
      } catch (e3) {
        s2(e3);
      } finally {
        this._fnPromiseMap.delete(e2);
      }
    }), this._fnPromiseMap.set(e2, n2)), n2;
  }
  _runIdlePromise() {
    return Promise.resolve();
  }
}
class Qe {
  constructor(e2) {
    this._singlePromise = new Ye(), this._cache = Me(e2.env), this._baseURL = `https://${e2.env}.ap-shanghai.tcb-api.tencentcloudapi.com`, this._reqClass = new Oe.adapter.reqClass({ timeout: e2.timeout, timeoutMsg: `请求在${e2.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] });
  }
  _getDeviceId() {
    if (this._deviceID)
      return this._deviceID;
    const { deviceIdKey: e2 } = this._cache.keys;
    let t2 = this._cache.getStore(e2);
    return "string" == typeof t2 && t2.length >= 16 && t2.length <= 48 || (t2 = Pe(), this._cache.setStore(e2, t2)), this._deviceID = t2, t2;
  }
  async _request(e2, t2, n2 = {}) {
    const s2 = { "x-request-id": Pe(), "x-device-id": this._getDeviceId() };
    if (n2.withAccessToken) {
      const { tokenTypeKey: e3 } = this._cache.keys, t3 = await this.getAccessToken(), n3 = this._cache.getStore(e3);
      s2.authorization = `${n3} ${t3}`;
    }
    return this._reqClass["get" === n2.method ? "get" : "post"]({ url: `${this._baseURL}${e2}`, data: t2, headers: s2 });
  }
  async _fetchAccessToken() {
    const { loginTypeKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2, tokenTypeKey: s2 } = this._cache.keys, r2 = this._cache.getStore(e2);
    if (r2 && r2 !== Ge.ANONYMOUS)
      throw new se({ code: "INVALID_OPERATION", message: "非匿名登录不支持刷新 access token" });
    const i2 = await this._singlePromise.run("fetchAccessToken", async () => (await this._request("/auth/v1/signin/anonymously", {}, { method: "post" })).data), { access_token: o2, expires_in: a2, token_type: c2 } = i2;
    return this._cache.setStore(s2, c2), this._cache.setStore(t2, o2), this._cache.setStore(n2, Date.now() + 1e3 * a2), o2;
  }
  isAccessTokenExpired(e2, t2) {
    let n2 = true;
    return e2 && t2 && (n2 = t2 < Date.now()), n2;
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
    return this.isAccessTokenExpired(n2, s2) ? this._fetchAccessToken() : n2;
  }
  async refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, loginTypeKey: n2 } = this._cache.keys;
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.setStore(n2, Ge.ANONYMOUS), this.getAccessToken();
  }
  async getUserInfo() {
    return this._singlePromise.run("getUserInfo", async () => (await this._request("/auth/v1/user/me", {}, { withAccessToken: true, method: "get" })).data);
  }
}
const Xe = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Ze = { "X-SDK-Version": "1.3.5" };
function et(e2, t2, n2) {
  const s2 = e2[t2];
  e2[t2] = function(t3) {
    const r2 = {}, i2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: o3 } = n3.call(e2, t3);
      Object.assign(r2, s3), Object.assign(i2, o3);
    });
    const o2 = t3.data;
    return o2 && (() => {
      var e3;
      if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
        t3.data = { ...o2, ...r2 };
      else
        for (const e4 in r2)
          o2.append(e4, r2[e4]);
    })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
  };
}
function tt$1() {
  const e2 = Math.random().toString(16).slice(2);
  return { data: { seqId: e2 }, headers: { ...Ze, "x-seqid": e2 } };
}
class nt {
  constructor(e2 = {}) {
    var t2;
    this.config = e2, this._reqClass = new Oe.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Me(this.config.env), this._localCache = (t2 = this.config.env, De[t2]), this.oauth = new Qe(this.config), et(this._reqClass, "post", [tt$1]), et(this._reqClass, "upload", [tt$1]), et(this._reqClass, "download", [tt$1]);
  }
  async post(e2) {
    return await this._reqClass.post(e2);
  }
  async upload(e2) {
    return await this._reqClass.upload(e2);
  }
  async download(e2) {
    return await this._reqClass.download(e2);
  }
  async refreshAccessToken() {
    let e2, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e2 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t2 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e2;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e2), this._cache.removeStore(t2);
    let i2 = this._cache.getStore(n2);
    if (!i2)
      throw new se({ message: "未登录CloudBase" });
    const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
    if (a2.data.code) {
      const { code: e3 } = a2.data;
      if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
        if (this._cache.getStore(s2) === Ge.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
          const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        $e(He), this._cache.removeStore(n2);
      }
      throw new se({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
    }
    if (a2.data.access_token)
      return $e(Ve), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new se({ message: "refresh token不存在，登录状态异常" });
    let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
  }
  async request(e2, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
    let o2;
    if (-1 === Xe.indexOf(e2) && (this._cache.keys, i2.access_token = await this.oauth.getAccessToken()), "storage.uploadFile" === e2) {
      o2 = new FormData();
      for (let e3 in o2)
        o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", o2 = {};
      for (let e3 in i2)
        void 0 !== i2[e3] && (o2[e3] = i2[e3]);
    }
    let a2 = { headers: { "content-type": r2 } };
    n2 && n2.timeout && (a2.timeout = n2.timeout), n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: h2, search: l2 } = t2;
    let d2 = { env: this.config.env };
    u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
    let p2 = function(e3, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let r3 = "";
      for (let e4 in n3)
        "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
    }(ye, "//tcb-api.tencentcloudapi.com/web", d2);
    l2 && (p2 += l2);
    const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
    if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
      throw new se({ code: "NETWORK_ERROR", message: "network request error" });
    return f2;
  }
  async send(e2, t2 = {}, n2 = {}) {
    const s2 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
    if (("ACCESS_TOKEN_DISABLED" === s2.data.code || "ACCESS_TOKEN_EXPIRED" === s2.data.code) && -1 === Xe.indexOf(e2)) {
      await this.oauth.refreshAccessToken();
      const s3 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
      if (s3.data.code)
        throw new se({ code: s3.data.code, message: Ae(s3.data.message) });
      return s3.data;
    }
    if (s2.data.code)
      throw new se({ code: s2.data.code, message: Ae(s2.data.message) });
    return s2.data;
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
}
const st = {};
function rt(e2) {
  return st[e2];
}
class it {
  constructor(e2) {
    this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env);
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
  setAccessToken(e2, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2);
  }
}
class ot {
  constructor(e2) {
    if (!e2)
      throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._envId = e2, this._cache = Me(this._envId), this._request = rt(this._envId), this.setUserInfo();
  }
  linkWithTicket(e2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "ticket must be string" });
    return this._request.send("auth.linkWithTicket", { ticket: e2 });
  }
  linkWithRedirect(e2) {
    e2.signInWithRedirect();
  }
  updatePassword(e2, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
  }
  updateEmail(e2) {
    return this._request.send("auth.updateEmail", { newEmail: e2 });
  }
  updateUsername(e2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
    return this._request.send("auth.updateUsername", { username: e2 });
  }
  async getLinkedUidList() {
    const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e2;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e2) {
    return this._request.send("auth.setPrimaryUid", { uid: e2 });
  }
  unlink(e2) {
    return this._request.send("auth.unlink", { platform: e2 });
  }
  async update(e2) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const e2 = await this._request.oauth.getUserInfo();
    return this.setLocalUserInfo(e2), e2;
  }
  setUserInfo() {
    const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t2[e3];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2), this.setUserInfo();
  }
}
class at {
  constructor(e2) {
    if (!e2)
      throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._cache = Me(e2);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
    this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new ot(e2);
  }
  get isAnonymousAuth() {
    return this.loginType === Ge.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === Ge.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === Ge.WECHAT || this.loginType === Ge.WECHAT_OPEN || this.loginType === Ge.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class ct extends it {
  async signIn() {
    this._cache.updatePersistence("local"), await this._request.oauth.getAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.ANONYMOUS, persistence: "local" });
    const e2 = new at(this.config.env);
    return await e2.user.refresh(), e2;
  }
  async linkAndRetrieveDataWithTicket(e2) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
    if (i2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), $e(ze, { env: this.config.env }), $e(Je, { loginType: Ge.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
    throw new se({ message: "匿名转化失败" });
  }
  _setAnonymousUUID(e2) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, Ge.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class ut extends it {
  async signIn(e2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "ticket must be a string" });
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new at(this.config.env);
    throw new se({ message: "自定义登录失败" });
  }
}
class ht extends it {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "email must be a string" });
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.EMAIL, persistence: this.config.persistence }), new at(this.config.env);
    throw s2.code ? new se({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new se({ message: "邮箱登录失败" });
  }
  async activate(e2) {
    return this._request.send("auth.activateEndUserMail", { token: e2 });
  }
  async resetPasswordWithToken(e2, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
  }
}
class lt extends it {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
    "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: Ge.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.USERNAME, persistence: this.config.persistence }), new at(this.config.env);
    throw s2.code ? new se({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new se({ message: "用户名密码登录失败" });
  }
}
class dt {
  constructor(e2) {
    this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), je(Je, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e2 = this.hasLoginState();
    return e2 && e2.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new ct(this.config);
  }
  customAuthProvider() {
    return new ut(this.config);
  }
  emailAuthProvider() {
    return new ht(this.config);
  }
  usernameAuthProvider() {
    return new lt(this.config);
  }
  async signInAnonymously() {
    return new ct(this.config).signIn();
  }
  async signInWithEmailAndPassword(e2, t2) {
    return new ht(this.config).signIn(e2, t2);
  }
  signInWithUsernameAndPassword(e2, t2) {
    return new lt(this.config).signIn(e2, t2);
  }
  async linkAndRetrieveDataWithTicket(e2) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new ct(this.config)), je(ze, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
  }
  async signOut() {
    if (this.loginType === Ge.ANONYMOUS)
      throw new se({ message: "匿名用户不支持登出操作" });
    const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
    if (!s2)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), $e(We), $e(Je, { env: this.config.env, loginType: Ge.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e2, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
  }
  async sendPasswordResetEmail(e2) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
  }
  onLoginStateChanged(e2) {
    je(We, () => {
      const t3 = this.hasLoginState();
      e2.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e2.call(this, t2);
  }
  onLoginStateExpired(e2) {
    je(He, e2.bind(this));
  }
  onAccessTokenRefreshed(e2) {
    je(Ve, e2.bind(this));
  }
  onAnonymousConverted(e2) {
    je(ze, e2.bind(this));
  }
  onLoginTypeChanged(e2) {
    je(Je, () => {
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
    return this._request.oauth.isAccessTokenExpired(n2, s2) ? null : new at(this.config.env);
  }
  async isUsernameRegistered(e2) {
    if ("string" != typeof e2)
      throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e2) {
    return new ut(this.config).signIn(e2);
  }
  shouldRefreshAccessToken(e2) {
    this._request._shouldRefreshAccessTokenHook = e2.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
  }
  getAuthHeader() {
    const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e2) {
    const { env: t2 } = e2.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e2) {
    const { loginType: t2, persistence: n2, env: s2 } = e2.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const pt = function(e2, t2) {
  t2 = t2 || be();
  const n2 = rt(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
      201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new se({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
    }).catch((e4) => {
      t2(e4);
    });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ft = function(e2, t2) {
  t2 = t2 || be();
  const n2 = rt(this.config.env), { cloudPath: s2 } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    t2(null, e3);
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, gt = function({ fileList: e2 }, t2) {
  if (t2 = t2 || be(), !e2 || !Array.isArray(e2))
    return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
  for (let t3 of e2)
    if (!t3 || "string" != typeof t3)
      return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
  const n2 = { fileid_list: e2 };
  return rt(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, mt = function({ fileList: e2 }, t2) {
  t2 = t2 || be(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
  let n2 = [];
  for (let s3 of e2)
    "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
  const s2 = { file_list: n2 };
  return rt(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, yt = async function({ fileID: e2 }, t2) {
  const n2 = (await mt.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
  if ("SUCCESS" !== n2.code)
    return t2 ? t2(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s2 = rt(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t2)
    return s2.download({ url: r2 });
  t2(await s2.download({ url: r2 }));
}, _t = function({ name: e2, data: t2, query: n2, parse: s2, search: r2, timeout: i2 }, o2) {
  const a2 = o2 || be();
  let c2;
  try {
    c2 = t2 ? JSON.stringify(t2) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e2)
    return Promise.reject(new se({ code: "PARAM_ERROR", message: "函数名不能为空" }));
  const u2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: c2 };
  return rt(this.config.env).send("functions.invokeFunction", u2, { timeout: i2 }).then((e3) => {
    if (e3.code)
      a2(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s2)
        a2(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), a2(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          a2(new se({ message: "response data must be json" }));
        }
    }
    return a2.promise;
  }).catch((e3) => {
    a2(e3);
  }), a2.promise;
}, wt = { timeout: 15e3, persistence: "session" }, vt = {};
class It {
  constructor(e2) {
    this.config = e2 || this.config, this.authObj = void 0;
  }
  init(e2) {
    switch (Oe.adapter || (this.requestClient = new Oe.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...wt, ...e2 }, true) {
      case this.config.timeout > 6e5:
        console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
        break;
      case this.config.timeout < 100:
        console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
    }
    return new It(this.config);
  }
  auth({ persistence: e2 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e2 || Oe.adapter.primaryStorage || wt.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
      const { env: t3 } = e3;
      Ne[t3] = new Ue(e3), De[t3] = new Ue({ ...e3, persistence: "local" });
    }(this.config), n2 = this.config, st[n2.env] = new nt(n2), this.authObj = new dt(this.config), this.authObj;
  }
  on(e2, t2) {
    return je.apply(this, [e2, t2]);
  }
  off(e2, t2) {
    return Be.apply(this, [e2, t2]);
  }
  callFunction(e2, t2) {
    return _t.apply(this, [e2, t2]);
  }
  deleteFile(e2, t2) {
    return gt.apply(this, [e2, t2]);
  }
  getTempFileURL(e2, t2) {
    return mt.apply(this, [e2, t2]);
  }
  downloadFile(e2, t2) {
    return yt.apply(this, [e2, t2]);
  }
  uploadFile(e2, t2) {
    return pt.apply(this, [e2, t2]);
  }
  getUploadMetadata(e2, t2) {
    return ft.apply(this, [e2, t2]);
  }
  registerExtension(e2) {
    vt[e2.name] = e2;
  }
  async invokeExtension(e2, t2) {
    const n2 = vt[e2];
    if (!n2)
      throw new se({ message: `扩展${e2} 必须先注册` });
    return await n2.invoke(t2, this);
  }
  useAdapters(e2) {
    const { adapter: t2, runtime: n2 } = xe(e2) || {};
    t2 && (Oe.adapter = t2), n2 && (Oe.runtime = n2);
  }
}
var St = new It();
function bt(e2, t2, n2) {
  void 0 === n2 && (n2 = {});
  var s2 = /\?/.test(t2), r2 = "";
  for (var i2 in n2)
    "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
  return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
}
class kt {
  get(e2) {
    const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
    return new Promise((e3, i2) => {
      re.request({ url: bt("https:", t2), data: n2, method: "GET", header: s2, timeout: r2, success(t3) {
        e3(t3);
      }, fail(e4) {
        i2(e4);
      } });
    });
  }
  post(e2) {
    const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
    return new Promise((e3, i2) => {
      re.request({ url: bt("https:", t2), data: n2, method: "POST", header: s2, timeout: r2, success(t3) {
        e3(t3);
      }, fail(e4) {
        i2(e4);
      } });
    });
  }
  upload(e2) {
    return new Promise((t2, n2) => {
      const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = re.uploadFile({ url: bt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
      }, fail(e3) {
        n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
        e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const Tt = { setItem(e2, t2) {
  re.setStorageSync(e2, t2);
}, getItem: (e2) => re.getStorageSync(e2), removeItem(e2) {
  re.removeStorageSync(e2);
}, clear() {
  re.clearStorageSync();
} };
var At = { genAdapter: function() {
  return { root: {}, reqClass: kt, localStorage: Tt, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
St.useAdapters(At);
const Pt = St, Ct = Pt.init;
Pt.init = function(e2) {
  e2.env = e2.spaceId;
  const t2 = Ct.call(this, e2);
  t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      var n3;
      t3[e4] = (n3 = t3[e4], function(e5) {
        e5 = e5 || {};
        const { success: t4, fail: s2, complete: r2 } = ne(e5);
        if (!(t4 || s2 || r2))
          return n3.call(this, e5);
        n3.call(this, e5).then((e6) => {
          t4 && t4(e6), r2 && r2(e6);
        }, (e6) => {
          s2 && s2(e6), r2 && r2(e6);
        });
      }).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var xt = Pt;
async function Ot(e2, t2) {
  const n2 = `http://${e2}:${t2}/system/ping`;
  try {
    const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      re.request({ ...s2, success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } });
    }));
    return !(!e3.data || 0 !== e3.data.code);
  } catch (e3) {
    return false;
  }
  var s2;
}
async function Et(e2, t2) {
  let n2;
  for (let s2 = 0; s2 < e2.length; s2++) {
    const r2 = e2[s2];
    if (await Ot(r2, t2)) {
      n2 = r2;
      break;
    }
  }
  return { address: n2, port: t2 };
}
const Lt = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
var Rt = class {
  constructor(e2) {
    if (["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), !e2.endpoint)
      throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
    this.config = Object.assign({}, e2), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = re;
  }
  async request(e2, t2 = true) {
    const n2 = t2;
    return e2 = n2 ? await this.setupLocalRequest(e2) : this.setupRequest(e2), Promise.resolve().then(() => n2 ? this.requestLocal(e2) : fe.wrappedRequest(e2, this.adapter.request));
  }
  requestLocal(e2) {
    return new Promise((t2, n2) => {
      this.adapter.request(Object.assign(e2, { complete(e3) {
        if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
          const t3 = e3.data && e3.data.code || "SYS_ERR", s2 = e3.data && e3.data.message || "request:fail";
          return n2(new se({ code: t3, message: s2 }));
        }
        t2({ success: true, result: e3.data });
      } }));
    });
  }
  setupRequest(e2) {
    const t2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
    n2["x-serverless-sign"] = fe.sign(t2, this.config.clientSecret);
    const s2 = pe();
    n2["x-client-info"] = encodeURIComponent(JSON.stringify(s2));
    const { token: r2 } = oe();
    return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t2, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
  }
  async setupLocalRequest(e2) {
    const t2 = pe(), { token: n2 } = oe(), s2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t2, token: n2 }), { address: r2, servePort: i2 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await Et(r2, i2);
    return { url: `http://${o2}:${i2}/${Lt[e2.method]}`, method: "POST", data: s2, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request(t2, false);
  }
  getUploadFileOptions(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(t2);
  }
  reportUploadFile(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(t2);
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new se({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
    let r2;
    return this.getUploadFileOptions({ cloudPath: t2 }).then((t3) => {
      const { url: i2, formData: o2, name: a2 } = t3.result;
      return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
        const c2 = this.adapter.uploadFile({ url: i2, formData: o2, name: a2, filePath: e2, fileType: n2, success(e3) {
          e3 && e3.statusCode < 400 ? t4(e3) : r3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          r3(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof s2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          s2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }).then(() => this.reportUploadFile({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
    return this.request(t2).then((e3) => {
      if (e3.success)
        return e3.result;
      throw new se({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
    });
  }
  getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
    return this.request(n2).then((e3) => {
      if (e3.success)
        return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
      throw new se({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
    });
  }
};
var Ut = { init(e2) {
  const t2 = new Rt(e2), n2 = { signInAnonymously: function() {
    return Promise.resolve();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} }, Nt = n(function(e2, t2) {
  e2.exports = r.enc.Hex;
});
function Dt() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
    var t2 = 16 * Math.random() | 0;
    return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
  });
}
function Mt(e2 = "", t2 = {}) {
  const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = String(Date.now()), u2 = Dt(), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
    const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = Ie(e3.body).toString(Nt), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = Ie(r3).toString(Nt), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = Se(o3, e3.secretKey).toString(Nt);
    return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
  }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
  return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
}
function qt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {}, timeout: r2 }) {
  return new Promise((i2, o2) => {
    re.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", timeout: r2, complete: (e3 = {}) => {
      const t3 = s2["x-trace-id"] || "";
      if (!e3.statusCode || e3.statusCode >= 400) {
        const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
        return o2(new se({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
      }
      i2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
    } });
  });
}
function Kt(e2, t2) {
  const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Mt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
  return qt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
    const t3 = e3.data || {};
    if (!t3.success)
      throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    return t3.data || {};
  }).catch((e3) => {
    throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
  });
}
function Ft(e2 = "") {
  const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
  if (n2 <= 0)
    throw new se({ code: "INVALID_PARAM", message: "fileID不合法" });
  const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
  return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
}
function jt(e2 = "") {
  return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
}
class $t {
  constructor(e2) {
    this.config = e2;
  }
  signedURL(e2, t2 = {}) {
    const n2 = `/ws/function/${e2}`, s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Dt(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
      return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
    }).filter(Boolean).join("&"), `host:${s2}`].join("\n"), o2 = ["HMAC-SHA256", Ie(i2).toString(Nt)].join("\n"), a2 = Se(o2, this.config.secretKey).toString(Nt), c2 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
    return `${this.config.wsEndpoint}${n2}?${c2}&signature=${a2}`;
  }
}
var Bt = class {
  constructor(e2) {
    if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), e2.endpoint) {
      if ("string" != typeof e2.endpoint)
        throw new Error("endpoint must be string");
      if (!/^https:\/\//.test(e2.endpoint))
        throw new Error("endpoint must start with https://");
      e2.endpoint = e2.endpoint.replace(/\/$/, "");
    }
    this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e2.wsEndpoint || `wss://${e2.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new $t(this.config);
  }
  callFunction(e2) {
    return function(e3, t2) {
      const { name: n2, data: s2, async: r2 = false, timeout: i2 } = e3, o2 = "POST", a2 = { "x-to-function-name": n2 };
      r2 && (a2["x-function-invoke-type"] = "async");
      const { url: c2, headers: u2 } = Mt("/functions/invokeFunction", { functionName: n2, data: s2, method: o2, headers: a2, signHeaderKeys: ["x-to-function-name"], config: t2 });
      return qt({ url: c2, data: s2, method: o2, headers: u2, timeout: i2 }).then((e4) => {
        let t3 = 0;
        if (r2) {
          const n3 = e4.data || {};
          t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
        }
        if (0 !== t3)
          throw new se({ code: t3, message: e4.errMsg, requestId: e4.requestId });
        return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
      }).catch((e4) => {
        throw new se({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
      });
    }(e2, this.config);
  }
  uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
    return new Promise((i2, o2) => {
      const a2 = re.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : o2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        o2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
        r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
    if ("string" !== f(t2))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const r2 = await Kt({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
    return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
  }
  async getTempFileURL({ fileList: e2 }) {
    return new Promise((t2, n2) => {
      (!e2 || e2.length < 0) && t2({ code: "INVALID_PARAM", message: "fileList不能为空数组" }), e2.length > 50 && t2({ code: "INVALID_PARAM", message: "fileList数组长度不能超过50" });
      const s2 = [];
      for (const n3 of e2) {
        let e3;
        "string" !== f(n3) && t2({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
        try {
          e3 = Ft.call(this, n3);
        } catch (t3) {
          console.warn(t3.errCode, t3.errMsg), e3 = n3;
        }
        s2.push({ file_id: e3, expire: 600 });
      }
      Kt({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
        const { file_list: n3 = [] } = e3;
        t2({ fileList: n3.map((e4) => ({ fileID: jt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
      }).catch((e3) => n2(e3));
    });
  }
  async connectWebSocket(e2) {
    const { name: t2, query: n2 } = e2;
    return re.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
    } });
  }
};
var Wt = { init: (e2) => {
  e2.provider = "alipay";
  const t2 = new Bt(e2);
  return t2.auth = function() {
    return { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(true);
    } };
  }, t2;
} };
function Ht({ data: e2 }) {
  let t2;
  t2 = pe();
  const n2 = JSON.parse(JSON.stringify(e2 || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e3 } = oe();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
async function Jt(e2 = {}) {
  await this.__dev__.initLocalNetwork();
  const { localAddress: t2, localPort: n2 } = this.__dev__, s2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${t2}:${n2}/system/check-function`, o2 = `http://${t2}:${n2}/cloudfunctions/${e2.name}`;
  return new Promise((t3, n3) => {
    re.request({ method: "POST", url: i2, data: { name: e2.name, platform: A, provider: s2, spaceId: r2 }, timeout: 3e3, success(e3) {
      t3(e3);
    }, fail() {
      t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
    } });
  }).then(({ data: e3 } = {}) => {
    const { code: t3, message: n3 } = e3 || {};
    return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
  }).then(({ code: t3, message: n3 }) => {
    if (0 !== t3) {
      switch (t3) {
        case "MODULE_ENCRYPTED":
          console.error(`此云函数（${e2.name}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "FUNCTION_ENCRYPTED":
          console.error(`此云函数（${e2.name}）已加密不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "ACTION_ENCRYPTED":
          console.error(n3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
          break;
        case "NETWORK_ERROR":
          console.error(n3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
          break;
        case "SWITCH_TO_CLOUD":
          break;
        default: {
          const e3 = `检测本地调试服务出现错误：${n3}，请检查网络环境或重启客户端再试`;
          throw console.error(e3), new Error(e3);
        }
      }
      return this._callCloudFunction(e2);
    }
    return new Promise((t4, n4) => {
      const r3 = Ht.call(this, { data: e2.data });
      re.request({ method: "POST", url: o2, data: { provider: s2, platform: A, param: r3 }, timeout: e2.timeout, success: ({ statusCode: e3, data: s3 } = {}) => !e3 || e3 >= 400 ? n4(new se({ code: s3.code || "SYS_ERR", message: s3.message || "request:fail" })) : t4({ result: s3 }), fail(e3) {
        n4(new se({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
      } });
    });
  });
}
const zt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
var Vt = /[\\^$.*+?()[\]{}|]/g, Gt = RegExp(Vt.source);
function Yt(e2, t2, n2) {
  return e2.replace(new RegExp((s2 = t2) && Gt.test(s2) ? s2.replace(Vt, "\\$&") : s2, "g"), n2);
  var s2;
}
const Xt = "request", Zt = "response", en = "both";
const Mn = { code: 2e4, message: "System error" }, qn = { code: 20101, message: "Invalid client" };
function jn(e2) {
  const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
  return new se({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || Mn.code, message: r2 || o2, cause: a2 });
}
let Bn;
function Vn({ secretType: e2 } = {}) {
  return e2 === Xt || e2 === Zt || e2 === en;
}
function Gn({ name: e2, data: t2 = {} } = {}) {
  return "app" === A;
}
function Yn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
  const { appId: s2, uniPlatform: r2, osName: i2 } = he();
  let o2 = r2;
  "app" === r2 && (o2 = i2);
  const a2 = function({ provider: e3, spaceId: t3 } = {}) {
    const n3 = T;
    if (!n3)
      return {};
    e3 = /* @__PURE__ */ function(e4) {
      return "tencent" === e4 ? "tcb" : e4;
    }(e3);
    const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
    return s3 && s3.config;
  }({ provider: e2, spaceId: t2 });
  if (!a2 || !a2.accessControl || !a2.accessControl.enable)
    return false;
  const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
  if (0 === u2.length)
    return true;
  const h2 = function(e3, t3) {
    let n3, s3, r3;
    for (let i3 = 0; i3 < e3.length; i3++) {
      const o3 = e3[i3];
      o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
    }
    return n3 || s3 || r3;
  }(u2, n2);
  if (!h2)
    return false;
  if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
    return true;
  throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), jn(qn);
}
function Qn({ functionName: e2, result: t2, logPvd: n2 }) {
  if (this.__dev__.debugLog && t2 && t2.requestId) {
    const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
    console.log(`[${n2}-request]${s2}[/${n2}-request]`);
  }
}
function Xn(e2) {
  const t2 = e2.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = Ht.call(e2, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i2 = Vn(n3), o2 = Gn(n3), a2 = i2 || o2;
    return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
        if (!a3)
          continue;
        let c2 = i3;
        for (let e5 = 1; e5 < a3.length; e5++)
          c2 = Yt(c2, `{$${e5}}`, a3[e5]);
        for (const e5 in t3)
          c2 = Yt(c2, `{${e5}}`, t3[e5]);
        return "replace" === o3 ? c2 : e4 + c2;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: zt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
  };
  e2.callFunction = function(t3) {
    const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
    let o2, a2;
    if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && C ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Jt), o2 = Jt) : o2 = n2, o2 = o2.bind(e2), Gn(t3))
      ;
    else if (function({ name: e3, data: t4 = {} }) {
      return "uni-id-co" === e3 && "secureNetworkHandshakeByWeixin" === t4.method;
    }(t3))
      a2 = o2.call(e2, t3);
    else if (Vn(t3)) {
      a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
    } else if (Yn({ provider: s2, spaceId: r2, functionName: i2 })) {
      a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
    } else
      a2 = o2(t3);
    return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && "undefined" != typeof UTS && (e3.result = UTS.JSON.parse(JSON.stringify(e3.result))), e3));
  };
}
Bn = class {
  constructor() {
    throw jn({ message: `Platform ${A} is not enabled, please check whether secure network module is enabled in your manifest.json` });
  }
};
const Zn = Symbol("CLIENT_DB_INTERNAL");
function es(e2, t2) {
  return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Zn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
    if ("_uniClient" === n2)
      return null;
    if ("symbol" == typeof n2)
      return e3[n2];
    if (n2 in e3 || "string" != typeof n2) {
      const t3 = e3[n2];
      return "function" == typeof t3 ? t3.bind(e3) : t3;
    }
    return t2.get(e3, n2, s2);
  } });
}
function ts(e2) {
  return { on: (t2, n2) => {
    e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
  }, off: (t2, n2) => {
    e2[t2] = e2[t2] || [];
    const s2 = e2[t2].indexOf(n2);
    -1 !== s2 && e2[t2].splice(s2, 1);
  } };
}
const ns = ["db.Geo", "db.command", "command.aggregate"];
function ss(e2, t2) {
  return ns.indexOf(`${e2}.${t2}`) > -1;
}
function rs(e2) {
  switch (f(e2 = ie(e2))) {
    case "array":
      return e2.map((e3) => rs(e3));
    case "object":
      return e2._internalType === Zn || Object.keys(e2).forEach((t2) => {
        e2[t2] = rs(e2[t2]);
      }), e2;
    case "regexp":
      return { $regexp: { source: e2.source, flags: e2.flags } };
    case "date":
      return { $date: e2.toISOString() };
    default:
      return e2;
  }
}
function is(e2) {
  return e2 && e2.content && e2.content.$method;
}
class os {
  constructor(e2, t2, n2) {
    this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e2 = this;
    const t2 = [e2.content];
    for (; e2.prevStage; )
      e2 = e2.prevStage, t2.push(e2.content);
    return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: rs(e3.$param) })) };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  getAction() {
    const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
    return e2 && e2.$param && e2.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
  }
  get isAggregate() {
    let e2 = this;
    for (; e2; ) {
      const t2 = is(e2), n2 = is(e2.prevStage);
      if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isCommand() {
    let e2 = this;
    for (; e2; ) {
      if ("command" === is(e2))
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isAggregateCommand() {
    let e2 = this;
    for (; e2; ) {
      const t2 = is(e2), n2 = is(e2.prevStage);
      if ("aggregate" === t2 && "command" === n2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  getNextStageFn(e2) {
    const t2 = this;
    return function() {
      return as({ $method: e2, $param: rs(Array.from(arguments)) }, t2, t2._database);
    };
  }
  get count() {
    return this.isAggregate ? this.getNextStageFn("count") : function() {
      return this._send("count", Array.from(arguments));
    };
  }
  get remove() {
    return this.isCommand ? this.getNextStageFn("remove") : function() {
      return this._send("remove", Array.from(arguments));
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  get add() {
    return this.isCommand ? this.getNextStageFn("add") : function() {
      return this._send("add", Array.from(arguments));
    };
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  get set() {
    return this.isCommand ? this.getNextStageFn("set") : function() {
      throw new Error("JQL禁止使用set方法");
    };
  }
  _send(e2, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e2, $param: rs(t2) }), S) {
      const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
      t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
    }
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function as(e2, t2, n2) {
  return es(new os(e2, t2, n2), { get(e3, t3) {
    let s2 = "db";
    return e3 && e3.content && (s2 = e3.content.$method), ss(s2, t3) ? as({ $method: t3 }, e3, n2) : function() {
      return as({ $method: t3, $param: rs(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function cs({ path: e2, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
  };
}
function us(e2, t2 = {}) {
  return es(new e2(t2), { get: (e3, t3) => ss("db", t3) ? as({ $method: t3 }, null, e3) : function() {
    return as({ $method: t3, $param: rs(Array.from(arguments)) }, null, e3);
  } });
}
class hs extends class {
  constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
    this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = R("_globalUniCloudDatabaseCallback")), t2 || (this.auth = ts(this._authCallBacks)), this._isJQL = t2, Object.assign(this, ts(this._dbCallBacks)), this.env = es({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = es({}, { get: (e3, t3) => cs({ path: ["Geo"], method: t3 }) }), this.serverDate = cs({ path: [], method: "serverDate" }), this.RegExp = cs({ path: [], method: "RegExp" });
  }
  getCloudEnv(e2) {
    if ("string" != typeof e2 || !e2.trim())
      throw new Error("getCloudEnv参数错误");
    return { $env: e2.replace("$cloudEnv_", "") };
  }
  _callback(e2, t2) {
    const n2 = this._dbCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  _callbackAuth(e2, t2) {
    const n2 = this._authCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  multiSend() {
    const e2 = Array.from(arguments), t2 = e2.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
        throw new Error("multiSend只支持子命令内使用getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
  }
} {
  _parseResult(e2) {
    return this._isJQL ? e2.result : e2;
  }
  _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
    function r2(e3, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const r3 = s2[n3];
          r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
    function a2(e3) {
      return i2._callback("error", [e3]), K(F(o2, "fail"), e3).then(() => K(F(o2, "complete"), e3)).then(() => (r2(null, e3), X(B, { type: J, content: e3 }), Promise.reject(e3)));
    }
    const c2 = K(F(o2, "invoke")), u2 = this._uniClient;
    return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
      if (u3)
        for (let e4 = 0; e4 < u3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console[t4] || console.log;
          let i3 = "[System Info]" + n4;
          s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
        }
      if (t3) {
        return a2(new se({ code: t3, message: n3, requestId: e3.requestId }));
      }
      e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ae({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), X(H, { token: s3, tokenExpired: c3 }));
      const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
      for (let t4 = 0; t4 < h2.length; t4++) {
        const { prop: n4, tips: s4 } = h2[t4];
        if (n4 in e3.result) {
          const t5 = e3.result[n4];
          Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
        }
      }
      return function(e4) {
        return K(F(o2, "success"), e4).then(() => K(F(o2, "complete"), e4)).then(() => {
          r2(e4, null);
          const t4 = i2._parseResult(e4);
          return X(B, { type: J, content: t4 }), Promise.resolve(t4);
        });
      }(e3);
    }, (e3) => {
      /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
      return a2(new se({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
    });
  }
}
const ls = "token无效，跳转登录页面", ds = "token过期，跳转登录页面", ps = { TOKEN_INVALID_TOKEN_EXPIRED: ds, TOKEN_INVALID_INVALID_CLIENTID: ls, TOKEN_INVALID: ls, TOKEN_INVALID_WRONG_TOKEN: ls, TOKEN_INVALID_ANONYMOUS_USER: ls }, fs = { "uni-id-token-expired": ds, "uni-id-check-token-failed": ls, "uni-id-token-not-exist": ls, "uni-id-check-device-feature-failed": ls };
function gs(e2, t2) {
  let n2 = "";
  return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
}
function ms(e2 = [], t2 = "") {
  const n2 = [], s2 = [];
  return e2.forEach((e3) => {
    true === e3.needLogin ? n2.push(gs(t2, e3.path)) : false === e3.needLogin && s2.push(gs(t2, e3.path));
  }), { needLoginPage: n2, notNeedLoginPage: s2 };
}
function ys(e2) {
  return e2.split("?")[0].replace(/^\//, "");
}
function _s() {
  return function(e2) {
    let t2 = e2 && e2.$page && e2.$page.fullPath || "";
    return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
  }(function() {
    const e2 = getCurrentPages();
    return e2[e2.length - 1];
  }());
}
function ws() {
  return ys(_s());
}
function vs(e2 = "", t2 = {}) {
  if (!e2)
    return false;
  if (!(t2 && t2.list && t2.list.length))
    return false;
  const n2 = t2.list, s2 = ys(e2);
  return n2.some((e3) => e3.pagePath === s2);
}
const Is = !!e.uniIdRouter;
const { loginPage: Ss, routerNeedLogin: bs, resToLogin: ks$1, needLoginPage: Ts, notNeedLoginPage: As, loginPageInTabBar: Ps } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
  const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = ms(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
    const t3 = [], n3 = [];
    return e2.forEach((e3) => {
      const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = ms(r3, s3);
      t3.push(...i3), n3.push(...o3);
    }), { needLoginPage: t3, notNeedLoginPage: n3 };
  }(n2);
  return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: vs(i2, r2) };
}();
if (Ts.indexOf(Ss) > -1)
  throw new Error(`Login page [${Ss}] should not be "needLogin", please check your pages.json`);
function Cs(e2) {
  const t2 = ws();
  if ("/" === e2.charAt(0))
    return e2;
  const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
  i2.pop();
  for (let e3 = 0; e3 < r2.length; e3++) {
    const t3 = r2[e3];
    ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
  }
  return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
}
function xs(e2) {
  const t2 = ys(Cs(e2));
  return !(As.indexOf(t2) > -1) && (Ts.indexOf(t2) > -1 || bs.some((t3) => function(e3, t4) {
    return new RegExp(t4).test(e3);
  }(e2, t3)));
}
function Os({ redirect: e2 }) {
  const t2 = ys(e2), n2 = ys(Ss);
  return ws() !== n2 && t2 !== n2;
}
function Es({ api: e2, redirect: t2 } = {}) {
  if (!t2 || !Os({ redirect: t2 }))
    return;
  const n2 = function(e3, t3) {
    return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
  }(Ss, t2);
  Ps ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
  const s2 = { navigateTo: index.navigateTo, redirectTo: index.redirectTo, switchTab: index.switchTab, reLaunch: index.reLaunch };
  setTimeout(() => {
    s2[e2]({ url: n2 });
  }, 0);
}
function Ls({ url: e2 } = {}) {
  const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
    const { token: e3, tokenExpired: t3 } = oe();
    let n3;
    if (e3) {
      if (t3 < Date.now()) {
        const e4 = "uni-id-token-expired";
        n3 = { errCode: e4, errMsg: fs[e4] };
      }
    } else {
      const e4 = "uni-id-check-token-failed";
      n3 = { errCode: e4, errMsg: fs[e4] };
    }
    return n3;
  }();
  if (xs(e2) && n2) {
    n2.uniIdRedirectUrl = e2;
    if (G(W).length > 0)
      return setTimeout(() => {
        X(W, n2);
      }, 0), t2.abortLoginPageJump = true, t2;
    t2.autoToLoginPage = true;
  }
  return t2;
}
function Rs() {
  !function() {
    const e3 = _s(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = Ls({ url: e3 });
    t2 || n2 && Es({ api: "redirectTo", redirect: e3 });
  }();
  const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  for (let t2 = 0; t2 < e2.length; t2++) {
    const n2 = e2[t2];
    index.addInterceptor(n2, { invoke(e3) {
      const { abortLoginPageJump: t3, autoToLoginPage: s2 } = Ls({ url: e3.url });
      return t3 ? e3 : s2 ? (Es({ api: n2, redirect: Cs(e3.url) }), false) : e3;
    } });
  }
}
function Us() {
  this.onResponse((e2) => {
    const { type: t2, content: n2 } = e2;
    let s2 = false;
    switch (t2) {
      case "cloudobject":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in fs;
        }(n2);
        break;
      case "clientdb":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in ps;
        }(n2);
    }
    s2 && function(e3 = {}) {
      const t3 = G(W);
      te().then(() => {
        const n3 = _s();
        if (n3 && Os({ redirect: n3 }))
          return t3.length > 0 ? X(W, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (Ss && Es({ api: "navigateTo", redirect: n3 }));
      });
    }(n2);
  });
}
function Ns(e2) {
  !function(e3) {
    e3.onResponse = function(e4) {
      Y(B, e4);
    }, e3.offResponse = function(e4) {
      Q(B, e4);
    };
  }(e2), function(e3) {
    e3.onNeedLogin = function(e4) {
      Y(W, e4);
    }, e3.offNeedLogin = function(e4) {
      Q(W, e4);
    }, Is && (R("_globalUniCloudStatus").needLoginInit || (R("_globalUniCloudStatus").needLoginInit = true, te().then(() => {
      Rs.call(e3);
    }), ks$1 && Us.call(e3)));
  }(e2), function(e3) {
    e3.onRefreshToken = function(e4) {
      Y(H, e4);
    }, e3.offRefreshToken = function(e4) {
      Q(H, e4);
    };
  }(e2);
}
let Ds;
const Ms = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", qs = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function Ks() {
  const e2 = oe().token || "", t2 = e2.split(".");
  if (!e2 || 3 !== t2.length)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Ds(s2).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
Ds = "function" != typeof atob ? function(e2) {
  if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !qs.test(e2))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e2 += "==".slice(2 - (3 & e2.length));
  for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
    t2 = Ms.indexOf(e2.charAt(i2++)) << 18 | Ms.indexOf(e2.charAt(i2++)) << 12 | (n2 = Ms.indexOf(e2.charAt(i2++))) << 6 | (s2 = Ms.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return r2;
} : atob;
var Fs = n(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function r2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
    return t3.then((e4) => {
      if (s3) {
        const t4 = s3(e4);
        if (void 0 !== t4)
          return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
      }
      return e4;
    }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const i3 = t5.tempFiles, o2 = i3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= o2)
            return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u2 = i3[s5];
          e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
          } }).then((e5) => {
            u2.url = e5.fileID, s5 < o2 && c2();
          }).catch((e5) => {
            u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
          });
        }
      });
    }(e3, t4, 5, r3));
  }
  t2.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return "image" === t3.type ? i2(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
        return new Promise((e5, a2) => {
          index.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
            e5(r2(t5, "image"));
          }, fail(e6) {
            a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
        return new Promise((e5, c2) => {
          index.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
            e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : i2(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, i3) => {
          let o2 = index.chooseFile;
          if ("undefined" != typeof wx$1 && "function" == typeof wx$1.chooseMessageFile && (o2 = wx$1.chooseMessageFile), "function" != typeof o2)
            return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
          o2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(r2(t5));
          }, fail(e6) {
            i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}), js = t(Fs);
const $s = "manual";
function Bs(e2) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e3.push(this[t2]);
      }), e3;
    }, (e3, t2) => {
      if (this.loadtime === $s)
        return;
      let n2 = false;
      const s2 = [];
      for (let r2 = 2; r2 < e3.length; r2++)
        e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
      e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t2) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = i2, t2 && t2(i2);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2;
    t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const r2 = t2.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const i2 = t2.where || this.where;
    i2 && Object.keys(i2).length && (n2 = n2.where(i2));
    const o2 = t2.field || this.field;
    o2 && (n2 = n2.field(o2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
    const h2 = t2.orderby || this.orderby;
    h2 && (n2 = n2.orderBy(h2));
    const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
    return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
  } } };
}
function Ws(e2) {
  return function(t2, n2 = {}) {
    n2 = function(e3, t3 = {}) {
      return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
    }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
    return new Proxy({}, { get(s3, c2) {
      switch (c2) {
        case "toString":
          return "[object UniCloudObject]";
        case "toJSON":
          return {};
      }
      return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await K(F(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await K(F(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e4) {
            throw o3 = e4, await K(F(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await K(F(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...h2) {
        let l2;
        a2 && index.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
        "object" == typeof n2.secretMethods && function(e3, t3) {
          const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let p2 = false;
        try {
          l2 = await e2.callFunction(d2);
        } catch (e3) {
          p2 = true, l2 = { result: new se(e3) };
        }
        const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
        if (a2 && index.hideLoading(), y2 && y2.token && y2.tokenExpired && (ae(y2), X(H, { ...y2 })), g2) {
          let e3 = m2;
          if (p2 && o2) {
            e3 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              index.showToast({ title: e3, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    index.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                      i3(e5);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                if (i2.retry && t3)
                  return s4(...h2);
              }
            }
          const n3 = new se({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
          throw n3.detail = l2.result, X(B, { type: V, content: n3 }), n3;
        }
        return X(B, { type: V, content: l2.result }), l2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
        return { objectName: t2, methodName: c2, params: e3 };
      } });
    } });
  };
}
function Hs(e2) {
  return R("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
}
async function Js({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
  const n2 = Hs(this);
  if (e2 && t2)
    throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");
  if (e2)
    return n2.mpWeixinOpenid = e2, {};
  const s2 = await new Promise((e3, t3) => {
    index.login({ success(t4) {
      e3(t4.code);
    }, fail(e4) {
      t3(new Error(e4.errMsg));
    } });
  }), r2 = this.importObject("uni-id-co", { customUI: true });
  return await r2.secureNetworkHandshakeByWeixin({ code: s2, callLoginByWeixin: t2 }), n2.mpWeixinCode = s2, { code: s2 };
}
async function zs(e2) {
  const t2 = Hs(this);
  return t2.initPromise || (t2.initPromise = Js.call(this, e2).then((e3) => e3).catch((e3) => {
    throw delete t2.initPromise, e3;
  })), t2.initPromise;
}
function Vs(e2) {
  return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
    return zs.call(e2, { openid: t2, callLoginByWeixin: n2 });
  };
}
function Gs(e2) {
  !function(e3) {
    de = e3;
  }(e2);
}
function Ys(e2) {
  const t2 = { getSystemInfo: index.getSystemInfo, getPushClientId: index.getPushClientId };
  return function(n2) {
    return new Promise((s2, r2) => {
      t2[e2]({ ...n2, success(e3) {
        s2(e3);
      }, fail(e3) {
        r2(e3);
      } });
    });
  };
}
class Qs extends class {
  constructor() {
    this._callback = {};
  }
  addListener(e2, t2) {
    this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
  }
  on(e2, t2) {
    return this.addListener(e2, t2);
  }
  removeListener(e2, t2) {
    if (!t2)
      throw new Error('The "listener" argument must be of type function. Received undefined');
    const n2 = this._callback[e2];
    if (!n2)
      return;
    const s2 = function(e3, t3) {
      for (let n3 = e3.length - 1; n3 >= 0; n3--)
        if (e3[n3] === t3)
          return n3;
      return -1;
    }(n2, t2);
    n2.splice(s2, 1);
  }
  off(e2, t2) {
    return this.removeListener(e2, t2);
  }
  removeAllListener(e2) {
    delete this._callback[e2];
  }
  emit(e2, ...t2) {
    const n2 = this._callback[e2];
    if (n2)
      for (let e3 = 0; e3 < n2.length; e3++)
        n2[e3](...t2);
  }
} {
  constructor() {
    super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
  }
  init() {
    return Promise.all([Ys("getSystemInfo")(), Ys("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
      if (!e2)
        throw new Error("Invalid appId, please check the manifest.json file");
      if (!t2)
        throw new Error("Invalid push client id");
      this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
    }, (e2) => {
      throw this.emit("error", e2), this.close(), e2;
    });
  }
  async open() {
    return this.init();
  }
  _isUniCloudSSE(e2) {
    if ("receive" !== e2.type)
      return false;
    const t2 = e2 && e2.data && e2.data.payload;
    return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
  }
  _receivePushMessage(e2) {
    if (!this._isUniCloudSSE(e2))
      return;
    const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
    this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
  }
  _consumMessage() {
    for (; ; ) {
      const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
      if (!e2)
        break;
      this._currentMessageId++, this._parseMessagePayload(e2);
    }
  }
  _parseMessagePayload(e2) {
    const { action: t2, messageId: n2, message: s2 } = e2;
    "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
  }
  _appendMessage({ messageId: e2, message: t2 } = {}) {
    this.emit("message", t2);
  }
  _end({ messageId: e2, message: t2 } = {}) {
    this.emit("end", t2), this.close();
  }
  _initMessageListener() {
    index.onPushMessage(this._uniPushMessageCallback);
  }
  _destroy() {
    index.offPushMessage(this._uniPushMessageCallback);
  }
  toJSON() {
    return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
  }
  close() {
    this._destroy(), this.emit("close");
  }
}
async function Xs(e2) {
  const t2 = e2.__dev__;
  if (!t2.debugInfo)
    return;
  const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await Et(n2, s2);
  if (r2)
    return t2.localAddress = r2, void (t2.localPort = s2);
  const i2 = console["warn"];
  let o2 = "";
  if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === A.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
    throw new Error(o2);
  i2(o2);
}
function Zs(e2) {
  e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e3) => {
      setTimeout(() => {
        e3();
      }, n2);
    });
    const s2 = e2.auth();
    return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
  } }));
}
const er = { tcb: xt, tencent: xt, aliyun: me, private: Ut, dcloud: Ut, alipay: Wt };
exports.tr = new class {
  init(e2) {
    let t2 = {};
    const n2 = er[e2.provider];
    if (!n2)
      throw new Error("未提供正确的provider参数");
    t2 = n2.init(e2), function(e3) {
      const t3 = {};
      e3.__dev__ = t3, t3.debugLog = "mp-harmony" === A;
      const n3 = P;
      n3 && !n3.code && (t3.debugInfo = n3);
      const s2 = new v({ createPromise: function() {
        return Xs(e3);
      } });
      t3.initLocalNetwork = function() {
        return s2.exec();
      };
    }(t2), Zs(t2), Xn(t2), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t2), function(e3) {
      e3.database = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).database();
        if (this._database)
          return this._database;
        const n3 = us(hs, { uniClient: e3 });
        return this._database = n3, n3;
      }, e3.databaseForJQL = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).databaseForJQL();
        if (this._databaseForJQL)
          return this._databaseForJQL;
        const n3 = us(hs, { uniClient: e3, isJQL: true });
        return this._databaseForJQL = n3, n3;
      };
    }(t2), function(e3) {
      e3.getCurrentUserInfo = Ks, e3.chooseAndUploadFile = js.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
        return Bs(e3);
      } }), e3.SSEChannel = Qs, e3.initSecureNetworkByWeixin = Vs(e3), e3.setCustomClientInfo = Gs, e3.importObject = Ws(e3);
    }(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t2[e3])
        return;
      const n3 = t2[e3];
      t2[e3] = function() {
        return n3.apply(t2, Array.from(arguments));
      }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
        return function(n4) {
          let s2 = false;
          if ("callFunction" === t3) {
            const e5 = n4 && n4.type || c;
            s2 = e5 !== c;
          }
          const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
          n4 = n4 || {};
          const { success: o2, fail: a2, complete: u2 } = ne(n4), h2 = i2.then(() => s2 ? Promise.resolve() : K(F(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : K(F(t3, "success"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (r2 && X(B, { type: z, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : K(F(t3, "fail"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (X(B, { type: z, content: e5 }), Promise.reject(e5))));
          if (!(o2 || a2 || u2))
            return h2;
          h2.then((e5) => {
            o2 && o2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
          }, (e5) => {
            a2 && a2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
          });
        };
      }(t2[e3], e3)).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  const e2 = C;
  let t2 = {};
  if (e2 && 1 === e2.length)
    t2 = e2[0], exports.tr = exports.tr.init(t2), exports.tr._isDefault = true;
  else {
    const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
    let n2;
    n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
      exports.tr[e3] = function() {
        return console.error(n2), Promise.reject(new se({ code: "SYS_ERR", message: n2 }));
      };
    });
  }
  if (Object.assign(exports.tr, { get mixinDatacom() {
    return Bs(exports.tr);
  } }), Ns(exports.tr), exports.tr.addInterceptor = M, exports.tr.removeInterceptor = q, exports.tr.interceptObject = j, "web" === A)
    ;
})();
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.defineComponent = defineComponent;
exports.f = f$1;
exports.gei = gei;
exports.index = index;
exports.o = o$1;
exports.reactive = reactive;
exports.sei = sei;
exports.t = t$1;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
