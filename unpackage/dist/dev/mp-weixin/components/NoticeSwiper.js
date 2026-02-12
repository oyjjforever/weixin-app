"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "NoticeSwiper",
  props: {
    noticeList: { default: () => [] },
    autoplay: { type: Boolean, default: true },
    interval: { default: 5e3 },
    vertical: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const currentIndex = common_vendor.ref(0);
    const getIconType = (type) => {
      const iconMap = {
        promotion: "gift",
        announcement: "notification",
        maintenance: "gear"
      };
      return iconMap[type] || "notification";
    };
    const getShortContent = (content) => {
      if (!content)
        return "";
      return content.length > 30 ? content.substring(0, 30) + "..." : content;
    };
    const onSwiperChange = (e) => {
      currentIndex.value = e.detail.current;
    };
    const handleClick = (item) => {
      emit("click", item);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.noticeList.length > 0
      }, _ctx.noticeList.length > 0 ? common_vendor.e({
        b: common_vendor.f(_ctx.noticeList, (item, index, i0) => {
          return {
            a: "a7f211de-0-" + i0,
            b: common_vendor.p({
              type: getIconType(item.type),
              size: "20",
              color: "#ffffff"
            }),
            c: common_vendor.t(item.title),
            d: common_vendor.t(getShortContent(item.content)),
            e: "a7f211de-1-" + i0,
            f: common_vendor.n("type-" + item.type),
            g: common_vendor.o(($event) => handleClick(item), item._id || index),
            h: item._id || index
          };
        }),
        c: common_vendor.p({
          type: "right",
          size: "18",
          color: "#ffffff"
        }),
        d: _ctx.autoplay,
        e: _ctx.interval,
        f: _ctx.vertical,
        g: common_vendor.o(onSwiperChange),
        h: _ctx.noticeList.length > 1
      }, _ctx.noticeList.length > 1 ? {
        i: common_vendor.f(_ctx.noticeList, (item, index, i0) => {
          return {
            a: index,
            b: currentIndex.value === index ? 1 : ""
          };
        })
      } : {}) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a7f211de"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/NoticeSwiper.js.map
