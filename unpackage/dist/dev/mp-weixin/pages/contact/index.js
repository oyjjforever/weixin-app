"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const handleNavigate = () => {
      common_vendor.index.openLocation({
        latitude: 31.234527,
        longitude: 121.501608,
        name: "丽祥家居",
        address: "福州市晋安区福兴大道5号茶花现代家居建材广场二楼C36丽祥家居",
        success: () => {
          common_vendor.index.__f__("log", "at pages/contact/index.vue:71", "导航成功");
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
        phoneNumber: "17759186806",
        success: () => {
          common_vendor.index.__f__("log", "at pages/contact/index.vue:86", "拨打电话成功");
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "拨打电话失败",
            icon: "none"
          });
        }
      });
    };
    const handleWechat = () => {
      common_vendor.index.showActionSheet({
        itemList: ["复制微信号", "保存二维码", "查看联系方式"],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              common_vendor.index.setClipboardData({
                data: "LXJJ193",
                // 替换为实际的微信号
                success: () => {
                  common_vendor.index.showModal({
                    title: "微信号已复制",
                    content: '请打开微信，点击右上角"+"号，选择"添加朋友"，粘贴微信号即可添加',
                    showCancel: false,
                    confirmText: "知道了"
                  });
                }
              });
              break;
            case 1:
              common_vendor.index.showModal({
                title: "微信二维码",
                content: "长按保存二维码图片，在微信中扫码添加好友",
                showCancel: false,
                confirmText: "知道了"
              });
              break;
            case 2:
              common_vendor.index.showModal({
                title: "联系方式",
                content: "微信号：LXJJ193，电话：17759186806，地址：福州市晋安区福兴大道5号茶花现代家居建材广场二楼C36丽祥家居",
                showCancel: false,
                confirmText: "知道了"
              });
              break;
          }
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
          type: "chat",
          size: "24",
          color: "#3498db"
        }),
        h: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        i: common_vendor.o(handleWechat),
        j: common_vendor.p({
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
