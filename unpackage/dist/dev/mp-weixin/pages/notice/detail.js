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
  __name: "detail",
  setup(__props) {
    const noticeInfo = common_vendor.ref(null);
    const loading = common_vendor.ref(false);
    const getNoticeDetail = async (noticeId) => {
      loading.value = true;
      try {
        const result = await common_vendor.nr.callFunction({
          name: "getNoticeDetail",
          data: { id: noticeId }
        });
        if (result.result.code === 0) {
          noticeInfo.value = result.result.data;
        } else {
          common_vendor.index.showToast({
            title: result.result.message || "获取通知详情失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/notice/detail.vue:123", "获取通知详情失败:", error);
        common_vendor.index.showToast({
          title: "网络错误，请重试",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const getTypeText = (type) => {
      const typeMap = {
        promotion: "促销活动",
        announcement: "公告",
        maintenance: "维护通知"
      };
      return typeMap[type] || "通知";
    };
    const getActionText = (linkType) => {
      const actionMap = {
        page: "查看详情",
        url: "访问链接",
        product: "查看产品"
      };
      return actionMap[linkType] || "了解更多";
    };
    const formatDate = (timestamp) => {
      if (!timestamp)
        return "";
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const formatDateTime = (timestamp) => {
      if (!timestamp)
        return "";
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    const previewImage = () => {
      if (noticeInfo.value && noticeInfo.value.image) {
        common_vendor.index.previewImage({
          urls: [noticeInfo.value.image],
          current: noticeInfo.value.image
        });
      }
    };
    const handleLinkClick = () => {
      if (!noticeInfo.value)
        return;
      const { linkType, linkUrl } = noticeInfo.value;
      if (!linkUrl) {
        common_vendor.index.showToast({
          title: "链接地址无效",
          icon: "none"
        });
        return;
      }
      switch (linkType) {
        case "page":
          common_vendor.index.navigateTo({
            url: linkUrl,
            fail: () => {
              common_vendor.index.switchTab({
                url: linkUrl,
                fail: () => {
                  common_vendor.index.showToast({
                    title: "页面跳转失败",
                    icon: "none"
                  });
                }
              });
            }
          });
          break;
        case "url":
          common_vendor.index.showModal({
            title: "提示",
            content: "是否在浏览器中打开链接？",
            success: (res) => {
              if (res.confirm) {
                plus.runtime.openURL(linkUrl);
              }
            }
          });
          break;
        case "product":
          common_vendor.index.navigateTo({
            url: `/pages/index/detail?id=${linkUrl}`,
            fail: () => {
              common_vendor.index.showToast({
                title: "产品详情跳转失败",
                icon: "none"
              });
            }
          });
          break;
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options;
      if (options && options.id) {
        getNoticeDetail(options.id);
      } else {
        common_vendor.index.showToast({
          title: "缺少通知ID",
          icon: "none"
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: noticeInfo.value
      }, noticeInfo.value ? common_vendor.e({
        b: common_vendor.t(getTypeText(noticeInfo.value.type)),
        c: common_vendor.n("type-" + noticeInfo.value.type),
        d: common_vendor.t(noticeInfo.value.title),
        e: common_vendor.t(formatDate(noticeInfo.value.create_date)),
        f: noticeInfo.value.endTime
      }, noticeInfo.value.endTime ? {
        g: common_vendor.t(formatDate(noticeInfo.value.endTime))
      } : {}, {
        h: noticeInfo.value.image
      }, noticeInfo.value.image ? {
        i: noticeInfo.value.image,
        j: common_vendor.o(previewImage)
      } : {}, {
        k: common_vendor.t(noticeInfo.value.content),
        l: noticeInfo.value.linkType && noticeInfo.value.linkType !== "none"
      }, noticeInfo.value.linkType && noticeInfo.value.linkType !== "none" ? {
        m: common_vendor.t(getActionText(noticeInfo.value.linkType)),
        n: common_vendor.p({
          type: "right",
          size: "18",
          color: "#ffffff"
        }),
        o: common_vendor.o(handleLinkClick)
      } : {}, {
        p: common_vendor.p({
          type: "calendar",
          size: "16",
          color: "#999"
        }),
        q: common_vendor.t(formatDateTime(noticeInfo.value.create_date)),
        r: noticeInfo.value.update_date && noticeInfo.value.update_date !== noticeInfo.value.create_date
      }, noticeInfo.value.update_date && noticeInfo.value.update_date !== noticeInfo.value.create_date ? {
        s: common_vendor.p({
          type: "refresh",
          size: "16",
          color: "#999"
        }),
        t: common_vendor.t(formatDateTime(noticeInfo.value.update_date))
      } : {}) : loading.value ? {
        w: common_vendor.p({
          type: "spinner-cycle",
          size: "48",
          color: "#999"
        })
      } : {
        x: common_vendor.p({
          type: "info",
          size: "64",
          color: "#d9d9d9"
        }),
        y: common_vendor.o(goBack)
      }, {
        v: loading.value
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notice/detail.js.map
