"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const handleNavigate = () => {
      common_vendor.index.openLocation({
        latitude: 31.234527,
        longitude: 121.501608,
        name: "示例店铺",
        address: "上海市浦东新区陆家嘴环路1000号",
        success: () => {
          common_vendor.index.__f__("log", "at pages/contact/index.vue:58", "导航成功");
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "打开导航失败",
            icon: "none"
          });
        }
      });
    };
    const handleCall = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "021-88888888",
        success: () => {
          common_vendor.index.__f__("log", "at pages/contact/index.vue:73", "拨打电话成功");
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "拨打电话失败",
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "location",
          size: "24",
          color: "#3498db"
        }),
        b: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        c: common_vendor.o(handleNavigate),
        d: common_vendor.p({
          type: "phone",
          size: "24",
          color: "#3498db"
        }),
        e: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        f: common_vendor.o(handleCall),
        g: common_vendor.p({
          type: "calendar",
          size: "24",
          color: "#3498db"
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/contact/index.js.map
